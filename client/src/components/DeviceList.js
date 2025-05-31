import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import CarItem from "./DeviceItem"; // Переименуйте файл при необходимости

const CarList = observer(() => {
    const { device } = useContext(Context)

    return (
        <Row className="d-flex flex-wrap">
            {device.cars.map(car =>
                <CarItem key={car.id} car={car} />
            )}
            {device.cars.length === 0 && (
                <div className="w-100 text-center mt-3">
                    <p>Автомобили не найдены</p>
                </div>
            )}
        </Row>
    );
});

export default CarList;
