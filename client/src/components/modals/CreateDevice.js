import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { createCar, fetchCarBrands, fetchCarTypes } from "../../http/deviceAPI";
import { observer } from "mobx-react-lite";

const CreateDevice = observer(({ show, onHide }) => {
    const { device } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [year, setYear] = useState('')
    const [mileage, setMileage] = useState(0)
    const [color, setColor] = useState('')
    const [engine, setEngine] = useState('')
    const [transmission, setTransmission] = useState('')
    const [fuel, setFuel] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchCarTypes().then(data => device.setTypes(data))
        fetchCarBrands().then(data => device.setBrands(data))
    }, [device])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = async () => {
        try {
            setLoading(true)
            // Проверяем обязательные поля
            if (!device.selectedType.id || !device.selectedBrand.id) {
                alert('Выберите тип кузова и марку автомобиля')
                return
            }
            if (!name || !price || !year || !mileage || !color || !engine || !transmission || !fuel) {
                alert('Заполните все обязательные поля')
                return
            }
            if (!file) {
                alert('Добавьте изображение автомобиля')
                return
            }

            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', `${price}`)
            formData.append('year', year)
            formData.append('mileage', `${mileage}`)
            formData.append('color', color)
            formData.append('engine', engine)
            formData.append('transmission', transmission)
            formData.append('fuel', fuel)
            formData.append('description', description)
            formData.append('img', file)
            formData.append('carBrandId', device.selectedBrand.id)
            formData.append('carTypeId', device.selectedType.id)
            formData.append('info', JSON.stringify(info))

            await createCar(formData)
            alert('Автомобиль успешно добавлен!')
            onHide()
            window.location.reload() // Обновляем страницу для отображения нового автомобиля
        } catch (e) {
            alert(e.response?.data?.message || 'Произошла ошибка при добавлении автомобиля')
        } finally {
            setLoading(false)
        }
    }

    return (
      <Modal show={show} onHide={onHide} centered size="lg">
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            🚗 Добавить автомобиль
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <h5 className="mb-3">Основная информация</h5>
            <Row className="g-3">
                <Col md={6}>
                    <Dropdown>
                        <Dropdown.Toggle className="w-100">
                            {device.selectedType.name || "Выберите тип кузова"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col md={6}>
                    <Dropdown>
                        <Dropdown.Toggle className="w-100">
                            {device.selectedBrand.name || "Выберите марку"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            <Row className="mt-3 g-3">
                <Col md={6}>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Модель (например, M5 Competition)"
                    />
                </Col>
                <Col md={6}>
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder="Цена (в сомах)"
                        type="number"
                    />
                </Col>
            </Row>

            <Row className="mt-3 g-3">
                <Col md={4}>
                    <Form.Control
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        placeholder="Год выпуска"
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        value={mileage}
                        onChange={e => setMileage(Number(e.target.value))}
                        placeholder="Пробег (км)"
                        type="number"
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        placeholder="Цвет"
                    />
                </Col>
            </Row>

            <Row className="mt-3 g-3">
                <Col md={4}>
                    <Form.Control
                        value={engine}
                        onChange={e => setEngine(e.target.value)}
                        placeholder="Двигатель"
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        value={transmission}
                        onChange={e => setTransmission(e.target.value)}
                        placeholder="Коробка передач"
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        value={fuel}
                        onChange={e => setFuel(e.target.value)}
                        placeholder="Топливо"
                    />
                </Col>
            </Row>

            <Form.Control
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="mt-3"
                placeholder="Описание автомобиля"
                as="textarea"
                rows={3}
            />

            <Form.Control
                className="mt-3"
                type="file"
                onChange={selectFile}
            />

            <hr />
            <h5 className="mb-2">Дополнительные свойства</h5>
            <Button
                variant="outline-secondary"
                className="mb-3"
                onClick={addInfo}
            >
                ➕ Добавить новое свойство
            </Button>

            {info.map(i =>
                <Row className="mb-3 g-3" key={i.number}>
                    <Col md={5}>
                        <Form.Control
                            value={i.title}
                            onChange={(e) => changeInfo('title', e.target.value, i.number)}
                            placeholder="Название свойства"
                        />
                    </Col>
                    <Col md={5}>
                        <Form.Control
                            value={i.description}
                            onChange={(e) => changeInfo('description', e.target.value, i.number)}
                            placeholder="Описание свойства"
                        />
                    </Col>
                    <Col md={2}>
                        <Button
                            onClick={() => removeInfo(i.number)}
                            variant="outline-danger"
                            className="w-100"
                        >
                            ✖
                        </Button>
                    </Col>
                </Row>
            )}
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
            Отмена
        </Button>
        <Button
            variant="success"
            onClick={addDevice}
            disabled={loading}
        >
            {loading ? 'Добавление...' : 'Добавить автомобиль'}
        </Button>
    </Modal.Footer>
</Modal>

    );
});

export default CreateDevice;
