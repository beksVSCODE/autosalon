const Router = require('express');
const router = new Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

// Создать бронирование (только для авторизованных)
router.post('/', authMiddleware, bookingController.create);
// Получить все бронирования (только для админа)
router.get('/', checkRole('ADMIN'), bookingController.getAll);
// Удалить бронирование (только для админа)
router.delete('/:id', checkRole('ADMIN'), bookingController.delete);

module.exports = router;
