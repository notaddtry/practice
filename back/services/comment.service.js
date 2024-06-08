const pool = require('../db/pool')
const requestService = require('../services/request.service.js')

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
      const res = await pool.query(`
        BEGIN;

        INSERT INTO comments (text, user_id, request_id) VALUES 
        (${text}, ${user_id}, ${request_id});

        UPDATE requests SET updated_at = CURRENT_TIMESTAMP WHERE id = ${request_id};

        COMMIT;
        `)

      if (userRole === 'user') {
        await requestService.openRequest({ request_id })
      }

      return res.rows
    } catch (error) {
      console.log(error)
      throw new Error()
    }
  }
}

const commentService = new CommentService()

module.exports = commentService
