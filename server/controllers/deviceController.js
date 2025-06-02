const uuid = require('uuid')
const path = require('path');
const { Car, CarType, CarBrand, CarFeatures } = require('../models/models')
const ApiError = require('../error/ApiError');

class CarController {
    async create(req, res, next) {
        try {
            let { name, price, year, mileage, color, engine, transmission, fuel, carBrandId, carTypeId, description, info } = req.body

            if (!name || !price || !year || !mileage || !color || !engine || !transmission || !fuel || !carBrandId || !carTypeId) {
                return next(ApiError.badRequest('Пожалуйста, заполните все обязательные поля'))
            }

            if (isNaN(price) || price <= 0) {
                return next(ApiError.badRequest('Некорректная цена'))
            }
            if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
                return next(ApiError.badRequest('Некорректный год выпуска'))
            }
            if (isNaN(mileage) || mileage < 0) {
                return next(ApiError.badRequest('Некорректный пробег'))
            }

            const type = await CarType.findByPk(carTypeId)
            if (!type) {
                return next(ApiError.badRequest('Указанный тип автомобиля не найден'))
            }

            const brand = await CarBrand.findByPk(carBrandId)
            if (!brand) {
                return next(ApiError.badRequest('Указанный бренд не найден'))
            }

            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('Добавьте изображение автомобиля'))
            }

            const { img } = req.files
            if (!img.mimetype.startsWith('image/')) {
                return next(ApiError.badRequest('Файл должен быть изображением'))
            }

            let fileName = uuid.v4() + ".jpg"
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const car = await Car.create({
                name,
                price,
                year,
                mileage,
                color,
                engine,
                transmission,
                fuel,
                carBrandId,
                carTypeId,
                description,
                img: fileName
            });

            if (info) {
                try {
                    info = JSON.parse(info)
                    if (Array.isArray(info)) {
                        await Promise.all(info.map(i =>
                            CarFeatures.create({
                                title: i.title,
                                value: i.description,
                                carId: car.id
                            })
                        ))
                    }
                } catch (e) {
                    console.error('Ошибка при добавлении характеристик:', e)
                }
            }

            const carWithFeatures = await Car.findOne({
                where: { id: car.id },
                include: [{ model: CarFeatures, as: 'features' }]
            })

            return res.json(carWithFeatures)
        } catch (e) {
            next(ApiError.internal('Произошла ошибка при добавлении автомобиля: ' + e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let { carBrandId, carTypeId, limit, page } = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            const whereClause = {}
            if (carBrandId) whereClause.carBrandId = carBrandId
            if (carTypeId) whereClause.carTypeId = carTypeId

            const cars = await Car.findAndCountAll({
                where: whereClause,
                limit,
                offset,
                include: [
                    { model: CarFeatures, as: 'features' },
                    { model: CarBrand },
                    { model: CarType }
                ],
                distinct: true
            })

            return res.json(cars)
        } catch (e) {
            next(ApiError.internal('Ошибка при получении списка автомобилей: ' + e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const car = await Car.findOne({
                where: { id },
                include: [
                    { model: CarFeatures, as: 'features' },
                    { model: CarBrand },
                    { model: CarType }
                ]
            })

            if (!car) {
                return next(ApiError.notFound('Автомобиль не найден'))
            }

            return res.json(car)
        } catch (e) {
            next(ApiError.internal('Ошибка при получении информации об автомобиле: ' + e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const car = await Car.findByPk(id);
            if (!car) return res.status(404).json({ message: 'Автомобиль не найден' });
            await car.destroy();
            return res.json({ message: 'Автомобиль удалён' });
        } catch (e) {
            next(ApiError.internal('Ошибка удаления автомобиля: ' + e.message));
        }
    }
}

module.exports = new CarController()
