const express = require("express");
const app = express();

const path = require("path");
const http = require("http");
const {Server} = require("socket.io");

const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(path.resolve("")));

app.get("/", (req,res)=>{
    return res.sendFile("index.html");
})

io.on("connection",(socket)=>{

    socket.on('find',(e))
})

server.listen(3000, ()=>{
    console.log("Server running on port 3000");
})