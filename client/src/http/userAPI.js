import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    try {
        const { data } = await $host.post('api/user/registration', { email, password, role: 'USER' })
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (error) {
        if (error.response && error.response.data) {
            throw error;
        }
        throw new Error('Ошибка при регистрации. Попробуйте позже.');
    }
}

export const login = async (email, password) => {
    try {
        const { data } = await $host.post('api/user/login', { email, password })
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (error) {
        if (error.response && error.response.data) {
            throw error;
        }
        throw new Error('Ошибка при входе. Проверьте email и пароль.');
    }
}

export const check = async () => {
    try {
        const { data } = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    } catch (error) {
        if (error.response && error.response.data) {
            throw error;
        }
        throw new Error('Ошибка проверки авторизации.');
    }
}
