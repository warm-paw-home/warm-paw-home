const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// 允许读取表单和 JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 静态资源目录（前端页面）
app.use(express.static(__dirname));

// 首页
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 登录接口
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "123456") {
        res.json({
            success: true,
            message: "登录成功"
        });
    } else {
        res.json({
            success: false,
            message: "账号或密码错误"
        });
    }
});

// 注册接口
app.post("/register", (req, res) => {
    res.json({
        success: true,
        message: "注册成功"
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器已启动：http://localhost:${PORT}`);
});