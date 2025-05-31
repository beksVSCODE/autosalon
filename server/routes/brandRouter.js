const Router = require('express');
const router = new Router();
const carBrandController = require('../controllers/brandController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Добавить бренд автомобиля (только для ADMIN)
router.post('/', checkRole('ADMIN'), carBrandController.create);
// Получить все бренды автомобилей
router.get('/', carBrandController.getAll);

module.exports = router;
