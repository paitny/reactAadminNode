const mongoLogin = require("../db/login")
const setLogin = async ({username, password}) => {
    // await mongoLogin.create({LoginName:username,LoginPass:password})
    let bol = await mongoLogin.findOne({LoginName: username}).populate("LoginAbout")
    if (!bol) return {code: 0, value: "账号不存在", data: {}};
    if (bol.LoginPass !== password)
        return {code: 0, value: "密码错误", data: {},}
    bol.LoginPass = ""
    return {code: 1, value: "登录成功", data: bol}

}

const createUser = async (values) => {
    let bol = await mongoLogin.findOne({LoginName: values.user})
    if (bol) return {code: 0, value: "账号已存在,请重新添加", data: {}};
    let doc=await mongoLogin.create({
        LoginName: values.user,
        LoginPass: values.pass,
        LoginPhone: values.phone,
        LoginTime: Date.now(),
        LoginAbout:values.role

    })
    let data=await mongoLogin.find(doc._id).populate("LoginAbout",{roleName:1})
    return {code: 1, value: "账号创建成功", data: data}
}
const removeUser=async ({id})=>{
   await mongoLogin.deleteOne({_id:id})
}
const amendUser=async ({values:{user,pass,phone,role},id})=>{
   await mongoLogin.updateOne({_id:id},{

       LoginName: user,
       LoginPass: pass,
       LoginPhone: phone,
       LoginAbout:role
   })
    let doc = await mongoLogin.findById(id).populate("LoginAbout",{roleName:1})
    return {code: 1, value: "账号修改成功", data: doc}
}
module.exports = {
    setLogin, createUser,removeUser,amendUser
}
