const { Favorite, FavoriteCar, Car } = require('../models/models');
const ApiError = require('../error/ApiError');

class FavoriteController {
    // Добавить автомобиль в избранное
    async addCar(req, res, next) {
        try {
            const userId = req.user.id;
            const { carId } = req.body;
            let favorite = await Favorite.findOne({ where: { userId } });
            if (!favorite) {
                favorite = await Favorite.create({ userId });
            }
            // Проверяем, есть ли уже такой автомобиль в избранном
            let favoriteCar = await FavoriteCar.findOne({ where: { favoriteId: favorite.id, carId } });
            if (favoriteCar) {
                return res.status(400).json({ message: 'Автомобиль уже в избранном' });
            }
            favoriteCar = await FavoriteCar.create({ favoriteId: favorite.id, carId });
            return res.json(favoriteCar);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Получить избранные автомобили
    async getFavorites(req, res, next) {
        try {
            const userId = req.user.id;
            const favorite = await Favorite.findOne({ where: { userId } });
            if (!favorite) {
                return res.json({ cars: [] });
            }
            const favoriteCars = await FavoriteCar.findAll({
                where: { favoriteId: favorite.id },
                include: [{ model: Car }]
            });
            // Формируем список автомобилей
            const cars = favoriteCars.map(fc => fc.car);
            return res.json({ cars });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    // Удалить автомобиль из избранного
    async removeCar(req, res, next) {
        try {
            const userId = req.user.id;
            const { carId } = req.body;
            const favorite = await Favorite.findOne({ where: { userId } });
            if (!favorite) {
                return res.status(404).json({ message: 'Избранное не найдено' });
            }
            const favoriteCar = await FavoriteCar.findOne({ where: { favoriteId: favorite.id, carId } });
            if (!favoriteCar) {
                return res.status(404).json({ message: 'Автомобиль не найден в избранном' });
            }
            await favoriteCar.destroy();
            return res.json({ message: 'Автомобиль удалён из избранного' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new FavoriteController();
