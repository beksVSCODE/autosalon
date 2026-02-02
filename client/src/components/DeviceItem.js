import React, { useContext } from 'react';
import { Card, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { Context } from '../index';
import { addToFavorites } from '../http/basketAPI';
import { FiHeart, FiTrendingUp, FiTruck } from 'react-icons/fi';
import { MdColorLens } from 'react-icons/md';

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
                className="card-modern h-100"
                style={{
                    cursor: 'pointer',
                    background: 'var(--bg-secondary)',
                    border: '1px solid rgba(59, 130, 246, 0.1)'
                }}
                onClick={() => history.push(DEVICE_ROUTE + '/' + car.id)}
            >
                <div style={{
                    overflow: 'hidden',
                    position: 'relative',
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px'
                }}>
                    <Image
                        src={process.env.REACT_APP_API_URL + car.img}
                        fluid
                        style={{
                            height: '220px',
                            objectFit: 'cover',
                            width: '100%',
                            transition: 'transform 0.3s ease'
                        }}
                        className="hover-lift"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                    />
                    {/* Градиентный оверлей */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '100px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)'
                    }}></div>

                    {/* Badge с годом */}
                    <div className="badge-modern" style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'rgba(59, 130, 246, 0.9)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        padding: '8px 16px',
                        fontWeight: '700'
                    }}>
                        {car.year}
                    </div>
                </div>
                <Card.Body className="p-4">
                    <Card.Title className="fw-bold mb-3" style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                        {car.name}
                    </Card.Title>

                    {/* Цена с градиентом */}
                    <div className="mb-3">
                        <h4 className="text-gradient-primary fw-bold mb-0">
                            {car.price ? car.price.toLocaleString() : 0} ₽
                        </h4>
                    </div>

                    {/* Характеристики в виде тегов */}
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <span className="badge-modern" style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: 'var(--primary-light)',
                            fontSize: '12px'
                        }}>
                            <FiTrendingUp size={14} style={{ marginRight: '4px' }} />
                            {car.mileage || 0} км
                        </span>
                        <span className="badge-modern" style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: 'var(--primary-light)',
                            fontSize: '12px'
                        }}>
                            <FiTrendingUp size={14} style={{ marginRight: '4px' }} />
                            {car.mileage || 0} км
                        </span>
                        <span className="badge-modern" style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: 'var(--primary-light)',
                            fontSize: '12px'
                        }}>
                            <FiTruck size={14} style={{ marginRight: '4px' }} />
                            {car.transmission}
                        </span>
                        <span className="badge-modern" style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: 'var(--primary-light)',
                            fontSize: '12px'
                        }}>
                            <MdColorLens size={14} style={{ marginRight: '4px' }} />
                            {car.fuel}
                        </span>
                    </div>

                    <div className="d-flex gap-2">
                        <Button
                            className="btn-gradient-primary flex-grow-1"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                history.push(DEVICE_ROUTE + '/' + car.id);
                            }}
                        >
                            Подробнее
                        </Button>
                        {user.isAuth && (
                            <Button
                                className="btn-gradient-accent"
                                size="sm"
                                onClick={handleAddToFavorite}
                                style={{
                                    borderRadius: '50%',
                                    width: '38px',
                                    height: '38px',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 'none'
                                }}
                            >
                                <FiHeart size={18} />
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default CarItem;
