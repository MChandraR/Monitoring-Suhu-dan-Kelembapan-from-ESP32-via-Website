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
const path = require('path');

    
server.get("/data",(req,res)=>{
     // Baca isi file sebagai string
  let usersPath = path.join(process.cwd(), 'view.html');
  let fileContents = fs.readFileSync(usersPath, 'utf-8');

  // Kirim isi file sebagai respons
  res.send(fileContents);

});

server.get("/getdata",(req,res)=>{
    res.send(data);
});

