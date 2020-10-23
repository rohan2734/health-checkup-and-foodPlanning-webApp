const fs = require('fs');
const formidable =require('formidable');
const lodash = require('lodash');
const foodPlanSchema = require('../models/foodPlanSchema');
 const diseaseSchema = require('../models/dieseaseSchema');
const HttpError = require('../models/errorModal/httpError');
const mongoose = require('mongoose');


const foodPlanById = async (req,res,next,foodPlanId) => {
  let foodPlan;
  try{
    foodPlan = await foodPlanSchema.findById(foodPlanId).populate('disease','name')
  }catch(err){
    const error = new HttpError(
      'finding foodPlan id failed',500
    );
    return next(error);
  }

  if(!foodPlan){
    const error = new HttpError(
      'foodPlan id doesnt exist',500
    );
    return next(error);
  }

  req.foodPlan = foodPlan;
  next();
  
}

const getFoodPlan = (req,res,next) => {
  req.foodPlan.photo =  undefined;
  const foodPlan = req.foodPlan;
  return res.json({foodPlan});
}

const addFoodPlan = async (req,res,next) => {
 
  let form = new formidable.IncomingForm();
  // console.log('38',form);
  form.keepExtensions = true;
  form.parse(req,(err,fields,files) => {
    if(err){
      return res.status(400).json({
        error: 'Image couldnt be uploaded'
      })
    }
    console.log('48',fields);
    //check for all fileds
    const {name,description,price,quantity,disease,shipping} = fields;

    if(!name || !description || !price ||!quantity  ||!disease ||!shipping){
      return res.status(400).json({
        error: 'All fields are required'
      })
    }

    let foodPlan = new foodPlanSchema(fields);


    //1kb = 1000
    //1mb =1000000

    if(files.photo){
      if(files.photo > 1000000){
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        })
      }
      foodPlan.photo.data = fs.readFileSync(files.photo.path);
      foodPlan.photo.contentType = files.photo.type;
    }

   
 
    foodPlan.save()
    .then(data =>{
      res.status(201).json({foodPlan})
    })
    .catch(err => {
      const error = new HttpError(
        'creating foodPlan failed',500
      );
      return next(error);
    })

    res.status(201).json({foodPlan});
  })
}

const removeFoodPlan = async (req,res,next) => {
  let foodPlan = req.foodPlan;
  try{
    await foodPlan.remove();
  }catch(err){
    const error = new HttpError(
      'deleting foodPlan failed',500
    );
    return next(error);
  }
  res.status(200).json({"message":"deleted foodPlan successfully"})
}

const updateFoodPlan = async (req,res,next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req,(err,fields,files) => {
    if(err){
      return res.status(400).json({
        error: 'Image couldnt be uploaded'
      })
    }
    //check for all fileds
    const {name,description,price,quantity,disease,shipping} = fields;

    if(!name || !description || !price ||!quantity  ||!disease ||!shipping){
      return res.status(400).json({
        error: 'All fields are required'
      })
    }

    let foodPlan = req.foodPlan;
    foodPlan = lodash.extend(foodPlan,fields);

    //1kb = 1000
    //1mb =1000000

    if(files.photo){
      if(files.photo > 1000000){
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        })
      }
      foodPlan.photo.data = fs.readFileSync(files.photo.path);
      foodPlan.photo.contentType = files.photo.type;
    }

    foodPlan.save()
    .then(data =>{
      res.status(201).json({foodPlan})
    })
    .catch(err => {
      const error = new HttpError(
        'creating foodPlan failed',500
      );
      return next(error);
    })
  })
}

/**
 * sell/arrival
 * by sell = /foodPlan?sortBy=sold&order=desc&limit=6
 * by arrival = /foodPlan?sortBy=createdAt&order=desc&limit-4
 * if no params are sent, then all products are returned
 */

