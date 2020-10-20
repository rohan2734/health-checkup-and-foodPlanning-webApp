const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');
const authControllers = require('../controllers/authControllers');
const diseaseControllers = require('../controllers/diseaseControllers');
const validators = require('../validators/index');

router.get('/disease/:diseaseId', diseaseControllers.getDisease);
router.post('/disease/create/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,
  diseaseControllers.addDisease
);
router.delete('/disease/:diseaseId/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,
  diseaseControllers.removeDisease
);

router.patch('/disease/:diseaseId/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,
  diseaseControllers.updateDisease
);

router.get('/diseases',diseaseControllers.getAllDiseases);
router.get('/diseases/withoutLimit',diseaseControllers.getAllDiseasesWithoutLimit);
router.get('/disease/photo/:diseaseId',diseaseControllers.getDiseasePhoto);
router.get('/diseases/related/:diseaseId',diseaseControllers.getRelatedDiseases);
router.get('/diseases/categories',diseaseControllers.getCategoriesFromDiseases);

router.get('/diseases/search',
  validators.searchQueryValidator,
  diseaseControllers.getDiseasesSearch
);

router.post('/diseases/by/search',diseaseControllers.getDiseasesBySearch);

router.param('diseaseId',diseaseControllers.diseaseById);
router.param('userId',userControllers.userById);

module.exports = router;