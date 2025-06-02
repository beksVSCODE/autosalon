const Router = require('express');
const router = new Router();
const carController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');

// Добавить автомобиль (только для ADMIN)
router.post('/', checkRole('ADMIN'), carController.create);
// Получить все автомобили
router.get('/', carController.getAll);
// Получить один автомобиль по id
router.get('/:id', carController.getOne);
// Удалить автомобиль (только для ADMIN)
router.delete('/:id', checkRole('ADMIN'), carController.delete);

module.exports = router;
