const HttpError = require('../models/errorModal/httpError');
const userSchema = require('../models/userSchema');
const jwt = require('jsonwebtoken'); //to generate signed token
const {JWT_SECRET} = require('../keys');
const bcrypt = require('bcryptjs');

const signup = async (req,res,next) => {
  const {username,email,password} = req.body;
  let existingUser;
  try{
    existingUser  = await userSchema.findOne({email:email});
  }catch(err){
    const error = new HttpError(
      'creating user failed,please try again',500
    );
    return next(error);
  }
  
  if(existingUser){
    const error = new HttpError(
      'user already exists,please use different email or login',500
    );
    return next(error);
  }

  let hashedPassword;
  try{
    hashedPassword = await bcrypt.hash(password,12);
  }catch(err){
    const error = new HttpError(
      'creating user failed,please try again',500
    );
    return next(error);
  }

  const newUser = new userSchema({
    username,
    email,
    password: hashedPassword
  })

  try{
    await newUser.save();
  }catch(err){
    const error = new HttpError(
      'creating user failed,please try again',500
    );
    return next(error);
  }
  //generate a signed token
  let token;
  try{
    token=jwt.sign(
      {userId:newUser._id,email:newUser.email},
      JWT_SECRET
    )
  }catch(err){
    const error = new HttpError(
      'creating user failed,please try again',500
    );
    return next(error);
  }
  //persist the token as 't' in cookie with expiry date
  res.cookie('t',token,{expire : new Date() + 9999})
  //return response with user and token to frontend 
  res.status(201).json({
      userId: newUser._id,
      email:newUser.email,
      username:newUser.username,
      role:newUser.role,
      token:token
  });
}

const login = async (req,res,next) => {

  const {email,password} = req.body;
  
  let existingUser;
  try{
    existingUser= await userSchema.findOne({email:email});
   ;
  }catch(err){
    const error = new HttpError(
      'logging in failed, please try again',500
    );
    return next(error);
  }


  if(!existingUser ){
    const error = new HttpError(
      'user doesnt exist, check your credentials',500
    );
    return next(error);
  }

  let isValidPassword = false;
  try{
    isValidPassword = await bcrypt.compare(password,existingUser.password);
    
  }catch(err){
    const error = new HttpError(
      'logging in failed, please try again',500
    );
    return next(error);
  }  
  
  if(!isValidPassword){
    const error = new HttpError(
      'invalid credentials',500
    );
    return next(error);

  }

  let token;
  try{
    token=jwt.sign(
      {userId:existingUser._id,email:existingUser.email},
      JWT_SECRET,
      {expiresIn:'1h'}
    )
  }catch(err){
    const error = new HttpError(
      'logging in failed,please try again',500
    );
    return next(error);
  }
  // res.cookie('t',token,{expire : new Date() + 9999})

  res.status(200).json({
    userId: existingUser._id,
    email:existingUser.email,
    username:existingUser.username,
    role:existingUser.role,
    token:token
  });
}

const signout = (req,res,next) => {
  // res.clearCookie('t');
  res.json({message:'Signout Success'});

}

const checkAuth = (req,res,next) => {
  
  try{
    const token = req.headers.authorization.split(' ')[1]; //Authorization 'Bearer TOKEN'
    if(!token){
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token,JWT_SECRET);
    req.userData = {userId : decodedToken.userId};
    next();
  }catch(err){
    const error = new HttpError(
      'authentication failed',500
    );
    return next(error);
  }

}

const isAuth = (req,res,next) => {
 
  let user =req.profile && req.userData && req.profile._id == req.userData.userId
  
  if(!user){
    return res.status(403).json({error: 'Access denied'})
  }
  next();
}

const isAdmin = (req,res,next) => {
  if(req.profile.role === 0){
    return res.status(400).json({error : 'Admin resource, access denied!'})
  }
  next();
}

exports.isAuth = isAuth;
exports.isAdmin = isAdmin;
exports.checkAuth = checkAuth;
exports.signout = signout;
exports.signup = signup;
exports.login = login;

