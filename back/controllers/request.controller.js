const requestService = require('../services/request.service.js')

class RequestController {
  async getAll(_, res) {
    try {
      const data = await requestService.getAll()

      res.json(data)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Заявки не найдены' })
    }
  }

  async getAllByUser(req, res) {
    try {
      const data = await requestService.getAllByUser(req.params)

      res.json(data)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Заявки не найдены' })
    }
  }

  async getAllNotClosed(_, res) {
    try {
      const data = await requestService.getAllNotClosed()

      res.json(data)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Заявки не найдены' })
    }
  }

  async getAllNotClosedAndClientDepartament(_, res) {
    try {
      const data = await requestService.getAllNotClosedAndClientDepartament()

      console.log(data)

      res.json(data)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Заявки не найдены' })
    }
  }

  async getOne(req, res) {
    try {
      const data = await requestService.getOne(req.params)

      res.json(data)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Заявка не найдена' })
    }
  }

  async createRequest(req, res) {
    try {
      const data = await requestService.createRequest(req.body)

      res.json(data)
    } catch (e) {
      res.status(400).json(e.message || { message: 'Заявка не создана' })
    }
  }

  async takeRequest(req, res) {
    try {
      const data = await requestService.takeRequest(req.body)

      res.json(data)
    } catch (e) {
      res
        .status(400)
        .json(e.message || { message: 'Невозможно взять эту заявку' })
    }
  }

  async placeRequestToAnotherSpecialist(req, res) {
    try {
      const data = await requestService.placeRequestToAnotherSpecialist(
        req.body
      )

      res.json(data)
    } catch (e) {
      res.status(400).json(
        e.message || {
          message: 'Невозможно передать эту заявку другому специалисту',
        }
      )
    }
  }

  async seeRequest(req, res) {
    try {
      const data = await requestService.seeRequest(req.body)

      res.json(data)
    } catch (e) {
      res.status(400).json(
        e.message || {
          message: 'Невозможно просмотреть заявку',
        }
      )
    }
  }

  async closeRequest(req, res) {
    try {
      const data = await requestService.closeRequest(req.body)

      res.json(data)
    } catch (e) {
      res.status(400).json(
        e.message || {
          message: 'Невозможно закрыть заявку',
        }
      )
    }
  }

  async openRequest(req, res) {
    try {
      const data = await requestService.openRequest(req.body)

      res.json(data)
    } catch (e) {
      res.status(400).json(
        e.message || {
          message: 'Невозможно открыть заявку',
        }
      )
    }
  }
}

const requestController = new RequestController()

module.exports = requestController
