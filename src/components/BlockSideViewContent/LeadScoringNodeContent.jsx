import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import { yup } from 'utils/yup';

function LeadScoringNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;

  const initialValues = {
    variable: currentNode?.data?.variable,
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;
    updateNodeById(id, { ...currentNode?.data, ...formValues, variableName });
    handleClose();
  };

  return (
    <SidebarFormContainer
      block={config}
      onClose={handleClose}
      onFormSave={onSave}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onReset={handleClose}
    >
      <Box
        padding={5}
        backgroundColor='#fff'
        boxShadow='0 0 0 1px #10161a26, 0 0 #10161a00, 0 0 #10161a00'
        borderRadius='3px'
      >
        <Text
          style={{
            fontWeight: '700',
            fontSize: '17px',
          }}
        >
          Save Score As
        </Text>
        <FormVariableSelectorDropdown
          label='Choose the variable you would like to save the final score as'
          allowedType={config?.variableType}
          name='variable'
        />
        <Text color='#5c7080' fontSize='12px' mt='5px'>
          The variable format must be NUMBER
        </Text>
      </Box>
    </SidebarFormContainer>
  );
}

export default LeadScoringNodeContent;
