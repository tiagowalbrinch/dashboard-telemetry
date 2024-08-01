import { io } from "socket.io-client";
import EventSource from "eventsource";

const udpClient = () => {
  const udp = require("dgram");

  const client = udp.createSocket("udp4");

  // Parse the JSON string to get the original object
  client.on("message", function (msg, info) {
    const jsonStringFy = msg.toString("utf-8");
    const reconstructedObject = JSON.parse(jsonStringFy);
    console.log(reconstructedObject);
  });

  const data = Buffer.from("Send car data");

  client.send(data, 7788, "localhost", function (error) {
    if (error) {
      console.log(error);
      client.close();
    } else {
      console.log("Data is sent !");
    }
  });
};

const httpClient = () => {
  const socket = io("http://localhost:7788");

  socket.on("connect", () => {
    console.log(socket);
    console.log("Conexão estabelecida com o servidor Socket.io");
  });

  socket.on("atualizacao", (data: any) => {
    const jsonStringFy = data.toString("utf-8");
    const reconstructedObject = JSON.parse(jsonStringFy);
    console.clear();
    console.log(reconstructedObject.speedKmh);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado do servidor Socket.io");
  });
};

const SSEClient = () => {
  const eventSource = new EventSource("http://localhost:7788");

  eventSource.onmessage = function (event) {
    console.log(event.data);
  };
  eventSource.onerror = function (event) {
    console.log("server closed");
  };
};
//httpClient();
//udpClient();
SSEClient();
