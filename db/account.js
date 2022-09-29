const mongoose=require("mongoose")
const login=require("./login")
let Schema=new mongoose.Schema({
    accountName:String,
    accountTime:Date,
    accountAbout:{
        type:mongoose.Schema.Types.ObjectId,
        ref:login
    }
})
module.exports=mongoose.model("mongoAccount",Schema)
