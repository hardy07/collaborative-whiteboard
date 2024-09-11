const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
let users = [];

wss.on("connection", (ws) => {
  console.log("New user connected");

  users.push(ws);

  // Broadcast user list to all connected clients
  broadcastUserList();

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    // Broadcast drawing data to all connected users except sender
    users.forEach((user) => {
      if (user !== ws && user.readyState === WebSocket.OPEN) {
        user.send(message);
      }
    });
  });

  ws.on("close", () => {
    users = users.filter((user) => user !== ws);
    broadcastUserList();
    console.log("User disconnected");
  });
});

// Send the list of active users to all clients
const broadcastUserList = () => {
  const activeUsersMessage = {
    type: "userList",
    users: users.map((user, index) => `User ${index + 1}`),
  };
  users.forEach((user) => {
    if (user.readyState === WebSocket.OPEN) {
      user.send(JSON.stringify(activeUsersMessage));
    }
  });
};

console.log("WebSocket server running on ws://localhost:8080");
