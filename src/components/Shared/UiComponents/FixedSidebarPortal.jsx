import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { FaWindowClose } from 'react-icons/fa';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaGear } from 'react-icons/fa6';

const FixedSidebarPortal = ({ isCard = true, children }) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      {isCard ? (
        <UiIconButton
          icon={<FaGear />}
          onClick={onToggle}
          color='lightgray'
          _focus={{ backgroundColor: 'transparent' }}
          _hover={{ backgroundColor: 'transparent' }}
        />
      ) : (
        <UiIconButton
          icon={<FaGear />}
          onClick={onToggle}
          color='text.default'
          background='#d2d5da'
          _active={{ backgroundColor: '#d2d5da' }}
          _focus={{ backgroundColor: '#d2d5da' }}
        />
      )}
      {isOpen && (
        <Box position='fixed' left='490px' top='0' zIndex='59' bottom='0'>
          <Box
            bg='rgb(248, 248, 248)'
            borderLeft='1px solid rgba(16, 22, 26, 0.15)'
            boxShadow='rgba(16, 22, 26, 0.17) 13px -8px 11px -7px'
            display='flex'
            flexDirection='column'
            height='100%'
            overflow='auto'
            transition='width 0.15s'
            width='400px'
          >
            <Box display='flex' justifyContent='flex-end' padding='15px 24px'>
              <UiIconButton
                onClick={onClose}
                color='text.default'
                icon={<FaWindowClose />}
              />
            </Box>
            <Box padding='0 15px 24px'>
              <Flex direction='column' gap={5}>
                {children}
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export { FixedSidebarPortal };
