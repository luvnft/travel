const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: 'IRzZGIP6Cpofb1JALx9idthdO6UZJmH7',
  clientSecret: '6ajvPXZG4uOrgg24'
});


async function hotelSearch({ cityCode }) {
  try {
    if (!cityCode) {
      throw new Error("Missing required search parameters.");
    }

    const response = await amadeus.referenceData.locations.hotels.byCity.get({
      cityCode,
    });

    return JSON.parse(response.body);
  } catch (error) {
    throw error;
  }
}

async function getHotelOfferDetails(offerId) {
  try {
    if (!offerId) {
      throw new Error("Offer ID is required to fetch hotel offer details.");
    }

    const response = await amadeus.shopping.hotelOffersSearch.get(
      {
        hotelIds: 'RTPAR001',
        adults: '2'
      }
    );

    return JSON.parse(response.body);
  } catch (error) {
    console.error(`Error fetching hotel offer details for offer ID ${offerId}:`, error);
    throw error; 
  }
}


module.exports = {
  hotelSearch,
  getHotelOfferDetails,

};


