import React from 'react';
import { Box, Paper, TextField, Typography } from '@mui/material';
import { Node } from 'reactflow';

interface SettingsPanelProps {
  element: Node;
  updateNodeText: (id: string, text: string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ element, updateNodeText }) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeText(element.id, event.target.value);
  };

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Node Settings
      </Typography>
      <TextField
        label="Text"
        value={element.data.label}
        onChange={onChange}
        fullWidth
      />
    </Paper>
  );
};

export default SettingsPanel;
