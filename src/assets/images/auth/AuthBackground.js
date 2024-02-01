// material-ui
import { Box } from '@mui/material';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  return (
    <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: 0 }}>
      <svg
        width="1480"
        height="655"
        viewBox="0 0 1480 655"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'translateX(-300px)' }}
      >
        <ellipse cx="740" cy="678.5" rx="740" ry="678.5" fill="url(#paint0_radial_387_3285)" fillOpacity="0.4" />
        <defs>
          <radialGradient
            id="paint0_radial_387_3285"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(740 678.5) rotate(90) scale(678.5 740)"
          >
            <stop stopColor="#08FFFC" stopOpacity="0.65" />
            <stop offset="0.0001" stopColor="#08D3FF" stopOpacity="0.65" />
            <stop offset="1" stopColor="#08FFFC" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </Box>
  );
};

export default AuthBackground;
