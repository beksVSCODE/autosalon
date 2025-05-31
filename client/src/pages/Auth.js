import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
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

            // Валидация полей
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

            user.setUser(data)
            user.setIsAuth(true)
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
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Group className="mt-3">
                        <Form.Control
                            placeholder="Введите ваш email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            isInvalid={error && email === ''}
                        />
                        <Form.Control.Feedback type="invalid">
                            Введите email
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Control
                            placeholder="Введите ваш пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            isInvalid={error && password === ''}
                        />
                        <Form.Control.Feedback type="invalid">
                            Введите пароль
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        {error && (
                            <div className="text-danger mb-3">
                                {error}
                            </div>
                        )}
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                            disabled={loading}
                        >
                            {loading
                                ? (isLogin ? 'Вход...' : 'Регистрация...')
                                : (isLogin ? 'Войти' : 'Зарегистрироваться')
                            }
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
