import { $authHost, $host } from './index';

export const createBooking = async (bookingData) => {
    const { data } = await $authHost.post('api/booking', bookingData);
    return data;
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
