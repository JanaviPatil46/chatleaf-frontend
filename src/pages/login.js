// import React, { useState } from 'react';
// import { Container, Box, Paper, Typography, TextField, Button, Link, InputAdornment, IconButton } from '@mui/material';
// import { Email, Lock, Visibility, VisibilityOff, ChatBubbleOutline } from '@mui/icons-material';

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <Box sx={{
//       minHeight: '100vh',
//       display: 'flex',
//       alignItems: 'center',
//       bgcolor: '#121212', // Pure Dark Background
//     }}>
//       <Container maxWidth="xs">
//         <Paper elevation={0} sx={{
//           p: 5,
//           borderRadius: 4,
//           bgcolor: '#1e1e1e', // Lighter Dark Surface
//           color: 'white',
//           border: '1px solid #333'
//         }}>
//           <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//             <ChatBubbleOutline sx={{ fontSize: 50, color: '#bb86fc' }} />
//           </Box>

//           <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
//             ChatApp
//           </Typography>
//           <Typography variant="body2" align="center" sx={{ color: '#aaa', mb: 4 }}>
//             Sign in to continue chatting
//           </Typography>

//           <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//             <TextField
//               fullWidth
//               label="Email"
//               variant="outlined"
//               autoFocus
//               InputLabelProps={{ style: { color: '#aaa' } }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   color: 'white',
//                   '& fieldset': { borderColor: '#444' },
//                   '&:hover fieldset': { borderColor: '#bb86fc' },
//                 }
//               }}
//               InputProps={{
//                 startAdornment: <InputAdornment position="start"><Email sx={{ color: '#bb86fc' }} /></InputAdornment>,
//               }}
//             />

//             <TextField
//               fullWidth
//               label="Password"
//               type={showPassword ? 'text' : 'password'}
//               InputLabelProps={{ style: { color: '#aaa' } }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   color: 'white',
//                   '& fieldset': { borderColor: '#444' },
//                   '&:hover fieldset': { borderColor: '#bb86fc' },
//                 }
//               }}
//               InputProps={{
//                 startAdornment: <InputAdornment position="start"><Lock sx={{ color: '#bb86fc' }} /></InputAdornment>,
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: '#aaa' }}>
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />

//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 py: 1.5,
//                 bgcolor: '#bb86fc',
//                 color: '#000',
//                 fontWeight: 'bold',
//                 '&:hover': { bgcolor: '#9965f4' }
//               }}
//             >
//               Login
//             </Button>

//             <Link href="/register" variant="body2" sx={{ textAlign: 'center', color: '#bb86fc', textDecoration: 'none' }}>
//               Create a new account
//             </Link>
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }

// import React, { useState,useContext } from "react";
// import {
//   Container,
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import {
//   Email,
//   Lock,
//   Visibility,
//   VisibilityOff,
//   Forum,
// } from "@mui/icons-material";
// import { Link as RouterLink } from "react-router-dom";
// import { Link } from "@mui/material";
// import {login as LoginApi} from "../services/api"
// import { AuthContext } from "../context/authContext";
// import { useNavigate } from "react-router-dom";
// import Logo from "./Logo";
// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//  const [formData, setFormData] = useState({
//     email: "",
//     passeord: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//      const data = await LoginApi(formData);
//      login(data.user,data.token)
//       navigate("/home");
//     } catch (error) {
//       console.error("Login error:", error);
//       alert(error.message || "Invalis Email or Password")
//     }
//   };
//   return (
//     <Container maxWidth="xs">
//       <Box
//         sx={{
//           mt: 12,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Paper sx={{ p: 4, width: "100%", textAlign: "center" }}>
//           {/* <Forum sx={{ color: "primary.main", fontSize: 50, mb: 2 }} /> */}
//           <Logo fontSize="20px" iconSize={24} />
//           <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
//             Welcome Back 
//           </Typography>

//           <Box
//             component="form"
//             sx={{ display: "flex", flexDirection: "column", gap: 3 }}
//             onSubmit={handleSubmit}
//           >
//             <TextField
//               fullWidth
//               size="small"
//               name="email"
//               label="Email Address"
//               disabled={isSubmitting}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Email color="primary" />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               fullWidth
//               size="small"
//               name="password"
//               label="Password"
//               disabled={isSubmitting}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//               type={showPassword ? "text" : "password"}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Lock color="primary" />
//                   </InputAdornment>
//                 ),
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={() => setShowPassword(!showPassword)}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               size="large"
//               sx={{ py: 1.5, fontWeight: "bold" }}
//               disabled={isSubmitting}
//             >
//               Sign In
//             </Button>
//             <Typography sx={{ fontSize: "0.875rem", mt: 2 }}>
//               New here?{" "}
//               <Link
//                 component={RouterLink}
//                 to="/register"
//                 sx={{
//                   color: "primary.main",
//                   textDecoration: "none",
//                   fontWeight: 600,
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//               >
//                 Create an account
//               </Link>
//             </Typography>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// }


import React, { useState, useContext } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { login as LoginApi } from "../services/api";
import { AuthContext } from "../context/authContext";
import Logo from "./Logo";
import toast from "react-hot-toast";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "", // Fixed typo: was "passeord"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Optimized: Use this single handler for all inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await LoginApi(formData);
      login(data.user, data.token);
      toast.success("Login Successful 🎉");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Invalid Email or Password");
    } finally {
      setIsSubmitting(false); // Ensure loading state is reset
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", textAlign: "center" }}>
          <Logo fontSize="20px" iconSize={24} />
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, mt: 2 }}>
            Welcome Back
          </Typography>

          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              size="small"
              name="email"
              label="Email Address"
              type="email"
              required
              value={formData.email}
              disabled={isSubmitting}
              onChange={handleChange} // Use the generic handler
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              fullWidth
              size="small"
              name="password"
              label="Password"
              required
              value={formData.password}
              disabled={isSubmitting}
              onChange={handleChange} // Use the generic handler
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ py: 1.5, fontWeight: "bold" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>

            <Typography sx={{ fontSize: "0.875rem", mt: 2 }}>
              New here?{" "}
              <Link
                component={RouterLink}
                to="/register"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Create an account
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}