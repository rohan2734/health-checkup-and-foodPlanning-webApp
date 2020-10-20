const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/userControllers');
const authControllers = require('../controllers/authControllers');
const categoryControllers = require('../controllers/categoryControllers');

router.get('/category/:categoryId',categoryControllers.getCategory);
router.post('/category/create/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,
  categoryControllers.addCategory
);
router.patch('/category/:categoryId/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,  
  categoryControllers.updateCategory
);
router.delete('/category/:categoryId/:userId',
  authControllers.checkAuth,
  authControllers.isAuth,
  authControllers.isAdmin,  
  categoryControllers.deleteCategory
);
router.get('/categories',categoryControllers.getAllCategories);

router.param('categoryId',categoryControllers.categoryById);
router.param('userId',userControllers.userById);

module.exports = router;