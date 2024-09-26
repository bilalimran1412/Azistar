import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { groupBy } from '../../utils/arrayHelper';
import {
  ButtonCreatorInputFieldArray,
  FormCheckbox,
  FormCustomOptionSelector,
  FormDropdown,
  MessageFieldArray,
} from '../Shared/FormUi';
import { messageFieldArrayInitialValue } from '../Shared/FormUi/FormHelper/MessageFieldArray';
import { Divider, Flex, Text } from '@chakra-ui/react';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import { useFormikContext } from 'formik';

//TODO MOVE TO CONFIG
const defaultButtonsValue = [
  {
    text: 'Button',
    id: '975bea52-8ba7-53e4-a33b-d23acde26b2b',
    buttonStyle: 'text',
    icon: null,
    externalLink: '',
    isSettingExpand: false,
    sortOrder: 0,
  },
];

const minMaxOptions = [
  {
    label: 'No',
    value: false,
  },
  {
    label: 'Yes',
    value: true,
  },
];

const buttonFeatureOptions = [
  {
    name: 'buttonsAlignment',
    label: 'Button alignment',
    options: [
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'Vertical', value: 'vertical' },
    ],
  },
  {
    name: 'randomizeOrder',
    label: 'Randomize order',

    options: [
      { label: 'No', value: false },
      { label: 'Yes', value: true },
    ],
  },
  {
    name: 'searchableOptions',
    label: 'Searchable options',
    options: [
      { label: 'No', value: false },
      { label: 'Yes', value: true },
    ],
  },
];
const multipleChoice = {
  name: 'multipleChoices',
  label: 'Multiple choices',
  options: [
    { label: 'No', value: false },
    { label: 'Yes', value: true },
  ],
};
function ButtonNodeContent({ id }) {
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
    mediaAndMessage:
      currentNode?.data?.mediaAndMessage ||
      messageFieldArrayInitialValue?.message,
    variable: currentNode?.data?.variable || '',

    buttons: currentNode?.data?.buttons || defaultButtonsValue,
    minMaxOptions: currentNode?.data?.minMaxOptions || false,
    buttonsAlignment: currentNode?.data?.buttonsAlignment || 'horizontal',
    randomizeOrder: currentNode?.data?.randomizeOrder || false,
    searchableOptions: currentNode?.data?.searchableOptions || false,
    multipleChoices: currentNode?.data?.multipleChoices || false,
    outputAsArray: currentNode?.data?.outputAsArray || false,
    min: currentNode?.data?.min || 1,
    max: currentNode?.data?.max || 'all',
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
      <MessageFieldArray name='mediaAndMessage' label='Write a message' />
      <ButtonCreatorInputFieldArray name='buttons' />
      {buttonFeatureOptions.map((options) => (
        <FormCustomOptionSelector
          name={options.name}
          key={options.name}
          label={options.label}
          options={options.options}
        />
      ))}
      <Divider />
      <FormCustomOptionSelector
        name={multipleChoice.name}
        key={multipleChoice.name}
        label={multipleChoice.label}
        options={multipleChoice.options}
      />
      <MultipleChoiceSubFields />
      <Divider />

      <FormVariableSelectorDropdown name='variable' readOnly />
    </SidebarFormContainer>
  );
}

export default ButtonNodeContent;

function MultipleChoiceSubFields() {
  const { values } = useFormikContext();
  const minMaxValues = values?.buttons.length;
  const minMaxDropdownOptions = Array.from({ length: minMaxValues || 0 }).map(
    (value, index) => ({ value: index + 1, label: index + 1 })
  );
  const maxDropdownOptions = [
    ...minMaxDropdownOptions,
    {
      value: 'all',
      label: 'All options',
    },
  ];
  return (
    <>
      {values?.multipleChoices && (
        <Flex flex={1} direction='column' gap={2}>
          <Flex direction='column' gap={2}>
            <Text>
              When Multiple choice is activated, the flow will follow the
              Default output. More info{' '}
              <Text color='#5757ff' as='span'>
                here.
              </Text>
            </Text>
            <FormCheckbox
              name='outputAsArray'
              label='Save output as an Array type variable'
            />
          </Flex>
          <Flex direction='column' bg='lightgray' p={3}>
            <FormCustomOptionSelector
              name='minMaxOptions'
              label='Set min/max options'
              options={minMaxOptions}
            />
            {values?.minMaxOptions && (
              <>
                <FormDropdown
                  name='min'
                  label='Minimum'
                  options={minMaxDropdownOptions}
                />
                <FormDropdown
                  name='max'
                  label='Maximum'
                  options={maxDropdownOptions}
                />
              </>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
}
