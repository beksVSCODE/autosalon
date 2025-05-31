import React, { useContext } from 'react';
import { Card, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom"
import { DEVICE_ROUTE } from "../utils/consts";
import { Context } from '../index';
import star from '../assets/star.png'
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
        <Col md={4} className={"mt-3"} onClick={() => history.push(DEVICE_ROUTE + '/' + car.id)}>
            <Card style={{ width: 250, cursor: 'pointer' }} border={"light"}>
                <Image width={250} height={150} src={process.env.REACT_APP_API_URL + car.img} />
                <div className="mt-2">
                    <b>{car.name}</b> <span className="text-muted">({car.year})</span>
                </div>
                <div>Цена: <b>{car.price} ₽</b></div>
                <div>Пробег: {car.mileage} км</div>
                <div>Двигатель: {car.engine}</div>
                <div>Коробка: {car.transmission}</div>
                <div>Топливо: {car.fuel}</div>
                <div>Цвет: {car.color}</div>
                {user.isAuth && (
                    <Button variant="outline-success" size="sm" className="mt-2" onClick={handleAddToFavorite}>
                        В избранное
                    </Button>
                )}
            </Card>
        </Col>
    );
};

export default CarItem;
