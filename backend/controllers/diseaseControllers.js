const fs = require('fs');
const formidable =require('formidable');
const lodash = require('lodash');
const diseaseSchema = require('../models/dieseaseSchema');
const HttpError = require('../models/errorModal/httpError');

const diseaseById = async (req,res,next,diseaseId) => {
  let disease;
  try{
    disease = await  diseaseSchema.findById(diseaseId).populate('category').exec();
  }catch(err){
    const error = new HttpError(
      'finding disease id failed',500
    );
    return next(error);
  }

  if(!disease){
    const error = new HttpError(
      'disease id doesnt exist',500
    );
    return next(error);
  }

  req.disease = disease;
  next();
  
}

const getDisease = (req,res,next) => {
  req.disease.photo =  undefined;
  const disease = req.disease;
  return res.json({disease});
}

const addDisease = async (req,res,next) => {
  // console.log(req.body);
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req,(err,fields,files) => {
    if(err){
      return res.status(400).json({
        error: 'Image couldnt be uploaded'
      })
    }
    //check for all fileds
    //console.log(fields);
    const {name,causes,symptoms,category} = fields;

    if(!name || !causes || !symptoms ||!category){
      return res.status(400).json({
        error: 'All fields are required'
      })
    }

    let disease = new diseaseSchema(fields);

    //1kb = 1000
    //1mb =1000000

    if(files.photo){
      if(files.photo > 1000000){
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        })
      }
      disease.photo.data = fs.readFileSync(files.photo.path);
      disease.photo.contentType = files.photo.type;
    }

    disease.save()
    .then(data =>{
      res.status(201).json({disease})
    })
    .catch(err => {
      const error = new HttpError(
        'creating disease failed',500
      );
      return next(error);
    })
  })
}

const removeDisease = async (req,res,next) => {
  let disease = req.disease;
  try{
    await disease.remove();
  }catch(err){
    const error = new HttpError(
      'deleting disease failed',500
    );
    return next(error);
  }
  res.status(200).json({"message":"deleted disease successfully"})
}

const updateDisease = async (req,res,next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req,(err,fields,files) => {
    if(err){
      return res.status(400).json({
        error: 'Image couldnt be uploaded'
      })
    }
    //check for all fileds
    const {name,causes,symptoms,category} = fields;

    if(!name || !causes || !symptoms ||!category){
      return res.status(400).json({
        error: 'All fields are required'
      })
    }

    let disease = req.disease;
    disease = lodash.extend(disease,fields);

    //1kb = 1000
    //1mb =1000000

    if(files.photo){
      if(files.photo > 1000000){
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        })
      }
      disease.photo.data = fs.readFileSync(files.photo.path);
      disease.photo.contentType = files.photo.type;
    }

    disease.save()
    .then(data =>{
      res.status(201).json({disease})
    })
    .catch(err => {
      const error = new HttpError(
        'creating disease failed',500
      );
      return next(error);
    })
  })
}

const getDiseasePhoto = (req,res,next) => {
  if(req.disease.photo.data){
    res.set('Content-Type',req.disease.photo.contentType);
    return res.send(req.disease.photo.data);
  } 
  next();
}

const getDiseasesSearch = (req,res,next) => {
  //create query object to hold search value an dcategory value
  const query = {}
  //assign search value to query.name
  if(req.query.search){
    query.name = {$regex : req.query.search,$options:'i'}
    //assin category value to query.category
    if(req.query.category && req.query.category !== 'All'){
      query.category = req.query.category;
    }
    //find the disease based on query object with 2 properties i.e
    //search and category
    diseaseSchema.find(query,(err,diseases) => {
      if(err){
        const error = new HttpError(
          'getting diseases failed',500
        );
        return next(error);
      }
      res.status(200).json({diseases})
    }).select('-photo').populate('category');
  }
}

const getAllDiseases = async (req,res,next) => {
  // let order = req.query.order ? req.query.order : 'asc';
  // let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  
  let diseases;
  try{
    diseases = await diseaseSchema
    .find()
    .select('-photo')
    .populate('category')
    .limit(limit)
  }catch(err){
    const error = new HttpError(
      'getting diseases failed',500
    );
    return next(error);
  }
  //console.log('184',diseases)
  res.status(200).json({diseases});
  
}

const getAllDiseasesWithoutLimit = async (req,res,next) => {
  // let order = req.query.order ? req.query.order : 'asc';
  // let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  //let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  
  let diseases;
  try{
    diseases = await diseaseSchema
    .find()
    .select('-photo')
    .populate('category')
  }catch(err){
    const error = new HttpError(
      'getting diseases failed',500
    );
    return next(error);
  }
  //console.log('184',diseases)
  res.status(200).json({diseases});
  
}

const getRelatedDiseases = async (req,res,next) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  let diseases;
  try{
    diseases = await diseaseSchema.find({_id:{$ne: req.disease},category: req.disease.category })
    .limit(limit)
    .populate('category','_id name')
  }catch(err){
    const error = new HttpError(
      'getting diseases failed',500
    );
    return next(error);
  }

  res.status(200).json({diseases});
  
} 

const getCategoriesFromDiseases = (req,res,next) => {
  diseaseSchema.distinct('category',{},(err,categories) => {
    if(err){
      return res.status(400).json({
        error: 'categories not found'
      });
    }
    res.json(categories)
  }) 

}

const getDiseasesBySearch = (req, res,next) => {
  // let order = req.body.order ? req.body.order : "desc";
  // let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);
  console.log(req.body.filters)
  for (let key in req.body.filters) {
    
      if (req.body.filters[key].length > 0) {
          // if (key === "price") {
          //     // gte -  greater than price [0-10]
          //     // lte - less than
          //     findArgs[key] = {
          //         $gte: req.body.filters[key][0],
          //         $lte: req.body.filters[key][1]
          //     };
          // } else {
              findArgs[key] = req.body.filters[key];
          // }
      }
  }
        
       // .sort([[sortBy, order]])
       //.limit(limit)
       
  diseaseSchema.find(findArgs)
      .select("-photo")
      .populate("category")
      .exec((err, diseases) => {
          if (err) {
              return res.status(400).json({
                  error: "diseases not found"
              });
          }
          res.json({
              size: diseases.length,
              diseases
          });
      });
};


exports.getDiseasesSearch = getDiseasesSearch;
exports.getDiseasesBySearch = getDiseasesBySearch;
exports.getCategoriesFromDiseases = getCategoriesFromDiseases;
exports.getRelatedDiseases = getRelatedDiseases;
exports.getAllDiseases = getAllDiseases;
exports.getDiseasePhoto = getDiseasePhoto;
exports.updateDisease = updateDisease;
exports.removeDisease =removeDisease;
exports.getDisease = getDisease;
exports.addDisease = addDisease;
exports.diseaseById = diseaseById;
exports.getAllDiseasesWithoutLimit = getAllDiseasesWithoutLimit;