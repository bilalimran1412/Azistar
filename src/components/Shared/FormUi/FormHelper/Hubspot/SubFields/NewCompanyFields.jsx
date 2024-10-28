import { DraftEditorField } from 'components/Shared/FormUi';
import React from 'react';

function NewCompanyFields() {
  return (
    <DraftEditorField
      name='companyName'
      placeholder='Introduce your value'
      variant='custom'
      setOnlyText={true}
      type='inline'
      label='Company name'
      labelVariant='h1'
    />
  );
}

export { NewCompanyFields };
