const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/authControllers');
const userControllers = require('../controllers/userControllers');
const braintreeControllers = require('../controllers/braintreeControllers');

router.get('/braintree/getToken/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  braintreeControllers.generateToken);

router.post('/braintree/payment/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  braintreeControllers.processPayment
)

router.param('userId',userControllers.userById)
module.exports = router;