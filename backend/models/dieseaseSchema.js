const mongoose= require('mongoose');
const {ObjectId} = mongoose.Schema;

const diseaseSchema = new mongoose.Schema(
  {
    name:{type:String,required:true,trim:true,maxlength:32},
    causes:{type:String,required:true,maxlength:2000},
    symptoms:{type:String,required:true,maxlength:2000},
    category:{type:ObjectId,ref:'Category',required:true},
    photo:{data:Buffer,contentType:String},
    foodPlans:[{type:ObjectId,ref:'Disease'}]
  },
  { timestamps:true }
)

module.exports = mongoose.model('Disease',diseaseSchema);