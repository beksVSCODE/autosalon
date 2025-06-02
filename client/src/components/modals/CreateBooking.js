import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { createBooking } from '../../http/bookingAPI';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { observer } from 'mobx-react-lite';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';

const CreateBooking = observer(({ show, onHide, carId, carName }) => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('test_drive');
    const [date, setDate] = useState(new Date());
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

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
                date: format(date, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx'),
                comment
            };

            await createBooking(formData);
            setSuccess('Бронирование успешно создано!');
            setTimeout(() => {
                onHide();
                // Сброс формы
                setFullName('');
                setPhone('');
                setEmail('');
                setType('test_drive');
                setDate(new Date());
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

    // Фильтрация дат (минимум завтра, максимум через 30 дней)
    const filterDate = (date) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);

        return date >= tomorrow && date <= maxDate;
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
                        <Form.Label>Дата</Form.Label>
                        <div>
                            <DatePicker
                                selected={date}
                                onChange={date => setDate(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={60}
                                timeCaption="Время"
                                dateFormat="d MMMM yyyy, HH:mm"
                                filterDate={filterDate}
                                locale={ru}
                                className="form-control"
                                minDate={new Date()}
                            />
                        </div>
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
});

export default CreateBooking;
