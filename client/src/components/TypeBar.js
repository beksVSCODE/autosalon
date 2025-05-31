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
                    style={{ cursor: 'pointer' }}
                    active={carType.id === device.selectedType.id}
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
