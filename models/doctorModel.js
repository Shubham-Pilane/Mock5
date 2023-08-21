const mongoose=require("mongoose")

const doctorSchema=mongoose.Schema({
    name:{type:String},
    image:{type:String},
    specialization :{type:String},
    experience:{type:Number},
    location:{type:String},
    date:{type:Date},
    slots :{type:Number},
    fee:{type:Number},
})

const Doctor=mongoose.model("doctor",doctorSchema)

module.exports={
    Doctor
}