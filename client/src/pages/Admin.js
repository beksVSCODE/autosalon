import React, { useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
        <Container className="py-5">
            <Card className="p-4 shadow-sm border-0">
                <h2 className="text-center mb-4">Панель администратора</h2>
                <Row className="g-3">
                    <Col xs={12} md={4}>
                        <Button
                            variant="primary"
                            className="w-100"
                            onClick={() => setTypeVisible(true)}
                        >
                            ➕ Добавить тип
                        </Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Button
                            variant="success"
                            className="w-100"
                            onClick={() => setBrandVisible(true)}
                        >
                            🏷️ Добавить бренд
                        </Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Button
                            variant="dark"
                            className="w-100"
                            onClick={() => setDeviceVisible(true)}
                        >
                            🚗 Добавить устройство
                        </Button>
                    </Col>
                </Row>
            </Card>

            {/* Модальные окна */}
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </Container>
    );
};

export default Admin;
