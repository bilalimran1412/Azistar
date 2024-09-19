import React from 'react';
import BotBuilderSidebar from './BotBuilderSidebar';
import { useFetchData } from '../../hooks/bot/useFetchData';
import { useParams } from 'react-router-dom';
import { Alert, AlertIcon, Spinner, Text } from '@chakra-ui/react';
import { NodeProvider, useNodeContext } from './NodeContext';
import { ReactFlowProvider } from '@xyflow/react';

//TODO UNCOMMENT FOR CONNECTING TO DB
function BotBuilderPage() {
  const { id: botId = null } = useParams();

  // if (!botId) {
  //   return <>Bot ID is Required</>;
  // }
  return (
    <ReactFlowProvider>
      <NodeProvider>
        <BotBuilder />
      </NodeProvider>
    </ReactFlowProvider>
  );
}

export default BotBuilderPage;

function BotBuilder() {
  // const { id: botId = null } = useParams();
  // const {
  //   setNodes,
  //   setEdges,
  //   setBotID,
  //   botID: contextBotId,
  // } = useNodeContext();

  // const { data: botCopy, loading, error } = useFetchData(`/bot/${botId}/copy`);

  // const diagram = React.useMemo(
  //   () => JSON.parse(botCopy?.data[0]?.diagram || '{}'),
  //   [botCopy]
  // );
  // const { nodes, edges } = diagram;

  // React.useEffect(() => {
  //   if (nodes?.length) setNodes(nodes);
  //   if (edges?.length) setEdges(edges);
  //   if (!contextBotId) {
  //     setBotID(botId);
  //   }
  // }, [botId, contextBotId, edges, nodes, setBotID, setEdges, setNodes]);

  // if (loading) {
  //   return (
  //     <>
  //       <Spinner size='lg' />
  //     </>
  //   );
  // }
  // if (error) {
  //   return (
  //     <>
  //       <Alert status='error'>
  //         <AlertIcon />
  //         <Text>{error.message}</Text>
  //       </Alert>
  //     </>
  //   );
  // }

  //TODO change true to botCopy
  return <>{true && <BotBuilderSidebar />}</>;
}
