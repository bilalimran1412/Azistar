import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import {
  BusinessHoursOpenHoursField,
  BusinessHoursTimeZone,
} from 'components/Shared/FormUi';

function BusinessHoursNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);
  //TODO MOVE TO CONFIG
  // VARIABLE;
  const initialValues = {
    timezone: currentNode?.data.timezone || '',
    openHours: currentNode?.data.openHours || {
      Monday: {
        enabled: false,
        time: [],
      },
      Tuesday: {
        enabled: false,
        time: [],
      },
      Wednesday: {
        enabled: false,
        time: [],
      },
      Thursday: {
        enabled: false,
        time: [],
      },
      Friday: {
        enabled: false,
        time: [],
      },
      Saturday: {
        enabled: false,
        time: [],
      },
      Sunday: {
        enabled: false,
        time: [],
      },
    },
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    updateNodeById(id, { ...currentNode?.data, ...formValues });
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
      <BusinessHoursTimeZone />
      <BusinessHoursOpenHoursField name='openHours' />
    </SidebarFormContainer>
  );
}

export default BusinessHoursNodeContent;
