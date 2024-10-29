import React from 'react';
import {
  AssociationFieldArray,
  DraftEditorField,
  ExtraFieldsArray,
  FormDropdown,
} from 'components/Shared/FormUi';

function NewDealFields() {
  return (
    <>
      <DraftEditorField
        name='deal'
        placeholder='Introduce your value'
        variant='custom'
        setOnlyText={true}
        type='inline'
        label='Deal name'
        labelVariant='h1'
      />
      <FormDropdown
        name='pipeline'
        placeholder='Choose your pipeline'
        variant='custom'
        label='Pipeline'
        labelVariant='h1'
      />
      <FormDropdown
        name='stage'
        placeholder='Choose your stage'
        variant='custom'
        label='Stage'
        labelVariant='h1'
      />
      <ExtraFieldsArray name='extra' />
      <AssociationFieldArray name='associations' />
    </>
  );
}

export { NewDealFields };
