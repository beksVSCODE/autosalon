import { $authHost } from './index';

// Добавить автомобиль в избранное
export const addToFavorites = async (carId) => {
    const { data } = await $authHost.post('api/basket/add', { carId });
    return data;
};

// Получить избранные автомобили
export const fetchFavorites = async () => {
    const { data } = await $authHost.get('api/basket');
    return data;
};

// Удалить автомобиль из избранного
export const removeFromFavorites = async (carId) => {
    const { data } = await $authHost.delete('api/basket/remove', { data: { carId } });
    return data;
};
