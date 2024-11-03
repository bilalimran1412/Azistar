import React from 'react';
import { Box } from '@chakra-ui/react';
import { sideViewLayoutType } from 'config/nodeConfigurations';
import { ButtonNodeLayout } from './CustomNodeLayout';

function BaseNodeDynamicLayout({ config, onClick, id, data }) {
  return (
    <Box>
      {config?.data?.layoutType === sideViewLayoutType.buttons && (
        <ButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.yesNo && (
        <ButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.pictureChoice && (
        <ButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.cards}
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.rating && (
        <ButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.opinionScale && (
        <ButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
        />
      )}
    </Box>
  );
}

export default BaseNodeDynamicLayout;
