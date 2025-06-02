import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Table, Alert } from 'react-bootstrap';
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import BookingList from '../components/BookingList';
import { Context } from '../index';
import { useHistory } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import { $authHost } from '../http';

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [error, setError] = useState('');
    const [cars, setCars] = useState([]);
    const [carError, setCarError] = useState('');
    const { user } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Отсутствует токен авторизации');
            setTimeout(() => history.push(SHOP_ROUTE), 2000);
            return;
        }
        if (!user.isAuth || user.user.role !== 'ADMIN') {
            setError('Доступ запрещен: только для администратора');
            setTimeout(() => history.push(SHOP_ROUTE), 2000);
            return;
        }
        fetchCars();
    }, [user, history]);

    const fetchCars = async () => {
        try {
            const { data } = await $authHost.get('api/cars'); // исправлено с api/device на api/cars
            setCars(data.rows || data); // поддержка пагинации и обычного массива
        } catch (e) {
            setCarError('Ошибка при загрузке автомобилей');
        }
    };

    const handleDeleteCar = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить этот автомобиль?')) return;
        try {
            await $authHost.delete(`api/cars/${id}`); // исправлено с api/device на api/cars
            setCars(cars.filter(car => car.id !== id));
        } catch (e) {
            setCarError('Ошибка при удалении автомобиля');
        }
    };

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger" className="text-center">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Card className="p-4 shadow-sm border-0 mb-4">
                <h2 className="text-center mb-4">Панель администратора</h2>
                <Row className="g-3 mb-4">
                    <Col xs={12} md={4}>
                        <Button
                            variant="primary"
                            className="w-100"
                            onClick={() => setTypeVisible(true)}
                        >
                            ➕ Добавить тип
                        </Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Button
                            variant="success"
                            className="w-100"
                            onClick={() => setBrandVisible(true)}
                        >
                            🏷️ Добавить бренд
                        </Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Button
                            variant="dark"
                            className="w-100"
                            onClick={() => setDeviceVisible(true)}
                        >
                            🚗 Добавить устройство
                        </Button>
                    </Col>
                </Row>
                {/* Таблица автомобилей */}
                <h4 className="mt-4 mb-3">Опубликованные автомобили</h4>
                {carError && <Alert variant="danger">{carError}</Alert>}
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Цена</th>
                            <th>Год</th>
                            <th>Пробег</th>
                            <th>Цвет</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.name}</td>
                                <td>{car.price}</td>
                                <td>{car.year}</td>
                                <td>{car.mileage}</td>
                                <td>{car.color}</td>
                                <td>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteCar(car.id)}>
                                        Удалить
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <BookingList />
            </Card>
            {/* Модальные окна */}
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </Container>
    );
};

export default Admin;
