import {
  AssociationFieldArray,
  DraftEditorField,
  ExtraFieldsArray,
} from 'components/Shared/FormUi';
import React from 'react';

function NewCompanyFields() {
  return (
    <>
      <DraftEditorField
        name='companyName'
        placeholder='Introduce your value'
        variant='custom'
        type='inline'
        label='Company name'
        labelVariant='h1'
      />
      <ExtraFieldsArray name='extra' />
      <AssociationFieldArray name='associations' />
    </>
  );
}

export { NewCompanyFields };
