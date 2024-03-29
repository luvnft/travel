const express = require('express');
const router = express.Router();
const { getHotelController, getHotelOfferDetailsController } = require('../controllers/Hotel');

/**
 * @swagger
 * tags:
 *   name: Hotel
 *   description: Hotel related endpoints
 */

/**
 * @swagger
 * /api/hotel/get:
 *   get:
 *     tags: [Hotel]
 *     summary: Search for hotel offers
 *     description: Fetches hotel offers based on the provided city code and optional search criteria.
 *     parameters:
 *       - in: query
 *         name: cityCode
 *         required: true
 *         description: The city code to search for hotels.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An array of hotel offers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   hotel:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       address:
 *                         type: string
 *                       starRating:
 *                         type: string
 *                   offers:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         price:
 *                           type: string
 *                         roomType:
 *                           type: string
 *       400:
 *         description: Bad request, such as missing or invalid query parameters.
 *       500:
 *         description: Internal server error
 */

router.get('/get', getHotelController);


/**
 * @swagger
 * /api/hotel/offer/{offerId}:
 *   get:
 *     tags: [Hotel]
 *     summary: Fetch specific hotel offer details
 *     description: Retrieves details for a specific hotel offer based on its unique offer ID.
 *     parameters:
 *       - in: path
 *         name: offerId
 *         required: true
 *         description: Unique identifier for the hotel offer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detailed information about the hotel offer.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hotel:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     address:
 *                       type: object
 *                       properties:
 *                         lines:
 *                           type: array
 *                           items:
 *                             type: string
 *                         city:
 *                           type: string
 *                         postalCode:
 *                           type: string
 *                         country:
 *                           type: string
 *                     geoCode:
 *                       type: object
 *                       properties:
 *                         latitude:
 *                           type: number
 *                         longitude:
 *                           type: number
 *                 offers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       price:
 *                         type: object
 *                         properties:
 *                           currency:
 *                             type: string
 *                           total:
 *                             type: string
 *                       roomType:
 *                         type: string
 *                       rateType:
 *                         type: string
 *       400:
 *         description: Bad request, such as missing or invalid offerId.
 *       404:
 *         description: Offer not found for the given offerId.
 *       500:
 *         description: Internal server error
 */

router.get('/offer/:offerId', getHotelOfferDetailsController);

module.exports = router;
