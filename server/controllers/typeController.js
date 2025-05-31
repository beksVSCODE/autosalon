const { CarType } = require('../models/models')
const ApiError = require('../error/ApiError');

class CarTypeController {
    async create(req, res) {
        const { name } = req.body
        const carType = await CarType.create({ name })
        return res.json(carType)
    }

    async getAll(req, res) {
        const carTypes = await CarType.findAll()
        return res.json(carTypes)
    }
}

module.exports = new CarTypeController()
