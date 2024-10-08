import { useField, FieldArray } from 'formik';
import {
  Box,
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import FormVariableSelectorDropdown from '../FormVariableSelectorDropdown';

const RuleGroupFieldArray = ({ name }) => {
  const [field] = useField(name);
  const fieldValue = field.value || [
    { id: '1', isExpanded: false },
    { id: '2', isExpanded: false },
  ];

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <Box display='flex' flexDirection='column' gap={8}>
          {fieldValue.map((item, index) => (
            <Box
              key={item.id}
              padding={5}
              backgroundColor='#fff'
              boxShadow='0 0 0 1px #10161a26, 0 0 #10161a00, 0 0 #10161a00'
              borderRadius='3px'
            >
              <Accordion>
                <AccordionItem border='none'>
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton
                          paddingX={0}
                          _hover={{
                            backgroundColor: 'none',
                          }}
                          flexDirection='column'
                          alignItems='flex-start'
                          gap={2}
                          onClick={() => {
                            const updatedValues = [...fieldValue];
                            updatedValues[index].isExpanded =
                              !updatedValues[index].isExpanded;
                            arrayHelpers.replace(index, updatedValues[index]);
                          }}
                        >
                          <Box width='100%' display='flex'>
                            <Box
                              width='100%'
                              display='flex'
                              justifyContent='space-between'
                              alignItems='center'
                            >
                              <Text
                                flex='1'
                                textAlign='left'
                                style={{
                                  fontWeight: '700',
                                  fontSize: '17px',
                                }}
                                width='auto'
                              >
                                Rule group #{index + 1}
                              </Text>
                              <Icon
                                as={FaTrash}
                                width='22px'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  arrayHelpers.remove(index);
                                }}
                                marginRight={3}
                              />
                            </Box>
                            <AccordionIcon />
                          </Box>

                          {!item.isExpanded && (
                            <Text opacity={0.8} textAlign='left'>
                              Click to expand
                            </Text>
                          )}
                        </AccordionButton>
                      </h2>
                      <AccordionPanel
                        padding={0}
                        display={item.isExpanded ? 'block' : 'none'}
                      >
                        <FormVariableSelectorDropdown
                          name={`${name}[${index}].variable`}
                          label='Choose a variable to create scoring rules for'
                        />
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              </Accordion>
            </Box>
          ))}
          <Button
            onClick={() => {
              arrayHelpers.push({
                id: Date.now().toString(),
                isExpanded: false,
              });
            }}
          >
            Add
          </Button>
        </Box>
      )}
    />
  );
};

export default RuleGroupFieldArray;
