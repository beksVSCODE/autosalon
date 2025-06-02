import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await check()
                user.setUser(data.user)
                user.setIsAuth(true)
                localStorage.setItem('token', data.token)
            } catch (error) {
                user.setUser({})
                user.setIsAuth(false)
                localStorage.removeItem('token')
                console.log('Ошибка авторизации:', error.message)
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [user])

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
