import { $authHost } from './index';

export const createBooking = async (bookingData) => {
    try {
        const { data } = await $authHost.post('api/booking', bookingData)
        return data
    } catch (error) {
        throw error
    }
};

export const deleteBooking = async (id) => {
    const { data } = await $authHost.delete(`api/booking/${id}`);
    return data;
};

export const fetchAllBookings = async () => {
    const { data } = await $authHost.get('api/booking');
    return data;
};

export const updateBookingStatus = async (id, status) => {
    const { data } = await $authHost.patch(`api/booking/${id}`, { status });
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
