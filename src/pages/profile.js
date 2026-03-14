// import React from 'react';
// import { Container, Box, Paper, Typography, TextField, Button, Avatar, IconButton } from '@mui/material';
// import { CameraAlt, Save, ArrowBack } from '@mui/icons-material';

// const ProfilePage = () => {
//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ mt: 4, mb: 4 }}>
//         {/* Back Button */}
//         <IconButton sx={{ mb: 2, color: 'primary.main' }}><ArrowBack /></IconButton>
        
//         <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
//           <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Profile Settings</Typography>

//           {/* Avatar Upload */}
//           <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
//             <Avatar 
//               sx={{ width: 120, height: 120, fontSize: 40, bgcolor: 'primary.main', border: '4px solid #334155' }}
//             >JD</Avatar>
//             <IconButton 
//               sx={{ 
//                 position: 'absolute', bottom: 0, right: 0, bgcolor: 'primary.main', 
//                 '&:hover': { bgcolor: 'primary.dark' }, p: 1 
//               }}
//             >
//               <CameraAlt sx={{ color: 'white', fontSize: 20 }} />
//             </IconButton>
//           </Box>

//           {/* Form Fields - Matching Register Structure */}
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'left' }}>
//             <TextField fullWidth label="Full Name" defaultValue="John Doe" variant="outlined" />
//             <TextField fullWidth label="Email Address" defaultValue="john@example.com" disabled variant="outlined" />
//             <TextField fullWidth label="Phone Number" defaultValue="+1 234 567 890" variant="outlined" />
            
//             <Typography variant="caption" color="text.secondary" sx={{ mt: -1, ml: 1 }}>
//               Email address cannot be changed.
//             </Typography>

//             <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
//               <Button 
//                 variant="contained" 
//                 fullWidth 
//                 startIcon={<Save />} 
//                 sx={{ py: 1.5, fontWeight: 'bold' }}
//               >
//                 Save Changes
//               </Button>
//               <Button 
//                 variant="outlined" 
//                 fullWidth 
//                 sx={{ py: 1.5, fontWeight: 'bold', color: 'error.main', borderColor: 'error.main' }}
//               >
//                 Logout
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default ProfilePage;

import React, { useContext, useState, useEffect } from 'react';
import { Container, Box, Paper, Typography, TextField, Button, Avatar, IconButton, CircularProgress } from '@mui/material';
import { CameraAlt, Save, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { updateProfile } from '../services/api'; // Ensure this is in your api.js
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  // Sync state if user context loads later
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, phone: user.phone });
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImg(file);
    }
  };

 const handleUpdate = async (e) => {
  e.preventDefault();
  setIsUpdating(true);

  try {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    if (selectedImg) data.append("profilePic", selectedImg);

    // This 'res' is already the user object because of your api.js logic
    const updatedUser = await updateProfile(data);
    
    // Update local context 
    setUser(updatedUser); 
    
    toast.success("Profile updated successfully!");
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Failed to update profile");
  } finally {
    setIsUpdating(false);
  }
};

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <IconButton 
          onClick={() => navigate(-1)} 
          sx={{ mb: 2, color: 'primary.main' }}
        >
          <ArrowBack />
        </IconButton>
        
        <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Profile Settings</Typography>

          {/* Avatar Upload */}
          <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
            <Avatar 
              src={selectedImg ? URL.createObjectURL(selectedImg) : user?.profilePic}
              sx={{ width: 120, height: 120, fontSize: 40, bgcolor: 'primary.main', border: '4px solid #334155' }}
            >
              {user?.name?.[0]}
            </Avatar>
            
            <input
              type="file"
              accept="image/*"
              id="profile-pic-input"
              hidden
              onChange={handleImageChange}
            />
            <label htmlFor="profile-pic-input">
              <IconButton 
                component="span"
                sx={{ 
                  position: 'absolute', bottom: 0, right: 0, bgcolor: 'primary.main', 
                  '&:hover': { bgcolor: 'primary.dark' }, p: 1 
                }}
              >
                <CameraAlt sx={{ color: 'white', fontSize: 20 }} />
              </IconButton>
            </label>
          </Box>

          {/* Form Fields */}
          <Box 
            component="form" 
            onSubmit={handleUpdate}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'left' }}
          >
            <TextField 
              fullWidth 
              label="Full Name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              variant="outlined" 
            />
            <TextField 
              fullWidth 
              label="Email Address" 
              value={user?.email || ""} 
              disabled 
              variant="outlined" 
            />
            <TextField 
              fullWidth 
              label="Phone Number" 
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              variant="outlined" 
            />
            
            <Typography variant="caption" color="text.secondary" sx={{ mt: -1, ml: 1 }}>
              Email address cannot be changed.
            </Typography>

            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button 
                type="submit"
                variant="contained" 
                fullWidth 
                disabled={isUpdating}
                startIcon={isUpdating ? <CircularProgress size={20} /> : <Save />} 
                sx={{ py: 1.5, fontWeight: 'bold' }}
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={logout}
                sx={{ py: 1.5, fontWeight: 'bold', color: 'error.main', borderColor: 'error.main' }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage;