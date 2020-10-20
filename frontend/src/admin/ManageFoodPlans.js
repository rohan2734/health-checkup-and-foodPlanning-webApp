import React,{useState,useEffect} from 'react';

import {isAuthenticated} from '../authAPI/authAPI';
import adminAPI from './adminAPI';

import './ManageFoodPlans.css';
import { Link } from 'react-router-dom';

const ManageFoodPlans = () => {
  const [foodPlans,setFoodPlans] = useState([]);

  const {userId,token} = isAuthenticated();

  const loadFoodPlans = () => {
    adminAPI.getFoodPlans()
    .then(data => {
      if(data.error){
        console.log(data.error)
      }else{
        setFoodPlans(data.foodPlans)
      }
    })
  }

  const removeFoodPlan = foodPlanId => {
    adminAPI.deleteFoodPlan(foodPlanId,userId,token)
    .then(data => {
      if (data.error){
        console.log(data.error)
      }else{
        loadFoodPlans()
      }
    })
  }

  useEffect(()=>{
    loadFoodPlans()
  },[])

  return(
    <div className="row">
      <div className="col-12">
        <h2 className="text-center">
          Total {foodPlans.length} foodPlans
        </h2>
        <hr/>
        <ul className="list-group">
          { foodPlans && foodPlans.map((f,i) => (
            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
              <strong>{f.name}</strong>
              <Link to={`/admin/foodPlan/update/${f._id}`}>
                <span className="badge badge-warning badge-pill">
                  Update
                </span>
              </Link>
              <span 
                onClick={() => removeFoodPlan(f._id)}
                className="badge badge-danger badge-pill">
                Delete
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
  
  
}

export default ManageFoodPlans;