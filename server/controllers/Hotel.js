const { getCities, createHotel, getHotels } = require('../services/Hotels');


const getCitiesController = async (req, res) => {
    try {
        const cities = await getCities();
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createHotelController = async (req, res) => {
    try {
        const hotelData = req.body;
        const newHotel = await createHotel(hotelData);
        res.json(newHotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getHotelsController = async (req, res) => {
    try {
        const hotels = await getHotels();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   


module.exports = {
    getCitiesController,
    createHotelController,
    getHotelsController
};


