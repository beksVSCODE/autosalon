require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models')

const migrate = async () => {
    try {
        // Удаляем все существующие таблицы с каскадным удалением
        await sequelize.query('DROP SCHEMA public CASCADE;')
        await sequelize.query('CREATE SCHEMA public;')
        console.log('Все таблицы удалены')

        // Создаем таблицы заново
        await sequelize.sync({ force: true })
        console.log('База данных успешно пересоздана')

        // Создаем тестовые данные
        // Типы кузова
        const sedan = await models.CarType.create({ name: 'Седан' })
        const suv = await models.CarType.create({ name: 'Внедорожник' })
        const hatchback = await models.CarType.create({ name: 'Хэтчбек' })

        // Бренды
        const toyota = await models.CarBrand.create({ name: 'Toyota' })
        const bmw = await models.CarBrand.create({ name: 'BMW' })
        const mercedes = await models.CarBrand.create({ name: 'Mercedes-Benz' })

        console.log('Тестовые данные успешно добавлены')

        process.exit(0)
    } catch (e) {
        console.error('Ошибка миграции:', e)
        process.exit(1)
    }
}

migrate()
