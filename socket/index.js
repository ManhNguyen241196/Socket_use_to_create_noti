import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUser = []; // mỗi 1 lần vào link thì user với socket id được tạo tương ứng sẽ được lưu
// vào array này và có thể truy xuất tương ứng.

const addNewUser = (userName, socketId) => {
  if (
    !onlineUser.some((user) => {
      return user.userName === userName;
    })
  ) {
    if (userName) {
      onlineUser.push({
        userName: userName,
        socketId: socketId,
      });
    }
  }
};

const removeUser = (socketId) => {
  console.log(socketId, "da roi di");
  onlineUser = onlineUser.filter((user) => {
    return user.socketId !== socketId;
  });
};

const getUser = (userName) => {
  return onlineUser.find((user) => user.userName === userName);
};

io.on("connection", (socket) => {
  socket.on("addUser", (userName) => {
    addNewUser(userName, socket.id);
    console.log("online user laf: ", onlineUser);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    console.log({ senderName, receiverName, type });
    const receiver = getUser(receiverName); // xet xem user đăng bài post có đang online = cách xét xem trong data socket có chứa user đó hay không

    if (receiver) {
      io.to(receiver.socketId).emit("getNotification", {
        // gửi có chọn lọc event tới user có socketId những dữ liệu được nhận từ client từ socket hiện tại.
        senderName,
        type,
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("online user sua khi roi di  laf: ", onlineUser);
  });
});

io.listen(5000);
