// routes/flight.js
const express = require('express');
const router = express.Router();
const { autocompleteController, getAirportsController, getFlightsController, getFlightOfferPricingController, bookFlightController } = require('../controllers/Flight');


/**
 * @swagger
 * tags:
 *   name: Flight
 *   description: Flight related endpoints
 */



/**
 * @swagger
 * /api/flight/autocomplete:
 *   get:
 *     tags: [Flight]
 *     summary: Autocomplete for location suggestions
 *     description: Provides location suggestions based on a user's input keyword. Useful for auto-completing city names, airport codes, etc.
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         description: Partial input for which location suggestions are sought.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An array of suggested locations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: string
 *                     description: The suggested location value.
 *                   label:
 *                     type: string
 *                     description: A readable label for the suggested location.
 *       400:
 *         description: Bad request, such as missing keyword query parameter.
 *       500:
 *         description: Internal server error
 */


router.get('/autocomplete', autocompleteController);




/**
 * @swagger
 * /api/flight/airports:
 *   get:
 *     tags:
 *       - Flight
 *     summary: Get airports information
 *     description: Provides information on airports based on a user's input keyword.
 *     operationId: getAirports
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: true
 *         type: string
 *         description: The user's input keyword to search for airports.
 *     responses:
 *       200:
 *         description: An array of airports information.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/AirportInfo'
 *       400:
 *         description: Bad Request. Keyword query parameter is required.
 *       500:
 *         description: Internal Server Error
 * definitions:
 *   AirportInfo:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: Name of the airport.
 *       iataCode:
 *         type: string
 *         description: The IATA code of the airport.
 *       city:
 *         type: string
 *         description: The city where the airport is located.
 */

router.get('/airports', getAirportsController);


/**
 * @swagger
 * /api/flight/flights:
 *   get:
 *     tags:
 *       - Flight
 *     summary: Search for flight offers
 *     description: Fetches flight offers based on search criteria like origin, destination, departure date, and number of adults.
 *     operationId: getFlights
 *     parameters:
 *       - in: query
 *         name: originLocationCode
 *         required: true
 *         type: string
 *         description: The IATA code for the origin location.
 *       - in: query
 *         name: destinationLocationCode
 *         required: true
 *         type: string
 *         description: The IATA code for the destination location.
 *       - in: query
 *         name: departureDate
 *         required: true
 *         type: string
 *         format: date
 *         description: The departure date in YYYY-MM-DD format.
 *       - in: query
 *         name: adults
 *         required: true
 *         type: integer
 *         description: The number of adult passengers.
 *       - in: query
 *         name: returnDate
 *         required: false
 *         type: string
 *         format: date
 *         description: The return date in YYYY-MM-DD format (optional).
 *     responses:
 *       200:
 *         description: An array of flight offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/FlightOffer'
 *       400:
 *         description: Bad Request, such as missing required query parameters.
 *       500:
 *         description: Internal Server Error
 * definitions:
 *   FlightOffer:
 *     type: object
 *     properties:
 *       price:
 *         type: object
 *         description: Price details of the flight offer.
 *       itineraries:
 *         type: array
 *         items:
 *           type: object
 *           description: Itinerary details of the flight offer.
 */

router.get('/flights', getFlightsController);



/**
 * @swagger
 * /api/flight/pricing:
 *   post:
 *     tags:
 *       - Flight
 *     summary: Get pricing for flight offers
 *     description: Retrieves pricing details for specified flight offers.
 *     operationId: getFlightOffersPricing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flightOffers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   description: Flight offer to retrieve pricing for.
 *                 description: Array of flight offers for which pricing information is requested.
 *     responses:
 *       200:
 *         description: Pricing details for the flight offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     flightOffers:
 *                       type: array
 *                       items:
 *                         $ref: '#/definitions/FlightOffer'
 *                     dictionaries:
 *                       type: object
 *                       description: Additional dictionaries to interpret the response data.
 *       400:
 *         description: Bad Request, such as missing flight offers in the request body.
 *       500:
 *         description: Internal Server Error
 */

router.post('/pricing', getFlightOfferPricingController);


/**
 * @swagger
 * /api/flight/book:
 *   post:
 *     tags:
 *       - Flight
 *     summary: Confirm and book a flight
 *     description: This endpoint is used to confirm and book a flight based on the provided flight offer, traveler information, and contact details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - flightOffer
 *               - travelerInfo
 *               - contacts
 *             properties:
 *               flightOffer:
 *                 type: object
 *                 description: The flight offer to be booked.
 *               travelerInfo:
 *                 type: array
 *                 items:
 *                   type: object
 *                 description: An array of traveler information.
 *               contacts:
 *                 type: array
 *                 items:
 *                   type: object
 *                 description: An array of contact details for the booking.
 *     responses:
 *       200:
 *         description: Flight booking confirmed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Flight booking confirmed
 *                 bookingDetails:
 *                   type: object
 *                   description: The details of the confirmed booking.
 *       400:
 *         description: Invalid input, such as missing required booking details.
 *       500:
 *         description: Error processing the flight booking.
 */

router.post('/book', bookFlightController);

module.exports = router;