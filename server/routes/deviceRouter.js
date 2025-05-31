const Router = require('express');
const router = new Router();
const carController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Добавить автомобиль (только для ADMIN)
router.post('/cars', checkRole('ADMIN'), carController.create);
// Получить все автомобили
router.get('/cars', carController.getAll);
// Получить один автомобиль по id
router.get('/cars/:id', carController.getOne);

module.exports = router;
