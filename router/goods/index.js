const express=require("express")
const {goodsAdd,goodsUpdate, goodsDelete,setShop,removeImg,removeShop} = require("../../manage/handGoods");
const router=express.Router()
const multer=require("multer")
const upload=require("../../middleware/multer")

//添加分类路由
router.post("/add",async (req,res)=>{
    let doc=await goodsAdd(req.body,req.session.adminRoot)
    res.send(doc)
})
//修改分类路由
router.post("/update",async (req,res)=>{
    let doc=await goodsUpdate(req.body)
    res.send(doc)
})
//删除分类路由
router.post("/delete",async (req,res)=>{
    await goodsDelete(req.body)
    res.send({code: 1, value: "删除分类成功", data: {}})
})
//图片上传
router.post("/Img",async (req, res)=>{
   await upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.  上传错误
            return res.send({code:0,value:"上传错误",data:{}})
        } else if (err) {
            // An unknown error occurred when uploading.  未知错误
            return res.send({code:0,value:"未知错误",data:{}})
        }
        let imgUrl = "reactImg/" + req.file.filename
        return res.send({code:1,value:"获取分类",data:{imgUrl}})
    })
})

router.post("/shopAdd",async (req, res)=>{
  let doc=  await setShop(req.body,req.session.adminRoot)
    res.send({code: 1, value: "商品添加成功", data:doc})
})

router.post("/imgRemove",async (req, res)=>{
     await removeImg(req.body)
    res.send({code: 1, value: "商品图片删除成功", data:{}})
})
//删除商品
router.post("/shopDelete",async (req, res)=>{
    await removeShop(req.body)
    res.send({code: 1, value: "商品删除成功", data:{}})
})
module.exports=router
