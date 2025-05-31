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
        <div className="bg-light text-dark py-5 px-4" style={{ minHeight: '100vh' }}>
            <div className="text-center mb-5">
                <h2 className="fw-bold">⭐ Избранные автомобили</h2>
                <p className="text-muted">Ваш персональный список избранного</p>
                <hr className="w-25 mx-auto" />
            </div>
            {cars.length === 0 ? (
                <div className="text-center text-muted fs-5">Список избранного пуст</div>
            ) : (
                <Row className="g-4">
                    {cars.map(car => (
                        <Col md={4} key={car.id}>
                            <Card className="h-100 shadow-sm border-0 rounded-4">
                                <div className="p-2">
                                    <Image
                                        src={process.env.REACT_APP_API_URL + car.img}
                                        fluid
                                        rounded
                                        className="w-100"
                                        style={{ height: 180, objectFit: 'cover' }}
                                    />
                                </div>
                                <Card.Body>
                                    <Card.Title className="fw-semibold fs-5 mb-2">
                                        {car.name} <span className="text-muted fs-6">({car.year})</span>
                                    </Card.Title>
                                    <Card.Text className="mb-2">
                                        💰 <strong>{car.price.toLocaleString()} ₽</strong>
                                    </Card.Text>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="w-100"
                                        onClick={() => handleRemove(car.id)}
                                    >
                                        Удалить из избранного
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
