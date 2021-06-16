const io = require("socket.io")(4000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    socket.on("get-document", (documentId) => {
      const data = "";
      socket.join(documentId);
      socket.emit("load-document", data);
    });
  socket.on("send-changes", (delta) => {
    socket.broadcast.emit("receive-changes", delta);
  });
});
