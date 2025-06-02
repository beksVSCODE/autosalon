import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

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

            if (!isLogin && password.length < 4) {
                setError('Пароль должен быть не менее 4 символов')
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
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54, background: '#f0f2f5' }}
        >
            <Card style={{
                width: 500,
                padding: '40px',
                borderRadius: '16px',
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                border: 'none'
            }}>
                <h2 className="text-center mb-4" style={{
                    fontWeight: '600',
                    color: '#0b1e33',
                    fontFamily: 'Poppins, sans-serif'
                }}>
                    {isLogin ? 'Вход в аккаунт' : 'Создание аккаунта'}
                </h2>
                <Form className="d-flex flex-column">
                    <Form.Group className="mb-3">
                        <Form.Control
                            placeholder="Введите email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            isInvalid={error && email === ''}
                            style={{
                                borderRadius: '10px',
                                border: '1px solid #ced4da',
                                padding: '12px',
                                fontSize: '15px'
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Введите email
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            placeholder="Введите пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            isInvalid={error && password === ''}
                            style={{
                                borderRadius: '10px',
                                border: '1px solid #ced4da',
                                padding: '12px',
                                fontSize: '15px'
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Введите пароль
                        </Form.Control.Feedback>
                    </Form.Group>

                    {error && (
                        <div className="text-danger mb-3 text-center" style={{ fontSize: '14px' }}>
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={click}
                        disabled={loading}
                        style={{
                            background: '#0b5ed7',
                            border: 'none',
                            borderRadius: '50px',
                            padding: '10px 0',
                            fontWeight: 600,
                            fontSize: '16px',
                            transition: '0.3s ease'
                        }}
                    >
                        {loading
                            ? (isLogin ? 'Вход...' : 'Регистрация...')
                            : (isLogin ? 'Войти' : 'Зарегистрироваться')
                        }
                    </Button>

                    <div className="mt-3 text-center" style={{ fontSize: '14px' }}>
                        {isLogin
                            ? <>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink></>
                            : <>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></>
                        }
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
