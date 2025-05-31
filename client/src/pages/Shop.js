import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CarTypeBar from "../components/TypeBar";
import CarBrandBar from "../components/BrandBar";
import CarList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchCarBrands, fetchCars, fetchCarTypes } from "../http/deviceAPI";
import Pages from "../components/Pages";

const CarShop = observer(() => {
    const { device } = useContext(Context)

    useEffect(() => {
        // Загружаем типы и бренды автомобилей при монтировании компонента
        fetchCarTypes().then(data => device.setTypes(data))
        fetchCarBrands().then(data => device.setBrands(data))
        fetchCars(null, null, 1, 8).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device])

    useEffect(() => {
        // Обновляем список автомобилей при изменении фильтров или страницы
        const typeId = device.selectedType?.id || null
        const brandId = device.selectedBrand?.id || null
        fetchCars(typeId, brandId, device.page, 8).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand, device])

    return (
        <Container>
            <h2 className="mt-3 mb-4">Каталог автомобилей</h2>
            <Row className="mt-2">
                <Col md={3}>
                    <CarTypeBar />
                </Col>
                <Col md={9}>
                    <CarBrandBar />
                    <CarList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
});

export default CarShop;
