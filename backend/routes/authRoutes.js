const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgot-password', authController.sendResetCode);
router.post('/reset-password', authController.resetPassword);
module.exports = router;
