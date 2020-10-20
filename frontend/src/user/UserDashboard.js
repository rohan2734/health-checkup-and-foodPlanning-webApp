import React,{useState,useEffect} from 'react';

import authAPI from '../authAPI/authAPI';
import {Link} from 'react-router-dom';
import userAPI from './userAPI';
import moment from 'moment';

import Fade from 'react-reveal/Fade';
import './UserDashboard.css';

const UserDashboard = () =>{
  
  const [history,setHistory] = useState([]);

  const {username,userId,email,role,token} = authAPI.isAuthenticated();

  const init=(userId,token) => {
    userAPI.getPurchaseHistory(userId,token)
    .then(data => {
      if(data.error || data.message){
        console.log(data.error)
      }else{
        setHistory(data)
      }
    })
  }


  useEffect(()=>{
    init(userId,token)
  },[])
  const userLinks = () => {
    return(
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item"><Link  to="/cart"><button className="user-nav-links">My Cart</button></Link></li>
          <li className="list-group-item"><Link  to={`/profile/${userId}`}><button className="user-nav-links">Update Profile</button></Link></li>
        </ul>
      </div>
    )
  }

  const userInfo = () =>{
    return(
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{username}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
        </ul>
      </div>
    )
  }

  const purchaseHistory = history => {
    return (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {history.map((h, i) => {
                        return (
                            <div>
                                <hr />
                                {h.foodPlans.map((f, i) => {
                                    return (
                                        <div key={i}>
                                            <h6>Product name: {f.name}</h6>
                                            <h6>Product price: {f.price}</h6>
                                            <h6>
                                                Purchased date:{" "}
                                                {moment(f.createdAt).fromNow()}
                                            </h6>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};

  return(
    <React.Fragment>
      <Fade bottom>
        <div className="greet-user"><h4>{`G'day ${username}`}</h4></div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-4">
                {userLinks()}
              </div>
              <div className="col-8">
                {userInfo()}
                {purchaseHistory(history)}
                
              </div>
            </div>
        </div>
      </Fade>
    </React.Fragment>
  )
};

export default UserDashboard;