
import { Box, Typography } from "@mui/material";

import leafLogo from "../images/logo.png";

const Logo = ({ fontSize = "24px",  }) => {
 
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Rotated Spa icon looks exactly like a leaf */}
      {/* <Spa sx={{ color: 'primary.main', fontSize: iconSize, transform: 'rotate(-10deg)' }} /> */}
      <Box
        component="img"
        src={leafLogo}
        alt="ChatLeaf Logo"
        sx={{
          width: "20%",
          height: "20%",
          // fontSize: iconSize,
          // objectFit: 'contain',
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 900,
          fontSize: fontSize,
          // letterSpacing: '-0.5px',
          color: "text.primary",
        }}
      >
        Chat<span style={{ color: "#10b981" }}>Leaf</span>
      </Typography>
    </Box>
  );
};

export default Logo;
