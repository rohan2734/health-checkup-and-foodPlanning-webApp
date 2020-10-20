const express = require('express');
const router = express.Router();
const validators = require('../validators/index');

const authControllers = require('../controllers/authControllers');

router.post('/signin', validators.userSignUpValidator,authControllers.signup);
router.post('/login',authControllers.login);
router.get('/signout',authControllers.signout);

module.exports = router;