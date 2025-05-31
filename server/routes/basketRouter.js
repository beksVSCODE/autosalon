const Router = require('express');
const router = new Router();
const favoriteController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');

// Добавить автомобиль в избранное (только авторизованный)
router.post('/add', authMiddleware, favoriteController.addCar);

// Получить избранные автомобили (только авторизованный)
router.get('/', authMiddleware, favoriteController.getFavorites);

// Удалить автомобиль из избранного (только авторизованный)
router.delete('/remove', authMiddleware, favoriteController.removeCar);

module.exports = router;
