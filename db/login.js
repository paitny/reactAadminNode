const mongoose=require("mongoose")
const mongoRoles=require("./roles")
let Schema=new mongoose.Schema({
    LoginName:String,
    LoginPass:String,
    LoginTime:Date,
    LoginPhone:Number,
    LoginAbout:{
        type:mongoose.Types.ObjectId,
        ref:mongoRoles
    }
})
module.exports=mongoose.model("mongoLogin",Schema)
