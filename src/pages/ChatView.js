// import React from 'react';
// import { Box, Typography, Avatar, IconButton, InputBase, Paper } from '@mui/material';
// import { Send, ArrowBack, MoreVert, AttachFile } from '@mui/icons-material';

// const ChatView = ({ chat, onBack }) => {
//   if (!chat) {
//     return (
//       <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0f172a' }}>
//         <Typography color="text.secondary">Select a conversation to start chatting</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#0f172a' }}>
//       {/* Chat Header */}
//       <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #334155', bgcolor: 'background.paper' }}>
//         <IconButton onClick={onBack} sx={{  mr: 1, color: 'white' }}><ArrowBack /></IconButton>
//         <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{chat.name[0]}</Avatar>
//         <Box sx={{ flex: 1 }}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'white' }}>{chat.name}</Typography>
//           <Typography variant="caption" sx={{ color: 'primary.main' }}>{chat.online ? 'Online' : 'Offline'}</Typography>
//         </Box>
//         <IconButton sx={{ color: 'text.secondary' }}><MoreVert /></IconButton>
//       </Box>

//       {/* Messages Area */}
//       <Box sx={{ flex: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
//         {/* Example Message Left */}
//         <Box sx={{ alignSelf: 'flex-start', maxWidth: '70%', bgcolor: '#1e293b', p: 1.5, borderRadius: '0px 12px 12px 12px' }}>
//           <Typography variant="body2" color="white">{chat.msg}</Typography>
//         </Box>
//         {/* Example Message Right (User) */}
//         <Box sx={{ alignSelf: 'flex-end', maxWidth: '70%', bgcolor: 'primary.main', p: 1.5, borderRadius: '12px 12px 0px 12px' }}>
//           <Typography variant="body2" color="white">Hey! Just checking in on the project.</Typography>
//         </Box>
//       </Box>

//       {/* Message Input */}
//       <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
//         <Paper sx={{ 
//           display: 'flex', alignItems: 'center', px: 2, py: 0.5, borderRadius: 3, 
//           bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid #334155' 
//         }}>
//           <IconButton size="small" sx={{ color: 'text.secondary' }}><AttachFile /></IconButton>
//           <InputBase placeholder="Type a message..." sx={{ ml: 1, flex: 1, color: 'white', fontSize: 14 }} />
//           <IconButton sx={{ color: 'primary.main' }}><Send /></IconButton>
//         </Paper>
//       </Box>
//     </Box>
//   );
// };

// export default ChatView;


