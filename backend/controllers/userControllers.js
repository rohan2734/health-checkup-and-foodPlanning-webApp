const userSchema = require('../models/userSchema');
const HttpError = require('../models/errorModal/httpError');
const {Order} = require('../models/orderSchema');
const bcrypt = require('bcryptjs');

const userById = async (req,res,next,userId) => {
  
  let user;
  try{
    user = await userSchema.findById(userId);
  }catch(err){
    const error = new HttpError(
      'creating user failed,please try again',500
    );
    return next(error);
  }

  if(!user){
    return res.status(400).json({error:'User not found'})
  }

  req.profile = user;
  next();
  
}

const getUserProfile = (req,res,next) => {
  return res.json(req.profile);
}

const updateUserProfile = async (req,res,next) => {

  const {email,username,password} = req.body;

  let hashedPassword;
  try{
    hashedPassword = await bcrypt.hash(password,12);
  }catch(err){
    const error = new HttpError(
      'creating user failed,please try again',500
    );
    return next(error);
  }


  userSchema.findOneAndUpdate(
    {_id:req.profile._id},
    {$set: {email:email,password:hashedPassword,username:username}},
    {new :true,useFindAndModify:false},
    (err,user) =>{
      if(err){
        return res.status(400).json({
          error:'You are not authorized to perform this action'
        })
      }
      console.log('55',user)
      res.status(200).json({user});
  })
}

const addOrderToUserHistory = (req,res,next) => {
  let history=[]
  // console.log('47',req.body.order.foodPlans);

  req.body.order.foodPlans.forEach((item) => {
    history.push({
      _id:item._id,
      name:item.name,
      description: item.description,
      disease:item.disease,
      quantity: item.count,
      transaction_id:req.body.order.transaction_id,
      amount: req.body.order.amount
    })
  })

  userSchema.findOneAndUpdate({_id:req.profile._id},{$push:{history:history}},{new:true,useFindAndModify:false},
    (err,data) => {
      if(err){
        const error = new HttpError(
          'couldnt update user purchase history',500
        );
        return next(error);
      }
      next();
    })

}

const purchaseHistory = (req,res,next) => {
  Order.find({user: req.profile._id})
  .populate('user','_id username')
  .sort('-created')
  .exec((err,orders) => {
    if(err){
      const error = new HttpError(
        'couldnt update user purchase history',500
      );
      return next(error);
    }
    res.status(200).json(orders);
  })
}


exports.purchaseHistory = purchaseHistory;
exports.addOrderToUserHistory = addOrderToUserHistory;
exports.updateUserProfile = updateUserProfile;
exports.getUserProfile = getUserProfile;
exports.userById = userById;