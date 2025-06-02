const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        console.log('AuthMiddleware: Проверка авторизации')
        console.log('Headers:', req.headers)

        const token = req.headers.authorization?.split(' ')[1]
        console.log('Полученный токен:', token)

        if (!token) {
            console.log('Токен отсутствует')
            return res.status(401).json({ message: "Не авторизован" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log('Декодированный токен:', decoded)

        if (!decoded.id) {
            console.log('Ошибка: токен не содержит id пользователя')
            return res.status(401).json({ message: "Некорректный токен" })
        }

        req.user = decoded
        console.log('Пользователь успешно авторизован:', { id: decoded.id, role: decoded.role })
        next()
    } catch (e) {
        console.error('Ошибка в authMiddleware:', e)
        if (e instanceof jwt.JsonWebTokenError) {
            console.log('Ошибка проверки токена:', e.message)
            return res.status(401).json({ message: "Недействительный токен" })
        }
        return res.status(401).json({ message: "Не авторизован" })
    }
}
