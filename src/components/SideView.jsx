import React, { useState, useEffect } from 'react';
import { Button, Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { nodeConfigurationBlockIdMap } from '../config/nodeConfigurations';
import { MdDelete } from 'react-icons/md'; // Import MdDelete icon
import { useUpdateNodeInternals } from 'reactflow';
import { useNodeContext } from '../views/canvas/NodeContext';

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

const SideView = ({ closeForm }) => {
  const { getNodeById, currentNodeId, updateNodeById: updateNodeData } = useNodeContext()

  const updateNodeById = React.useCallback((id, updatedData) => {
    return updateNodeData(id, updatedData)
  }, [updateNodeData])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentNode = React.useMemo(() => getNodeById(currentNodeId), [currentNodeId])

  const [formData, setFormData] = useState(() => currentNode?.data || {});

  const [file, setFile] = useState(() =>
    currentNode?.data?.file && currentNode.data?.contentType === 'uploadMedia' ? currentNode.data.file : null
  );
  const [items, setItems] = useState(() => currentNode?.data?.items || []);

  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId]
  const updateNodeInternals = useUpdateNodeInternals();


  const handleChange = (variable, value) => {
    setFormData(prev => ({ ...prev, [variable]: value }));
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    handleChange('fileField', uploadedFile);
  };

  const handleSubmit = () => {
    const updatedData = { ...currentNode.data, ...formData, file, items }
    updateNodeById(currentNodeId, updatedData)
    closeForm();
  };

  const handleItemChange = (e, id) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, label: e.target.value } : item
    );
    setItems(newItems);
  };

  const handleDelete = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
  };

  const handleAddAnotherButton = () => {
    const newId = Date.now(); // or use another unique ID generation method
    setItems([...items, { id: newId, label: 'Button' }]);
    updateNodeInternals(currentNodeId)
  };

  useEffect(() => {
    const updatedData = { ...currentNode.data, ...formData, file, items }
    updateNodeById(currentNodeId, updatedData)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, formData, items]);

  if (!currentNodeId) {
    return <></>
  }

  return (
    <div className="ask-button-container">
      <div className="grid grid-cols-2 px-4 justify-between items-center">
        <h1>{config.title}</h1>
        <Button onClick={closeForm} mt={4} colorScheme="red">X</Button>
      </div>
      <Box pt={4}>
        {config.fields.map((field, index) => (
          field.type === 'file' ? (
            <FormControl key={index} mt={4}>
              <FormLabel>{field.label}</FormLabel>
              <Input
                type="file"
                onChange={handleFileChange}
                placeholder={field.placeholder}
              />
              {file && <p>Selected file: {file.name}</p>}
            </FormControl>
          ) : currentNode.data.contentType === 'buttonNode' ? (
            <FormControl key={index} mt={4}>
              <FormLabel>{field.label}</FormLabel>
              <ReactQuill
                theme="snow"
                value={formData[field.variable] || ''}
                onChange={(value) => handleChange(field.variable, value)}
                placeholder={field.placeholder}
                modules={modules}
              />
              <div className="button_editor">
                <h2>Buttons Editor</h2>
                <div className="item-list">
                  {items.map((item) => (
                    <div key={item.id} className="item-buttons">
                      <input
                        className="item-button"
                        value={item.label}
                        placeholder="Click to Edit"
                        onChange={(e) => handleItemChange(e, item.id)}
                      />
                      {
                        item.isDeletable !== false && (
                          <Button
                            className="delete-button"
                            onClick={() => handleDelete(item.id)}
                          >
                            <MdDelete />
                          </Button>
                        )
                      }
                    </div>
                  ))}
                  <Button
                    className="add-new-button"
                    onClick={handleAddAnotherButton}
                  >
                    Add Another Button
                  </Button>
                </div>
              </div>
            </FormControl>
          ) : (
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
          )
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
