const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerschema= new Schema({
    customer_id:{type:String,required:true},
    customer_name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    balance:{type:Number,required:true},
    
})
module.exports=customerschema;