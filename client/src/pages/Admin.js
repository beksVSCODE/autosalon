import React, { useState, useContext, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import BookingList from '../components/BookingList';
import { Context } from '../index';
import { useHistory } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);
    const [error, setError] = useState('');
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
    }, [user, history]);

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
