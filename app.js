const express=require("express")
const app=express()

app.use(express.static("./public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(require("./middleware/cors"))
app.use(require("./middleware/session"))
require("./middleware/mongoose")
app.use("/",require("./router/index"))
//让后端路径正确的跳转到前端路由
app.get("*", (req, res)=>{
    res.sendFile( require("path").join(__dirname, './public/index.html') )
})

app.listen(7709,()=>{
    console.log("服务启动，端口号7709")
})
