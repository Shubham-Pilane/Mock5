const mongoose=require("mongoose")
require("dotenv").config()

const connection=mongoose.connect("mongodb+srv://shubham:queen@cluster0.x5cpuw5.mongodb.net/Mock5?retryWrites=true&w=majority")

module.exports={
    connection
}