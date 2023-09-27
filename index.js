const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.send("ok");
});

app.listen(3000, () => {
    console.log("port 3000 listening");
});

