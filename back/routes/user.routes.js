const Router = require('express')
const userController = require('../controllers/user.controller.js')

const router = Router()

router.get('/', userController.getAll)
router.get('/:user_id', userController.getOne)
router.get('/:departament', userController.getAllByDepartament)

router.post('/login', userController.login)

module.exports = router
