import React, { useState } from 'react';
import {
  useDropdownToggle,
  handleCopyNode,
  handleReplaceNode,
  handleDuplicateNode,
  handleCopyNodeId,
} from './utils/nodeutils';
import NodeDropdownMenu from './NodeDropdownMenu';
import NodeActionDropdown from './NodeActionDropdown';
import {
  contentType,
  nodeConfigurationBlockIdMap,
} from '../../config/nodeConfigurations';
import { useNodeContext } from '../../views/canvas/NodeContext';
import CustomHandle from './CustomHandle';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FaFlag } from 'react-icons/fa';
import BaseNodeDynamicLayout from './BaseNodeDynamicLayout';

const BaseNode = (props) => {
  const { id, data } = props;
  const {
    isDropdownVisible,
    toggleDropdown,
    dropdownPosition,
    nodeRef,
    dropdownRef,
    setDropdownVisible,
  } = useDropdownToggle();

  const {
    addNewNode,
    setCurrentNodeId,
    setSideView,
    nodes,
    handleAddNewNode,
    handleNodeRemove,
  } = useNodeContext();
  const [handleId, setHandleId] = React.useState('');

  const [showReplaceMenu, setShowReplaceMenu] = useState(false);

  const config = nodeConfigurationBlockIdMap[data.blockId];

  const placeholderText =
    config?.data?.params?.nodeTextContent || 'No data available';

  const displayLabel = data.label || config.title;

  const displayContent = data?.params?.nodeTextContent
    ? { __html: data?.params?.nodeTextContent }
    : { __html: placeholderText };

  const handleAddNode = (blockId) => {
    addNewNode(id, blockId, handleId);
    toggleDropdown();
  };
  const isStartingNode = config?.data?.contentType === contentType.startingNode;
  const isMultiHandleNode = config?.data?.multipleHandles;
  const isButtonNode = config?.data?.contentType === contentType.buttonNode;
  const customHandles = !isButtonNode ? config?.data?.customHandle : [];
  const disableSourceHandle =
    config?.data?.contentType === contentType.incomingOnly;
  const disableAllHandles =
    config?.data?.contentType === contentType.placeholderNodes;

  const handleClick = () => {
    setDropdownVisible(false);
    if (isStartingNode) {
      return;
    }
    setCurrentNodeId(id);
    setSideView(true);
  };

  const handleAction = (actionType) => {
    switch (actionType) {
      case 'copy':
        handleCopyNode(id, nodes, handleAddNewNode);
        break;
      case 'replace':
        setShowReplaceMenu(true); // Show replacement menu
        break;
      case 'delete':
        setSideView(false);
        handleNodeRemove(id);
        break;
      case 'duplicate':
        handleDuplicateNode(id, nodes, handleAddNewNode);
        break;
      case 'copyId':
        handleCopyNodeId(id, nodes);
        break;
      default:
        break;
    }
  };

  const handleReplaceNodeType = (blockId) => {
    handleReplaceNode(id, nodes, handleAddNewNode, blockId); // Pass newType for replacement
    setShowReplaceMenu(false);
  };

  const NodeIcon = isStartingNode ? <FaFlag /> : config?.icon;

  const onClick = (id) => {
    setHandleId(id);
    toggleDropdown();
  };

  // means node having body
  const isNodeExtended = isMultiHandleNode;
  const showTags = false;
  const renderSubHeader = config?.data?.renderSubHeader;
  return (
    <Box ref={nodeRef}>
      <Box
        sx={{
          background: '#fff',
          borderRadius: '4px',
          border: '2px solid transparent',
          cursor: 'pointer',
        }}
        animation='0.3s ease-in-out 0s 1 normal none bounceIn'
        _hover={{
          boxShadow: '0 0 0 4px #c8c8fa',
        }}
      >
        <Box
          sx={{
            // minHeight: '60px',
            minWidth: '220px',
            // minH: '60px',
            display: 'flex',
            position: 'relative',
          }}
        >
          {/* maincontaincer */}
          <Box
            sx={{
              flexGrow: '1',
              flexDir: 'column',
            }}
            onClick={handleClick}
          >
            {/* headercontaciner */}
            <Flex p='8px 16px'>
              <Box flexGrow='1' display='flex' alignItems='center'>
                <Flex flexGrow='1' gap={4} alignItems='center'>
                  <Box
                    as='span'
                    width='22px'
                    height='22px'
                    sx={{
                      svg: {
                        height: '22px',
                        width: '22px',
                      },
                    }}
                  >
                    {NodeIcon}
                  </Box>

                  <Box flexGrow='1'>
                    <Flex
                      justifyContent='space-between'
                      alignItems='center'
                      gap={4}
                    >
                      <Flex direction='column'>
                        <Text fontWeight='700'>{displayLabel}</Text>
                        {(!isNodeExtended || renderSubHeader) && (
                          <Box>
                            <Text
                              fontSize='12px'
                              dangerouslySetInnerHTML={displayContent}
                              title={displayContent.__html}
                              sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                textOverflow: 'ellipsis',
                                maxWidth: '150px',
                              }}
                            />
                          </Box>
                        )}
                      </Flex>
                      <Box
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        className='nodrag nowheel'
                      >
                        {!isStartingNode && (
                          <NodeActionDropdown
                            onCopy={() => handleAction('copy')}
                            onReplace={() => handleAction('replace')}
                            onDelete={() => handleAction('delete')}
                            onDuplicate={() => handleAction('duplicate')}
                            onCopyId={() => handleAction('copyId')}
                          />
                        )}
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Flex>

            {isNodeExtended && (
              <Box p='7px' backgroundColor='#edeef9'>
                <BaseNodeDynamicLayout
                  config={config}
                  data={data}
                  id={id}
                  onClick={onClick}
                />
              </Box>
            )}
          </Box>
          {showTags && (
            <Box
              position='absolute'
              top='-13px'
              left='10px'
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              sx={{
                cursor: 'default',
              }}
            >
              <Box
                backgroundColor='#ddddff'
                p='2px'
                borderRadius='3px'
                px='6px'
                color='#33405E'
              >
                <Text
                  fontSize='12px'
                  textTransform='uppercase'
                  fontWeight='500'
                  lineHeight='20px'
                  letterSpacing='0'
                >
                  Starter
                </Text>
              </Box>
            </Box>
          )}
        </Box>
        {/* <Box>
        <Box onClick={handleClick}>
          <Box>
            <Box>{NodeIcon}</Box>
            <Box>
              <h4>{displayLabel}</h4>
              <p dangerouslySetInnerHTML={displayContent} />
            </Box>
            {!isStartingNode && (
              <NodeActionDropdown
                onCopy={() => handleAction('copy')}
                onReplace={() => handleAction('replace')}
                onDelete={() => handleAction('delete')}
                onDuplicate={() => handleAction('duplicate')}
                onCopyId={() => handleAction('copyId')}
              />
            )}
          </Box>
          {config?.data?.layoutType === sideViewLayoutType.buttons && (
            <ButtonNodeLayout
              onClick={onClick}
              id={id}
              buttons={data?.buttons}
            />
          )}
          {config?.data?.layoutType === sideViewLayoutType.yesNo && (
            <YesNoNodeLayout
              onClick={onClick}
              id={id}
              buttons={data?.buttons}
            />
          )}
          {config?.data?.layoutType === sideViewLayoutType.pictureChoice && (
            <ButtonNodeLayout onClick={onClick} id={id} buttons={data?.cards} />
          )}
        </Box>

        <Box>
          {showReplaceMenu && (
            <NodeDropdownMenu
              handleAddNode={handleReplaceNodeType}
              dropdownPosition={dropdownPosition}
              dropdownRef={dropdownRef}
            />
          )}

          {isDropdownVisible && (
            <NodeDropdownMenu
              handleAddNode={handleAddNode}
              dropdownPosition={dropdownPosition}
              dropdownRef={dropdownRef}
            />
          )}
          {!isMultiHandleNode && !disableSourceHandle && !disableAllHandles && (
            <CustomHandle type='source' onClick={toggleDropdown} />
          )}
          {!!customHandles &&
            customHandles.map((handle, idx) => (
              <CustomHandle
                type='source'
                key={idx}
                id={`source-${id}-${handle.id}`}
                status={handle.type}
                onClick={() => onClick(`source-${id}-${handle.id}`)}
                styles={{ top: `${idx * 30 + 15}px` }}
              />
            ))}

            </Box>
            </Box> */}
        <Box className='nodrag nowheel'>
          {showReplaceMenu && (
            <NodeDropdownMenu
              handleAddNode={handleReplaceNodeType}
              dropdownPosition={dropdownPosition}
              dropdownRef={dropdownRef}
            />
          )}

          {isDropdownVisible && (
            <NodeDropdownMenu
              handleAddNode={handleAddNode}
              dropdownPosition={dropdownPosition}
              dropdownRef={dropdownRef}
            />
          )}
          {!isMultiHandleNode && !disableSourceHandle && !disableAllHandles && (
            <CustomHandle type='source' onClick={toggleDropdown} />
          )}
          {!!customHandles &&
            customHandles.map((handle, idx) => (
              <CustomHandle
                type='source'
                key={idx}
                id={`source-${id}-${handle.id}`}
                status={handle.type}
                onClick={() => onClick(`source-${id}-${handle.id}`)}
                styles={{ top: `${idx * 30 + 15}px` }}
              />
            ))}

          {!isStartingNode && !disableAllHandles && (
            <CustomHandle id={id} type='target' />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BaseNode;
