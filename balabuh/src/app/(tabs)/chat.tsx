import { Box, Chip, Text } from '@/components';
import { compareAsJson } from '@/utils';
import React from 'react';

type FilterType = {
  name: string;
  label: string;
};

const filterTypes: FilterType[] = [
  { name: 'all', label: '   All   ' },
  { name: 'unread', label: 'Unread' },
];

export default function () {
  console.debug('/(tabs)/chat is being rendered');

  const [activeFilterType, setActiveFilterType] = React.useState(
    filterTypes[0],
  );

  return (
    <Box className='min-h-full bg-background px-3'>
      <Box className='flex-row gap-3 py-4'>
        {filterTypes.map((filterType, i) => (
          <Chip
            key={i}
            label={filterType.label}
            isActive={compareAsJson(filterType, activeFilterType)}
            onPress={() => setActiveFilterType(filterType)}
          />
        ))}
      </Box>
      <Text className='font-bold text-black dark:text-white'>Chat Screen</Text>
    </Box>
  );
}
