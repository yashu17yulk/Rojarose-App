const io = require("socket.io");
const Models = require("../models/index");
const formatMessage = async function (data) {
  console.log("data");
  try {
    const msg = {
      senderId: data.senderId,
      receiverId: data.receiverId,
      message: data.message,
      date: moment().format("YYYY-MM-DD"),
      time: moment().format("hh:mm a"),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = (io) => {
  try {
    io.on("connection", (socket) => {
      console.log("connected");
      socket.send("hello");
      socket.on("chat-message", async function (data) {
        const dataElement = formatMessage(data);
        const dataToSend = await Models.chat.create(dataElement); //save chat in db
        console.log(dataToSend);
        io.to(socket.id).emit("message", dataElement);
      });
      socket.on("disconnected", function () {
        console.log("Disconnect", socket.id);
        io.emit("user disconnected", socket.id);
      });
      socket.on("typing", (data) => {
        io.emit("typing", `${data.username} typing`);
      });
    });
  } catch (error) {
    // io.emit('message', console.log("Hello Sockets Are You Ready"));
    console.log(error);
    throw error;
  }
};
