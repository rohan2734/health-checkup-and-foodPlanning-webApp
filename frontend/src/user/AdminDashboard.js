import React from 'react';
import authAPI from '../authAPI/authAPI';
import {Link} from 'react-router-dom';

import Fade from 'react-reveal/Fade';

import './AdminDashboard.css';

const AdminDashboard = () =>{
  
  const {username,email,role} = authAPI.isAuthenticated();

  const adminLinks = () => {
    return(
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item"><Link  to="/create/category"><button className="user-nav-links">Create Category</button></Link></li>
          <li className="list-group-item"><Link  to="/create/disease"><button className="user-nav-links">Create Disease</button></Link></li>
          <li className="list-group-item"><Link  to="/create/foodPlan"><button className="user-nav-links">Create FoodPlan</button></Link></li>
          <li className="list-group-item"><Link  to="/admin/foodPlans"><button className="user-nav-links">Manage FoodPlans</button></Link></li>
          <li className="list-group-item"><Link  to="/admin/orders"><button className="user-nav-links">View Orders</button></Link></li>
        </ul>
      </div>
    )
  }

  const adminInfo = () =>{
    return(
      <div className="card mb-5">
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{username}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
        </ul>
      </div>
    )
  }

  return(
    <React.Fragment>
      <Fade bottom>
        <div className="greet-user"><h4>{`G'day ${username}`}</h4></div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-4">
                {adminLinks()}
              </div>
              <div className="col-8">
                {adminInfo()}
              </div>
            </div>
          </div>
      </Fade>
    </React.Fragment>
  )
};

export default AdminDashboard;