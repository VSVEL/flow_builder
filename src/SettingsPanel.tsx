import React, { useState } from 'react';
import { Paper, TextField, Typography } from '@mui/material';
import { Node } from 'reactflow';

interface SettingsPanelProps {
  element: Node;
  updateNodeText: (id: string, text: string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ element, updateNodeText }) => {
  const [text, setText] = useState<string>(element.data.label);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    updateNodeText(element.id, text);
  };

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Node Settings
      </Typography>
      <TextField
        label="Text"
        value={text}
        onChange={handleChange}
        fullWidth
        onBlur={handleSave}
      />
    </Paper>
  );
};

export default SettingsPanel;
