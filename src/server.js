import Socket from "socket.io";
import http from "http";

import server from "./app";

const httpServer = http.createServer(server);

const io = new Socket(httpServer);

io.on("connection", socket => {
  console.log(`Socket ID : ${socket.id}`);
  socket.on("HealthCheck", data => {
    socket.broadcast.emit("HealthCheck", data);
  });
});

httpServer.listen(3500);
