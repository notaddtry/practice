const Router = require('express')
const userController = require('../controllers/user.controller.js')

const router = Router()

router.get('/', userController.getAll)

// router.get('/:id', userController.getOne)

router.post('/', userController.create)
router.post('/login', userController.login)

// router.put('/:id', userController.update)

// router.delete('/:id', userController.remove)

module.exports = router
