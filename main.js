let currentRole = "user";

window.onload = function () {
    const userTab = document.getElementById("userTab");
    const adminTab = document.getElementById("adminTab");

    if (userTab && adminTab) {
        userTab.onclick = function () {
            currentRole = "user";
            userTab.classList.add("active");
            adminTab.classList.remove("active");
        };

        adminTab.onclick = function () {
            currentRole = "admin";
            adminTab.classList.add("active");
            userTab.classList.remove("active");
        };
    }

    // 初始化账号
    if (!localStorage.getItem("users")) {
        const users = [
            { username: "user", password: "123456", role: "user" },
            { username: "admin", password: "123456", role: "admin" }
        ];

        localStorage.setItem("users", JSON.stringify(users));
    }
};

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users"));

    const user = users.find(item =>
        item.username === username &&
        item.password === password &&
        item.role === currentRole
    );

    if (user) {
        alert("登录成功！");

        if (currentRole === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "index.html";
        }
    } else {
        alert("账号或密码错误！");
    }
}
function register() {
    const username = document.getElementById("regUsername").value;
    const phone = document.getElementById("regPhone").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    if (!username || !phone || !email || !password || !confirmPassword) {
        alert("请填写完整信息！");
        return;
    }

    if (password !== confirmPassword) {
        alert("两次密码不一致！");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existUser = users.find(user => user.username === username);

    if (existUser) {
        alert("用户名已存在！");
        return;
    }

    users.push({
        username: username,
        password: password,
        role: "user"
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("注册成功，请登录！");
    window.location.href = "login.html";
}
function addPet() {
    const name = document.getElementById("petName").value;
    const type = document.getElementById("petType").value;
    const age = document.getElementById("petAge").value;

    if (!name || !type || !age) {
        alert("请填写完整宠物信息！");
        return;
    }

    const tableBody = document.getElementById("petTableBody");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${type}</td>
        <td>${age}</td>
        <td>待领养</td>
        <td>
            <button onclick="deletePet(this)">删除</button>
        </td>
    `;

    tableBody.appendChild(row);

    document.getElementById("petName").value = "";
    document.getElementById("petType").value = "";
    document.getElementById("petAge").value = "";

    alert("添加成功！");
}

function deletePet(button) {
    button.parentElement.parentElement.remove();
    alert("删除成功！");
}
function submitApplication() {
    const name = document.getElementById("applyName").value;
    const phone = document.getElementById("applyPhone").value;
    const pet = document.getElementById("applyPet").value;
    const reason = document.getElementById("applyReason").value;

    if (!name || !phone || !pet || !reason) {
        alert("请填写完整信息！");
        return;
    }

    let applications = JSON.parse(localStorage.getItem("applications")) || [];

    applications.push({
        name: name,
        phone: phone,
        pet: pet,
        reason: reason,
        status: "待审核"
    });

    localStorage.setItem("applications", JSON.stringify(applications));

    alert("申请提交成功！");
    window.location.href = "index.html";
}
function approveApplication(button) {
    const row = button.parentElement.parentElement;
    row.cells[3].innerText = "已通过";
    alert("审核通过！");
}

function rejectApplication(button) {
    const row = button.parentElement.parentElement;
    row.cells[3].innerText = "已拒绝";
    alert("已拒绝申请！");
}
function submitRescue() {
    const location = document.getElementById("rescueLocation").value;
    const desc = document.getElementById("rescueDesc").value;
    const contact = document.getElementById("rescueContact").value;

    if (!location || !desc || !contact) {
        alert("请填写完整救助信息！");
        return;
    }

    let rescues = JSON.parse(localStorage.getItem("rescues")) || [];

    rescues.push({
        location: location,
        desc: desc,
        contact: contact,
        status: "待处理"
    });

    localStorage.setItem("rescues", JSON.stringify(rescues));

    alert("救助信息提交成功！");
    
    document.getElementById("rescueLocation").value = "";
    document.getElementById("rescueDesc").value = "";
    document.getElementById("rescueContact").value = "";
}
function handleRescue(button) {
    const row = button.parentElement.parentElement;
    row.cells[3].innerText = "已处理";
    alert("救助信息已处理！");
}