// import React, { useContext } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider, CssBaseline, Box } from '@mui/material';
// import theme from './theme';
// import Login from './pages/login';       // Adjust path based on your folders
// import Register from './pages/register'; // Adjust path based on your folders
// import ProfilePage from './pages/profile';
// import ChatLayout from './pages/ChatLayout';
// import { AuthContext } from './context/authContext';
// import { Toaster } from "react-hot-toast";
// const App = () => {
//   const {user} = useContext(AuthContext)
//   return (
//     <ThemeProvider theme={theme}>
//       {/* CssBaseline resets default browser CSS to match MUI theme */}
//       <CssBaseline /> 
//       <Toaster position="top-right" />
//       <Box sx={{  bgcolor: 'background.default' }}>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Navigate to="/login" />} />
//             {/* <Route path="/login" element={!user ? <Login/> : <Navigate to="/login"/>}/>
//             <Route path="/register" element={!user ? <Register/> : <Navigate to="/login"/>} />
//             <Route path="/home" element={user ? <ChatLayout/> : <Navigate to="/login"/>}/>
//             <Route path="/profile" element={user ? <ProfilePage/> : <Navigate to="/login"/>}/> */}
//             <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />

// <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />

// <Route path="/home" element={user ? <ChatLayout /> : <Navigate to="/login" />} />

// <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
//           </Routes>
//         </BrowserRouter>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

import theme from "./theme";

import Login from "./pages/login";
import Register from "./pages/register";
import ProfilePage from "./pages/profile";
import ChatLayout from "./pages/ChatLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />

      <Box sx={{ bgcolor: "background.default" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <ChatLayout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;