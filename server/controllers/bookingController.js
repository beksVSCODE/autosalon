const ApiError = require('../error/ApiError');
const { Booking, Car, User } = require('../models/models');

class BookingController {
    // Создать бронирование
    async create(req, res, next) {
        try {
            const { carId, full_name, phone, email, type, date, comment } = req.body;
            // userId обязателен, только для авторизованных
            if (!req.user || !req.user.id) {
                return next(ApiError.unauthorized('Требуется авторизация для бронирования'));
            }
            const userId = req.user.id;

            // Валидация
            if (!carId || !full_name || !phone || !email || !type || !date) {
                return next(ApiError.badRequest('Заполните все обязательные поля'));
            }
            if (!['test_drive', 'purchase'].includes(type)) {
                return next(ApiError.badRequest('Некорректный тип заявки'));
            }
            // Простейшая email/phone валидация
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                return next(ApiError.badRequest('Некорректный email'));
            }
            if (!/^\+?\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
                return next(ApiError.badRequest('Некорректный телефон'));
            }
            // Проверка существования авто
            const car = await Car.findByPk(carId);
            if (!car) return next(ApiError.badRequest('Автомобиль не найден'));

            const booking = await Booking.create({
                carId, userId, full_name, phone, email, type, date, comment
            });
            return res.json(booking);
        } catch (e) {
            next(ApiError.internal('Ошибка создания бронирования: ' + e.message));
        }
    }

    // Получить все бронирования (только для админа)
    async getAll(req, res, next) {
        try {
            const bookings = await Booking.findAll({
                include: [
                    { model: Car, attributes: ['id', 'name', 'price'] },
                    { model: User, attributes: ['id', 'email'] }
                ],
                order: [['date', 'DESC']]
            });
            return res.json(bookings);
        } catch (e) {
            next(ApiError.internal('Ошибка получения списка: ' + e.message));
        }
    }

    // Удалить бронирование (только для админа)
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const booking = await Booking.findByPk(id);
            if (!booking) return next(ApiError.badRequest('Бронирование не найдено'));
            await booking.destroy();
            return res.json({ message: 'Бронирование удалено' });
        } catch (e) {
            next(ApiError.internal('Ошибка удаления: ' + e.message));
        }
    }
}

module.exports = new BookingController();
