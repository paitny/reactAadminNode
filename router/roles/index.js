const express=require("express")
const router=express.Router()
const {rolesAdd,rolesDelete,powersAdd}= require("../../manage/handRoles")
router.post("/add",async (req,res)=>{
   let doc=await rolesAdd(req.body,req.session.adminRoot)
    res.send(doc)
})
router.post("/delete",async (req,res)=>{
    await rolesDelete(req.body)
    res.send({code: 1, value: "角色删除成功",data:{}})
})
router.post("/prowsAdd",async (req,res)=>{
 let doc=   await powersAdd(req.body)
    res.send({code: 1, value: "权限添加",data:doc})
})
module.exports=router
