const express=require("express")
const router=express.Router()
const app=express()

//登录
router.use("/login", require("./login/index"))
router.use("/get", require("./get/index"))
router.use("/goods", require("./goods/index"))
router.use("/roles", require("./roles/index"))
module.exports=router
