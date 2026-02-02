import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import ListGroup from "react-bootstrap/ListGroup";

const CarTypeBar = observer(() => {
    const { device } = useContext(Context)
    return (
        <ListGroup>
            {device.types.map(carType =>
                <ListGroup.Item
                    style={{
                        cursor: 'pointer',
                        background: carType.id === device.selectedType?.id ? '#3b82f6' : 'var(--bg-secondary)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        color: carType.id === device.selectedType?.id ? 'white' : 'var(--text-primary)'
                    }}
                    active={carType.id === device.selectedType?.id}
                    onClick={() => device.setSelectedType(carType)}
                    key={carType.id}
                >
                    {carType.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default CarTypeBar;
