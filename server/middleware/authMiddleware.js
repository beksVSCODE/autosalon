const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return next(ApiError.unauthorized('Отсутствует токен авторизации'))
        }

        const token = authHeader.split(' ')[1] // Bearer token
        if (!token) {
            return next(ApiError.unauthorized('Некорректный формат токена'))
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded.id || !decoded.email) {
            return next(ApiError.unauthorized('Некорректный токен'))
        }

        req.user = decoded
        next()
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(ApiError.unauthorized('Недействительный токен'))
        }
        return next(ApiError.internal('Ошибка проверки авторизации'))
    }
};
