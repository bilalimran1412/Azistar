import React, { useState, useEffect } from 'react';
import { Button, Input, Box, FormControl, FormLabel } from '@chakra-ui/react';
import nodeConfigurations from '../config/nodeConfigurations'; // Adjust the import path as needed
import '../views/canvas/canvas.css';

const SideView = ({ closeForm, currentNodeId, setNodes, nodeType }) => {
  const [formData, setFormData] = useState({});
  const config = nodeConfigurations[nodeType] || { title: "Unknown Node Type", fields: [] };

  const handleChange = (variable, value) => {
    setFormData(prev => ({ ...prev, [variable]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    closeForm();
  };

  useEffect(() => {
    setFormData({});
  }, [nodeType]);

  return (
    <div className="ask-button-container">
      <div className="grid grid-cols-2 px-4 justify-between items-center">
      <h1>{config.title}</h1>
      <Button onClick={closeForm} mt={4} colorScheme="red">X</Button>
        
      </div>
    <Box bg="white" p={4} shadow="md" borderWidth="1px">
      {config.fields.map((field, index) => (
        <FormControl key={index} mt={4}>
          <FormLabel>{field.label}</FormLabel>
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.variable] || ''}
            onChange={(e) => handleChange(field.variable, e.target.value)}
          />
        </FormControl>
      ))}
        <Box
        position="absolute" bottom={4}
        left={0} width="full" px={5}
        display="flex" justifyContent="space-between"
      >
        <Button onClick={closeForm} mt={4} colorScheme="red">Cancel</Button>
        <Button onClick={handleSubmit} mt={4} colorScheme="blue">Apply</Button>
      </Box>
    </Box>
    
    </div>
  );
};

export default SideView;
