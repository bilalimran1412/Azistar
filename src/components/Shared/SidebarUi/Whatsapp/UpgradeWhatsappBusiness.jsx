import React from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { SidebarFormCard } from '..';

function UpgradeWhatsappBusiness() {
  return (
    <SidebarFormCard
      title={
        <Flex alignItems='center' gap={1}>
          <WarningTwoIcon fontSize='20px' />
          <Text fontSize='larger' fontWeight='700'>
            You don’t have a Business number!
          </Text>
        </Flex>
      }
    >
      <Text lineHeight='22px' letterSpacing='0px'>
        You don’t have a WhatsApp Business number connected in your account.
      </Text>

      <Button
        textColor='#fff'
        bgColor='#D7376B'
        fontSize='large'
        borderRadius='3px'
        _hover={{
          bgColor: '#D7376B',
        }}
        width='max-content'
        height='32px'
        mt={4}
      >
        Upgrade to WhatsApp
      </Button>
    </SidebarFormCard>
  );
}

export { UpgradeWhatsappBusiness };
