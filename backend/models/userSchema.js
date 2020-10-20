const mongoose= require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:Number,default:0},
    history:{type:Array,default:[]}
  },
  { timestamps:true }
)

module.exports = mongoose.model('User',userSchema);