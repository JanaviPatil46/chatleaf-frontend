


import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { AuthContext } from "./authContext";
import { socket, connectSocket, disconnectSocket } from "../services/socket";

export const SocketContext = createContext(null);

// export function SocketProvider({ children }) {
//   const { user, token } = useContext(AuthContext);
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [onlineUsers, setOnlineUsers] = useState([]);

//   useEffect(() => {
//     if (user && token) {
//       connectSocket(user, token);
//     }

//     socket.on("connect", () => setIsConnected(true));
//     socket.on("disconnect", () => setIsConnected(false));

//     socket.on("getOnlineUsers", (users) => {
//       setOnlineUsers(users);
//     });

//     return () => {
//       socket.off("getOnlineUsers");
//       socket.off("connect");
//       socket.off("disconnect");
//       disconnectSocket();
//     };
//   }, [user, token]);

//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers, isConnected }}>
//       {children}
//     </SocketContext.Provider>
//   );
// }

export function SocketProvider({ children }) {
  const { user, token } = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // 1. Define what happens when events occur
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onGetOnlineUsers = (users) => {
      console.log("Received online users:", users); // Debug log
      setOnlineUsers(users);
    };

    // 2. Attach listeners FIRST
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("getOnlineUsers", onGetOnlineUsers);

    // 3. Then connect
    if (user && token) {
      connectSocket(user, token);
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("getOnlineUsers", onGetOnlineUsers);
      disconnectSocket();
    };
  }, [user, token]); // Re-run if user/token changes (e.g. login/logout)

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}