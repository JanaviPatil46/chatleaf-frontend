

// import { io } from "socket.io-client";

// const SOCKET_URL = "http://127.0.0.1:5000";

// export const socket = io(SOCKET_URL, {
//   autoConnect: false,
// });

// export const connectSocket = (user, token) => {
//   if (!socket.connected) {
//     socket.io.opts.query = { userId: user.id || user._id };
//     socket.auth = { token };
//     socket.connect();
//   }
// };

// export const disconnectSocket = () => {
//   if (socket.connected) {
//     socket.disconnect();
//   }
// };

// src/services/socket.js
import { io } from "socket.io-client";

// const SOCKET_URL = "http://127.0.0.1:5000";

const SOCKET_URL = "https://chatleaf-backend.netlify.app";


export const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export const connectSocket = (user, token) => {
  if (!socket.connected) {
    // We update the query object to include the token 
    // because your backend server.js uses: socket.handshake.query.token
    socket.io.opts.query = { 
        token: token, 
        userId: user._id || user.id 
    };
    
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};