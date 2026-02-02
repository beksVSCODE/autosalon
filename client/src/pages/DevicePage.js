import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneCar } from "../http/deviceAPI";
import CreateBooking from '../components/modals/CreateBooking';
import { FiTrendingUp, FiTruck, FiPhone } from 'react-icons/fi';
import { MdDirectionsCar, MdColorLens, MdLocalGasStation } from 'react-icons/md';

const CarPage = () => {
    const [car, setCar] = useState({ features: [] })
    const [bookingVisible, setBookingVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams()

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchOneCar(id)
            .then(data => setCar(data))
            .catch(err => setError('Ошибка загрузки автомобиля'))
            .finally(() => setLoading(false));
    }, [id])

    if (loading) {
        return (
            <Container className="mt-3">
                <div className="text-center py-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                </div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-3">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </Container>
        );
    }

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
            <Container className="py-5">
                <Row className="g-4">
                    <Col md={6}>
                        <div className="card-modern p-3 mb-3" style={{ background: 'var(--bg-secondary)' }}>
                            <Image
                                width="100%"
                                height={400}
                                src={process.env.REACT_APP_API_URL + car.img}
                                style={{
                                    borderRadius: '12px',
                                    objectFit: 'cover'
                                }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                                }}
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-4">
                            <h1 className="heading-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                                {car.name || 'Загрузка...'}
                            </h1>
                            <div className="badge-modern mb-4" style={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                                color: 'white',
                                fontSize: '18px'
                            }}>
                                {car.year || ''}
                            </div>

                            <h2 className="text-gradient-primary mb-4" style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                                {car.price ? car.price.toLocaleString() : 0} ₽
                            </h2>

                            <div className="card-modern p-4 mb-4" style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                <h5 className="mb-3 fw-bold" style={{ color: 'var(--text-primary)' }}>Характеристики</h5>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <div className="d-flex align-items-center gap-2">
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--primary-light)'
                                            }}>
                                                <FiTrendingUp />
                                            </div>
                                            <div>
                                                <small className="text-secondary d-block">Пробег</small>
                                                <strong style={{ color: 'var(--text-primary)' }}>{car.mileage || 0} км</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center gap-2">
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--primary-light)'
                                            }}>
                                                <FiTruck />
                                            </div>
                                            <div>
                                                <small className="text-secondary d-block">Коробка</small>
                                                <strong style={{ color: 'var(--text-primary)' }}>{car.transmission || '-'}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center gap-2">
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--primary-light)'
                                            }}>
                                                <MdLocalGasStation />
                                            </div>
                                            <div>
                                                <small className="text-secondary d-block">Топливо</small>
                                                <strong style={{ color: 'var(--text-primary)' }}>{car.fuel || '-'}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="d-flex align-items-center gap-2">
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--primary-light)'
                                            }}>
                                                <MdColorLens />
                                            </div>
                                            <div>
                                                <small className="text-secondary d-block">Цвет</small>
                                                <strong style={{ color: 'var(--text-primary)' }}>{car.color || '-'}</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="d-flex align-items-center gap-2">
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'var(--primary-light)'
                                            }}>
                                                <MdDirectionsCar />
                                            </div>
                                            <div>
                                                <small className="text-secondary d-block">Двигатель</small>
                                                <strong style={{ color: 'var(--text-primary)' }}>{car.engine || '-'}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {car.description && (
                                <div className="mb-4">
                                    <h5 className="mb-2 fw-bold" style={{ color: 'var(--text-primary)' }}>Описание</h5>
                                    <p className="text-secondary">{car.description}</p>
                                </div>
                            )}

                            <div className="d-flex gap-3">
                                <Button className="btn-gradient-accent flex-grow-1">
                                    <FiPhone size={18} style={{ marginRight: '8px' }} />
                                    Связаться с продавцом
                                </Button>
                                <Button
                                    className="btn-gradient-primary"
                                    onClick={() => setBookingVisible(true)}
                                >
                                    <MdDirectionsCar size={18} style={{ marginRight: '8px' }} />
                                    Забронировать
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
                {car.features && car.features.length > 0 && (
                    <Row className="mt-5">
                        <Col>
                            <div className="card-modern p-4" style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                <h4 className="mb-4 fw-bold" style={{ color: 'var(--text-primary)' }}>Дополнительная информация</h4>
                                <Row className="g-3">
                                    {car.features.map((feature, idx) =>
                                        <Col md={6} key={feature.id || idx}>
                                            <div className="d-flex align-items-start gap-2">
                                                <span style={{
                                                    color: 'var(--primary-light)',
                                                    fontSize: '20px',
                                                    marginTop: '2px'
                                                }}>✓</span>
                                                <div>
                                                    <strong className="d-block" style={{ color: 'var(--text-primary)' }}>{feature.title}</strong>
                                                    <span className="text-secondary">{feature.value}</span>
                                                </div>
                                            </div>
                                        </Col>
                                    )}
                                </Row>
                            </div>
                        </Col>
                    </Row>
                )}

                <CreateBooking show={bookingVisible} onHide={() => setBookingVisible(false)} carId={id} carName={car.name} />
            </Container>
        </div>
    );
};

export default CarPage;
