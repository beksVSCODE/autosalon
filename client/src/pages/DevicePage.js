import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneCar } from "../http/deviceAPI";
import CreateBooking from '../components/modals/CreateBooking';

const CarPage = () => {
    const [car, setCar] = useState({ info: [] })
    const [bookingVisible, setBookingVisible] = useState(false);
    const { id } = useParams()
    useEffect(() => {
        fetchOneCar(id).then(data => setCar(data))
    }, [id])

    console.log('CreateBooking props:', { id, carName: car.name, bookingVisible });

    return (
        <Container className="mt-3">
            <Row>
                <Col md={5}>
                    <Image width={400} height={300} src={process.env.REACT_APP_API_URL + car.img} />
                </Col>
                <Col md={7}>
                    <h2>{car.name} <span className="text-muted">({car.year})</span></h2>
                    <div>Цена: <b>{car.price} ₽</b></div>
                    <div>Пробег: {car.mileage} км</div>
                    <div>Двигатель: {car.engine}</div>
                    <div>Коробка: {car.transmission}</div>
                    <div>Топливо: {car.fuel}</div>
                    <div>Цвет: {car.color}</div>
                    <div className="mt-3">{car.description}</div>
                    <Button variant={"outline-success"} className="mt-3">Добавить в избранное</Button>
                    <Button variant="outline-primary" className="mt-3 me-2" onClick={() => setBookingVisible(true)}>
                        Забронировать
                    </Button>
                    <CreateBooking show={bookingVisible} onHide={() => setBookingVisible(false)} carId={id} carName={car.name} />
                </Col>
            </Row>
            {car.info && car.info.length > 0 && (
                <Row className="d-flex flex-column mt-4">
                    <h4>Дополнительная информация:</h4>
                    {car.info.map((i, idx) =>
                        <div key={i.id || idx} className="mb-2">
                            <b>{i.title}:</b> {i.description}
                        </div>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default CarPage;
