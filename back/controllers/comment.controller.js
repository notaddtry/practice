const commentService = require('../services/comment.service.js')

class CommentController {
  async getAll(req, res) {
    try {
      const data = await commentService.getAll(req.params)

      res.json(data)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Комментарии не найдены' })
    }
  }

  async createComment(req, res) {
    try {
      const data = await commentService.createComment(req.body)

      res.json(data)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Комментарий не создан' })
    }
  }
}

const commentController = new CommentController()

module.exports = commentController
