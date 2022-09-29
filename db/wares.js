const mongoose=require("mongoose")
const login = require("./login");
let Schema=new mongoose.Schema({
    confirm:String,
    goodsImg:Array,
    nameThe:String,
    nickname:String,
    text:String,
    waresTime:Date,
    waresAbout:{
        type:mongoose.Schema.Types.ObjectId,
        ref:login
    }
})
module.exports=mongoose.model("mongoWares",Schema)
