const express = require("express")
const router = express.Router()
const axios = require("axios")
const mongoAccount = require("../../db/account")
const mongoWares = require("../../db/wares")
const mongoLogin = require("../../db/login")
const mongoRoles = require("../../db/roles")
const path = require("path");
const {powersAdd} = require("../../manage/handRoles");
// 配置天气路由
router.get("/weather", async (req, res) => {
    // let {data} = await axios.get("http://pv.sohu.com/cityjson?ie=utf-8")
    // // 剪切的时候  市字不能存在
    // let url = data.split("省")[1].split('市')[0];
    axios.get(`https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=${encodeURIComponent("成都")}`)
        .then(({data}) => {
            res.send({
                code: 1, value: "天气测试", data: {
                    value: data.data[0],
                    city: data.city,
                    update_time: data.update_time,
                }
            })
        })
        .catch(() => {
            res.send({code: 0, value: "天气获取失败", data: {}})
        })


})
// 获取商品分类
router.get("/goods", async (req, res) => {
    let doc = await mongoAccount.find({}, {}, {sort: {_id: -1}})
    res.send({code: 1, value: "商品分类获取成功", data: doc})
})
// 获取商品分类页面
router.get("/accPage", async (req, res) => {
    let {current, pageSize} = req.query
    let size = current * pageSize - pageSize
    let doc = await mongoAccount.find({}, {}, {skip: size, limit: pageSize})
    res.send({code: 1, value: "分页获取成功", data: doc})
})
router.get("/shop", async (req, res) => {
    let doc = await mongoWares.find({})
    let len = doc.length
    let data = doc.splice(0, 10)
    res.send({code: 1, value: "获取商品成功", data: {len, data}})
})
router.get("/search", async (req, res) => {
    let val = req.query
    if (val.age) {
        let doc = await mongoWares.find()
        let len = doc.length
        let data = doc.splice(0, 10)
        res.send({code: 1, value: "获取默认商品成功", data: {len, data}})
    } else if (val.name) {
        let doc = await mongoWares.find({nickname: val.name})
        let len = doc.length
        let data = doc.splice(0, 10)
        res.send({code: 1, value: "获取分类商品成功", data: {len, data}})
    } else if (val.title) {
        let doc = await mongoWares.find({nameThe: val.title})
        let len = doc.length
        let data = doc.splice(0, 10)
        res.send({code: 1, value: "获取商品名称成功", data: {len, data}})
    }


})
router.get("/shopPage", async (req, res) => {
    let {val, age, ware, input} = req.query
    let size = val * age - age
    let doc
    switch (ware) {
        case "默认":
            doc = await mongoWares.find({}, {}, {skip: size, limit: age})
            res.send({code: 1, value: "分页默认成功", data: doc})
            break;
        case "分类搜索":
            doc = await mongoWares.find({nickname: input}, {}, {skip: size, limit: age})
            res.send({code: 1, value: "分类搜索获取成功", data: doc})
            break;
        case "名称搜索":
            doc = await mongoWares.find({nameThe: input}, {}, {skip: size, limit: age})
            res.send({code: 1, value: "名称搜索获取成功", data: doc})
            break;
    }


})
router.get("/roles", async (req, res) => {

    let doc = await mongoRoles.find()
    let len = doc.length
    let data = doc.splice(0, 10)
    res.send({code: 1, value: "获取角色成功", data: {data, len}})
})
router.get("/rolesAll", async (req, res) => {
    let doc = await mongoRoles.find({})
    res.send({code: 1, value: "获取所有角色成功", data: doc})
})
router.get("/user", async (req, res) => {
    let doc = await mongoLogin.find({}).populate("LoginAbout", {roleName: 1})
    let len = doc.length
    let data = doc.splice(0, 10)
    res.send({code: 1, value: "获取用户成功", data: {data, len}})
})
router.get("/userPage", async (req, res) => {
    let {num,age} = req.query
    let size= num * age - age
    let doc = await mongoLogin.find({}, {}, {skip: size, limit: age}).populate("LoginAbout", {roleName: 1})
    res.send({code: 1, value: "分页默认成功", data: doc})
})
router.get("/paity/json",(req,res)=>{
    res.sendFile(path.join(__dirname, '../../dataJson/flights.json'))
})
router.get("/paity/hdr",(req,res)=>{
    res.sendFile(path.join(__dirname, '../../dataJson/lake.hdr'))
})
module.exports = router
