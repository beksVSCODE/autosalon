const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            return next()
        }
        try {
            const authHeader = req.headers.authorization
            if (!authHeader) {
                return res.status(401).json({ message: "Отсутствует токен авторизации" })
            }

            const token = authHeader.split(' ')[1] // Bearer asfasnfkajsfnjk
            if (!token) {
                return res.status(401).json({ message: "Некорректный токен авторизации" })
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (!decoded) {
                return res.status(401).json({ message: "Токен недействителен" })
            }

            if (decoded.role !== role) {
                return res.status(403).json({ message: "У вас нет прав для выполнения этого действия" })
            }

            req.user = decoded
            next()
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: "Недействительный токен" })
            }
            if (e instanceof jwt.TokenExpiredError) {
                return res.status(401).json({ message: "Срок действия токена истек" })
            }
            res.status(401).json({ message: "Ошибка авторизации" })
        }
    }
}



