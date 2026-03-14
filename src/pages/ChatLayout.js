// import React, { useContext, useState } from 'react';
// import { Box, useMediaQuery, useTheme } from '@mui/material';
// import Sidebar from './Sidebar';
// import ChatView from './ChatView';
// import {useNavigate} from "react-router-dom"
// import {AuthContext} from "../context/authContext"
// import {SocketContext} from "../context/socketContext"
// const DEFAULT_AVATAR = "https://cdn-icons-png.flaricon/512/149/149071.png"
// const ChatLayout = () => {
  

// const {user,logout}=useContext(AuthContext);
// const {socket,onlineUsers} = useContext(SocketContext)
// const navigate = useNavigate();

// const [users,setUsers] = useState([])
// const [selectedChat, setSelectedChat] = useState(null);
// const [messages,setMessages]=useState([]);
// const [input,setInput]=useState("");

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   return (
//     <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default', overflow: 'hidden' }}>
//       {/* Sidebar - Hide on mobile if a chat is selected */}
//       {(!isMobile || !selectedChat) && (
//         <Sidebar onSelectChat={setSelectedChat} activeChatId={selectedChat?.id} />
//       )}

//       {/* Chat Window - Hide on mobile if no chat is selected */}
//       {(!isMobile || selectedChat) && (
//         <ChatView chat={selectedChat} onBack={() => setSelectedChat(null)} />
//       )}
//     </Box>
//   );
// };

// export default ChatLayout;

import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import ChatView from './ChatView';

const ChatLayout = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default', overflow: 'hidden' }}>
      {(!isMobile || !selectedChat) && (
        <Sidebar onSelectChat={setSelectedChat} activeChatId={selectedChat?._id} />
      )}

      {(!isMobile || selectedChat) && (
        <ChatView chat={selectedChat} onBack={() => setSelectedChat(null)} />
      )}
    </Box>
  );
};

export default ChatLayout;
