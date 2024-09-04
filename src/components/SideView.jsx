import React, { useState, useEffect } from 'react';
import { Button, Input, Box, FormControl, FormLabel } from '@chakra-ui/react';
import nodeConfigurations from '../config/nodeConfigurations'; // Adjust the import path as needed

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
      <div className="grid grid-cols-2 px-4 justify-between items-center"></div>
    <Box bg="white" p={4} shadow="md" borderWidth="1px">
      <h2>{config.title}</h2>
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
      <Button onClick={handleSubmit} mt={4} colorScheme="blue">Save</Button>
      <Button onClick={closeForm} mt={4} colorScheme="red">Close</Button>
    </Box>
    </div>
  );
};

export default SideView;
