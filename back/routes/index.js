const db = require('../db/index.js')

const Router = require('express')
// const folderController = require('../controllers/folder.controller.js')

const router = Router()

router.get('/', (req, res) => {
  return 'hello,world'
})

router.get('/:id', folderController.getOne)

router.post('/', folderController.create)

router.put('/:id', folderController.update)

router.delete('/:id', folderController.remove)

module.exports = router

app.get('/', async (req, res, next) => {
  console.log(db)
  // const result = await db.query('SELECT * FROM users WHERE id = $1', [
  //   req.params.id,
  // ])
  res.send(result.rows[0])
})
