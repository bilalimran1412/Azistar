import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Icon,
  Box,
  Text,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { FaLink, FaPaperclip } from 'react-icons/fa';

function MediaSelectModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [url, setUrl] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleSave = () => {
    switch (activeTabIndex) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='left'>Select media</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Tabs
              index={activeTabIndex}
              onChange={(index) => setActiveTabIndex(index)}
            >
              <TabList>
                <Tab>Upload</Tab>
                <Tab>Upload via URL</Tab>
                <Tab>Search</Tab>
              </TabList>

              <TabPanels>
                <TabPanel display='flex' flexDirection='column' p={10} gap={10}>
                  <Flex
                    alignItems='center'
                    justifyContent='center'
                    direction='column'
                    gap={3}
                  >
                    <Icon as={FaPaperclip} boxSize={12} mr={2} />
                    <Text fontSize='lg'>Upload your file</Text>
                  </Flex>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      height: '40px',
                      border: '1px solid gray',
                      borderRadius: 'md',
                      position: 'relative',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      padding: '0 12px',
                      '&::after': {
                        content: '"Browse"',
                        position: 'absolute',
                        right: '10px',
                        color: 'blue',
                        fontWeight: 'bold',
                      },
                    }}
                  >
                    <Input type='file' accept='image/*' display='none' />
                    <Text flex='1' textAlign='center' color='gray.600'>
                      Choose file....
                    </Text>
                  </label>
                </TabPanel>

                <TabPanel display='flex' flexDirection='column' p={10} gap={10}>
                  <Flex
                    alignItems='center'
                    justifyContent='center'
                    direction='column'
                    gap={3}
                  >
                    <Icon as={FaLink} boxSize={12} mr={2} />
                    <Text fontSize='lg'>Enter URL</Text>
                  </Flex>
                  <Input
                    placeholder='https://'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </TabPanel>

                <TabPanel>
                  <Input placeholder='Search media' />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' ml={3} onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MediaSelectModal;
