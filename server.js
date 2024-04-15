const express = require("express");
const {createServer} = require("http");
const moment = require('moment-timezone');
const { sql } = require("@vercel/postgres");

const server = express();
const httpServer = createServer(server);


server.get("/",(req,res)=>{
    res.send("hallo");
})
httpServer.listen(3000);
server.use(express.json());
server.use(express.static('public'));

let data = {};

server.post("/test",async (req,res)=>{
    console.log(req.body);
    let body = req.body;
    let waktuSekarang = moment().tz('Asia/Jakarta');

    // Membuat string dengan format yang diinginkan
    const waktuFormatted = waktuSekarang.format('YYYY-MM-DD HH:mm:ss');

    
    if(body.id!=null && body.id!=""){
        try {
            const { rows } = await sql`SELECT * FROM data WHERE sensor_id = ${ body.id} `;
            console.log(rows);
            if(rows.length>0){
                await sql`UPDATE data SET location=${ body.location},temp=${ body.temp}, hum=${ body.hum}, last_updated = ${ waktuFormatted} WHERE sensor_id=${ body.id};`;
            }else{
                await sql`INSERT INTO data VALUES (${ body.id}, ${ body.location}, ${ body.temp}, ${ body.hum}, ${ waktuFormatted});`;
            }
            return;
        } catch (error) {
            res.send({
                "status" : "error",
                "data" : error
            });
        }
    }
  
    console.log(data);
    res.send({
        "status" : "berhasil",
        "data" : req.body
    });
});

server.get("/tempdata",async (req,res)=>{
    try {
        const { rows } = await sql`SELECT * from data `;
        res.send(rows);
      } catch (error) {
        res.send(error);
      }
  
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

server.get("/getdata",async (req,res)=>{
    try {
        const { rows } = await sql`SELECT * from data `;
        res.send(rows);
    } catch (error) {
        res.send(error);
    }
});

