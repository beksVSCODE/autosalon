import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CarTypeBar from "../components/TypeBar";
import CarBrandBar from "../components/BrandBar";
import CarList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchCarBrands, fetchCars, fetchCarTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";

const CarShop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchCarTypes().then(data => device.setTypes(data));
        fetchCarBrands().then(data => device.setBrands(data));
        fetchCars(null, null, 1, 8).then(data => {
            device.setCars(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device]);

    useEffect(() => {
        const typeId = device.selectedType?.id || null;
        const brandId = device.selectedBrand?.id || null;
        fetchCars(typeId, brandId, device.page, 8).then(data => {
            device.setCars(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.page, device.selectedType, device.selectedBrand, device]);

    return (
        <div style={{ backgroundColor: '#f4f4f4' }}>
            {/* Hero секция */}
            <section style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1500&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                padding: '120px 20px',
                textAlign: 'center'
            }}>
                <h1 className="display-3 fw-bold">Найдите автомобиль своей мечты</h1>
                <p className="fs-4 mt-3">Премиум-качество. Доверие. Стиль.</p>
                <Button variant="light" size="lg" className="mt-4 px-4 py-2 rounded-pill fw-semibold">
                    Перейти к выбору
                </Button>
            </section>

            {/* О нас */}
            <section className="py-5 bg-white">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="mb-4 mb-md-0">
                            <img src="../assets/about.png" alt="О нас" className="img-fluid rounded-4 shadow" />
                        </Col>
                        <Col md={6}>
                            <h2 className="fw-bold mb-3">Почему выбирают нас?</h2>
                            <p className="text-muted">Мы стремимся предоставить только лучший опыт покупки автомобиля. Наши специалисты отбирают только проверенные авто, предлагая честные цены и качественный сервис.</p>
                            <ul className="text-muted list-unstyled mt-4">
                                <li>✓ Индивидуальный подход к каждому клиенту</li>
                                <li>✓ Прозрачная история автомобилей</li>
                                <li>✓ Удобные способы оплаты и кредитования</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Каталог */}
            <Container className="py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark">Каталог автомобилей</h2>
                    <p className="text-secondary fs-5">Элегантность. Мощность. Комфорт.</p>
                    <hr className="mx-auto" style={{ width: '100px', borderTop: '2px solid #000' }} />
                </div>

                <Row>
                    <Col md={3}>
                        <Card className="p-3 mb-4 shadow-sm border-0 bg-white rounded-4">
                            <h5 className="mb-3 fw-semibold text-uppercase text-dark">Тип кузова</h5>
                            <CarTypeBar />
                        </Card>
                    </Col>
                    <Col md={9}>
                        <Card className="p-3 mb-4 shadow-sm border-0 bg-white rounded-4">
                            <h5 className="mb-3 fw-semibold text-uppercase text-dark">Марка автомобиля</h5>
                            <CarBrandBar />
                        </Card>

                        <section className="mb-4">
                            <CarList />
                        </section>

                        <div className="d-flex justify-content-center mt-4">
                            <Pages />
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Преимущества */}
            <section className="py-5" style={{ backgroundColor: '#fff' }}>
                <Container>
                    <Row className="text-center">
                        <Col md={4} className="mb-4">
                            <h5 className="fw-bold mb-2">Более 1000 авто</h5>
                            <p className="text-muted">Большой выбор от проверенных поставщиков</p>
                        </Col>
                        <Col md={4} className="mb-4">
                            <h5 className="fw-bold mb-2">Гарантия качества</h5>
                            <p className="text-muted">Только проверенные авто с историей</p>
                        </Col>
                        <Col md={4} className="mb-4">
                            <h5 className="fw-bold mb-2">Поддержка 24/7</h5>
                            <p className="text-muted">Консультации и помощь в любое время</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Отзывы */}
            <section className="py-5 bg-dark text-white">
                <Container>
                    <h4 className="text-center mb-4">Отзывы наших клиентов</h4>
                    <Row>
                        <Col md={4}>
                            <Card className="bg-secondary text-white p-3 border-0 rounded-4 mb-3">
                                <p>“Быстро нашёл авто, поддержка помогла с оформлением. Крутой сервис!”</p>
                                <h6 className="mt-3">— Иван, Алматы</h6>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="bg-secondary text-white p-3 border-0 rounded-4 mb-3">
                                <p>“Сайт шикарный! Всё удобно, красиво и понятно.”</p>
                                <h6 className="mt-3">— Алия, Бишкек</h6>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="bg-secondary text-white p-3 border-0 rounded-4 mb-3">
                                <p>“Понравился стиль сайта, сразу видно — премиум уровень.”</p>
                                <h6 className="mt-3">— Тимур, Ташкент</h6>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Контактная информация */}
            <section className="py-5 bg-light">
                <Container>
                    <Row>
                        <Col md={6}>
                            <h4 className="fw-bold mb-3">Свяжитесь с нами</h4>
                            <p className="text-muted">Если у вас есть вопросы, мы всегда готовы помочь:</p>
                            <ul className="list-unstyled text-muted">
                                <li>Email: support@carshop.kz</li>
                                <li>Телефон: +7 (700) 123-45-67</li>
                                <li>Адрес: г. Бишкек, ул. Центральная, 10</li>
                            </ul>
                        </Col>
                        <Col md={6}>
                            <iframe
                                title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2922.486738991629!2d74.5944214764929!3d42.87615250354471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec8190fc7555b%3A0x838a64b78e69f927!2z0JHQtdC70YzQvdC40LrQsA!5e0!3m2!1sru!2skg!4v1680800000000!5m2!1sru!2skg"
                                width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy">
                            </iframe>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Футер */}
            <footer className="bg-black text-white py-4">
                <Container className="text-center">
                    <p className="mb-0">© 2025 КупиДевайс. Все права защищены.</p>
                </Container>
            </footer>
        </div>
    );
});

export default CarShop;
