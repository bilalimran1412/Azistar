import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { MdClose, MdDelete } from 'react-icons/md';

const SideView = ({ closeForm, currentNodeId, setNodes, initialButtons }) => {
  const [items, setItems] = useState(initialButtons || []);
  const [text, setText] = useState('');

  useEffect(() => {
    setItems(initialButtons || []);
  }, [initialButtons]);

  const handleChange = (e) => setText(e.target.value);

  const handleItemChange = (e, id) => {
    console.log("Idhr hub")
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, label: e.target.value } : item
    );
    setItems(updatedItems);

    console.log("cn_id. itemchange",currentNodeId)
    // Update the node's buttons data for the specific node
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === currentNodeId
          ? { ...node, data: { ...node.data, buttons: updatedItems } }
          : node
      )
    );
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    // Update the node's buttons data for the specific node
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === currentNodeId
          ? { ...node, data: { ...node.data, buttons: updatedItems } }
          : node
      )
    );
  };

  const handleAddNewMessage = () => {
    if (text.trim() !== '') {
      const newButton = { id: Date.now().toString(), label: text };
      const updatedItems = [...items, newButton];
      setItems(updatedItems);

      // Update the node's buttons data for the specific node
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === currentNodeId
            ? { ...node, data: { ...node.data, buttons: updatedItems } }
            : node
        )
      );

      setText(''); // Clear the textarea after adding the button
    }
  };

  const handleAddAnotherButton = () => {
    const newButton = { id: Date.now().toString(), label: `Button ${items.length + 1}` };
    const updatedItems = [...items, newButton];
    setItems(updatedItems);

    console.log("cn_id",currentNodeId)
    // Update the node's buttons data for the specific node
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === currentNodeId
          ? { ...node, data: { ...node.data, buttons: updatedItems } }
          : node
      )
    );
  };

  return (
    <div className="ask-button-container">
      <div className="grid grid-cols-2 px-4 justify-between items-center">
        <div className="frm_hdr_ttle">
          <h2>Buttons</h2>
        </div>
        <div className="closebutton">
          <Button
            className="close_icns"
            onClick={closeForm}
            fontSize="sm"
            me="0px"
            mb="26px"
            borderRadius="16px"
            fontWeight="500"
          >
            <MdClose />
          </Button>
        </div>
      </div>
      <div className="frm_hdr_ttle">
        <label htmlFor="text-input">Write a message</label>
      </div>
      <textarea
        id="text-input"
        value={text}
        placeholder="Add Text Message ..."
        onChange={handleChange}
        type="text"
      />
      <Button onClick={handleAddNewMessage}>Add New Message</Button>
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
              <Button
                className="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                <MdDelete />
              </Button>
            </div>
          ))}
          {/* Button to Add a New Button Outside the Map */}
          <Button
            className="add-new-button"
            onClick={handleAddAnotherButton}
          >
            Add Another Button
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideView;