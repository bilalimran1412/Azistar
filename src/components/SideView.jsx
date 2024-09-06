import React, { useState, useEffect } from 'react';
import { Button, Box, FormControl, FormLabel } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import nodeConfigurations from '../config/nodeConfigurations';

// Configuration for Quill editor
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'header': '1' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link'],
    ['blockquote', 'code-block'],
  ],
};

const SideView = ({ closeForm, currentNodeId, setNodes, nodeType }) => {
  const [formData, setFormData] = useState({});
  const config = nodeConfigurations[nodeType] || { title: "Unknown Node Type", fields: [] };

  useEffect(() => {
    if (currentNodeId) {
      setNodes(prevNodes => {
        const currentNode = prevNodes.find(node => node.id === currentNodeId);
        if (currentNode && currentNode.data) {
          setFormData(currentNode.data);
        }
        return prevNodes;
      });
    }
  }, [currentNodeId, nodeType, setNodes]);

  const handleChange = (variable, value) => {
    setFormData(prev => ({ ...prev, [variable]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data on Submit:", formData);
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === currentNodeId ? { ...node, data: { ...node.data, textareaFieldData: formData.textareaFieldData } } : node
      )
    );
    closeForm();
  };

  return (
    <div className="ask-button-container">
      <div className="grid grid-cols-2 px-4 justify-between items-center">
        <h1>{config.title}</h1>
        <Button onClick={closeForm} mt={4} colorScheme="red">X</Button>
      </div>
      <Box pt={4}>
        {config.fields.map((field, index) => (
          <FormControl key={index} mt={4}>
            <FormLabel>{field.label}</FormLabel>
            <ReactQuill
              theme="snow"
              value={formData[field.variable] || ''}
              onChange={(value) => handleChange(field.variable, value)}
              placeholder={field.placeholder}
              modules={modules}
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