import React, { useState, useEffect, useContext, useRef } from 'react';
import { Box, Typography, Avatar, IconButton, InputBase, Paper } from '@mui/material';
import { Send, ArrowBack, AttachFile } from '@mui/icons-material';
import { getConversationMessage, sendMessage, uploadFile } from '../services/api';
import { SocketContext } from '../context/socketContext';
import { AuthContext } from '../context/authContext';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
const ChatView = ({ chat, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { socket, onlineUsers } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch History
 

  useEffect(() => {
  // Add this check! If there is no chat, don't try to fetch.
  if (!chat || !chat._id) return; 

  getConversationMessage(chat._id)
    .then((res) => setMessages(res.data || []))
    .catch((err) => console.error("History fetch error:", err));
}, [chat]);
  // Socket Listener
  useEffect(() => {
    if (!socket) return;
    const handleNewMsg = (newMsg) => {
      // Only append if the message belongs to this current conversation
      if (newMsg.senderId === chat._id || newMsg.recipientId === chat._id) {
        setMessages((prev) => [...prev, newMsg]);
      }
    };
    socket.on("newMessage", handleNewMsg);
    return () => socket.off("newMessage");
  }, [socket, chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await sendMessage({ recipientId: chat._id, text: input });
      // The socket server should broadcast this, but we can update local UI immediately
      setMessages((prev) => [...prev, res.data]);
      setInput("");
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("recipientId", chat._id);
    
    const res = await uploadFile(formData);
    setMessages((prev) => [...prev, res.newMessage]);
  };

  if (!chat) return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0f172a' }}>
      <Typography color="text.secondary">Select a conversation to start chatting</Typography>
    </Box>
  );

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#0f172a' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: '1px solid #334155', bgcolor: 'background.paper' }}>
        <IconButton onClick={onBack} sx={{ mr: 1, color: 'white' }}><ArrowBack /></IconButton>
        <Avatar src={chat.profilePic} sx={{ mr: 2 }}>{chat.name[0]}</Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'white' }}>{chat.name}</Typography>
          <Typography variant="caption" sx={{ color: onlineUsers.includes(chat._id) ? 'primary.main' : 'text.secondary' }}>
            {onlineUsers.includes(chat._id) ? 'Online' : 'Offline'}
          </Typography>
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* {messages.map((m, i) => {
          const isMe = m.senderId === user._id;
          return (
            <Box key={i} sx={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '75%' }}>
              <Paper sx={{ p: 1.5, bgcolor: isMe ? 'primary.main' : '#1e293b', color: 'white', borderRadius: isMe ? '12px 12px 0px 12px' : '0px 12px 12px 12px' }}>
                {m.fileUrl && (
                  <Box component="img" src={m.fileUrl} sx={{ maxWidth: '100%', borderRadius: 1, mb: 1 }} />
                )}
                <Typography variant="body2">{m.text}</Typography>
              </Paper>
            </Box>
          );
        })} */}
        {messages.map((m, i) => {
  const isMe = m.senderId === user._id;
  
  // Safely check types using optional chaining (?.)
  const fileType = m.fileType || ""; 
  const isImage = fileType.startsWith("image/");
  const isPdf = fileType === "application/pdf";
  const isWord = fileType.includes("word") || fileType.includes("officedocument");

  return (
    <Box key={m._id || i} sx={{ alignSelf: isMe ? "flex-end" : "flex-start", maxWidth: "75%" }}>
      <Paper
        sx={{
          p: 1.5,
          bgcolor: isMe ? "primary.main" : "#1e293b",
          color: "white",
          borderRadius: isMe ? "12px 12px 0px 12px" : "0px 12px 12px 12px",
        }}
      >
        {/* Only try to render file logic if fileUrl actually exists */}
        {m.fileUrl && (
          <Box sx={{ mb: m.text ? 1 : 0 }}>
            {isImage ? (
              <Box
                component="img"
                src={m.fileUrl}
                sx={{ maxWidth: "100%", maxHeight: 300, borderRadius: 1, display: "block" }}
              />
            ) : (
              <Paper
                variant="outlined"
                onClick={() => window.open(m.fileUrl, "_blank")}
                sx={{ p: 1, display: "flex", alignItems: "center", gap: 1, cursor: 'pointer', bgcolor: 'rgba(255,255,255,0.05)' }}
              >
                {isPdf ? <PictureAsPdfIcon sx={{ color: '#ff4d4d' }} /> : 
                 isWord ? <DescriptionIcon sx={{ color: '#4d94ff' }} /> : 
                 <InsertDriveFileIcon />}
                <Typography variant="caption" noWrap>{m.fileUrl.split("-").pop()}</Typography>
              </Paper>
            )}
          </Box>
        )}

        {m.text && <Typography variant="body2">{m.text}</Typography>}
      </Paper>
    </Box>
  );
})}
        <div ref={scrollRef} />
      </Box>

      {/* Input */}
      <Box sx={{ p: 2, bgcolor: 'background.paper' }} component="form" onSubmit={handleSend}>
        <Paper sx={{ display: 'flex', alignItems: 'center', px: 2, py: 0.5, borderRadius: 3, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid #334155' }}>
          <input type="file" id="file" style={{ display: 'none' }} onChange={handleFileChange} />
          <label htmlFor="file">
            <IconButton component="span" size="small" sx={{ color: 'text.secondary' }}><AttachFile /></IconButton>
          </label>
          <InputBase placeholder="Type a message..." fullWidth sx={{ ml: 1, color: 'white', fontSize: 14 }} value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton type="submit" sx={{ color: 'primary.main' }} disabled={!input.trim()}><Send /></IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatView;