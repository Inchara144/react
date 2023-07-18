const { response } =require("express");
const express = require("express");
const Countries = require("../models/countries");
const router = express.Router();


// Get all users

router.get("/countries", async (req, res) => {
    try {
        const countries = await Countries.find();
        console.log("Users Retrived from database :", countries);
        res.send(countries);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

router.get("/countries/:id", async (req, res) => {
    try {
        const countries = await Countries.findOne({ _id:req.params.id })
        if(countries)
        res.send(countries)
        else
        res.status(404).json({message:"User not found"});
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
});

router.patch("/countries/:id",async(req,res)=>{
    try{
        const countries= await Countries.findOne({ _id:req.params.id});

        //ksfbkhsbgfs
        if(req.body.name){
            countries.name=req.body.name;
        }
        if(req.body.countryid){
            countries.countryid=req.body.countryid;
        }
        await countries.save()
        res.send(countries)
    }
    catch(err){

    }
})

router.delete("/countries:id", async(req,res)=>
{
    try{
        await Countries.deleteOne({ _id:req.params.id});
        res.status(204).send();
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})

router.post("/countries", async (req, res) => {
    console.log("request object",JSON.stringify(req.body));
    try {
        const countries = new Countries({
            //hdsfgjds,
                name:req.body.name,
                countryid:req.body.countryid,      
        })
        console.log("Data to be pushed to the database",countries)
        await countries.save();
        res.send(countries);
    }
    catch (error) {
        res.status(500).JSON({message:error.message});
    }
}
);

module.exports = router;