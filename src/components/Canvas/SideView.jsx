import React from 'react';

import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import {
  nodeConfigurationBlockIdMap,
  sideViewLayoutType,
} from '../../config/nodeConfigurations';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { SideViewContent } from '../BlockSideViewContent';
import DefaultNodeContent from '../BlockSideViewContent/DefaultNodeContent';

const SideView = ({ closeForm }) => {
  const { getNodeById, currentNodeId } = useNodeContext();

  const currentNode = React.useMemo(
    () => getNodeById(currentNodeId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentNodeId]
  );

  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];

  if (!currentNodeId) {
    return <></>;
  }

  const Content = config?.data?.layoutType
    ? SideViewContent[config?.data?.layoutType]
    : DefaultNodeContent;
  const isLeadScoringNode =
    config?.data?.layoutType === sideViewLayoutType.leadScoring;

  return (
    <div
      className='builder-sidebar'
      style={{
        width: isLeadScoringNode ? '500px' : '400px',
      }}
    >
      {Content ? <Content id={currentNodeId} /> : <></>}
    </div>
  );
};

export default SideView;
