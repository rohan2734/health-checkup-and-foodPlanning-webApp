const categorySchema = require('../models/categorySchema');
const HttpError = require('../models/errorModal/httpError');

const categoryById= async (req,res,next,categoryId) => {
  let category;
  try{
    category = await categorySchema.findById(categoryId);
  }catch(err){
    const error = new HttpError(
      'fetching category failed,please try again',500
    );
    return next(error);
  }
  if(!category){
    const error = new HttpError(
      'category doesnt exist',500
    );
    return next(error);
  }

  req.category = category;
  // console.log('22',category);
  next();
  
}

const addCategory = async (req,res,next) => {

  console.log('29',req.body);
  const category = new categorySchema(req.body);
   console.log('30',category)
  try{
    await category.save()
  }catch(err){
    const error = new HttpError(
      'creating category failed',500
    );
    return next(error);
  }
  res.status(201).json({category});

}

const getCategory = (req,res,next) => {
  return res.json(req.category);
}

const updateCategory = async (req,res,next) => {
  const category = req.category;
  category.name = req.body.name;

  try{
    await category.save()
  }catch(err){
    const error = new HttpError(
      'updating category failed',500
    );
    return next(error);
  }
  res.status(200).json({category});

}

const deleteCategory = async (req,res,next) => {
  const category = req.category;
  
  try{
    category.remove();
  }catch(err){
    const error = new HttpError(
      'deleting category failed',500
    );
    return next(error);
  }
  res.json({message:'category deleted'});

}

const getAllCategories = async (req,res,next) => {
  let categories;
  try{
    categories = await categorySchema.find();
    
  }catch(err){
    const error = new HttpError(
      'fetching categories failed',500
    );
    return next(error);
  }
  
  res.status(200).json({categories});
  
}


exports.getAllCategories = getAllCategories;
exports.deleteCategory = deleteCategory;
exports.updateCategory = updateCategory;
exports.getCategory =getCategory;
exports.categoryById = categoryById;
exports.addCategory = addCategory;

