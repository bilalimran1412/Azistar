import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import {
  BusinessHoursClosedDaysField,
  BusinessHoursOpenHoursField,
  BusinessHoursSpecialDaysField,
  BusinessHoursTimeZone,
} from 'components/Shared/FormUi';
const defaultOpenHours = {
  Monday: {
    enabled: false,
    time: [{ start: '', end: '' }],
  },
  Tuesday: {
    enabled: false,
    time: [{ start: '', end: '' }],
  },
  Wednesday: {
    enabled: false,
    time: [{ start: '', end: '' }],
  },
  Thursday: {
    enabled: false,
    time: [{ start: '', end: '' }],
  },
  Friday: {
    enabled: false,
    time: [{ start: '', end: '' }],
  },
  Saturday: {
    enabled: false,
    time: [{ start: '', end: '' }],
  },
  Sunday: {
    enabled: false,
    time: [{ start: '', end: '' }],
  },
};
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
    openHours: currentNode?.data.openHours || defaultOpenHours,
    closedDays: currentNode?.data.closedDays || '',
    specialDays: currentNode?.data.specialDays || '',
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
      <BusinessHoursClosedDaysField name='closedDays' />
      <BusinessHoursSpecialDaysField name='specialDays' />
    </SidebarFormContainer>
  );
}

export default BusinessHoursNodeContent;
