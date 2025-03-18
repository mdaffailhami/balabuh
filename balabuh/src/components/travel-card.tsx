import { HStack } from '@/components/hstack';
import { GestureResponderEvent, Pressable, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { VStack } from '@/components/vstack';
import { Heading } from '@/components/heading';
import { FontAwesome6 } from '@expo/vector-icons';
import { theme } from '@/configs';
import { Box } from '@/components/box';
import { Text } from '@/components/text';

export function TravelCard({
  picture,
  from,
  to,
  travelName,
  rating,
  routes,
  onPress,
}: {
  picture: string;
  from: string;
  to: string;
  travelName: string;
  rating: number;
  routes: string[];
  onPress: (event: GestureResponderEvent) => void;
}) {
  const colorScheme = useColorScheme() || 'light';

  return (
    <Pressable
      onPress={onPress}
      className='group overflow-hidden rounded-lg border border-glassy-2'
    >
      <HStack className='gap-x-2 bg-surface px-2 py-2 group-active:opacity-50'>
        <Box style={{ flex: 2 }} className='overflow-hidden rounded-lg'>
          <Image
            style={{
              flex: 2,
              width: '100%',
              backgroundColor: theme[colorScheme]['--color-glassy-2'],
            }}
            source={picture}
            //   placeholder={{ blurhash }}
            contentFit='cover'
            transition={1000}
          />
        </Box>
        <VStack style={{ flex: 8 }} className='gap-y-1'>
          <HStack className='justify-between gap-x-1.5'>
            <HStack className='flex-1 items-center gap-x-2'>
              <Heading
                className='max-w-[50%] overflow-hidden truncate text-xl text-on-surface'
                numberOfLines={1}
              >
                {from}
              </Heading>
              <FontAwesome6
                name='arrow-right-long'
                size={16}
                color={theme[colorScheme]['--color-on-surface']}
                className='translate-y-[0.1rem]'
              />
              <Heading
                className='flex-1 overflow-hidden truncate text-xl text-on-surface'
                numberOfLines={1}
              >
                {to}
              </Heading>
            </HStack>
            {/* <Box className='w-full' /> */}
            <Text className='text-on-surface'>
              ⭐{rating % 1 === 0 ? `${rating}.0` : rating}
            </Text>
          </HStack>
          <Text
            numberOfLines={1}
            className='overflow-hidden truncate text-sm font-semibold text-glassy-4'
          >
            {travelName}
          </Text>
          <HStack className='mt-1 items-center gap-x-2'>
            <FontAwesome6
              name='car-side'
              size={16}
              color={theme[colorScheme]['--color-primary']}
              //   className='translate-y-1.5'
            />
            <Text
              numberOfLines={1}
              className='flex-1 overflow-hidden truncate font-medium text-on-surface'
            >
              {routes.join(' ➝ ')}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
}
