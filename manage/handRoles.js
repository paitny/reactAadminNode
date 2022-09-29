
const mongoRoles=require("../db/roles")
const rolesAdd=async ({role},Id)=>{
    let bol=await mongoRoles.findOne({roleName:role})
    if(bol)  return({code: 0, value: "已存在该角色", data:{}})
  let doc=await  mongoRoles.create({roleName:role,roleTime:Date.now(),roleAbout:Id.data.LoginName})
    return({code: 1, value: "角色创建成功", data:doc})
}
const rolesDelete=async ({id})=>{
    await mongoRoles.deleteOne({_id:id})
}
const powersAdd=async ({rolData,id})=>{
    await  mongoRoles.updateOne({_id:id},{roleArr:rolData.roleArr,roleShowArr:rolData.roleShowArr})
   return  await mongoRoles.findOne({_id:id})
}
module.exports = {
    rolesAdd,rolesDelete,powersAdd
}
