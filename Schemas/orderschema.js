const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderschema= new Schema({
    order_id:{type:String,required:true},
    product_id:{type:String,required:true},
    product_name:{type:String,required:true},
    quantity:{type:Number,required:true},
})
module.exports=orderschema;