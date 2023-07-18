const { response } =require("express");
const express = require("express");
const User = require("../models/user");
const router = express.Router();


// Get all users

router.get("/user", async (req, res) => {
    try {
        const users = await User.find();
        console.log("Users Retrived from database :", users);
        res.send(users);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id:req.params.id })
        if(user)
        res.send(user)
        else
        res.status(404).json({message:"User not found"});
    }
    catch (err) {
        res.status(400).json({message: err.message})
    }
});

router.patch("/user/:id",async(req,res)=>{
    try{
        const user= await User.findOne({ _id:req.params.id});

        if(req.body.name){
            user.name=req.body.name;
        }
        if(req.body.email){
            user.email=req.body.email;
        }
        if(req.body.password){
            user.password=req.body.password;
        }
        await user.save()
        res.send(user)
    }
    catch(err){

    }
})

router.delete("/user:id", async(req,res)=>
{
    try{
        await User.deleteOne({ _id:req.params.id});
        res.status(204).send();
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
})

router.post("/user", async (req, res) => {
    console.log("request object",JSON.stringify(req.body));
    try {
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })
        console.log("Data to be pushed to the database",user)
        await user.save();
        res.send(user);
    }
    catch (error) {
        response.status(500).JSON({message:error.message});
    }
}
);

module.exports = router;