import { $authHost, $host } from "./index";

export const createCarType = async (carType) => {
    const { data } = await $authHost.post('api/type', carType)
    return data
}

export const fetchCarTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

export const createCarBrand = async (carBrand) => {
    const { data } = await $authHost.post('api/brand', carBrand)
    return data
}

export const fetchCarBrands = async () => {
    const { data } = await $host.get('api/brand')
    return data
}

export const createCar = async (car) => {
    const { data } = await $authHost.post('api/cars', car)
    return data
}

export const fetchCars = async (carTypeId, carBrandId, page, limit = 8) => {
    const { data } = await $host.get('api/cars', {
        params: {
            carTypeId, carBrandId, page, limit
        }
    })
    return data
}

export const fetchOneCar = async (id) => {
    const { data } = await $host.get(`api/cars/${id}`)
    return data
}
