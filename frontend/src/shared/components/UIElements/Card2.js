import React, { useState, useEffect } from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from '../../../coreComponents/ShowImage';
import {addItem,updateCart,removeItem} from '../../../coreComponents/cartHelpers';

import moment from 'moment';
import './Card2.css';

const Card2 = ({disease,foodPlan,
  showViewDiseaseButton=true,showViewFoodPlanButton=true,
  showFoodPlan=true,showDescription=true,
  style,showAddToCartButton=true,
  cartUpdate=false,showRemoveFoodPlan=false,
  onChangeItems
}) => {
  
    const [values,setValues] = useState({
    redirect : false,
  })
  const [count,setCount] = useState(foodPlan && foodPlan.count)
  
  const {redirect} = values;

  const showViewDieseaseHandler = () => (
    showViewDiseaseButton && (<Link to={`/disease/${disease._id}`}>
          <button className="card2-foodplan">
            VIEW DISEASE
          </button>
        </Link>)
  )

  const showViewFoodPlanHandler = () => (
    showViewFoodPlanButton && (<Link to={`/foodPlans/${disease._id}`}>
          <button className="card2-foodplan">
            VIEW FOODPLANS
          </button>
        </Link>)
  )

  const showFoodPlanButton =() =>(
    showFoodPlan && ((<Link to={`/foodPlan/${foodPlan._id}`}>
    <button className="card2-foodplan">
      VIEW FOODPLAN
    </button>
  </Link>)) 
  )

  const diseaseCard = (disease) => (
    <React.Fragment>
      <div className="disease-header">
          <h3>{disease.name}</h3>
        </div>
      <ShowImage item={disease} url='disease' />
      <p>Causes: {disease.causes}</p>
      <p>Symptoms: {disease.symptoms}</p>
      <p>Category: { disease.category && disease.category.name}</p>
      {showViewDieseaseHandler()}
      {showViewFoodPlanHandler()}
    </React.Fragment>
  )

  const showFoodPlanDescription = () => (
      showDescription ?
       (<p>description: {foodPlan.description && foodPlan.description.substring(0,1000)}</p>) 
       :(<p>description: {foodPlan.description && foodPlan.description.substring(0,10)}</p>) 
  
  )

  const showRemoveFoodPlanButton = (showRemoveFoodPlan) => (
    showRemoveFoodPlan && (
      <button  onClick={() => removeItem(foodPlan._id)} className="card2-cart">
        REMOVE
      </button>)
  )

  const hanldeChange = foodPlanId => event => {
    console.log('76',foodPlanId);
    setCount(event.target.value < 1 ? 1: event.target.value)
    if(event.target.value >= 1){
      updateCart(foodPlanId,event.target.value)
      onChangeItems()
    }
  }

  const showCartUpdate = (cartUpdate,foodPlan) => {
    return (cartUpdate && 
      <div>
        <div className="cart-update">
          <p>Adjust Quantity</p>
          <input 
            type="number" className="cart-input"
            value={count} onChange={ hanldeChange(foodPlan._id)} 
            />
        </div>
      </div>
    )}

    const addToCart = () => {
      addItem(foodPlan,() => {
        setValues({...values,redirect:true})
      })
    }
  
    const shouldRedirect = redirect => {
      if(redirect){
        return <Redirect to="/cart"/>
      }
    }
  
    const showCartHandler = () => (
       
      showAddToCartButton && (<button onClick={addToCart} className="card2-cart">
        ADD TO CART
      </button>)
          
    )
  
    const showQuantity = (quantity) => {
      return (quantity > 0 ? <span className="badge badge-primary badge-pill mb-3">In Stock</span>: 
      <span>Out of Stock</span>)
    }

  const foodPlanCard = (foodPlan) =>(
    <React.Fragment>
      {/* {shouldRedirect(redirect)} */}
      <div className ="disease-header">
        <h3>{foodPlan.name}</h3>
      </div>
      {foodPlan &&  <ShowImage item={foodPlan} url='foodPlan' />}
      {showFoodPlanDescription()}
      {/* <p>description: {foodPlan.description && foodPlan.description.substring(0,10)}</p> */}
      <p>price:<i class="fa fa-inr"></i> {foodPlan.price}</p>
      <p>disease:{foodPlan.disease && foodPlan.disease.name}</p>
      <p>Shipping:{foodPlan.shipping ? 'Available' : 'unavailable'}</p>
      {showQuantity(foodPlan.quantity)}
      <br/>
      {showFoodPlanButton()}
      {showCartUpdate(cartUpdate,foodPlan)}
      {showCartHandler()}
      {showRemoveFoodPlanButton(showRemoveFoodPlan)}
    </React.Fragment>
  )

 
  
  return (
    <div className="col-4 mb-4">
      <div className="card2" style={style}>
        {/* <div className="disease-header">
          <h3>{disease.name}</h3>
        </div> */}
        <div className="card2-body">
        {shouldRedirect(redirect)}
          { disease && diseaseCard(disease)}
          {/* <ShowImage item={disease} url='disease' />
          <p>Causes: {disease.causes}</p>
          <p>Symptoms: {disease.symptoms}</p>
          <p>Category: { disease.category && disease.category.name}</p>
          
        </div>
        {showViewDieseaseHandler()}
        {showViewFoodPlanHandler()} */}

        {/* foodPlan */}
        {foodPlan && foodPlanCard(foodPlan)}
        {/* <p>Added on {moment(disease.createdAt).fromNow()}</p> */}
        {/* {showStock(disease.quantity)} */}
        {/* {showCartHandler()} */}
        </div>
      </div>
    </div>
  );
};

export default Card2;
