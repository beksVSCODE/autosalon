import React, { useEffect, useState } from 'react';
import { fetchFavorites, removeFromFavorites } from '../http/basketAPI';
import { Card, Row, Col, Image, Button } from 'react-bootstrap';

const Favorites = () => {
    const [cars, setCars] = useState([]);

    const loadFavorites = () => {
        fetchFavorites().then(data => setCars(data.cars || []));
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const handleRemove = async (carId) => {
        await removeFromFavorites(carId);
        loadFavorites();
    };

    return (
        <div>
            <h2>Избранные автомобили</h2>
            {cars.length === 0 ? (
                <div>Список избранного пуст</div>
            ) : (
                <Row>
                    {cars.map(car => (
                        <Col md={4} key={car.id} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Image width={100} src={process.env.REACT_APP_API_URL + car.img} rounded />
                                    <Card.Title>{car.name} ({car.year})</Card.Title>
                                    <Card.Text>Цена: {car.price} руб.</Card.Text>
                                    <Button variant="danger" size="sm" onClick={() => handleRemove(car.id)}>
                                        Удалить
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default Favorites;
