import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { createBooking } from '../../http/bookingAPI';
import { FiUser, FiPhone, FiMail, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { MdDirectionsCar } from 'react-icons/md';
import { Context } from '../../index';

const CreateBooking = ({ show, onHide, carId, carName }) => {
    const { user } = useContext(Context);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!carId) {
            setError('Ошибка: не выбран автомобиль');
            return;
        }

        setLoading(true);
        try {
            const formData = {
                carId: parseInt(carId),
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
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton style={{
                borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
                paddingBottom: '16px',
                background: 'var(--bg-secondary)'
            }}>
                <Modal.Title className="heading-md" style={{ color: 'var(--text-primary)' }}>
                    <MdDirectionsCar size={24} style={{ marginRight: '12px' }} />
                    Бронирование {carName || 'автомобиля'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{
                padding: '32px',
                background: 'var(--bg-secondary)'
            }}>
                {(!carId || !carName) && (
                    <div className="alert" style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#fca5a5',
                        border: 'none',
                        borderRadius: '12px'
                    }}>
                        Ошибка: не передан автомобиль для бронирования
                    </div>
                )}
                {error && (
                    <div className="alert" style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#fca5a5',
                        border: 'none',
                        borderRadius: '12px'
                    }}>
                        {error}
                    </div>
                )}
                {success && (
                    <div className="alert" style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#86efac',
                        border: 'none',
                        borderRadius: '12px'
                    }}>
                        ✅ {success}
                    </div>
                )}
                {!user.isAuth && (
                    <div className="alert" style={{
                        background: 'rgba(249, 115, 22, 0.1)',
                        color: '#fed7aa',
                        border: '1px solid rgba(249, 115, 22, 0.3)',
                        borderRadius: '12px',
                        padding: '20px'
                    }}>
                        <div style={{ marginBottom: '16px' }}>
                            <strong style={{ fontSize: '16px' }}>⚠️ Требуется авторизация</strong>
                        </div>
                        <p style={{ marginBottom: '16px', fontSize: '14px' }}>
                            Чтобы забронировать автомобиль, вам необходимо авторизоваться в системе. Это позволит нам связаться с вами и подтвердить бронирование.
                        </p>
                        <Button
                            className="btn-gradient-accent"
                            onClick={() => {
                                onHide();
                                window.location.href = '/login';
                            }}
                        >
                            Перейти к входу
                        </Button>
                    </div>
                )}
                {user.isAuth && (
                    <Form onSubmit={handleSubmit} className="form-modern">
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold text-secondary">
                                <FiUser size={16} style={{ marginRight: '6px' }} />
                                ФИО
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите ваше полное имя"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                required
                                style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold text-secondary">
                                <FiPhone size={16} style={{ marginRight: '6px' }} />
                                Телефон
                            </Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="+7 (XXX) XXX-XX-XX"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                required
                                style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold text-secondary">
                                <FiMail size={16} style={{ marginRight: '6px' }} />
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="example@domain.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold text-secondary">
                                <MdDirectionsCar size={16} style={{ marginRight: '6px' }} />
                                Тип заявки
                            </Form.Label>
                            <Form.Control
                                as="select"
                                value={type}
                                onChange={e => setType(e.target.value)}
                                style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                <option value="test_drive">Тест-драйв</option>
                                <option value="purchase">Покупка</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold text-secondary">
                                <FiCalendar size={16} style={{ marginRight: '6px' }} />
                                Дата и время
                            </Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                required
                                style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="fw-semibold text-secondary">
                                <FiMessageSquare size={16} style={{ marginRight: '6px' }} />
                                Комментарий (необязательно)
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder="Дополнительная информация..."
                                style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </Form.Group>
                        <div className="d-flex gap-3">
                            <Button
                                variant="outline-secondary"
                                onClick={onHide}
                                className="flex-grow-1"
                                style={{
                                    borderRadius: '12px',
                                    padding: '12px',
                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                    color: 'var(--text-secondary)'
                                }}
                            >
                                Отмена
                            </Button>
                            <Button
                                className="btn-gradient-primary flex-grow-1"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Отправка...' : 'Отправить заявку'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default CreateBooking;
