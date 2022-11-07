const express=require("express");
var bodyParser = require('body-parser');
const mongoose=require("mongoose")
const app=express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
const orderschema=require("./Schemas/orderschema");
const productschema=require("./Schemas/productschema");
const customerschema=require("./Schemas/customerschema");
const { application } = require("express");
mongoose.connect('mongodb://localhost/api_web_tech_assignment');
const customersdata=mongoose.model("customer",customerschema);
const productsdata=mongoose.model("product",productschema);
const ordersdata=mongoose.model("order",orderschema);

app.post("/product",async (req,res)=>{
    try{
        const data={
            product_id:req.body.product_id,
            product_type:req.body.product_type,
            product_name:req.body.product_name,
            product_price:req.body.product_price,
            available_quantity:req.body.available_quantity
        }
        const productspost= await productsdata.create(data);
        res.json({
            "data":data
        })

    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })

    }
})

app.post("/customer",async (req,res)=>{
    try{
        const data={
            customer_id:req.body.customer_id,
            customer_name:req.body.customer_name,
            email:req.body.email,
            balance:req.body.balance
        }
      const postcustomer=await customersdata.create(data);
        res.json({
            "data":data
        })

    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })

    }
})

app.post("/orders",async (req,res)=>{
    try{
        const data={
            order_id:req.body.customer_id,
            product_id:req.body.product_id,
            product_name:req.body.product_name,
            quantity:req.body.quantity
            
        }
        
       const postorders=await ordersdata.create(data);
        res.json({
            "data":data
        })

    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })

    }
})
//get requests
app.get("/orders/:OrderID",async(req,res)=>{
    try{
        
        let result=req.url.split("/");
       const order=await ordersdata.find({order_id:result[2]});
       res.json({
        "orderdetails":order
       })  

    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })
    }
})

app.get("/product/:productID",async(req,res)=>{
    try{
        let result=req.url.split("/");
       const product=await productsdata.find({product_id:result[2]});
       res.json({
        "productdetails":product
       }) 

    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })

    }
})

app.get("/customer/:customerID",async(req,res)=>{
    try{
        let result=req.url.split("/");
        console.log(result)
       const customer=await customersdata.find({customer_id:result[2]});
       res.json({
        "customerdetails":customer
       }) 

    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })

    }
})

app.get("/product/:productType",async(req,res)=>{
    try{
        let result=req.url.split("/");
        const producttype=await productsdata.find({product_type:result[2]});
        res.json({
         "producttype":producttype
        }) 
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })

    }
})
//updating data
app.get("/:email/:costOfAnOrder",async(req,res)=>{
    try{
        let result=req.url.split("/");
        let mail=result[1];
        let costoforder=result[2];
        let currbalance=await customersdata.find({email:mail});
        let updatedbalance=currbalance-costoforder;
         //updating balance
         await customersdata.updateOne({email:mail},{$set:{balance:updatedbalance}})
    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })

    }
})

app.put("/:productName/:availableQuantity",async(re,res)=>{
    try{
        let result=req.url.split("/");
        let productname=result[1];
        let availablequantity=result[2];
        await productsdata.updateOne({product_name:productname},{$set:{available_quantity:availablequantity}}) 

    }
    catch(e){
        console.log(e)
        res.status(400).json({
            status: 'Failed',
            message: e.message
        })
        
    }
})
app.listen((3000),()=>{console.log("server is up at port 3000")})