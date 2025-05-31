import React, { useContext } from 'react';
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useHistory } from 'react-router-dom';

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const history = useHistory();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    // Встроенные стили
    const styles = {
        navbar: {
            background: '#0b1e33',
            paddingTop: '12px',
            paddingBottom: '12px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            zIndex: 999
        },
        brand: {
            color: '#e3e3e3',
            fontWeight: '700',
            fontSize: '1.6rem',
            textDecoration: 'none',
            letterSpacing: '1.5px',
            fontFamily: 'Poppins, sans-serif'
        },
        brandAccent: {
            color: '#4db8ff'
        },
        button: {
            background: 'linear-gradient(145deg, #1d3c5e, #254c73)',
            border: 'none',
            color: '#e3e3e3',
            fontWeight: 600,
            borderRadius: '50px',
            padding: '6px 20px',
            transition: '0.3s ease'
        },
        buttonHover: {
            background: '#4db8ff',
            color: '#000',
            boxShadow: '0 0 10px #4db8ff'
        },
        lightButton: {
            background: '#e3e3e3',
            color: '#0b1e33',
            fontWeight: 600,
            borderRadius: '50px',
            padding: '6px 20px',
            border: 'none',
            transition: '0.3s ease'
        },
        lightButtonHover: {
            background: '#ffffff',
            color: '#000',
            boxShadow: '0 0 10px rgba(227, 227, 227, 0.6)'
        }
    };

    // Обёртка для hover-эффектов
    const HoverButton = ({ children, onClick, light = false }) => {
        const [hover, setHover] = React.useState(false);
        const style = light
            ? { ...styles.lightButton, ...(hover ? styles.lightButtonHover : {}) }
            : { ...styles.button, ...(hover ? styles.buttonHover : {}) };

        return (
            <Button
                style={style}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={onClick}
            >
                {children}
            </Button>
        );
    };

    return (
        <Navbar expand="lg" className="shadow-sm" style={styles.navbar}>
            <Container>
                <NavLink to={SHOP_ROUTE} style={styles.brand}>
                    Car<span style={styles.brandAccent}>Net</span>
                </NavLink>
                <Navbar.Toggle aria-controls="navbar" className="border-0" />
                <Navbar.Collapse id="navbar" className="justify-content-end">
                    {user.isAuth ? (
                        <Nav className="align-items-center gap-3">
                            {user.user.role === 'ADMIN' && user.user.email === 'admin@gmail.com' && (
                                <HoverButton onClick={() => history.push(ADMIN_ROUTE)}>
                                    Админ
                                </HoverButton>
                            )}
                            <HoverButton onClick={logOut}>Выйти</HoverButton>
                            <HoverButton light onClick={() => history.push(BASKET_ROUTE)}>
                                🛒 Корзина
                            </HoverButton>
                        </Nav>
                    ) : (
                        <Nav>
                            <HoverButton onClick={() => history.push(LOGIN_ROUTE)}>Войти</HoverButton>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;
