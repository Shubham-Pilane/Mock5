const express = require("express");
const cors = require('cors');
const { connection } = require("./db");
const bodyParser = require("body-parser");
const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("This is the Home page");
});

let port =8000// Using 3000 as the default port

const authRoute = require("./routes/authRoute");
const doctorRoute = require("./routes/doctorRoute");

app.use("/auth", authRoute);
app.use("/doctors", doctorRoute);

app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to the database!!");
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is live on port ${port}`);
});
