const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');
const authControllers = require('../controllers/authControllers');
const foodPlanControllers = require('../controllers/foodPlanControllers');

router.get('/foodPlan/:foodPlanId', foodPlanControllers.getFoodPlan);
router.post('/foodPlan/create/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,
  foodPlanControllers.addFoodPlan
);
router.delete('/foodPlan/:foodPlanId/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,
  foodPlanControllers.removeFoodPlan
);

router.patch('/foodPlan/:foodPlanId/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,
  foodPlanControllers.updateFoodPlan
);
// router.get('/foodPlans/by/:diseaseId',foodPlanControllers.getFoodPlansByDisease);
router.get('/foodPlans',foodPlanControllers.getAllFoodPlans);
router.get('/foodPlans/related/:foodPlanId',foodPlanControllers.getRelatedFoodPlans);
// router.get('/foodPlans/diseases',foodPlanControllers.getDiseasesFromFoodPlans);
router.post('/foodPlans/by/search/:diseaseId',foodPlanControllers.getFoodPlansBySearch);
router.get('/foodPlan/photo/:foodPlanId',foodPlanControllers.getFoodPlanPhoto);


router.param('foodPlanId',foodPlanControllers.foodPlanById);
router.param('userId',userControllers.userById);

module.exports = router;