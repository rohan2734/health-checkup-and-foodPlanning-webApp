import React,{useState, useEffect} from 'react';

import {Link} from 'react-router-dom';
import {isAuthenticated} from '../authAPI/authAPI';
import {getBraintreeClientToken,processPayment,createOrder} from './coreAPI';
import {emptyCart} from './cartHelpers';
import DropIn from 'braintree-web-drop-in-react';
import Modal from '../shared/components/UIElements/Modal';
import Loading from '../shared/components/UIElements/Loading';

import Fade from 'react-reveal/Fade';
import './Checkout.css';


const Checkout = ({foodPlans}) => {
  
  const [values,setValues] = useState({
    success:false,
    clientToken:null,
    error:'',
    instance:{},
    address:'',
    loading:false,
    address:""
  })

  
  const userId = isAuthenticated() && isAuthenticated().userId
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken =(userId,token) =>{
    getBraintreeClientToken(userId,token)
    .then(data =>{
      if(data.error || data.message){
        setValues({...values,error:data.error||data.message})
      }else{
        setValues({...values,clientToken:data.clientToken,error:''})
      }
    })
  }

  useEffect(()=>{
    getToken(userId,token)
    
  },[])

  const handleAddress = event => {
    setValues({...values,address:event.target.value})
  }

  const getTotal = () => {
    return foodPlans.reduce((currentValue,nextValue)=>{
      return currentValue + nextValue.count*nextValue.price
    },0);
  }

  const showCheckout = () => (
    isAuthenticated() ? (
      <div className=" checkout-checkout2">{showDropIn()}</div>
    ) : (
      <Link to="/login"><button className="checkout-auth">LOGIN IN TO CHECKOUT</button></Link>
    )
  )

  const buy = () => {
    setValues({...values,loading:true})
    //send the nonce to your server
    //nonce = values.instance.requestPaymentMethod()
    let nonce;
    let getNonce = values.instance.requestPaymentMethod()
    .then(data => {
      //console.log(data)
      nonce = data.nonce
      //once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
      // and also total to be charged
      // console.log('send nonce and total to process: ',nonce,getTotal
      // (foodPlans)) 
      
      const paymentData = {
        paymentMethodNonce:nonce,
        amount: getTotal(foodPlans)
      }

      processPayment(userId,token,paymentData)
      .then(response => {
        console.log('85',response)
        const createOrderData = {
          foodPlans: foodPlans,
          transaction_id:response.transaction.id,
          amount:response.transaction.amount,
          address:values.address
        }

        createOrder(userId,token,createOrderData)
        .then(response => {
          emptyCart(()=>{
            console.log('payment success and empty cart');
            setValues({...values,loading:false,success:true})
          });
        }).catch( error => {
          console.log(error);
          setValues({...values,loading:false})
        })
        
        // emptyCart(()=>{
        //   console.log('payment success and empty cart');
        //   setValues({...values,loading:false})
        // });
        //create order
        //add loading
      })
      .catch(error => {
        console.log(error)
        setValues({...values,loading:false})
      })
    })
    .catch(error => {
      //console.log('dropin error:',error)
      setValues({...values,error:error.message})
    })
  }

  const showDropIn = () => (
    <div onBlur={() => setValues({...values,error: ''})}>
      {values.clientToken !== null && foodPlans.length >0 ? (
        <div>
          <div className="form-group mb-3">
            <label className="text-muted">Delivery address:</label>
            <textarea 
              onChange={handleAddress}
              className="form-control"
              value={values.address}
              placeholder="Type your delivery address here ..."  
            />
          </div>
          {/* {console.log('135',foodPlans)} */}
          <DropIn 
            options={{
              authorization:values.clientToken,
              paypal:{
                flow:'vault'
              }
            }} 
            onInstance={instance => (values.instance = instance)} 
            />
            <button onClick={buy} className="checkout-pay">PAY</button>
        </div>
      ) : null}
    </div>
  )

  const showError = (error) => (
    <Fade top>
    <div className="alter alert-danger" style={{display:error ? '' : 'none' ,textAlign:"center",font:"inherit",height:'3rem',paddingTop:'10px'}}>
      {isAuthenticated() ? error : "Please Log In" }
    </div>
    </Fade>
  )

  const showSuccess = (success) => (
    <Fade top>
    <div className="alter alert-info" style={{display:success ? '' : 'none' ,textAlign:"center",font:"inherit",height:'3rem',paddingTop:'10px'}}>
      Thanks! Your payment is successfull 
    </div>
    </Fade>
  )

  return (
    <React.Fragment>
    {values.loading && (<Modal show={values.loading}>
      <Loading/>
     </Modal>)}
    <div>
      <h2>Total :  <i class="fa fa-inr">{getTotal()} </i> </h2>
      {showError(values.error)}
      {showSuccess(values.success)}
      {showCheckout()}
    </div>
    </React.Fragment>
  )
}

export default Checkout;