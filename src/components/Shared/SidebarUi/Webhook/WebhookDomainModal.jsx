import {
  AzistarForm,
  FormTextField,
  ParamsFieldArray,
} from 'components/Shared/FormUi';
import { CustomModal } from 'components/Shared/UiComponents';
import { yup } from 'utils/yup';
import { useNodeContext } from 'views/canvas/NodeContext';
import { Box, Button, FormLabel } from '@chakra-ui/react';
import React from 'react';

function WebhookDomainModal({ onClose, isOpen }) {
  //   const { getNodeById } = useNodeContext();
  //   const currentNode = getNodeById(id);
  const initialValues = {
    name: '',
    domain: '',
    customHeaders: [
      { key: '', value: '', id: 'bb1a3e97-9735-5c82-90f4-bc5d39520540' },
    ],
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    // updateNodeById(id, {
    //   ...currentNode?.data,
    //   domainVariables: [
    //     ...(currentNode?.data.domainVariables || []),
    //     formValues,
    //   ],
    // });
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title='New domain variable'
      footer={
        <>
          <Box
            m={6}
            mb={2}
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            gap={3}
          >
            <Button
              variant='outline'
              colorScheme='blue'
              type='reset'
              form='domainVariables'
              onClick={onClose}
            >
              Close
            </Button>
            <Button colorScheme='blue' type='submit' form='domainVariables'>
              Save
            </Button>
          </Box>
        </>
      }
    >
      <AzistarForm
        onSave={onSave}
        validationSchema={validationSchema}
        initialValues={initialValues}
        formID='domainVariables'
      >
        <FormTextField
          name='name'
          label='Name'
          placeholder='Name'
          labelVariant='h3'
          variant='custom'
        />
        <FormTextField
          name='domain'
          label='Domain'
          placeholder='https://'
          labelVariant='h3'
          variant='custom'
        />
        <Box>
          <FormLabel variant='h3'>Custom headers</FormLabel>
          <ParamsFieldArray name='customHeaders' />
        </Box>
      </AzistarForm>
    </CustomModal>
  );
}
export { WebhookDomainModal };
