import React, { useState, useEffect } from 'react';

import {getFoodPlan,getRelatedFoodPlans} from './coreAPI';

import axios from 'axios';

import './FoodPlan.css';
import Card2 from '../shared/components/UIElements/Card2';


const FoodPlan = (props) => {
  const [values,setValues] = useState({
    foodPlan:{},
    error:'',
    relatedFoodPlans:[]
  })

  const {foodPlan,error,relatedFoodPlans} = values;

  
  const fetchData = () => {
    let datafile1= getFoodPlan(props.match.params.foodPlanId);
    let datafile2=getRelatedFoodPlans(props.match.params.foodPlanId);

    axios.all([datafile1,datafile2])
    .then( axios.spread((...allData) => {
      const allDataFoodPlan = allData[0];
      const allDataRelatedFoodPlans = allData[1];

      // console.log('102',allDataFoodPlan);
      // console.log('103',allDataRelatedFoodPlans);

      setValues({...values,
        foodPlan:allDataFoodPlan.foodPlan,
        relatedFoodPlans:allDataRelatedFoodPlans.foodPlans
      })

    }))
    .catch((data) => {
      if(data.error||data.message){
        setValues({...values,error:data.error||data.message})
      }
    })
  }

  useEffect(() => {
    fetchData();
    // const foodPlanId = props.match.params.foodPlanId
    // loadSingleFoodPlan(foodPlanId);
  },[])

  return(

    <div className="container-fluid">
      <div className="row">
        <div className="foodPlan-view-header">
          <h4>FoodPlans</h4>
        </div>
        {/* <div className="disease-view-header" style={{width:'34%'}}>
          <h4>Related FoodPlans</h4>
        </div> */}
          {/* {JSON.stringify(foodPlan)} */}
        <div className="container-fluid">      
          {foodPlan && <Card2 foodPlan={foodPlan} 
            showViewDiseaseButton={false} 
            showViewFoodPlanButton={false} 
            showFoodPlan={false} 
            showDescription={true}
            style={{width:'900px'}}
            />}
        </div>
        <div className="col-4">
          {relatedFoodPlans.length != 0 && relatedFoodPlans.map((f,i) => (
              <Card2 key={i} foodPlan={f}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FoodPlan;