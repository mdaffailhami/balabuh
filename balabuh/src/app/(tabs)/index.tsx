import { Box, Text, HStack, TextInput } from '@/components';
import { theme } from '@/configs';
import { FontAwesome6 } from '@expo/vector-icons';
import { ScrollView, useColorScheme } from 'react-native';

function SearchSection() {
  const colorScheme = useColorScheme() || 'light';

  function openSearchScreen() {
    console.debug('Search input is being pressed');
  }

  return (
    <HStack className='items-center gap-x-3'>
      <Box className='flex-1'>
        <TextInput
          placeholder='Dari ...'
          prefixIcon={{
            type: 'FontAwesome6',
            name: 'car-side',
          }}
          editable={false}
          onPress={openSearchScreen}
        />
      </Box>
      <FontAwesome6
        name='arrow-right-long'
        size={20}
        color={theme[colorScheme]['--color-primary']}
        className='mx-1'
      />
      <Box className='flex-1'>
        <TextInput
          placeholder='Ke ...'
          prefixIcon={{
            type: 'FontAwesome6',
            name: 'car-side',
          }}
          editable={false}
          onPress={openSearchScreen}
        />
      </Box>
    </HStack>
  );
}

export default function () {
  return (
    <ScrollView className='min-h-full bg-background px-3 py-4'>
      <SearchSection />
    </ScrollView>
  );
}
