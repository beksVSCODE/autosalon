const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Favorite } = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или password'))
            }

            // Проверка формата email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                return next(ApiError.badRequest('Некорректный формат email'))
            }

            // Проверка длины пароля
            if (password.length < 4) {
                return next(ApiError.badRequest('Пароль должен быть не менее 4 символов'))
            }

            const candidate = await User.findOne({ where: { email } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ email, role: 'USER', password: hashPassword })
            
            // Создаем список избранного для нового пользователя
            await Favorite.create({ userId: user.id })

            const token = generateJwt(user.id, user.email, user.role)
            return res.json({ token })
        } catch (error) {
            return next(ApiError.internal('Ошибка при регистрации: ' + error.message))
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body

            // Проверка на администратора
            if (email === 'admin@gmail.com' && password === 'admin') {
                // Ищем или создаем админа
                let adminUser = await User.findOne({ where: { email, role: 'ADMIN' } })
                if (!adminUser) {
                    const hashPassword = await bcrypt.hash(password, 5)
                    adminUser = await User.create({
                        email,
                        role: 'ADMIN',
                        password: hashPassword
                    })
                    // Создаем список избранного для админа
                    await Favorite.create({ userId: adminUser.id })
                }
                const token = generateJwt(adminUser.id, adminUser.email, adminUser.role)
                return res.json({ token })
            }

            // Обычный пользователь
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким email не найден'))
            }

            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Указан неверный пароль'))
            }

            const token = generateJwt(user.id, user.email, user.role)
            return res.json({ token })
        } catch (error) {
            return next(ApiError.internal('Ошибка при входе: ' + error.message))
        }
    }

    async check(req, res, next) {
        try {
            // Проверяем наличие пользователя
            const user = await User.findOne({ where: { id: req.user.id } })
            if (!user) {
                return next(ApiError.unauthorized('Пользователь не найден'))
            }

            const token = generateJwt(user.id, user.email, user.role)
            return res.json({ token })
        } catch (error) {
            return next(ApiError.internal('Ошибка при проверке авторизации: ' + error.message))
        }
    }
}

module.exports = new UserController()
