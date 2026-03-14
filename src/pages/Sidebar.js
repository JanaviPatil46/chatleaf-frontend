


// import React, { useEffect, useState, useContext } from "react";
// import {TextField,InputAdornment,ListItemButton, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Badge, CircularProgress } from "@mui/material";
// import { getAllUsers } from "../services/api";
// import { SocketContext } from "../context/socketContext";
// import Logo from "./Logo";
// import SearchIcon from "@mui/icons-material/Search";

// const Sidebar = ({ onSelectChat, activeChatId }) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { onlineUsers } = useContext(SocketContext);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await getAllUsers();
//         setUsers(res.data || []);
//       } catch (err) {
//         console.error("Failed to load users", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   // Filter users based on search query
//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
// return (
//     <Box sx={{ 
//       width: { xs: "100%", md: 350 }, 
//       height: "100%", 
//       borderRight: "1px solid #334155", 
//       bgcolor: "background.paper", 
//       display: 'flex', 
//       flexDirection: 'column' 
//     }}>
      
//       {/* Search Bar Section */}
//       <Box sx={{ p: 2, borderBottom: "1px solid #334155" }}>
//         <TextField
//           fullWidth
//           size="small"
//           placeholder="Search users..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           variant="outlined"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ color: "text.secondary", fontSize: 20 }} />
//               </InputAdornment>
//             ),
//           }}
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               bgcolor: "rgba(255,255,255,0.05)",
//               borderRadius: "8px",
//               color: "white",
//             }
//           }}
//         />
//       </Box>

