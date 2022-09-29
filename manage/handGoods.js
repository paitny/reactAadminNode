const mongoAccount=require("../db/account")
const mongoWares=require("../db/wares")
const path=require("path")
const fs=require("fs")
const goodsAdd = async ({valAccount},id) => {
    if(!id) return {code:0,value:"未登录状态",data: {}}
    let doc=await mongoAccount.findOne({accountName:valAccount,accountAbout:id.data._id})
    if(doc) return {code:0,value:"分类已存在",data: {}}
    let result=await mongoAccount.create({accountName:valAccount,accountAbout:id.data._id,accountTime:new Date()})
    return {code:1,value:"分类添加成功",data: result}
}
const goodsUpdate= async ({id,result})=>{
 let doc=  await mongoAccount.findOne({accountName:result})
    console.log(doc)
    if(doc) return {code:0,value:"分类修改失败,已存在该分类",data: {}}
await mongoAccount.updateOne({_id:id},{accountName:result})
    let data= await mongoAccount.find({_id:id})
    return {code:1,value:"分类修改成功",data: data}
}
goodsDelete=async ({id})=>{
    await mongoAccount.deleteOne({_id:id})
}
const setShop=(async ({confirm,goodsImg,nameThe,nickname,text,id},Id)=>{
    let bol = await mongoWares.findById(id)
    if(bol){
        await mongoWares.updateOne({_id:id},{
            confirm,
            goodsImg,
            nameThe,
            nickname,
            text,
        })
        return {}
    }else {
       return  await mongoWares.create({
            confirm,
            goodsImg,
            nameThe,
            nickname,
            text,
            waresTime:new Date(),
            waresAbout:Id.data?._id
        })
    }

})
const removeImg=async (arr)=>{
    if(Array.isArray(arr.arr)){
        arr.arr.forEach((item)=>{
            let url  = path.resolve(__dirname,"../public/"+item.imgUrl)
            fs.unlink(url,()=>{})
        })
    }else{
        let url  = path.resolve(__dirname,"../public/"+arr.imgUrl)
        fs.unlinkSync(url)
        // 删除数据库的图片
        await mongoWares.updateOne({_id:arr.id},{
            $pull:{
                goodsImg:{imgUrl:arr.imgUrl}
            }
        })
    }
}


const removeShop= async ({id,goodsImg})=>{
   await mongoWares.deleteOne({_id:id})
    goodsImg.forEach((item)=>{
        let url  = path.resolve(__dirname,"../public/"+item.imgUrl)
        fs.unlink(url,()=>{})
    })
}
module.exports = {
    goodsAdd,goodsUpdate,goodsDelete,setShop,removeImg,removeShop
}
