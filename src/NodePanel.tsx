import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const NodePanel: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Nodes
      </Typography>
      <Box
        onDragStart={(event) => onDragStart(event, 'default')}
        draggable
        style={{ cursor: 'pointer', padding: '8px', border: '1px dashed #ddd', marginBottom: '8px' }}
      >
       Message
      </Box>
    </Paper>
  );
};

export default NodePanel;
