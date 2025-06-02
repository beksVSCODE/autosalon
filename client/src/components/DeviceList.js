import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import CarItem from "./DeviceItem"; // Переименуйте файл при необходимости

// Принимает проп 'cars' для поддержки фильтрации
const CarList = observer(({ cars }) => {
    const { device } = useContext(Context)
    const carsToShow = cars || device.cars;
    return (
        <Row className="d-flex flex-wrap">
            {carsToShow.map(car =>
                <CarItem key={car.id} car={car} />
            )}
            {carsToShow.length === 0 && (
                <div className="w-100 text-center mt-3">
                    <p>Автомобили не найдены</p>
                </div>
            )}
        </Row>
    );
});

export default CarList;
