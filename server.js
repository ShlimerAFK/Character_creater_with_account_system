const express = require("express");
const express_Layouts = require("express-ejs-layouts");

const message_Routes = require("./routes/charecterRoute");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express_Layouts);
app.set("layout", "layout");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", message_Routes);

app.listen(PORT, () => {

    console.log(`Servern körs på http://localhost:${PORT}`);
})