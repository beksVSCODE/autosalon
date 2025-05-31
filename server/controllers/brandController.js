const { CarBrand } = require('../models/models')
const ApiError = require('../error/ApiError');

class CarBrandController {
    async create(req, res) {
        const { name } = req.body
        const carBrand = await CarBrand.create({ name })
        return res.json(carBrand)
    }

    async getAll(req, res) {
        const carBrands = await CarBrand.findAll()
        return res.json(carBrands)
    }
}

module.exports = new CarBrandController()
