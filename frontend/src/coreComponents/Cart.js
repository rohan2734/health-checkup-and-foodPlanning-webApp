import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

import Checkout from './Checkout';
import {getCart} from './cartHelpers';
import Card2 from '../shared/components/UIElements/Card2';

import './Cart.css';


const Cart = () => {
  // const [values,setValues] = useState({
  //   items:[]
  // })

  // const items={values};

   const [items,setItems] = useState([]);
   

   useEffect( ()=>{
    // const itemsList = getCart();
    // console.log('18',itemsList);
     setItems(getCart());

     //setValues({...values,items:getCart()});
    
  },[]);

  const handleChangeItems =() => {
    setItems(getCart());
  }



  const showItems = items =>{
    return(
      <div>
        <h2>Your cart has {items.length} items</h2>
        <hr/>
        {items.map((f,i)=>(
          <Card2 key={i} foodPlan={f} showViewFoodPlanButton={false} 
          showViewDiseaseButton={false} showDescription={false} 
          style={{width:'700px'}} showAddToCartButton={false}
          cartUpdate={true} showRemoveFoodPlan={true} onChangeItems={() => handleChangeItems()}
        />
        ))}
      </div>
    )
  }
 

  const noItemsMessage = () => (
    <React.Fragment>
      <h2>Your cart is empty</h2><br/>
      <Link to="/shop"><button  className="cart-shop">Continue Shopping</button></Link>

    </React.Fragment>
    
  )


  return(
    <div className="row">
      
      <div className=" column">
        <h2 className="mb-4">Your cart summary</h2>
        <hr/>
        <Checkout foodPlans={items}/>
      </div>
      <div className=" column">
        {items.length > 0 ? showItems(items) : noItemsMessage()} 
      </div>
    </div>
  )
}

export default Cart;