//       <Box sx={{ overflowY: 'auto', flex: 1 }}>
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <CircularProgress size={24} />
//           </Box>
//         ) : (
//           <List sx={{ p: 0 }}>
//             {/* Map over filteredUsers instead of users */}
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => {
//                 const isOnline = onlineUsers.includes(user._id);
//                 return (
//                   <ListItem key={user._id} disablePadding>
//                     <ListItemButton
//                       onClick={() => onSelectChat(user)}
//                       sx={{
//                         mb: 0.5,
//                         bgcolor: activeChatId === user._id ? "rgba(16, 185, 129, 0.15)" : "transparent",
//                         borderLeft: activeChatId === user._id ? "4px solid #10b981" : "4px solid transparent",
//                         "&:hover": { bgcolor: "rgba(16, 185, 129, 0.08)" },
//                       }}
//                     >
//                       <ListItemAvatar>
//                         <Badge 
//                           color="success" 
//                           variant="dot" 
//                           invisible={!isOnline} 
//                           overlap="circular" 
//                           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                         >
//                           <Avatar src={user.profilePic} sx={{ bgcolor: "primary.dark" }}>
//                             {user.name[0]}
//                           </Avatar>
//                         </Badge>
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={
//                           <Typography variant="subtitle2" sx={{ color: "white", fontWeight: activeChatId === user._id ? 700 : 400 }}>
//                             {user.name}
//                           </Typography>
//                         }
//                         secondary={
//                           <Typography variant="caption" sx={{ color: isOnline ? "primary.main" : "text.secondary" }}>
//                             {isOnline ? 'Online' : 'Offline'}
//                           </Typography>
//                         }
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 );
//               })
//             ) : (
//               <Box sx={{ textAlign: 'center', mt: 4 }}>
//                 <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                   No users found
//                 </Typography>
//               </Box>
//             )}
//           </List>
//         )}
//       </Box>
//     </Box>
//   );
//   // return (
//   //   <Box sx={{ width: { xs: "100%", md: 350 }, height: "100%", borderRight: "1px solid #334155", bgcolor: "background.paper", display: 'flex', flexDirection: 'column' }}>
//   //     {/* <Logo /> */}
//   //     <Box sx={{ overflowY: 'auto', flex: 1 }}>
//   //       {loading ? (
//   //         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress size={24} /></Box>
//   //       ) : (
//   //         <List sx={{ p: 0 }}>
//   //           {users.map((user) => {
//   //             const isOnline = onlineUsers.includes(user._id);
//   //             return (
//   //               <ListItem
//   //                 key={user._id}
//   //                 button
//   //                 onClick={() => onSelectChat(user)}
//   //                 sx={{
//   //                   mb: 0.5,
//   //                   bgcolor: activeChatId === user._id ? "rgba(16, 185, 129, 0.15)" : "transparent",
//   //                   borderLeft: activeChatId === user._id ? "4px solid #10b981" : "4px solid transparent",
//   //                   "&:hover": { bgcolor: "rgba(16, 185, 129, 0.08)" },
//   //                 }}
//   //               >
//   //                 <ListItemAvatar>
//   //                   <Badge color="success" variant="dot" invisible={!isOnline} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
//   //                     <Avatar src={user.profilePic} sx={{ bgcolor: "primary.dark" }}>{user.name[0]}</Avatar>
//   //                   </Badge>
//   //                 </ListItemAvatar>
//   //                 <ListItemText
//   //                   primary={<Typography variant="subtitle2" sx={{ color: "white", fontWeight: activeChatId === user._id ? 700 : 400 }}>{user.name}</Typography>}
//   //                   secondary={<Typography variant="caption" sx={{ color: isOnline ? "primary.main" : "text.secondary" }}>{isOnline ? 'Online' : 'Offline'}</Typography>}
//   //                 />
//   //               </ListItem>
//   //             );
//   //           })}
//   //         </List>
//   //       )}
//   //     </Box>
//   //   </Box>
//   // );
// };

// export default Sidebar;


import React, { useEffect, useState, useContext } from "react";
import { IconButton,Tooltip,
  Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, 
  Typography, Badge, CircularProgress, TextField, InputAdornment, ListItemButton, Paper 
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings"; // For a nice profile touch
import { getAllUsers } from "../services/api";
import LogoutIcon from "@mui/icons-material/Logout";
import { SocketContext } from "../context/socketContext";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onSelectChat, activeChatId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { onlineUsers } = useContext(SocketContext);
  const { user: currentUser,logout } = useContext(AuthContext);
const navigate=useNavigate()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        // Filter out yourself from the main list
        const otherUsers = (res.data || []).filter(u => u._id !== currentUser?._id);
        setUsers(otherUsers);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?._id) {
      fetchUsers();
    }
  }, [currentUser]);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleProfilepage =()=>{
    navigate("/profile")
  }

  return (
    <Box sx={{ 
      width: { xs: "100%", md: 350 }, 
      height: "100%", 
      borderRight: "1px solid #334155", 
      bgcolor: "background.paper", 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      
      {/* 1. CURRENT LOGGED IN USER CARD */}
      <Paper elevation={0} sx={{ 
        p: 2, 
        m: 2, 
        bgcolor: "rgba(16, 185, 129, 0.05)", 
        borderRadius: "16px",
        border: "1px solid rgba(16, 185, 129, 0.2)",
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
          color="success" // Always online since it's "you"
        >
          <Avatar 
            src={currentUser?.profilePic} 
            sx={{ width: 45, height: 45, border: '2px solid #10b981' }}
          >
            {currentUser?.name?.[0]}
          </Avatar>
        </Badge>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ color: "white", fontWeight: 700, lineHeight: 1.2 }} noWrap>
            {currentUser?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            My Account
          </Typography>
        </Box>
        <IconButton onClick={handleProfilepage}>
        <SettingsIcon sx={{ color: "text.secondary", fontSize: 20, cursor: 'pointer', "&:hover": { color: "white" } }}  />
        </IconButton>
        {/* LOGOUT BUTTON */}
        <Tooltip title="Logout">
          <IconButton 
            onClick={logout} 
            sx={{ 
              color: "rgba(239, 68, 68, 0.8)", 
              "&:hover": { color: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.1)" } 
            }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* 2. SEARCH BAR */}
      <Box sx={{ px: 2, pb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search for a contact..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary", fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "rgba(255,255,255,0.03)",
              borderRadius: "10px",
              fontSize: "0.875rem"
            }
          }}
        />
      </Box>

      {/* 3. USER LIST SECTION */}
      <Typography variant="overline" sx={{ px: 3, color: "text.secondary", fontWeight: 700 }}>
        Contacts
      </Typography>

      <Box sx={{ overflowY: 'auto', flex: 1, mt: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress size={20} /></Box>
        ) : (
          <List sx={{ px: 1 }}>
            {filteredUsers.map((u) => {
              const isOnline = onlineUsers.includes(u._id);
              return (
                <ListItem key={u._id} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => onSelectChat(u)}
                    sx={{
                      borderRadius: "12px",
                      py: 1.2,
                      bgcolor: activeChatId === u._id ? "rgba(16, 185, 129, 0.1)" : "transparent",
                      borderLeft: activeChatId === u._id ? "4px solid #10b981" : "4px solid transparent",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.03)" }
                    }}
                  >
                    <ListItemAvatar>
                      <Badge color="success" variant="dot" invisible={!isOnline} overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <Avatar src={u.profilePic} sx={{ width: 40, height: 40 }}>{u.name[0]}</Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="body2" sx={{ color: "white", fontWeight: activeChatId === u._id ? 600 : 400 }}>{u.name}</Typography>}
                      secondary={
                        <Typography variant="caption" sx={{ color: isOnline ? "#10b981" : "text.secondary", fontSize: '11px' }}>
                          {isOnline ? 'Online' : 'Offline'}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;