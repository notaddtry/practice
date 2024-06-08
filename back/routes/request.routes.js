const Router = require('express')
const requestController = require('../controllers/request.controller.js')

const router = Router()

router.get('/:user_id', requestController.getAllByUser)
router.get('/', requestController.getAll)
router.get('/not_closed', requestController.getAllNotClosed)
router.get('/:request_id', requestController.getOne)

router.post('/', requestController.createRequest)

router.put('/:id/take', requestController.takeRequest)
router.put(
  '/:id/placeToAnother',
  requestController.placeRequestToAnotherSpecialist
)
router.put('/:id/see', requestController.seeRequest)
router.put('/:id/open', requestController.openRequest)
router.put('/:id/close', requestController.closeRequest)

module.exports = router
