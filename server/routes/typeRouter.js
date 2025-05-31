const Router = require('express');
const router = new Router();
const carTypeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Добавить тип автомобиля (только для ADMIN)
router.post('/', checkRole('ADMIN'), carTypeController.create);
// Получить все типы автомобилей
router.get('/', carTypeController.getAll);

module.exports = router;
