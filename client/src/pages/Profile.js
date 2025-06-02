import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Row, Col, Table, Badge } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchUserBookings } from '../http/bookingAPI';

const Profile = observer(() => {
    const { user } = useContext(Context);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserBookings()
            .then(data => {
                setBookings(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при загрузке бронирований:', error);
                setLoading(false);
            });
    }, []);

    const getStatusBadge = (status) => {
        const statusMap = {
            'pending': { variant: 'warning', text: 'Ожидает' },
            'confirmed': { variant: 'success', text: 'Подтверждено' },
            'cancelled': { variant: 'danger', text: 'Отменено' }
        };
        const statusInfo = statusMap[status] || { variant: 'secondary', text: 'Неизвестно' };
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

    if (loading) {
        return (
            <Container className="mt-4">
                <div className="text-center">Загрузка...</div>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Профиль</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong> {user.user.email}<br />
                                <strong>Роль:</strong> {user.user.role}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Мои бронирования</Card.Title>
                            {bookings.length > 0 ? (
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Автомобиль</th>
                                            <th>Дата</th>
                                            <th>Тип</th>
                                            <th>Статус</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map(booking => (
                                            <tr key={booking.id}>
                                                <td>{booking.car?.name || 'Н/Д'}</td>
                                                <td>{formatDate(booking.date)}</td>
                                                <td>
                                                    {booking.type === 'test_drive' ? 'Тест-драйв' : 'Покупка'}
                                                </td>
                                                <td>{getStatusBadge(booking.status)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <div className="text-center py-3">
                                    У вас пока нет бронирований
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default Profile;