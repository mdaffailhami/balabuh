import { Box } from '@/components';
import { Input, InputField } from '@/components';
import { ScrollView } from 'react-native';

export default function () {
  return (
    <ScrollView className='min-h-full bg-background px-3'>
      <Box className='flex-row gap-x-3 pt-4'>
        <Input>
          <InputField />
        </Input>
      </Box>
    </ScrollView>
  );
}
