import { $authHost, $host } from './index';

export const createBooking = async (bookingData) => {
    try {
        console.log('Начало процесса бронирования')
        console.log('Данные бронирования:', bookingData)
        const token = localStorage.getItem('token')
        console.log('Токен для бронирования:', token)

        const { data } = await $authHost.post('api/booking', bookingData)
        console.log('Ответ от сервера:', data)
        return data
    } catch (error) {
        console.error('Ошибка при бронировании:', error.response?.data || error.message)
        throw error
    }
};

export const deleteBooking = async (id) => {
    const { data } = await $host.delete(`api/booking/${id}`);
    return data;
};

export const fetchAllBookings = async () => {
    const { data } = await $host.get('api/booking');
    return data;
};

export const updateBookingStatus = async (id, status) => {
    const { data } = await $host.patch(`api/booking/${id}`, { status });
    return data;
};

export const fetchUserBookings = async () => {
    try {
        const { data } = await $authHost.get('api/booking/user');
        return data;
    } catch (error) {
        console.error('Ошибка при получении бронирований:', error);
        throw error;
    }
};
