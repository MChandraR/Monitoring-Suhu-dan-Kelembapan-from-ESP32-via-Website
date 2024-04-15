const express = require("express");
const {createServer} = require("http");
const moment = require('moment-timezone');

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
    let waktuSekarang = new Date();
    waktuSekarang = moment(waktuSekarang).tz('Asia/Jakarta');
    waktuSekarang = new Date(waktuSekarang);
    // Mendapatkan komponen waktu
    const tahun = waktuSekarang.getFullYear();
    const bulan = String(waktuSekarang.getMonth() + 1).padStart(2, '0'); // Perlu ditambah 1 karena indeks bulan dimulai dari 0
    const hari = String(waktuSekarang.getDate()).padStart(2, '0');
    const jam = String(waktuSekarang.getHours()).padStart(2, '0');
    const menit = String(waktuSekarang.getMinutes()).padStart(2, '0');
    const detik = String(waktuSekarang.getSeconds()).padStart(2, '0');

    // Membuat string dengan format yang diinginkan
    const waktuFormatted = `${tahun}-${bulan}-${hari} ${jam}:${menit}:${detik}`;

    
    if(body.id!=null && body.id!=""){
        data[body.id] = {
            "location" : body.location,
            "temp" : body.temp,
            "hum" : body.hum,
            "last_update" : waktuFormatted
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

