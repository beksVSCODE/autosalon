import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CarTypeBar from "../components/TypeBar";
import CarBrandBar from "../components/BrandBar";
import CarList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchCarBrands, fetchCars, fetchCarTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";
import { FiCheck, FiTrendingUp, FiShield } from 'react-icons/fi';
import { MdDirectionsCar } from 'react-icons/md';

const CarShop = observer(() => {
    const { device } = useContext(Context);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchCarTypes().then(data => device.setTypes(data));
        fetchCarBrands().then(data => device.setBrands(data));
        fetchCars(null, null, 1, 8).then(data => {
            device.setCars(data.rows);
            device.setTotalCount(data.count);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const typeId = device.selectedType?.id || null;
        const brandId = device.selectedBrand?.id || null;
        fetchCars(typeId, brandId, device.page, 8).then(data => {
            device.setCars(data.rows);
            device.setTotalCount(data.count);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [device.page, device.selectedType, device.selectedBrand]);

    // Фильтрация по поиску
    const filteredCars = device.cars.filter(car =>
        car.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
            {/* Hero секция с современным дизайном */}
            <section style={{
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                position: 'relative',
                overflow: 'hidden',
                padding: '140px 20px',
                textAlign: 'center'
            }}>
                {/* Декоративные элементы */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '50%',
                    filter: 'blur(80px)'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-30%',
                    left: '-5%',
                    width: '400px',
                    height: '400px',
                    background: 'rgba(59, 130, 246, 0.05)',
                    borderRadius: '50%',
                    filter: 'blur(60px)'
                }}></div>

                <div style={{ position: 'relative', zIndex: 1 }} className="animate-fade-in-up">
                    <h1 className="heading-xl text-white mb-4">
                        Найдите автомобиль<br />
                        <span style={{ color: '#f59e0b' }}>своей мечты</span>
                    </h1>
                    <p className="fs-4 text-white mb-5" style={{ opacity: 0.9 }}>
                        Премиум-качество • Доверие • Стиль
                    </p>
                    <Button
                        className="btn-gradient-accent px-5 py-3"
                        onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}
                    >
                        <MdDirectionsCar size={20} style={{ marginRight: '8px' }} />
                        Перейти к выбору
                    </Button>
                </div>
            </section>

            {/* О нас */}
            <section className="py-5" style={{ background: 'var(--bg-secondary)' }}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="mb-4 mb-md-0 animate-slide-in-left">
                            <div style={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                                padding: '40px',
                                borderRadius: '16px',
                                boxShadow: '0 20px 60px rgba(59, 130, 246, 0.25)'
                            }}>
                                <h1 className="display-1 text-white fw-bold mb-0">1000+</h1>
                                <p className="text-white fs-5 mb-0">Автомобилей в каталоге</p>
                            </div>
                        </Col>
                        <Col md={6} className="animate-slide-in-right">
                            <h2 className="heading-lg mb-4">
                                Почему <span className="text-gradient-primary">выбирают нас?</span>
                            </h2>
                            <p className="text-secondary fs-5 mb-4">
                                Мы стремимся предоставить только лучший опыт покупки автомобиля.
                                Наши специалисты отбирают только проверенные авто.
                            </p>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}><FiCheck size={24} /></div>
                                    <div>
                                        <h6 className="mb-0 fw-bold text-white">Индивидуальный подход</h6>
                                        <p className="mb-0 text-secondary small">к каждому клиенту</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}><FiTrendingUp size={24} /></div>
                                    <div>
                                        <h6 className="mb-0 fw-bold text-white">Прозрачная история</h6>
                                        <p className="mb-0 text-secondary small">всех автомобилей</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}><FiShield size={24} /></div>
                                    <div>
                                        <h6 className="mb-0 fw-bold text-white">Удобные способы оплаты</h6>
                                        <p className="mb-0 text-secondary small">и кредитования</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Каталог */}
            <Container className="py-5" id="catalog">
                <div className="text-center mb-5 animate-fade-in-up">
                    <h2 className="heading-lg mb-3">
                        Каталог <span className="text-gradient-primary">автомобилей</span>
                    </h2>
                    <p className="text-secondary fs-5 mb-4">Элегантность • Мощность • Комфорт</p>
                    {/* Поисковик */}
                    <div className="form-modern" style={{ maxWidth: '500px', margin: '0 auto' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="🔍 Поиск по названию..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <Row>
                    <Col md={3}>
                        <div className="card-modern p-4 mb-4">
                            <h5 className="mb-3 fw-bold text-uppercase" style={{ fontSize: '14px', letterSpacing: '1px', color: '#64748b' }}>
                                🚧 Тип кузова
                            </h5>
                            <CarTypeBar />
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="card-modern p-4 mb-4">
                            <h5 className="mb-3 fw-bold text-uppercase" style={{ fontSize: '14px', letterSpacing: '1px', color: '#64748b' }}>
                                🏭 Марка автомобиля
                            </h5>
                            <CarBrandBar />
                        </div>
                        <section className="mb-4">
                            <CarList cars={filteredCars} />
                        </section>
                        <div className="d-flex justify-content-center mt-4">
                            <Pages />
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Преимущества */}
            <section className="py-5" style={{ background: 'white' }}>
                <Container>
                    <Row className="text-center g-4">
                        <Col md={4}>
                            <div className="p-4 hover-lift">
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    fontSize: '40px',
                                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                                }}>🚗</div>
                                <h5 className="fw-bold mb-3">Более 1000 авто</h5>
                                <p className="text-secondary">Большой выбор от проверенных поставщиков</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="p-4 hover-lift">
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    fontSize: '40px',
                                    boxShadow: '0 10px 30px rgba(245, 87, 108, 0.3)'
                                }}>✅</div>
                                <h5 className="fw-bold mb-3">Гарантия качества</h5>
                                <p className="text-secondary">Только проверенные авто с историей</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="p-4 hover-lift">
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    fontSize: '40px',
                                    boxShadow: '0 10px 30px rgba(79, 172, 254, 0.3)'
                                }}>📞</div>
                                <h5 className="fw-bold mb-3">Поддержка 24/7</h5>
                                <p className="text-secondary">Консультации и помощь в любое время</p>
                            </div>
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
