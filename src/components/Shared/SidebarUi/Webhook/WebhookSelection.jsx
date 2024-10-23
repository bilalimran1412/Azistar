import React, { useState } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Input,
  List,
  ListItem,
  Spinner,
  Box,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { useFetchData } from 'hooks/bot/useFetchData';

const WebhookSelection = ({ onSelect }) => {
  const [listData, setListData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: webhookList,
    loading: isLoading,
    error,
  } = useFetchData('/auth/integration/webhook');

  React.useEffect(() => {
    if (webhookList?.data && !isLoading) {
      const webhooks = webhookList?.data?.map((listItem) => ({
        name: listItem.config.name,
        id: listItem?._id,
        domain: listItem.config.domain,
      }));
      setListData(webhooks);
      setFilteredData(webhooks);
    }
  }, [isLoading, webhookList?.data]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = listData.filter((item) =>
      item?.name?.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };
  const onDomainClick = (domain) => {
    onSelect(domain);
    // onClose
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme='blue'>Open List</Button>
      </PopoverTrigger>
      <PopoverContent w='300px'>
        <PopoverCloseButton />
        <PopoverHeader>Search List</PopoverHeader>
        <PopoverBody>
          <Input
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
            mb={4}
          />
          {isLoading ? (
            <Box textAlign='center'>
              <Spinner />
            </Box>
          ) : error ? (
            <Box color='red.500' textAlign='center'>
              {error}
            </Box>
          ) : (
            <List spacing={2}>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <ListItem
                    key={index}
                    p={2}
                    bg='gray.50'
                    borderRadius='md'
                    cursor='pointer'
                    _hover={{ bg: 'gray.200' }}
                    onClick={() => {
                      onDomainClick(item);
                    }}
                  >
                    {item.name}
                  </ListItem>
                ))
              ) : (
                <Box color='gray.500' textAlign='center'>
                  No items found.
                </Box>
              )}
            </List>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export { WebhookSelection };
