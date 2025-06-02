const ApiError = require('../error/ApiError');

module.exports = function (err, req, res, next) {
    console.error('Error:', err);

    // Если это наша кастомная ошибка API
    if (err instanceof ApiError) {
        return res.status(err.status).json({
            status: 'error',
            code: err.status,
            message: err.message
        })
    }

    // Если это ошибка валидации Sequelize
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Ошибка валидации данных',
            errors: err.errors.map(e => ({
                field: e.path,
                message: e.message
            }))
        })
    }

    // Если это ошибка уникального ограничения Sequelize
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Нарушение уникальности данных',
            errors: err.errors.map(e => ({
                field: e.path,
                message: e.message
            }))
        })
    }

    // Для всех остальных непредвиденных ошибок
    return res.status(500).json({
        status: 'error',
        code: 500,
        message: process.env.NODE_ENV === 'production'
            ? 'Внутренняя ошибка сервера'
            : (err.message || 'Непредвиденная ошибка!'),
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    })
}
