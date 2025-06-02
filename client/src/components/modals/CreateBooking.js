import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { createBooking } from '../../http/bookingAPI';

const CreateBooking = ({ show, onHide, carId, carName }) => {
    console.log('CreateBooking props inside:', { carId, carName, show });
    // Хуки только на верхнем уровне!
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('test_drive');
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Проверка props
    if (!carId || !carName) {
        return <div style={{ color: 'red', padding: 20 }}>Ошибка: не передан автомобиль для бронирования</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const formData = {
                carId,
                full_name: fullName,
                phone,
                email,
                type,
                date: date ? new Date(date).toISOString() : null,
                comment
            };
            await createBooking(formData);
            setSuccess('Бронирование успешно создано!');
            setTimeout(() => {
                onHide();
                setFullName('');
                setPhone('');
                setEmail('');
                setType('test_drive');
                setDate('');
                setComment('');
                setSuccess('');
            }, 2000);
        } catch (e) {
            const errorMessage = e.response && e.response.data ? e.response.data.message : 'Произошла ошибка при создании бронирования';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Бронирование {carName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>ФИО</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите ваше полное имя"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            type="tel"
                            placeholder="+7 (XXX) XXX-XX-XX"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="example@domain.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Тип заявки</Form.Label>
                        <Form.Select
                            value={type}
                            onChange={e => setType(e.target.value)}
                        >
                            <option value="test_drive">Тест-драйв</option>
                            <option value="purchase">Покупка</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Дата и время</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Комментарий (необязательно)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Дополнительная информация..."
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" onClick={onHide} className="me-2">
                            Отмена
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Отправка...' : 'Отправить заявку'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateBooking;
