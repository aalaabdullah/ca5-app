import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/PostModel.js";

import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


/// Database connection ...........
//const conn= 'mongodb+srv://admin:csse4103@postitcluster.4bcpa.mongodb.net/postitdb?retryWrites=true&w=majority&appName=postitcluster';
//const conn= 'mongodb+srv://admin:1234@postitcluster.nih0w.mongodb.net/postitdb?retryWrites=true&w=majority&appName=postitcluster';
//const conn=`mongodb+srv://admin:1234@postitcluster.wudc7.mongodb.net/postitdb?retryWrites=true&w=majority&appName=postitcluster`
const conn=`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@postitcluster.wudc7.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority&appName=postitcluster`


mongoose.connect(conn);
//5000
app.listen(process.env.PORT,()=> {
    console.log("You are Connected with server .....")
});

app.post("/registerUser", async(req,res)=> {
        try{
        const user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await user.save() //pushed the data to the collection and send back the data
        console.log(user)
        res.send({user:user, msg:'User data saved successfully!!'}) // send back the massage with user data to the user.. 

    }
    catch(error){
        res.status(500).json({error:error.massage,msg:"Data is not saved successfully"})
    }
    
})

//Express POST route Login
app.post("/login", async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user= await UserModel.findOne({email:email}) //UserModel in slice فيها كل معلومات الجدول 
        if(!user){
            res.status(500).send({msg:"Could not find the user"})
        }
        else if(user.password !== password){
            res.status(500).send({msg:"Authntecation Failed"})
        }
        else{
            res.send({user:user,msg:"Log in succefull"})
        }
    }
    catch(error){
        res.status(500).json({msg:"Unexepted error occure"})
    }
})



app.post("/logout", async(req,res)=>{
    res.status(200).json({msg:"logout succefull"})
})


//POST API - savePost
app.post("/savePost", async (req, res) => {
    try {
      const post = new PostModel({
        postMsg : req.body.postMsg,
        email : req.body.email,
      })
      await post.save();
      res.send({ post: post, msg: "Added." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  })


 //GET API - getPost
app.get("/getPosts", async (req, res) => {
    try {
      // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
      const posts = await PostModel.find({}).sort({ createdAt: -1 });
  
      const countPost = await PostModel.countDocuments({});
  
      res.send({ posts: posts, count: countPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
});
