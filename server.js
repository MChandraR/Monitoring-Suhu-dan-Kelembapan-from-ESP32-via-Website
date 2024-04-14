const express = require("express");
const {createServer} = require("http");

const server = express();
const httpServer = createServer(server);

server.get("/",(req,res)=>{
    res.send("hallo");
})

server.post("/test",(req,res)=>{
    console.log(req.body);
    res.send({
        "data" : req.body
    });
});

httpServer.listen(3000);
