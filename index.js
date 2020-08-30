const sassMiddleware = require("node-sass-middleware");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const express = require("express");
const app = express();
const routes = require("./routes/index");

const usePassport = require("./config/passport");
require("dotenv").config();


//Connect DB
require("./config/db");

app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true   
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set view engine & Use Scss
app.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, "public")
}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

usePassport(app);
app.use(flash());
app.use((req, res, next)=>{
    res.locals.user = req.user;
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

//Router setup
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server Start on Port ${PORT}`))