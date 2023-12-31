import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ProgressSpinner() {
  return (
    <Box className="progress" sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}
