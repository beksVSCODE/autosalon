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
                    style={{
                        cursor: 'pointer',
                        background: carBrand.id === device.selectedBrand?.id ? '#3b82f6' : 'var(--bg-secondary)',
                        borderColor: carBrand.id === device.selectedBrand?.id ? '#3b82f6' : 'rgba(59, 130, 246, 0.2)',
                        color: carBrand.id === device.selectedBrand?.id ? 'white' : 'var(--text-primary)'
                    }}
                    key={carBrand.id}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(carBrand)}
                    border={carBrand.id === device.selectedBrand?.id ? 'primary' : 'light'}
                >
                    {carBrand.name}
                </Card>
            )}
        </Row>
    );
});

export default CarBrandBar;
