const express=require("express")
const router=express.Router()
const {setLogin,createUser,amendUser,removeUser} =require("../../manage/handleLogin")

router.post("/submit", async (req,res)=>{
  let doc=await setLogin(req.body)
  if(doc.code){
    req.session.adminRoot=doc
  }
    res.send(doc)

})
//免登录
router.post("/check",(req,res)=>{
  if(req.session.adminRoot){
    res.send({code:1,value:"免登录成功",data:req.session.adminRoot})
  }else {
    res.send({code:0,value:"session不存在",data: {}})
  }

})
//退出登录
router.get("/out", (req, res) => {
  req.session.destroy()
  res.send({code: 1, value: "退出登录成功",data:{}})
})
router.post("/Add", async (req,res)=>{
  let doc=await createUser(req.body)
  res.send(doc)
})
router.post("/remove", async (req,res)=>{
  await removeUser(req.body)
  res.send({code:1,value:"用户删除成功",data: {}})
})
router.post("/amend", async (req,res)=>{
 let doc= await amendUser(req.body)
  res.send(doc)
})
module.exports=router
