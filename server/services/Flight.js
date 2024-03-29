// Import the Amadeus SDK
const Amadeus = require("amadeus");
const countriesList = require('countries-list');
const fetch = require('node-fetch'); 
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

const amadeus = new Amadeus({
  clientId: 'IRzZGIP6Cpofb1JALx9idthdO6UZJmH7',
  clientSecret: '6ajvPXZG4uOrgg24'
});

const getCountryName = (code) => {
  const country = countriesList.countries[code];
  return country ? country.name : code;
};

const parseDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  let minutes = 0;
  if (match[1]) minutes += parseInt(match[1], 10) * 60;
  if (match[2]) minutes += parseInt(match[2], 10);
  return minutes;
};

const autocompleteLocations = async (keyword) => {
  try {
    if (!keyword) {
      throw new Error("Keyword is required for the autocomplete service.");
    }

    

    const response = await amadeus.referenceData.locations.get({
      keyword: keyword,
      subType: "ANY",
    });

    return response.data;
  } catch (error) {
    console.error("Error in autocompleteLocations:", error.message || error.response);
    throw error; // Or return an appropriate error response
  }
};



const getAirports = async (params) => {
  try {
    const keyword = params;
    if (!keyword) {
      throw new Error("Keyword is required to search for airports.");
    }
    const queryParams = {
      keyword: params,
      subType: "AIRPORT",
    };

    const response = await amadeus.referenceData.locations.get(queryParams);
    return response.data;
  } catch (error) {
    console.error("Error in getAirports:", error.message || error.response);
    throw error; 
  }
};

const getFlights = async (params) => {
  try {
    const { originLocationCode, destinationLocationCode, departureDate, adults, returnDate } = params;

    if (!originLocationCode || !destinationLocationCode || !departureDate || !adults) {
      throw new Error("Missing required parameters for flight search.");
    }

    const queryParams = {
      originLocationCode: originLocationCode,
      destinationLocationCode: destinationLocationCode,
      departureDate: departureDate,
      adults: adults,
      max: 250,
      ...(returnDate && { returnDate: returnDate })
    };

    const response = await amadeus.shopping.flightOffersSearch.get(queryParams); 4


    const data = JSON.parse(response.body);
    if (!data.data || data.data.length === 0) {
      res.status(404).json({ message: "No flights available for the current search" });
      return;
    }
    if (!data.data || data.data.length === 0) {
      return { message: "No flights available for the current search" };
    }

    let cheapestFlight = data.data[0];
    let fastestFlight = data.data[0];

    data.data.forEach((flight) => {
      if (parseFloat(flight.price.total) < parseFloat(cheapestFlight.price.total)) {
        cheapestFlight = flight;
      }

      const flightDuration = parseDuration(flight.itineraries[0].duration);
      const fastestFlightDuration = parseDuration(fastestFlight.itineraries[0].duration);


      if (flightDuration < fastestFlightDuration) {
        fastestFlight = flight;
      }
    });

    data.data.forEach((flight) => {
      if (flight === cheapestFlight) {
        flight["offer-type"] = "Cheapest";
      } else if (flight === fastestFlight) {
        flight["offer-type"] = "Fastest";
      } else {
        flight["offer-type"] = "normal";
      }
    });
    const airlineCodes = Array.from(
      new Set(
        data.data.flatMap((offer) =>
          offer.itineraries.flatMap((itinerary) =>
            itinerary.segments.map((segment) => segment.carrierCode)
          )
        )
      )
    );

    const airlineLogoUrls = await Promise.all(
      airlineCodes.map(async (code) => {
        const logoResponse = await fetch(
          `https://content.airhex.com/content/logos/airlines_${code}_50_50_s.png?apikey=${process.env.YOUR_API_KEY}`
        );
        return { code, logoUrl: logoResponse.url };
      })
    );

    data.data.forEach((flight) => {
      flight.itineraries.forEach((itinerary) => {
        itinerary.segments.forEach((segment) => {
          const logoObj = airlineLogoUrls.find(
            (logo) => logo.code === segment.carrierCode
          );
          segment.airlineLogo = logoObj ? logoObj.logoUrl : "";
        });
      });
    });


    Object.entries(data.dictionaries.locations).forEach(([code, location]) => {
      location.cityName = location.cityCode;
      location.countryName = getCountryName(location.countryCode);
    });

    data.data.forEach((flight) => {
      flight.itineraries.forEach((itinerary) => {
        itinerary.segments.forEach((segment) => {
          if (segment.aircraft && segment.aircraft.code) {
            const aircraftCode = segment.aircraft.code;
            segment.aircraft.name = data.dictionaries.aircraft[aircraftCode] || aircraftCode;
          }

          if (segment.carrierCode) {
            const carrierCode = segment.carrierCode;
            segment.carrierName = data.dictionaries.carriers[carrierCode] || carrierCode;
          }

          if (segment.operating && segment.operating.carrierCode) {
            const operatingCarrierCode = segment.operating.carrierCode;
            segment.operating.carrierName = data.dictionaries.carriers[operatingCarrierCode] || operatingCarrierCode;
          }


          const departureIata = segment.departure.iataCode;
          const arrivalIata = segment.arrival.iataCode;
          segment.departure.countryName = data.dictionaries.locations[departureIata].countryName;
          segment.arrival.countryName = data.dictionaries.locations[arrivalIata].countryName;
        });
      });
    });

    return data;
  } catch (error) {
    console.error("Error in getFlights:", error.message || error.response);
    throw error;
  }
};

