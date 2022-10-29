const express = require("express");
const app = express();
const path = require("path");
const api = require("./api");
const fs = require("fs");
let port = process.env.PORT || 5000;
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use("/api", api);
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
