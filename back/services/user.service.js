const pool = require('../db/pool')

class UserService {
  async getAll() {
    try {
      const res = await pool.query('SELECT * FROM users;')

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getOne({ user_id }) {
    try {
      const user = await pool.query(
        `SELECT * FROM users WHERE id = ${user_id};`
      )

      const attr = await this.getOneAttribute({ user_id })

      const res = { ...user.rows, ...attr.rows }

      return res
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getOneAttribute({ user_id }) {
    try {
      const attr = await pool.query(
        `SELECT * FROM user_attr WHERE user_id = ${user_id};`
      )

      return attr.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getAllByDepartament({ departament }) {
    try {
      const attrubites = await pool.query(
        `SELECT * FROM user_attr WHERE departament = ${departament};`
      )

      const usersIds = attrubites.rows[3].map((attr) => attr.user_id)

      let users = []

      for (const id of usersIds) {
        const user = await this.getOne({ id })
        users.push(user)
      }

      return users
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async login({ username, password }) {
    try {
      const res = await pool.query(`
        SELECT * FROM users WHERE username = '${username}' AND password = '${password}';
        `)

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }
}

const userService = new UserService()

module.exports = userService
