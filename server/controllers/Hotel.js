const { hotelSearch, getHotelOfferDetails } = require('../services/Hotels');



const getHotelController = async (req, res) => {
    try {
        const searchParams = {
            cityCode: req.query.cityCode,
        };

        const hotels = await hotelSearch(searchParams);
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getHotelOfferDetailsController = async (req, res) => {
    try {
        const { offerId } = req.params;
        const offerDetails = await getHotelOfferDetails(offerId);
        res.json(offerDetails);
    } catch (error) {
        console.error(`Error in getHotelOfferDetailsController: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getHotelController,
    getHotelOfferDetailsController,
};


