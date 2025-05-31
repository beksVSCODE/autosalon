import React, { useContext } from 'react';
import { Card, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { Context } from '../index';
import { addToFavorites } from '../http/basketAPI';

const CarItem = ({ car }) => {
    const history = useHistory();
    const { user } = useContext(Context);

    const handleAddToFavorite = async (e) => {
        e.stopPropagation();
        try {
            await addToFavorites(car.id);
            alert('Автомобиль добавлен в избранное!');
        } catch (err) {
            alert(err.response?.data?.message || 'Ошибка добавления в избранное');
        }
    };

    return (
        <Col md={4} className="mb-4">
            <Card
                className="h-100 border-0 shadow-sm rounded-4 car-card"
                style={{ cursor: 'pointer', transition: '0.3s ease' }}
                onClick={() => history.push(DEVICE_ROUTE + '/' + car.id)}
            >
                <div style={{ overflow: 'hidden', borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
                    <Image
                        src={process.env.REACT_APP_API_URL + car.img}
                        fluid
                        style={{ height: '180px', objectFit: 'cover', width: '100%' }}
                    />
                </div>
                <Card.Body>
                    <Card.Title className="fw-bold fs-5 mb-2">
                        {car.name} <span className="text-muted fs-6">({car.year})</span>
                    </Card.Title>
                    <Card.Text className="mb-1"><strong>Цена:</strong> {car.price.toLocaleString()} ₽</Card.Text>
                    <Card.Text className="mb-1"><strong>Пробег:</strong> {car.mileage} км</Card.Text>
                    <Card.Text className="mb-1"><strong>Двигатель:</strong> {car.engine}</Card.Text>
                    <Card.Text className="mb-1"><strong>Коробка:</strong> {car.transmission}</Card.Text>
                    <Card.Text className="mb-1"><strong>Топливо:</strong> {car.fuel}</Card.Text>
                    <Card.Text className="mb-3"><strong>Цвет:</strong> {car.color}</Card.Text>
                    {user.isAuth && (
                        <Button
                            variant="dark"
                            size="sm"
                            className="w-100"
                            onClick={handleAddToFavorite}
                        >
                            В избранное 
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CarItem;
