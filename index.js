const express = require("express");
const app = express();
const port = 3000;

app.get("/", (request, response) => {
    response.send("ok");
});

app.get("/test", (request, response) => {
    response.send(" {status:200, message:'ok'}");
});

var time = new Date().getHours()  + ":" + new Date().getMinutes()

console.log(time)
app.get("/time", (request, response) => {
    response.send(" {status:200, message:"+ time+ "}");
});

app.get('/hello/:ID', (request, response) => {
    const ID = request.params.ID;
    response.send(" {status:200, message: hello "+ ID+ "}");
});