const HttpError = require('../models/errorModal/httpError');
const userSchema = require('../models/userSchema');
const braintree = require('braintree');
require('dotenv').config();

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId:process.env.BRAINTREE_MERCHANT_ID || '95sqx7npwh6x5kdm',
  publicKey: process.env.BRAINTREE_PUBLIC_KEY || 'whd37fp5w2tt8kzp',
  privateKey:process.env.BRAINTREE_PRIVATE_KEY || 'bb931a765f0887c09e1ffd7591e0af9c'
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