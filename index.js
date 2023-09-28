const express=require("express")
require("dotenv").config()
const cors=require("cors")
const connection = require("./db")
const userRouter = require("./routes/user.routes")
const blogRouter = require("./routes/blog.routes")

const app=express()


app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/blogs",blogRouter)


app.listen(process.env.PORT,async()=>{
    try {
      await connection
      console.log("conncted to the db")
      console.log(`server is running at port:${process.env.PORT}`)  
    } catch (error) {
        console.log(error.message)
    }
})