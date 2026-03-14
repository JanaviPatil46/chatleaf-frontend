// import React, { useState } from 'react';
// import { Container, Box, Paper, Typography, TextField, Button, Link, InputAdornment, IconButton } from '@mui/material';
// import { Person, Email, Lock, Phone, Visibility, VisibilityOff } from '@mui/icons-material';

// export default function Register() {
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const formData = new FormData(event.currentTarget);
//     console.log("Payload:", Object.fromEntries(formData));
//     setTimeout(() => setLoading(false), 1500);
//   };

//   return (
//     <Box sx={{
//       minHeight: '100vh',
//       display: 'flex',
//       alignItems: 'center',
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Modern Gradient
//       py: 4
//     }}>
//       <Container maxWidth="xs">
//         <Paper elevation={24} sx={{
//           p: 4,
//           borderRadius: 6,
//           bgcolor: 'rgba(255, 255, 255, 0.9)', // Glass effect
//           backdropFilter: 'blur(10px)',
//           textAlign: 'center'
//         }}>
//           <Typography variant="h4" sx={{ fontWeight: 900, color: '#4b39b5', mb: 1 }}>
//             Join Us
//           </Typography>
//           <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
//             Start your journey with ChatApp
//           </Typography>

//           <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//             {[
//               { name: 'name', label: 'Full Name', icon: <Person fontSize="small" /> },
//               { name: 'email', label: 'Email Address', type: 'email', icon: <Email fontSize="small" /> },
//               { name: 'phoneNumber', label: 'Phone Number', icon: <Phone fontSize="small" /> }
//             ].map((field) => (
//               <TextField
//                 key={field.name}
//                 fullWidth
//                 size="small"
//                 variant="filled"
//                 name={field.name}
//                 label={field.label}
//                 type={field.type || 'text'}
//                 sx={{ '& .MuiFilledInput-root': { borderRadius: 2, backgroundColor: '#f0f2f5' } }}
//                 InputProps={{
//                   disableUnderline: true,
//                   startAdornment: <InputAdornment position="start" sx={{ color: '#764ba2' }}>{field.icon}</InputAdornment>,
//                 }}
//               />
//             ))}

//             <TextField
//               fullWidth
//               size="small"
//               variant="filled"
//               name="password"
//               label="Password"
//               type={showPassword ? 'text' : 'password'}
//               sx={{ '& .MuiFilledInput-root': { borderRadius: 2, backgroundColor: '#f0f2f5' } }}
//               InputProps={{
//                 disableUnderline: true,
//                 startAdornment: <InputAdornment position="start" sx={{ color: '#764ba2' }}><Lock fontSize="small" /></InputAdornment>,
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
//               disabled={loading}
//               sx={{
//                 mt: 3,
//                 py: 1.5,
//                 borderRadius: 3,
//                 background: 'linear-gradient(45deg, #667eea, #764ba2)',
//                 boxShadow: '0 4px 15px rgba(118, 75, 162, 0.4)',
//                 textTransform: 'none',
//                 fontWeight: 'bold'
//               }}
//             >
//               {loading ? 'Creating Account...' : 'Get Started'}
//             </Button>

//             <Link href="/login" variant="body2" sx={{ mt: 2, textDecoration: 'none', fontWeight: 600, color: '#764ba2' }}>
//               Already have an account? Sign In
//             </Link>
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }

import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Phone,
  Visibility,
  VisibilityOff,
  AppRegistration,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import Logo from "./Logo"
import toast from "react-hot-toast";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

//  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await register(formData);

    if (response) {
      setFormData({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
      });

      toast.success("Account created successfully 🎉");

      // redirect after small delay (optional)
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    }

  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      "Registration Failed. Please try again.";

    toast.error(errorMsg);

  } finally {
    setLoading(false);
  }
};
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper sx={{ p: 4, width: "100%", textAlign: "center" }}>
          {/* <Box
            sx={{
              mb: 2,
              display: "inline-flex",
              p: 2,
              borderRadius: "50%",
              bgcolor: "rgba(16, 185, 129, 0.1)",
            }}
          >
            <AppRegistration sx={{ color: "primary.main", fontSize: 40 }} />
          </Box> */}
<Box sx={{ mb: 3 }}>
            <Logo fontSize="28px" iconSize={36} />
          </Box>
         <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
            Join the leaf network today.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Full Name"
              size="small"
              name="name"
              label="Full Name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              required
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              size="small"
              name="email"
              label="Email"
              type="email"
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
              // required
              placeholder="Phone Number (Optional)"
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              size="small"
              name="phoneNumber"
              label="Phone Number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="........."
              size="small"
              name="password"
              label="Password"
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
              disabled={loading}
              size="large"
              sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
            >
              {loading ? "Creating..." : "Register"}
            </Button>
            {/* <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                fontSize: "0.875rem",
                mt: 1,
                "&:hover": {
                  fontWeight: "bold",
                },
              }}
            >
              Already have an account? Login
            </Link> */}
            <Typography sx={{ fontSize: "0.875rem", mt: 1 }}>
  Already have an account?{" "}
  <Link
    component={RouterLink}
    to="/login"
    sx={{
      color: "primary.main",
      textDecoration: "none",
      fontWeight: 600,
      "&:hover": {
        textDecoration: "underline",
      },
    }}
  >
    Login
  </Link>
</Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
