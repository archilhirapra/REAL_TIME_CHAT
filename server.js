const express = require ("express");
const app = express();
const http = require("http").createServer(app);

app.use(express.static(__dirname + "/public"))

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
});

const PORT = process.env.PORT || 3000;

http.listen(PORT,()=>{
    console.log(`Server Running On ${PORT}`)
});

// SOKET IO
const io = require("socket.io")(http);

io.on("connection", (socket)=>{
    console.log("Connected...")
    socket.on("message", (msg)=>{
        // console.log(msg);
        socket.broadcast.emit("message",msg)
    })
})