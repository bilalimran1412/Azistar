import { Divider, Flex, Text } from '@chakra-ui/react';
import {
  FormCheckbox,
  FormSettings,
  FormTextField,
} from 'components/Shared/FormUi';

import React from 'react';
import { FormNodePortal } from './FormNodePortal';

export function FormNodeSettings() {
  return (
    <Flex gap={3} direction='column'>
      <Divider />
      <Flex justifyContent='space-between' alignItems='center'>
        <Text fontSize='large' fontWeight='700'>
          Settings
        </Text>
        <FormNodePortal isCard={false} type='settings' />
      </Flex>
    </Flex>
  );
}
export function NodeSettingsPortalContent() {
  return (
    <>
      <FormTextField
        name='sendLabel'
        label='Submit button label'
        variant='custom'
        labelVariant='basic'
      />
      <Divider />
      <FormSettings
        label='Skip button'
        name='hasSkipButton'
        bgColor='inherit'
        containerStyles={{ padding: 0 }}
      >
        <FormTextField
          name='skipLabel'
          label='Skip button label'
          variant='custom'
          labelVariant='basic'
        />
      </FormSettings>
      <Divider />
      <FormTextField
        name='extra.errorMessage'
        label='Required field error message'
        variant='custom'
        labelVariant='basic'
      />
      <Divider />
      <FormCheckbox
        name='extra.markRequired'
        label='Mark required fields with a * on the label'
        labelVariant='basic'
      />
      <Divider />
      <FormCheckbox
        name='extra.mobileResponsive'
        label='Stack fields on mobile'
        labelVariant='basic'
      />
    </>
  );
}
