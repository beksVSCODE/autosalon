const uuid = require('uuid')
const path = require('path');
const { Car, CarType, CarBrand, CarFeatures } = require('../models/models')
const ApiError = require('../error/ApiError');

class CarController {
    async create(req, res, next) {
        try {
            let { name, price, year, mileage, color, engine, transmission, fuel, carBrandId, carTypeId, description, info } = req.body

            // Проверяем обязательные поля
            if (!name || !price || !year || !mileage || !color || !engine || !transmission || !fuel || !carBrandId || !carTypeId) {
                return next(ApiError.badRequest('Заполните все обязательные поля'))
            }

            // Проверяем наличие изображения
            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('Добавьте изображение автомобиля'))
            }

            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const car = await Car.create({ name, price, year, mileage, color, engine, transmission, fuel, carBrandId, carTypeId, description, img: fileName });

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    CarFeatures.create({
                        title: i.title,
                        value: i.description,
                        carId: car.id
                    })
                )
            }

            return res.json(car)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let { carBrandId, carTypeId, limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let cars;
        if (!carBrandId && !carTypeId) {
            cars = await Car.findAndCountAll({ limit, offset })
        }
        if (carBrandId && !carTypeId) {
            cars = await Car.findAndCountAll({ where: { carBrandId }, limit, offset })
        }
        if (!carBrandId && carTypeId) {
            cars = await Car.findAndCountAll({ where: { carTypeId }, limit, offset })
        }
        if (carBrandId && carTypeId) {
            cars = await Car.findAndCountAll({ where: { carTypeId, carBrandId }, limit, offset })
        }
        return res.json(cars)
    }

    async getOne(req, res) {
        const { id } = req.params
        const car = await Car.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            },
        )
        return res.json(car)
    }
}

module.exports = new CarController()
