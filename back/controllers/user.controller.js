const userService = require('../services/user.service.js')

class UserController {
  async getAll(_, res) {
    try {
      const data = await userService.getAll()

      res.json(data)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Папка не найдена!' })
    }
  }
  // async getOne(req, res) {
  //   try {
  //     const data = await folderService.getOne(req.params.id)
  //     const { folder, messagesInFolder } = data

  //     res.json({ ...folder, messagesInFolder })
  //   } catch (e) {
  //     res.status(400).json(e.message || { message: 'Папка не найдена!' })
  //   }
  // }
  async create(req, res) {
    try {
      // console.log(req)
      const data = await userService.create(req.body)
      res.json(data.rows)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Пользователь не создан' })
    }
  }
  async login(req, res) {
    try {
      // console.log(req)
      const data = await userService.login(req.body)

      if (!data.rows.length) {
        return res.status(400).json({
          message: 'Не существующее имя пользователя или пароль',
        })
      }

      res.json(data.rows)
    } catch (e) {
      res.status(400).json(
        e.message || {
          message: 'Не существующее имя пользователя или пароль',
        }
      )
    }
  }
  // async update(req, res) {
  //   try {
  //     const data = await folderService.update(req)

  //     res.json(data.searchFolder)
  //   } catch (e) {
  //     res.status(400).json(e.message || { message: 'Папка не найдена!' })
  //   }
  // }
  // async remove(req, res) {
  //   try {
  //     const data = await folderService.remove(req.params.id)

  //     res.json(data.paramsId)
  //   } catch (e) {
  //     res.status(400).json(e.message || { message: 'Папка не найдена!' })
  //   }
  // }
}

const userController = new UserController()

module.exports = userController
