const pool = require('../db/pool')
const requestService = require('../services/request.service.js')
const userService = require('./user.service.js')

class CommentService {
  async getAll({ request_id }) {
    try {
      const res = await pool.query(
        `SELECT * FROM comments WHERE request_id = ${request_id};`
      )

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }

  async createComment({ text, user_id, request_id }) {
    try {
      const user = await userService.getOne({ user_id })

      const commentId = await pool.query(`
        INSERT INTO comments (text, user_id, request_id) VALUES 
        ('${text}', '${user_id}', '${request_id}') RETURNING id;
        `)

      await pool.query(`
        UPDATE requests SET updated_at = CURRENT_TIMESTAMP WHERE id = '${commentId.rows[0].id}';
        `)

      if (user.role === 'user') {
        await requestService.reopenRequest({ user_id, request_id })
      }

      return commentId.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }
}

const commentService = new CommentService()

module.exports = commentService
