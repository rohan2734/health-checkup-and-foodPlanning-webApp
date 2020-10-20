const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/authControllers');
const userControllers = require('../controllers/userControllers');
const ordersControllers = require('../controllers/orderControllers');
const foodPlanControllers = require('../controllers/foodPlanControllers');

router.post('/order/create/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  userControllers.addOrderToUserHistory,
  foodPlanControllers.decreaseQuantity,
  ordersControllers.addOrder
)

router.get('/order/list/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,
  ordersControllers.listOrders
)

router.get('/order/status-values/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,
  ordersControllers.getStatusValues
)

router.patch('/order/:orderId/status/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,
  ordersControllers.updateOrderStatus
)

router.param('userId',userControllers.userById);
router.param('orderId',ordersControllers.orderById)

module.exports = router;