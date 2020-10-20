const HttpError = require('../models/errorModal/httpError');
const {Order} = require('../models/orderSchema');

const orderById = async (req,res,next,orderId) => {
  let order
  try{
    order = await Order.findById(orderId)
    .populate('foodPlans.foodPlan','name price')
  }catch(err){
    const error = new HttpError(
      'creating ordebyId failed',500
    );
    return next(error);
    //  console.log(err)
    
  }
  req.order = order;
  next();
}

const addOrder = async (req,res,next) => {
  // console.log("create order: ",req.body);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  try{
    await order.save()
  }catch(err){
    const error = new HttpError(
      'creating order failed',500
    );
    return next(error);
  }

  res.status(201).json({order})
}

const listOrders = async (req,res,next) => {
  
  let orders;
  try{
    orders = await Order.find()
    .populate('user','_id username')
    .sort('-created')
  }catch(err){
    const error = new HttpError(
      'getting orders failed',500
    );
    return next(error);
  }
  res.status(200).json({orders});
  
}

const getStatusValues = (req,res,next) => {
  res.status(200).json({statusValues: Order.schema.path("status").enumValues});
}

const updateOrderStatus =async (req,res,next) => {
  let order;
  console.log('58',req.body);
  try{
    order = await Order.updateOne({_id:req.body.orderId},{$set:{status:req.body.status}})
  }catch(err){
    const error = new HttpError(
      'updating  order failed',500
    );
    return next(error);
  }
  res.status(200).json({order})
} 

exports.updateOrderStatus = updateOrderStatus;
exports.orderById = orderById;
exports.getStatusValues = getStatusValues;
exports.listOrders = listOrders;
exports.addOrder = addOrder;