const getFlightOffersPricing = async (flightOffers) => {
  if (!flightOffers || flightOffers.length === 0) {
    throw new Error("Invalid input: No flight offers provided.");
  }

  try {
    const requestData = {
      data: {
        type: "flight-offers-pricing",
        flightOffers,
      },
    };

  
    const response = await amadeus.shopping.flightOffers.pricing.post(JSON.stringify(requestData));
    const data = JSON.parse(response.body);

    const airlineCodes = new Set(data.data.flightOffers.flatMap(offer =>
      offer.itineraries.flatMap(itinerary =>
        itinerary.segments.map(segment => segment.carrierCode)
      )
    ));

    const airlineLogoUrls = await Promise.all(Array.from(airlineCodes).map(async (code) => {
      const logoResponse = await fetch(`https://content.airhex.com/content/logos/airlines_${code}_50_50_s.png?apikey=${process.env.YOUR_API_KEY}`);
      if (!logoResponse.ok) throw new Error(`Failed to fetch logo for airline code: ${code}`);
      return { code, logoUrl: logoResponse.url };
    }));

    data.data.flightOffers.forEach(flight => {
      flight.itineraries.forEach(itinerary => {
        itinerary.segments.forEach(segment => {
          const logoObj = airlineLogoUrls.find(logo => logo.code === segment.carrierCode);
          segment.airlineLogo = logoObj ? logoObj.logoUrl : "";

          const departureLocation = data.dictionaries.locations[segment.departure.iataCode];
          const arrivalLocation = data.dictionaries.locations[segment.arrival.iataCode];
          segment.departure.countryName = getCountryName(departureLocation.countryCode);
          segment.arrival.countryName = getCountryName(arrivalLocation.countryCode);
        });
      });
    });

    return data;
  } catch (error) {
    console.error("Error in getFlightOffersPricing:", error.message);
    throw error; 
  }
};


const transporter = nodemailer.createTransport(smtpTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, 
  auth: {
    user: "apikey", 
    pass: process.env.EMAIL,
  },
}));


const sendBookingEmail = async (contact, bookingDetails) => {
  const templatePath = path.join(__dirname, '../email/flight_confirm.html');
  const templateFile = fs.readFileSync(templatePath, 'utf-8');
  const emailContent = ejs.render(templateFile, { bookingDetails });

  console.log("Sending email to:", contact.emailAddress); // Debug log
  if (!contact.emailAddress) {
    console.error("Contact email is undefined or empty");
    throw new Error("Contact email is undefined or empty"); // Stop execution if no email
  }


  const mailOptions = {
    from: "erkadoovince@gmail.com", 
    to: contact.emailAddress, 
    subject: "Booking Confirmation - vincedotcodes Flight Booking",
    html: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to", contact.email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};


const confirmBooking = async ({ flightOffer, travelerInfo, contacts }) => {
  
  if (!flightOffer || !travelerInfo || !contacts || contacts.length === 0) {
    return ({ message: "Invalid input" });
  }

  try {
    const requestData = {
      data: {
        type: "flight-order",
        flightOffers: [flightOffer],
        travelers: travelerInfo,
        contacts: contacts,
        "remarks": {
          "general": [
            {
              "subType": "GENERAL_MISCELLANEOUS",
              "text": "ONLINE BOOKING FROM INCREIBLE VIAJES"
            }
          ]
        },
        "ticketingAgreement": {
          "option": "DELAY_TO_CANCEL",
          "delay": "6D"
        },
      },
    };

    const response = await amadeus.booking.flightOrders.post(JSON.stringify(requestData));
    const bookingData = JSON.parse(response.body);


    await sendBookingEmail(contacts[0], bookingData);

    return bookingData;
  } catch (error) {
    console.error("Error in confirmBooking:", error);
    return { message: "Error booking flight", error: error };
  }
};


module.exports = {
  autocompleteLocations,
  getAirports,
  getFlights,
  getFlightOffersPricing,
  confirmBooking,
};
