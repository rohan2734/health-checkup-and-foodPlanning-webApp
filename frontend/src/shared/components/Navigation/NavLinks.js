import React,{useContext} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {itemTotal} from '../../../coreComponents/cartHelpers';
import authAPI from '../../../authAPI/authAPI';
import AuthContext from '../../context/auth-context';

import './NavLinks.css';

const NavLinks = props => {

  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>HOME</NavLink>
      </li>
      <li>
        <NavLink to="/shop" >SHOP</NavLink>
      </li>
      <li>
        <NavLink to="/cart" >CART <sup><small className="cart-badge">{itemTotal()}</small></sup></NavLink>
      </li>
      {  authAPI.isAuthenticated() && authAPI.isAuthenticated().role === 0 && (
        <li>
        <NavLink to="/user/dashboard" exact>Dashboard</NavLink>
      </li>
      )}
      { authAPI.isAuthenticated() && authAPI.isAuthenticated().role === 1 && (
        <li>
        <NavLink to="/admin/dashboard" exact>Dashboard</NavLink>
      </li>
      )}
      {/* !auth.isLoggedIn && */}
      {  !authAPI.isAuthenticated() && (
        <React.Fragment>
          <li>
            <NavLink to="/signin" >SIGNIN</NavLink>
          </li>
          <li>
            <NavLink to="/login" >LOGIN</NavLink>
          </li>
        </React.Fragment>
      )}
      {/* auth.isLoggedIn && */}
      {  authAPI.isAuthenticated() && (
        <li> 
        <span  className="nav-signout" onClick={() => authAPI.signout(() =>{
          props.history.push('/')
        })}>LOGOUT</span>
      </li>
      )}
    </ul>
  )
} 

export default withRouter(NavLinks);