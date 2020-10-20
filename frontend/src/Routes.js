import React, { useEffect } from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Signin from './user/Signin';
import Login from './user/Login';
import Home from './coreComponents/Home';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import PrivateRoute from './authAPI/PrivateRoute';
import AdminRoute from './authAPI/AdminRoute';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddDisease from './admin/AddDisease';
import AddFoodPlan from './admin/AddFoodPlan';
import Shop from './coreComponents/Shop';
import Disease from './coreComponents/Disease';
import FilterFoodPlans from './coreComponents/FilterFoodPlans';
import FoodPlan from './coreComponents/FoodPlan';
import Cart from './coreComponents/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageFoodPlans from './admin/ManageFoodPlans';
import UpdateFoodPlan from './admin/UpdateFoodPlan';
//import {isAuthenticated} from './admin/adminAPI';



const Routes = () => {

  // let logoutTimer;

  // const {token} = isAuthenticated();

  // useEffect(() => {


  // },[token]);

  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/login" exact component={Login} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/disease/:diseaseId" exact component={Disease} />
        <Route path="/foodPlans/:diseaseId" exact component={FilterFoodPlans} />
        <Route path="/foodPlan/:foodPlanId" exact component={FoodPlan} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/disease" exact component={AddDisease} />
        <AdminRoute path="/create/foodPlan" exact component={AddFoodPlan} />
        <AdminRoute path="/admin/foodPlans" exact component={ManageFoodPlans} />
        <AdminRoute path="/admin/foodPlan/update/:foodPlanId" exact component={UpdateFoodPlan} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
      </Switch>
      </main>
    </BrowserRouter>
  )
}

export default Routes;