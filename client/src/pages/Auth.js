import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { FiMail, FiLock } from 'react-icons/fi';
import { MdDirectionsCar } from 'react-icons/md';

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(String(email).toLowerCase())
    }

    const click = async () => {
        try {
            setError('')
            setLoading(true)

            if (!email || !password) {
                setError('Пожалуйста, заполните все поля')
                return
            }

            if (!validateEmail(email)) {
                setError('Пожалуйста, введите корректный email')
                return
            }

            if (!isLogin && password.length < 6) {
                setError('Пароль должен быть не менее 6 символов')
                return
            }

            const data = isLogin
                ? await login(email, password)
                : await registration(email, password)

            user.setUser(data.user)
            user.setIsAuth(true)
            localStorage.setItem('token', data.token)
            history.push(SHOP_ROUTE)

        } catch (e) {
            const errorMessage = e.response?.data?.message || e.message || 'Произошла ошибка при авторизации';
            setError(errorMessage);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Декоративные элементы */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '500px',
                height: '500px',
                background: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '50%',
                filter: 'blur(80px)'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'rgba(59, 130, 246, 0.05)',
                borderRadius: '50%',
                filter: 'blur(60px)'
            }}></div>
            
            <Card style={{
                width: '100%',
                maxWidth: '480px',
                padding: '48px',
                borderRadius: '16px',
                background: 'var(--bg-secondary)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
                position: 'relative',
                zIndex: 1
            }} className="animate-fade-in-up">
                <div className="text-center mb-4">
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        color: 'white',
                        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)'
                    }}>
                        <MdDirectionsCar size={40} />
                    </div>
                    <h2 className="heading-md mb-2" style={{ color: 'var(--text-primary)' }}>
                        {isLogin ? 'С возвращением!' : 'Создайте аккаунт'}
                    </h2>
                    <p className="text-secondary">
                        {isLogin ? 'Войдите, чтобы продолжить' : 'Присоединяйтесь к нам сегодня'}
                    </p>
                </div>
                
                <Form className="form-modern">
                    {error && (
                        <div className="alert alert-danger" style={{ 
                            borderRadius: '12px',
                            border: 'none',
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#fca5a5'
                        }}>
                            {error}
                        </div>
                    )}
                    
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold text-secondary" style={{ fontSize: '14px' }}>
                            <FiMail size={16} style={{marginRight: '6px'}} />
                            Email
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold text-secondary" style={{ fontSize: '14px' }}>
                            <FiLock size={16} style={{marginRight: '6px'}} />
                            Пароль
                        </Form.Label>
                        <Form.Control
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                color: 'var(--text-primary)'
                            }}
                        />
                    </Form.Group>

                    <Button
                        className="btn-gradient-primary w-100 mb-3"
                        onClick={click}
                        disabled={loading}
                        style={{ padding: '12px 24px', fontSize: '16px' }}
                    >
                        {loading ? (
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Загрузка...</span>
                                </div>
                                Загрузка...
                            </div>
                        ) : (
                            isLogin ? 'Войти' : 'Зарегистрироваться'
                        )}
                    </Button>

                    <div className="text-center">
                        <span className="text-secondary">
                            {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
                        </span>
                        <NavLink 
                            to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}
                            style={{
                                color: 'var(--primary-light)',
                                fontWeight: '600',
                                textDecoration: 'none'
                            }}
                        >
                            {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
                        </NavLink>
                    </div>
                </Form>
            </Card>
        </div>
    );
});

export default Auth;
