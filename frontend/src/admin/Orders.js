import React, { useState,useEffect } from 'react';

import adminAPI from './adminAPI';
import moment from 'moment';
import authAPI from '../authAPI/authAPI';

const Orders = () =>{
  const [values,setValues] = useState({
    orders:[]
  })
  const [statusValues,setStatusValues] = useState([]);

  const {orders} = values;

  const {userId,token} = authAPI.isAuthenticated()

  const loadOrders = () => {
    adminAPI.listOrders(userId,token)
    .then(data => {
      if(data.error){
        console.log(data.error)
      }else{
        setValues({...values,orders: data.orders})
      }
    })
  }

  const loadStatusValues = () => {
    adminAPI.getStatusValues(userId,token)
    .then(data => {
      if(data.error){
        console.log(data.error)
      }else{
        setStatusValues(data.statusValues);
        console.log('36-state',statusValues)
      }
    })
  }

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  },[])

  const showOrdersLength = () => {
    if(orders && orders.length > 0){
      return (
      <h1 className="text-danger display-2">Total orders:{orders.length}</h1>
      )
    }else{
      return <h1 className="text-danger">No orders</h1>
    }
  };

  const showInput = (key,value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  )

  const handleStatusChange = (e,orderId) => {
    adminAPI.updateOrderStatus(userId,token,orderId,e.target.value)
    .then(data => {
      if(data.error){
        console.log('68',data.error)
      }else{
        loadOrders()
      }
    })
  }

  // const handleStatusChange =event => (orderId) => {
  //   console.log('update order status');

  // }

  const showStatus = (order) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {order.status}</h3>
      <select className="form-control" onChange={(event) => handleStatusChange(event,order._id)}
      
      >
        {/* <select className="form-control" onChange={ handleStatusChange(order._id)} */}
        <option>Update Status</option>
        {statusValues.map((status,index)=>(
          <option key={index} value={status}>{status} </option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        {showOrdersLength()}
        {orders && orders.map((order,orderIndex)=>{
          return (
            <div className="mt-5" key={orderIndex} style={{borderBottom:"5px solid indigo"}}>
              <h2 className="mb-5">
                <span className="bg-primary">Order Id:{order._id}</span>
              </h2>
              <h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">
                    {showStatus(order)}
                  </li>
                  <li className="list-group-item">
                    Transaction ID:{order.transaction_id}
                  </li>
                  <li className="list-group-item">
                    Amount:{order.amount}
                  </li>
                  <li className="list-group-item">
                    Ordered by:{order.user.username}
                  </li>
                  <li className="list-group-item">
                    Ordered on : {moment(order.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                   Delivery address : {order.address}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4 font-italic">
                  Total FoodPlans in the order:{order.foodPlans.length}
                </h3>
                
                {order.foodPlans.map((f,fIndex) => (
                  <div className="mb-4" key={fIndex} style={{padding:'20px',border:'1px solid indigo'}}>
                    {showInput('FoodPlan name',f.name)}
                    {showInput('FoodPlan price',f.price)}
                    {showInput('FoodPlan total',f.count)}
                    {showInput('FoodPlan Id',f._id)}
                  </div>
                )
                )}
              </h2>
              {/* {JSON.stringify(orders)} */}
              {JSON.stringify(statusValues)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Orders;