const getAllFoodPlans = async (req,res,next) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  
  let foodPlans;
  try{
    foodPlans = await foodPlanSchema
    .find()
    .select('-photo')
    .populate('disease')
    .sort([[sortBy,order]])
    .limit(limit)
  }catch(err){
    const error = new HttpError(
      'getting foodPlan failed',500
    );
    return next(error);
  }
  res.send({foodPlans});
  
}

/** 
 * it will find the foodPlans based on the req foodPlan disease
 * other foodPlans that has the same disease,will be returned
*/

const getRelatedFoodPlans = async (req,res,next) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  let foodPlans;
  try{
    foodPlans = await foodPlanSchema.find({_id:{$ne: req.foodPlan},disease: req.foodPlan.disease })
    .limit(limit)
    .populate('disease','_id name')
  }catch(err){
    const error = new HttpError(
      'getting foodPlan failed',500
    );
    return next(error);
  }

  res.status(200).json({foodPlans});
  
} 


// }
/**
 * list foodPlans by search
 * we will implement foodPlans search in react frontend
 * we will show diseases in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the foodPlans to users based on what he wants
 */
 
// route - make sure its post
const getFoodPlansBySearch = async(req, res,next) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
    const diseaseId = req.params.diseaseId;
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
    console.log('263',req.body.filters);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            // } else {
            //     findArgs[key] = req.body.filters[key];
            // }
              }
        }
    }
    console.log('281',findArgs);
    // findArgs2 = findArgs.push({disease:diseaseId});
    findArgs.disease =diseaseId;
    console.log('283',findArgs);
    
    let foodPlans =[];
    try{
      //foodPlans = await foodPlanSchema.find({disease:'5f17b99af546c471e8c1a200'}) 
      foodPlans = await 
      foodPlanSchema.find(findArgs)
      .select('-photo')
      .populate('disease','name')
    }catch(err){
        const error = new HttpError(
          'getting foodPlan failed',500
        );
        return next(error);
        }
    

    res.json({size:foodPlans.length,foodPlans});
    
};

const getFoodPlanPhoto = (req,res,next) => {
  if(req.foodPlan.photo.data){
    res.set('Content-Type',req.foodPlan.photo.contentType);
    return res.send(req.foodPlan.photo.data);
  } 
  next();
}

const getFoodPlansByDisease = async(req,res,next) => {
  const diseaseId = req.params.diseaseId;
  // console.log('308',diseaseId);
  let foodPlans;
  try{
    foodPlans = await foodPlanSchema.find({disease:diseaseId}).select('-photo').populate('disease','name');
  }catch(err){
    const error = new HttpError(
      'getting foodPlans failed',500
    );
    return next(error);
  }

  if(!foodPlans || foodPlans.length === 0){
    const error = new HttpError(
      'no foodPlans found for this disease',500
    );
    return next(error);
  }
  res.status(200).json({foodPlans});
}

const decreaseQuantity = (req,res,next) => {
  let bulkOps = req.body.order.foodPlans.map((item) => {
    return{
      updateOne:{
        filter:{_id: item._id},
        update:{$inc:{quantity: -item.count,sold: +item.count}}
      }
    }
  });
  console.log('376',req.body.order.foodPlans)

  foodPlanSchema.bulkWrite(bulkOps,{},(err,foodPlans) => {
    if(err){
      const error = new HttpError(
        'updating  foodPlan with bulkwrite failed',500
      );
      return next(error);
    }
    next();
  })

}

exports.decreaseQuantity =decreaseQuantity;
exports.getFoodPlanPhoto = getFoodPlanPhoto;
exports.getFoodPlansBySearch = getFoodPlansBySearch;
exports.getFoodPlansByDisease = getFoodPlansByDisease;
//exports.getDiseasesFromFoodPlans = getDiseasesFromFoodPlans;
exports.getRelatedFoodPlans = getRelatedFoodPlans
exports.getAllFoodPlans = getAllFoodPlans;
exports.updateFoodPlan = updateFoodPlan;
exports.removeFoodPlan =removeFoodPlan;
exports.getFoodPlan = getFoodPlan;
exports.addFoodPlan = addFoodPlan;
exports.foodPlanById = foodPlanById;