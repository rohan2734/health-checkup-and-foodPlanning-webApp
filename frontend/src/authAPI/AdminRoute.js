// eslint-disable-next-line
import React,{Component} from 'react';

import {Route,Redirect} from 'react-router-dom';
import authAPI from './authAPI';

const AdminRoute = ({component:Component,...rest}) => (
  <Route 
    {...rest} 
    render={props => (authAPI.isAuthenticated()) && (authAPI.isAuthenticated().role === 1) ? 
      (<Component {...props}/>) 
      : (
        <Redirect 
          to={{ 
              pathname:'/login',
              state:{from:props.location}
          }} 
        />
    )} />
);

export default AdminRoute;