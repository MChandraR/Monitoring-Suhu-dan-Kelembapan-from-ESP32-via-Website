const express = require("express");
const {createServer} = require("http");

const server = express();
const httpServer = createServer(server);

server.get("/",(req,res)=>{
    res.send("hallo");
})

httpServer.listen(3000);
