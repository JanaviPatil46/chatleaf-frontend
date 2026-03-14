import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Dark mode by default for chat apps
    primary: {
      main: '#10b981', // Vibrant Emerald Green
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f172a', // Deep Slate Blue/Black
      paper: '#1e293b',   // Slightly lighter slate for cards
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  shape: {
    borderRadius: 16, // Extra rounded for a friendly chat feel
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '&:hover fieldset': { borderColor: '#10b981' },
          },
        },
      },
    },
  },
});

export default theme;