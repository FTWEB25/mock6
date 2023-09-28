const express = require("express");
const auth = require("../middlewares/auth.middleware");
const BlogModel = require("../models/blog.model");

const blogRouter = express.Router();

blogRouter.get("/", auth, async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json({ blogs: blogs });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

blogRouter.get("/search", auth, async (req, res) => {
  const title = req.query.title;
  try {
    const blogs = await BlogModel.find({ title: title });
    res.status(200).json({ blogs: blogs });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

blogRouter.get("/filter", auth, async (req, res) => {
  const category = req.query.category;
  try {
    const blogs = await BlogModel.find({ category: category });
    res.status(200).json({ blogs: blogs });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

blogRouter.get("/sort", auth, async (req, res) => {
  const order = req.query.order;
  try {
    if (order == "asc") {
      const blogs = await BlogModel.find().sort({ date: 1 });
      res.status(200).json({ blogs: blogs });
    } else if (order == "desc") {
      const blogs = await BlogModel.find().sort({ date: -1 });
      res.status(200).json({ blogs: blogs });
    } else {
      const blogs = await BlogModel.find();
      res.status(200).json({ blogs: blogs });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

blogRouter.post("/create", auth, async (req, res) => {
  const payload = req.body;
  payload.date = Date();
  payload.userName=req.userName
  payload.userId=req.userId
  try {
    const blog = new BlogModel(payload);
    await blog.save();
    res.status(200).json({ msg: "New Blog Has Been Added" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

blogRouter.patch("/update/:id",auth,async(req,res)=>{
    const id=req.params.id
    const userIdInUserModel=req.userId
    //console.log(userIdInUserModel)
    const payload=req.body
    try {
        const blog =await BlogModel.findOne({_id:id})
        //console.log(blog)
        const userIdInBlogModel=blog.userId
        //console.log(userIdInBlogModel)
        if(userIdInUserModel==userIdInBlogModel){
            await BlogModel.findByIdAndUpdate({_id:id},payload)
            res.status(200).json({msg:"Your Blog Has Been Updated Successfully!"})
        }else{
            res.status(400).json({msg:"Not Authorised"})
        }
    } catch (error) {
        res.status(400).json({ msg: error.message }); 
    }
})

blogRouter.delete("/delete/:id",auth,async(req,res)=>{
    const id=req.params.id
    const userIdInUserModel=req.userId
    try {
        const blog=await BlogModel.findOne({_id:id})
        const userIdInBlogModel=blog.userId
        if(userIdInUserModel==userIdInBlogModel){
            await BlogModel.findByIdAndDelete({_id:id})
            res.status(200).json({msg:"Your Blog Has Been Deleted Successfully!"})
        }else{
            res.status(400).json({msg:"Not Authorised"})
        }
    } catch (error) {
        res.status(400).json({ msg: error.message }); 
    }
})

blogRouter.patch("/like/:id",auth,async(req,res)=>{
    const id=req.params.id
    try {
        const blog= await BlogModel.findOne({_id:id})
        blog.like+=1
        await blog.save()
        res.status(200).json({msg:"You have liked"})
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
})

module.exports = blogRouter;
