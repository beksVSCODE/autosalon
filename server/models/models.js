const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Favorite = sequelize.define('favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const FavoriteCar = sequelize.define('favorite_car', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Car = sequelize.define('car', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }, // Модель
    price: { type: DataTypes.INTEGER, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    mileage: { type: DataTypes.INTEGER, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    engine: { type: DataTypes.STRING, allowNull: false },
    transmission: { type: DataTypes.STRING, allowNull: false },
    fuel: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
})

const CarType = sequelize.define('car_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }, // Седан, внедорожник и т.д.
})

const CarBrand = sequelize.define('car_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const CarFeatures = sequelize.define('car_features', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: false },
})

const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Booking = sequelize.define('booking', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM('test_drive', 'purchase'), allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: true }
}, { timestamps: true });

User.hasOne(Favorite)
Favorite.belongsTo(User)

Favorite.hasMany(FavoriteCar)
FavoriteCar.belongsTo(Favorite)

CarType.hasMany(Car)
Car.belongsTo(CarType)

CarBrand.hasMany(Car)
Car.belongsTo(CarBrand)

Car.hasMany(FavoriteCar)
FavoriteCar.belongsTo(Car)

Car.hasMany(CarFeatures, { as: 'features' });
CarFeatures.belongsTo(Car)

CarType.belongsToMany(CarBrand, { through: TypeBrand })
CarBrand.belongsToMany(CarType, { through: TypeBrand })

User.hasMany(Booking);
Booking.belongsTo(User);
Car.hasMany(Booking);
Booking.belongsTo(Car);

module.exports = {
    User,
    Favorite,
    FavoriteCar,
    Car,
    CarType,
    CarBrand,
    CarFeatures,
    TypeBrand,
    Booking
}





