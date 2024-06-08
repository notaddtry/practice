const Router = require('express')
const commentController = require('../controllers/comment.controller.js')

const router = Router()

router.get('/:request_id', commentController.getAll)

router.post('/', commentController.createComment)

module.exports = router
