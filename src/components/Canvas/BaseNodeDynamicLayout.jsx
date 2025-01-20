import React from 'react';
import { Box } from '@chakra-ui/react';
import { sideViewLayoutType } from 'config/nodeConfigurations';
import { ButtonNodeLayout, ListButtonNodeLayout } from './CustomNodeLayout';
import CalendlyLayout from './CustomNodeLayout/CalendlyLayout';

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
      {config?.data?.layoutType === sideViewLayoutType.abTesting && (
        <ButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
          renderAny={false}
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.persistentMenu && (
        <ButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
          renderAny={false}
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.calendly && (
        <CalendlyLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.businessHours && (
        <CalendlyLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.webhook && (
        <ButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
          placeholder='Add status code'
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.waReplyButtons && (
        <ButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.waOptInOut && (
        <ButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.waKeywordOptions && (
        <ButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
        />
      )}
      {config?.data?.layoutType === sideViewLayoutType.waListButtons && (
        <ListButtonNodeLayout
          onClick={onClick}
          id={id}
          buttons={data?.params?.buttons}
        />
      )}
    </Box>
  );
}

export default BaseNodeDynamicLayout;
