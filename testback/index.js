const express = require ("express");

const app = express();


const port = 7550;

app.get("/", (req, res) => {
    return res.send("Home page");
});

const admin = (req,res) => {
    return res.send("This is admin dashboard");
};

const isAdmin = (req, res, next) => {
    console.log("isAdmin is running")
    next();
};
const isLoggedin = (req, res,next) => {
    console.log("isLoggedin is running")
    next();
};


app.get("/admin",isLoggedin,isAdmin, admin);

app.get("/login", (req, res) => {
    return res.send("you are visiting a login route");
});

app.get("/signup", (req, res) => {
    return res.send("you are visiting signup route");
});

app.listen(port, () => {
    console.log("server is up and running..");
});



//const port = 3000

//app.get('/', (req, res) => { res.send('Hello World!') })

//app.listen(port, () => {
  //console.log(`Example app listening at http://localhost:${port}`)
//})
