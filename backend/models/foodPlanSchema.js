const mongoose= require('mongoose');
const {ObjectId} = mongoose.Schema;

const foodPlanSchema = new mongoose.Schema(
  {
    name:{type:String,required:true,trim:true,maxlength:32},
    description:{type:String,required:true,maxlength:2000},
    price:{type:Number,required:true,trim:true,maxlength:32},
    quantity:{type:Number,required:true,trim:true,maxlength:32},
    sold:{type:Number,default:0},
    disease:{type:ObjectId,ref:'Disease',required:true},
    photo:{data:Buffer,contentType:String},
    shipping:{required:false,type:Boolean}
  },
  { timestamps:true }
)

module.exports = mongoose.model('FoodPlan',foodPlanSchema);