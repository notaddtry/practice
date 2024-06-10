const pool = require('../db/pool')
const userService = require('../services/user.service.js')

class RequestService {
  async getAll() {
    try {
      const res = await pool.query(`
        SELECT * FROM requests;
        `)

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getAllNotClosed() {
    try {
      const res = await pool.query(`
        SELECT * FROM requests WHERE status <> 'close';
        `)

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getAllOpen() {
    try {
      const res = await pool.query(`
        SELECT * FROM requests WHERE status = 'open';
        `)

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getAllOpenAndWithoutSpecialist() {
    try {
      const res = await pool.query(`
        SELECT * FROM requests WHERE status = 'open' AND specialist_id IS NULL;
        `)

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getAllNotClosedAndClientDepartament() {
    try {
      const openRequests = await this.getAllOpenAndWithoutSpecialist()

      const persons = await userService.getAllByDepartament({
        departament: 'client',
      })

      const personIds = persons.map((person) => person.id)

      const requests = [...openRequests]

      for (const id of personIds) {
        const requestsWithClientDepartamentOwner = await pool.query(`
          SELECT * FROM requests WHERE specialist_id = ${id};
          `)

        requestsWithClientDepartamentOwner.rows
          .filter((req) => req.status !== 'close')
          .forEach((req) => {
            requests.push(req)
          })
      }

      const fulfilledRequests = []

      for (const req of requests) {
        const isSeen = await pool.query(`
          SELECT * FROM is_seen WHERE request_id = ${req.id};
          `)

        fulfilledRequests.push({
          ...req,
          is_seen_by_user: isSeen.rows[0].is_seen_by_user,
          is_seen_by_specialist: isSeen.rows[0].is_seen_by_specialist,
        })
      }

      return fulfilledRequests
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getAllStudyDepartament() {
    try {
      const persons = await userService.getAllByDepartament({
        departament: 'study',
      })

      const personIds = persons.map((person) => person.id)

      const requests = []

      for (const id of personIds) {
        const requestsWithClientDepartamentOwner = await pool.query(`
          SELECT * FROM requests WHERE specialist_id = ${id};
          `)

        requestsWithClientDepartamentOwner.rows.forEach((req) => {
          requests.push(req)
        })
      }

      const fulfilledRequests = []

      for (const req of requests) {
        const isSeen = await pool.query(`
          SELECT * FROM is_seen WHERE request_id = ${req.id};
          `)

        fulfilledRequests.push({
          ...req,
          is_seen_by_user: isSeen.rows[0].is_seen_by_user,
          is_seen_by_specialist: isSeen.rows[0].is_seen_by_specialist,
        })
      }

      return fulfilledRequests
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getAllByUser({ user_id }) {
    try {
      const user = await userService.getOne({ user_id })

      const userRole = user.role

      const fieldToSearch = `${userRole}_id`

      const res = await pool.query(`
        SELECT * FROM requests WHERE ${fieldToSearch} = ${user_id};`)

      let requests = []

      for (const req of res.rows) {
        const isSeen = await pool.query(`
          SELECT * FROM is_seen WHERE request_id = ${req.id};
          `)

        requests.push({
          ...req,
          is_seen_by_user: isSeen.rows[0].is_seen_by_user,
          is_seen_by_specialist: isSeen.rows[0].is_seen_by_specialist,
        })
      }

      return requests
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getOne({ request_id }) {
    try {
      const res = await pool.query(`
        SELECT * FROM requests WHERE id = ${request_id};
        `)

      return res.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async createRequest(body) {
    try {
      const requestId = await pool.query(`
        INSERT INTO requests (text, title, user_id) VALUES ('${body.text}', '${body.title}', '${body.user_id}') RETURNING id;
        `)

      await pool.query(`
         INSERT INTO is_seen (request_id) VALUES ('${requestId.rows[0].id}');
        `)

      return requestId.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }
  async takeRequest({ user_id, request_id }) {
    try {
      await this.changeRequestStatus({
        request_id,
        status: 'awaiting',
      })

      await this.setFalseSeenForAnotherRequestOwner({ user_id, request_id })

      await this.seeRequest({ user_id, request_id })

      const res = await pool.query(`
         UPDATE requests SET specialist_id = '${user_id}' WHERE id = '${request_id}';
        `)

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async placeRequestToAnotherSpecialist({ request_id, specialist_id }) {
    try {
      const res = await pool.query(`
        UPDATE requests SET specialist_id = ${specialist_id} WHERE id = ${request_id} RETURNING id;
        `)

      return res.rows[0].id
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async setFalseSeenForAnotherRequestOwner({ user_id, request_id }) {
    try {
      const user = await userService.getOne({ user_id })

      const userRole = user.role

      const fieldToUpdate =
        userRole === 'specialist' ? 'is_seen_by_user' : 'is_seen_by_specialist'

      const res = await pool.query(`
        UPDATE is_seen SET ${fieldToUpdate} = FALSE WHERE id = ${request_id};
        `)

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async seeRequest({ user_id, request_id }) {
    try {
      const user = await userService.getOne({ user_id })

      const userRole = user.role

      const fieldToUpdate = `is_seen_by_${userRole}`

      await pool.query(`
        UPDATE is_seen SET ${fieldToUpdate} = TRUE WHERE request_id = ${request_id};
        `)

      await pool.query(`
        SELECT * FROM is_seen WHERE request_id = ${request_id};
        `)

      const res = await pool.query(`
        UPDATE requests SET updated_at = CURRENT_TIMESTAMP WHERE id = ${request_id} RETURNING id;
        `)

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async changeRequestStatus({ request_id, status }) {
    try {
      let res

      if (status === 'awaiting') {
        const date = new Date()
        date.setDate(date.getDate() + 7)
        const isoDate = date.toISOString()

        res = await pool.query(`
          UPDATE requests SET status = '${status}', plan_end_date = '${isoDate}' WHERE id = ${request_id};
          `)
      } else {
        res = await pool.query(`
          UPDATE requests SET status = '${status}' WHERE id = ${request_id};
          `)
      }

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async closeRequest({ user_id, request_id }) {
    try {
      const res = await this.changeRequestStatus({
        request_id,
        status: 'close',
      })

      await this.setFalseSeenForAnotherRequestOwner({ user_id, request_id })

      return res
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async openRequest({ user_id, request_id }) {
    try {
      const res = await this.changeRequestStatus({
        request_id,
        status: 'open',
      })

      await this.setFalseSeenForAnotherRequestOwner({ user_id, request_id })

      return res
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async reopenRequest({ user_id, request_id }) {
    try {
      const res = await this.changeRequestStatus({
        request_id,
        status: 'awaiting',
      })

      await this.setFalseSeenForAnotherRequestOwner({ user_id, request_id })

      return res
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }
}

const requestService = new RequestService()

module.exports = requestService
