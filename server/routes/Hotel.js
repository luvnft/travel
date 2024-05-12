const express = require('express');
const router = express.Router();
const { createHotelController, getHotelsController } = require('../controllers/Hotel');

/**
 * @swagger
 * tags:
 *   name: Hotel
 *   description: Hotel related endpoints
 */


/**
 * @swagger
 * /api/hotel/create:
 *   post:
 *     summary: Create a new hotel
 *     tags: [Hotel]
 *     description: Creates a new hotel with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - city
 *               - description
 *               - cityId
 *               - user
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the hotel.
 *               address:
 *                 type: string
 *                 description: Full address of the hotel.
 *               city:
 *                 type: string
 *                 description: City where the hotel is located.
 *               longitude:
 *                 type: string
 *                 description: Longitude of the hotel's location.
 *               latitude:
 *                 type: string
 *                 description: Latitude of the hotel's location.
 *               cheapestPrice:
 *                 type: number
 *                 description: The lowest price available at the hotel.
 *               description:
 *                 type: string
 *                 description: Detailed description of the hotel.
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Rating of the hotel from 1 to 5.
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of amenities available at the hotel.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs of images of the hotel.
 *               rooms:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of room IDs associated with the hotel.
 *               cityId:
 *                 type: string
 *                 description: The MongoDB ObjectId for the city document associated with this hotel.
 *               user:
 *                 type: string
 *                 description: The MongoDB ObjectId for the user who is managing this hotel.
 *     responses:
 *       201:
 *         description: Hotel created successfully. Returns the newly created hotel data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       400:
 *         description: Invalid request data.
 *       500:
 *         description: Server error.
 */

// POST: Create a new hotel
router.post('/create', createHotelController);

/**
 * @swagger
 * /api/hotel/get:
 *   get:
 *     summary: Retrieve all hotels
 *     tags: [Hotel]
 *     description: Fetches a list of all hotels available in the database.
 *     responses:
 *       200:
 *         description: A list of hotels.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 *       500:
 *         description: Internal server error
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - city
 *         - description
 *         - cityId
 *         - user
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the hotel.
 *         address:
 *           type: string
 *           description: Full address of the hotel.
 *         city:
 *           type: string
 *           description: City where the hotel is located.
 *         longitude:
 *           type: string
 *           description: Longitude of the hotel's location.
 *         latitude:
 *           type: string
 *           description: Latitude of the hotel's location.
 *         cheapestPrice:
 *           type: number
 *           description: The lowest price available at the hotel.
 *         description:
 *           type: string
 *           description: Detailed description of the hotel.
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Rating of the hotel from 1 to 5.
 *         amenities:
 *           type: array
 *           items:
 *             type: string
 *           description: List of amenities available at the hotel.
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of images of the hotel.
 *         rooms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Room'
 *         cityId:
 *           type: string
 *           description: The MongoDB ObjectId for the city document associated with this hotel.
 *         user:
 *           type: string
 *           description: The MongoDB ObjectId for the user who is managing this hotel.
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: MongoDB ObjectId of the room.
 *         number:
 *           type: string
 *           description: Room number or identifier.
 *         capacity:
 *           type: number
 *           description: The maximum number of guests for the room.
 *         price:
 *           type: number
 *           description: Price per night for the room.
 */

// GET : Get all hotels
router.get('/get', getHotelsController);


module.exports = router;
