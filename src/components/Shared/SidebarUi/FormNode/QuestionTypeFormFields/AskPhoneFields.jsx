import { Divider, Flex } from '@chakra-ui/react';
import { FormCheckbox } from 'components/Shared/FormUi';
import React from 'react';
import CommonFields from './CommonFields';

function AskPhoneFields({ subFieldName }) {
  return (
    <CommonFields subFieldName={subFieldName}>
      <Flex
        backgroundColor='rgb(231, 234, 236)'
        paddingY='20px'
        paddingX='8px'
        direction='column'
        gap={5}
      >
        <FormCheckbox
          label='Show country code selector'
          name={`${subFieldName}.showCountryCodeSelector`}
        />
      </Flex>
      <Divider />
    </CommonFields>
  );
}

export { AskPhoneFields };
