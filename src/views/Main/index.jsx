import React, { useState, useEffect } from 'react';
import { Box, Text, Spinner, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { fetchWrapper } from '../../utils/fetchWrapper';

function MainApp() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const result = await fetchWrapper({ url: '/bot/list' });
                setData(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <VStack spacing={4} p={4} align="start">
            {loading && <Spinner size="lg" />}
            {error && (
                <Alert status="error">
                    <AlertIcon />
                    <Text>{error.message}</Text>
                </Alert>
            )}
            {data && (
                <VStack spacing={4} w="full">
                    {data.data.map((item) => (
                        <Box
                            key={item._id}
                            p={4}
                            borderWidth="1px"
                            borderRadius="md"
                            bg="white"
                            _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                            w="full"
                        >
                            <Text fontWeight="bold">{item.name}</Text>
                            {item.description && <Text>{item.description}</Text>}
                            <Text fontSize="sm" color="gray.600">
                                Created At: {new Date(item.createdAt).toLocaleDateString()}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                                Updated At: {new Date(item.updatedAt).toLocaleDateString()}
                            </Text>
                        </Box>
                    ))}
                </VStack>
            )}
        </VStack>
    );
}

export default MainApp;
