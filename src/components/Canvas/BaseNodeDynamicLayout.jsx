import React from 'react';
import { Box } from '@chakra-ui/react';
import { sideViewLayoutType } from 'config/nodeConfigurations';
import { ButtonNodeLayout, YesNoNodeLayout } from './CustomNodeLayout';

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
        <YesNoNodeLayout onClick={onClick} id={id} buttons={data?.buttons} />
      )}
      {config?.data?.layoutType === sideViewLayoutType.pictureChoice && (
        <ButtonNodeLayout onClick={onClick} id={id} buttons={data?.cards} />
      )}
    </Box>
  );
}

export default BaseNodeDynamicLayout;
