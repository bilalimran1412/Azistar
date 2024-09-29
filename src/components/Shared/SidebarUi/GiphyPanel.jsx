import React from 'react';
import { Box } from '@chakra-ui/react';
import ReactGiphySearchbox from 'react-giphy-searchbox';

const GiphyPanel = ({ onSelect }) => {
  const handleSelect = (item) => {
    onSelect(item);
  };

  return (
    <Box
      width='100%'
      p={4}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <ReactGiphySearchbox
        apiKey={process.env.REACT_APP_GIPHY_API_KEY} // Use environment variable for API key
        onSelect={handleSelect} // Extracted to a separate function for clarity
        masonryConfig={[
          { columns: 2, imageWidth: 120, gutter: 5 },
          { mq: '1000px', columns: 3, imageWidth: 130, gutter: 5 },
        ]}
      />
    </Box>
  );
};

export default GiphyPanel;
