const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productschema= new Schema({
    product_id:{type:String,required:true},
    product_type:{type:String,required:true},
    product_name:{type:String,required:true},
    product_price:{type:Number,required:true},
    available_quantity:{type:Number,required:true},
})
module.exports=productschema;