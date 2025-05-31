import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
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
        <Container fluid className="bg-light py-5 px-4" style={{ minHeight: '100vh' }}>
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-dark">Каталог автомобилей</h1>
                <p className="text-secondary fs-5">
                    Элегантность. Мощность. Комфорт. Найдите свой идеальный автомобиль.
                </p>
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
    );
});

export default CarShop;
