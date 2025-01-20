import React from 'react';
import {
  SidebarFormContainer,
  UpgradeWhatsappBusiness,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from 'utils/yup';

function WAOptInOutCheckNodeContent({ id }) {
  const { getNodeById, setSideView } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;

  const initialValues = {};

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
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
      <UpgradeWhatsappBusiness />
    </SidebarFormContainer>
  );
}

export default WAOptInOutCheckNodeContent;
