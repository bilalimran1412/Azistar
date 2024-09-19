import React, { useState } from 'react';
import { Box, FormLabel, Switch, Collapse } from '@chakra-ui/react';

const FormSettings = ({ label, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  return (
    <Box bg='#8a9ba826' p={4} borderRadius='md'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        onClick={handleToggle}
        cursor='pointer'
      >
        <FormLabel mb={0} htmlFor='setting'>
          {label}
        </FormLabel>
        <Switch
          isChecked={isExpanded}
          onChange={handleToggle}
          name='setting'
          id='switch'
        />
      </Box>
      <Collapse in={isExpanded}>
        <Box mt={2} display='flex' flexDirection='column' gap='1rem'>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default FormSettings;
