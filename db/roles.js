const mongoose = require("mongoose")
let Schema = new mongoose.Schema({
    roleName: String,//角色
    roleAbout: String,
    roleTime: Date,
    roleArr: {
        type: Array,
        default: []
    },//存储权限
    roleShowArr: {
        type: Array,
        default: []
    }
})
module.exports = mongoose.model("mongoRoles", Schema)
