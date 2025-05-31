import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";

const CarBrandBar = observer(() => {
    const { device } = useContext(Context)

    return (
        <Row className="d-flex">
            {device.brands.map(carBrand =>
                <Card
                    style={{ cursor: 'pointer' }}
                    key={carBrand.id}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(carBrand)}
                    border={carBrand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {carBrand.name}
                </Card>
            )}
        </Row>
    );
});

export default CarBrandBar;
