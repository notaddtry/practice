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

  async getAllNotClosedByClientDepartament() {
    try {
      const notClosedRequests = await this.getAllNotClosed()

      const res = notClosedRequests.filter()

      return res.rows
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

      return res.rows
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

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async createRequest({ text, user_id }) {
    try {
      const res = await pool.query(`
        BEGIN;

        INSERT INTO requests (text, user_id) VALUES (${text}, ${user_id});

        INSERT INTO is_seen (request_id) VALUES (LASTVAL());

        COMMIT;
        `)

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }
  async takeRequest({ user_id, request_id }) {
    try {
      const res = await this.changeRequestStatus({
        request_id,
        status: 'awaiting',
      })

      await this.setFalseSeenForAnotherRequestOwner({ request_id })

      await this.seeRequest({ user_id, request_id })

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async placeRequestToAnotherSpecialist({ request_id, specialist_id }) {
    try {
      const res = await pool.query(`
        UPDATE requests SET specialist_id = ${specialist_id} WHERE id = ${request_id};
        `)

      return res.rows
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
          BEGIN;
  
          UPDATE is_seen SET ${fieldToUpdate} = FALSE WHERE id = ${request_id};
  
          COMMIT;
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

      const res = await pool.query(`
        BEGIN;

        UPDATE is_seen SET ${fieldToUpdate} = NOT ${fieldToUpdate} WHERE id = ${request_id};

        UPDATE requests SET updated_at = CURRENT_TIMESTAMP WHERE id = ${request_id};

        COMMIT;
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

        res = await pool.query(`
          UPDATE requests SET 
          status = ${status}, plan_end_date = ${date}  WHERE id = ${request_id};
          `)
      } else {
        res = await pool.query(`
          UPDATE requests SET 
          status = ${status} WHERE id = ${request_id};
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
}

const requestService = new RequestService()

module.exports = requestService
