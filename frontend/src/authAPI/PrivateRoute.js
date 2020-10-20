// eslint-disable-next-line
import React,{Component} from 'react';

import {Route,Redirect} from 'react-router-dom';
import authAPI from './authAPI';

const PrivateRoute = ({component:Component,...rest}) => (
  <Route 
    {...rest} 
    render={props => authAPI.isAuthenticated() ? 
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

export default PrivateRoute;