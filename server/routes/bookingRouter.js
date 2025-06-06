const Router = require('express');
const router = new Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

// Создать бронирование (только для авторизованных пользователей)
router.post('/', authMiddleware, bookingController.create);
// Получить все бронирования (только для админа)
router.get('/', checkRole('ADMIN'), bookingController.getAll);
// Удалить бронирование (только для админа)
router.delete('/:id', checkRole('ADMIN'), bookingController.delete);
// Получить бронирования пользователя (для авторизованных пользователей)
router.get('/user', authMiddleware, bookingController.getUserBookings);
// Обновить статус бронирования (только для админа)
router.patch('/:id', checkRole('ADMIN'), bookingController.updateStatus);

module.exports = router;
