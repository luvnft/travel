const Hotel = require('../models/Hotel');
const City = require('../models/City');

const getCities = async () => {
    try {
        const cities = await City.find();
        return cities;
    } catch (error) {
        throw new Error('Failed to fetch cities: ' + error.message);
    }
};


const createHotel = async (hotelData) => {
    const newHotel = new Hotel(hotelData);
    await newHotel.save();
    return newHotel;
};

const getHotels = async () => {
    const hotels = await Hotel.find();
    return hotels;
};

const getHotelById = async (id) => {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
        throw new Error('Hotel not found');
    }
    return hotel;
};

module.exports = {
    createHotel,
    getHotels,
    getHotelById,
    getCities
};
