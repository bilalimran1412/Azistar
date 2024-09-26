import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { groupBy } from '../../utils/arrayHelper';
import { Divider } from '@chakra-ui/react';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';

function PictureChoiceNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];

  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    fields: config.fields,

    variable: currentNode?.data?.variable,
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;

    const groupedValues = groupBy(formValues.mediaAndMessage, 'type');

    updateNodeById(id, {
      ...currentNode?.data,
      ...formValues,
      variableName,
      ...(groupedValues || {}),
    });

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
      <Divider />

      <Divider />

      <FormVariableSelectorDropdown name='variable' readOnly />
    </SidebarFormContainer>
  );
}

export default PictureChoiceNodeContent;

// function MultipleChoiceSubFields() {
//   const { values } = useFormikContext();
//   const minMaxValues = values?.buttons.length;
//   const minMaxDropdownOptions = Array.from({ length: minMaxValues || 0 }).map(
//     (value, index) => ({ value: index + 1, label: index + 1 })
//   );
//   const maxDropdownOptions = [
//     ...minMaxDropdownOptions,
//     {
//       value: 'all',
//       label: 'All options',
//     },
//   ];
//   return (
//     <>
//       {values?.multipleChoices && (
//         <Flex flex={1} direction='column' gap={2}>
//           <Flex direction='column' gap={2}>
//             <Text>
//               When Multiple choice is activated, the flow will follow the
//               Default output. More info{' '}
//               <Text color='#5757ff' as='span'>
//                 here.
//               </Text>
//             </Text>
//             <FormCheckbox
//               name='outputAsArray'
//               label='Save output as an Array type variable'
//             />
//           </Flex>
//           <Flex direction='column' bg='lightgray' p={3}>
//             <FormCustomOptionSelector
//               name='minMaxOptions'
//               label='Set min/max options'
//               options={minMaxOptions}
//             />
//             {values?.minMaxOptions && (
//               <>
//                 <FormDropdown
//                   name='min'
//                   label='Minimum'
//                   options={minMaxDropdownOptions}
//                 />
//                 <FormDropdown
//                   name='max'
//                   label='Maximum'
//                   options={maxDropdownOptions}
//                 />
//               </>
//             )}
//           </Flex>
//         </Flex>
//       )}
//     </>
//   );
// }
