const express = require("express");
const {createServer} = require("http");

const server = express();
const httpServer = createServer(server);

server.get("/",(req,res)=>{
    res.send("hallo");
})
httpServer.listen(3000);
server.use(express.json());
server.use(express.static('public'));

let data = {};

server.post("/test",(req,res)=>{
    console.log(req.body);
    let body = req.body;
    if(body.id!=null && body.id!=""){
        data[body.id] = {
            "location" : body.location,
            "temp" : body.temp,
            "hum" : body.hum
        };
    }
  
    console.log(data);
    res.send({
        "status" : "berhasil",
        "data" : req.body
    });
});

const fs = require('fs');
const inputFile ='view.html' ;

    
server.get("/data",(req,res)=>{
    fs.readFile(inputFile, 'utf8', async (err, data) => {
        if(err){
            res.send("Error");
            return;
        }
        res.send(data);
    });
    
});

server.get("/getdata",(req,res)=>{
    res.send(data);
});

