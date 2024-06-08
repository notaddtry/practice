const userService = require('../services/user.service.js')

class UserController {
  async getAll(_, res) {
    try {
      const data = await userService.getAll()

      res.json(data)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Пользователи не найдены' })
    }
  }

  async getOne(req, res) {
    try {
      const data = await userService.getOne(req.params)

      res.json(data)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Пользователь не найден' })
    }
  }

  async getAllByDepartament(req, res) {
    try {
      const data = await userService.getAllByDepartament(req.params)

      res.json(data)
    } catch (e) {
      res
        .status(400)
        .json(
          e.message || { message: 'Пользователи по данному отделу не найдены' }
        )
    }
  }

  async login(req, res) {
    try {
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
          message: 'Ошибка',
        }
      )
    }
  }
}

const userController = new UserController()

module.exports = userController
