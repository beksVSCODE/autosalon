import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Badge, Dropdown } from 'react-bootstrap';
import { fetchAllBookings, deleteBooking, updateBookingStatus } from '../http/bookingAPI';
import { observer } from 'mobx-react-lite';

const BookingList = observer(() => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await fetchAllBookings();
            setBookings(data);
        } catch (e) {
            setError(e.response?.data?.message || 'Ошибка при загрузке бронирований');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить это бронирование?')) {
            try {
                await deleteBooking(id);
                setBookings(bookings.filter(booking => booking.id !== id));
            } catch (e) {
                setError(e.response?.data?.message || 'Ошибка при удалении бронирования');
            }
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateBookingStatus(id, newStatus);
            setBookings(bookings.map(booking =>
                booking.id === id ? { ...booking, status: newStatus } : booking
            ));
        } catch (e) {
            setError(e.response?.data?.message || 'Ошибка при обновлении статуса');
        }
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'pending': { variant: 'warning', text: 'Ожидает' },
            'confirmed': { variant: 'success', text: 'Подтверждено' },
            'cancelled': { variant: 'danger', text: 'Отменено' }
        };
        const statusInfo = statusMap[status] || { variant: 'secondary', text: status };
        return <Badge bg={statusInfo.variant}>{statusInfo.text}</Badge>;
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    };

    if (loading) return <div className="text-center mt-5">Загрузка...</div>;
    if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

    return (
        <Container className="mt-4">
            <h3 className="mb-4">Список бронирований</h3>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Автомобиль</th>
                        <th>Клиент</th>
                        <th>Контакты</th>
                        <th>Тип</th>
                        <th>Дата</th>
                        <th>Статус</th>
                        <th>Комментарий</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.car?.name || 'Н/Д'}</td>
                            <td>{booking.full_name}</td>
                            <td>
                                <div>{booking.phone}</div>
                                <div className="text-muted">{booking.email}</div>
                            </td>
                            <td>
                                {booking.type === 'test_drive' ? 'Тест-драйв' : 'Покупка'}
                            </td>
                            <td>{formatDate(booking.date)}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" size="sm">
                                        {getStatusBadge(booking.status)}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => handleStatusUpdate(booking.id, 'pending')}
                                        >
                                            {getStatusBadge('pending')}
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                        >
                                            {getStatusBadge('confirmed')}
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                        >
                                            {getStatusBadge('cancelled')}
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                            <td>{booking.comment || '-'}</td>
                            <td>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(booking.id)}
                                >
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {bookings.length === 0 && (
                <div className="text-center mt-3">Бронирований пока нет</div>
            )}
        </Container>
    );
});

export default BookingList;
