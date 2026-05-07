require('dotenv').config();

const express = require("express");
const express_Layouts = require("express-ejs-layouts");
const session = require ("express-session")



const message_Routes = require("./routes/characterRoute");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express_Layouts);
app.set("layout", "layout");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json())

app.use(session({
    secret: "hemlig-nyckel",
    resave: false,
    saveUninitialized: true
}));

app.use("/", message_Routes);

app.listen(PORT, () => {

    console.log(`Servern körs på http://localhost:${PORT}`);
})