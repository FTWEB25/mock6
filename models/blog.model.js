const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    userName:String,
    userId:String,
    title:String,
    content:String,
    category:String,
    date:String,
    like:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

const BlogModel=mongoose.model("blog",blogSchema)


module.exports=BlogModel