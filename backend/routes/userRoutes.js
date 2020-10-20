const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/authControllers');
const userControllers = require('../controllers/userControllers');

router.get('/secret/:userId',authControllers.checkAuth,authControllers.isAuth,authControllers.isAdmin,(req,res) => {
  res.json({ user : req.profile})
});

router.get('/user/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  userControllers.getUserProfile
);

router.patch('/user/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  userControllers.updateUserProfile
);

router.get('/orders/by/user/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  userControllers.purchaseHistory
)

router.param('userId',userControllers.userById);

module.exports = router;