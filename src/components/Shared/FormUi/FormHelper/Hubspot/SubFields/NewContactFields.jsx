import React from 'react';
import { DraftEditorField } from 'components/Shared/FormUi';

function NewContactFields() {
  return (
    <>
      <DraftEditorField
        name='firstName'
        placeholder='Introduce your value'
        variant='custom'
        setOnlyText={true}
        type='inline'
        label='First name'
        labelVariant='h1'
      />
      <DraftEditorField
        name='lastName'
        placeholder='Introduce your value'
        variant='custom'
        setOnlyText={true}
        type='inline'
        label='Last name'
        labelVariant='h1'
      />
      <DraftEditorField
        name='email'
        placeholder='Introduce your value'
        variant='custom'
        setOnlyText={true}
        type='inline'
        label='Email'
        labelVariant='h1'
      />
    </>
  );
}

export { NewContactFields };
