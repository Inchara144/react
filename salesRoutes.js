const { response } =require("express");
const express = require("express");
const Sales = require("../models/sales");
const router = express.Router();


// Get all users

router.get("/sales", async (req, res) => {
    try {
        const sales = await Sales.find();
        console.log("Users Retrived from database :", sales);
        res.send(sales);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

router.get("/sales/:id", async (req, res) => {
    try {
        const sales = await Sales.findOne({ _id:req.params.id })
        if(sales)
        res.send(sales)
        else
        res.status(404).json({message:"User not found"});
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
});

router.patch("/sales/:id",async(req,res)=>{
    try{
        const sales= await Sales.findOne({ _id:req.params.id});

        if(req.body.countryid){
            sales.countryid=req.body.countryid;
        }
        if(req.body.category){
            sales.category=req.body.category;
        }
        await sales.save()
        res.send(sales)
    }
    catch(err){

    }
})

router.delete("/sales:id", async(req,res)=>
{
    try{
        await Sales.deleteOne({ _id:req.params.id});
        res.status(204).send();
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})

router.post("/sales", async (req, res) => {
    console.log("request object",JSON.stringify(req.body));
    try {
        const sales = new Sales({
            countryid:req.body.countryid,
            category:req.body.category,
        })
        console.log("Data to be pushed to the database",sales)
        await sales.save();
        res.send(sales);
    }
    catch (error) {
        response.status(500).JSON({message:error.message});
    }
}
);

module.exports = router;
