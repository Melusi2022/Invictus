const express = require('express');
const { signup, login, getUserDetails } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate'); // Middleware for JWT validation

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user-details', authenticate, getUserDetails); // Authenticated route

module.exports = router;
