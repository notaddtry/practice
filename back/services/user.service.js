const pool = require('../db/pool')

class UserService {
  async getAll() {
    try {
      const res = await pool.query(`
        SELECT * FROM users;
        `)

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getOne(body) {
    try {
      const user = await pool.query(
        `SELECT * FROM users WHERE id = ${body.user_id};`
      )

      const attr = await this.getOneAttribute({ user_id: body.user_id })

      return { ...user.rows[0], ...attr }
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getOneAttribute({ user_id }) {
    try {
      const attr = await pool.query(`
        SELECT * FROM user_attr WHERE user_id = ${user_id};
        `)

      return attr.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async getAllByDepartament({ departament }) {
    try {
      const attrubites = await pool.query(
        `SELECT * FROM user_attr WHERE departament = '${departament}';`
      )

      const usersIds = attrubites.rows.map((attr) => attr.user_id)

      let users = []

      for (const id of usersIds) {
        const user = await this.getOne({ user_id: id })
        users.push(user)
      }

      return users
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async login(body) {
    try {
      const res = await pool.query(`
        SELECT * FROM users WHERE username = '${body.username}' AND password = '${body.password}';
        `)

      const attr = await this.getOneAttribute({ user_id: res.rows[0].id })

      return { ...res.rows[0], ...attr }
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }
}

const userService = new UserService()

module.exports = userService
