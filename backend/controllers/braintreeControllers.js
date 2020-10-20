const HttpError = require('../models/errorModal/httpError');
const userSchema = require('../models/userSchema');
const braintree = require('braintree');
require('dotenv').config();

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId:process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey:process.env.BRAINTREE_PRIVATE_KEY
})

const generateToken = (req,res,next) => {
  gateway.clientToken.generate({},function(err,response){
    if(err){
      const error = new HttpError(
        'creating braintree token failed,please try again',500
      );
      return next(error);
    }else{
      res.send(response);
    }
  })
}

const processPayment = (req,res,next) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  //charge the user
  let newTransaction = gateway.transaction.sale({
    amount: amountFromTheClient,
    paymentMethodNonce:nonceFromTheClient,
    options:{
      submitForSettlement:true
    }
  },(err,result) => {
    if(err){
      const error = new HttpError(
        'getting payment failed,please try again',500
      );
      return next(error);
    }else{
      res.status(200).json(result);
    }
  })
}

exports.processPayment = processPayment;
exports.generateToken = generateToken;