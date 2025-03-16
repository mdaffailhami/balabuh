import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Center,
  Chip,
  Heading,
  IconButton,
  Text,
} from '@/components';
import { theme } from '@/configs';
import { cn } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { ScrollView, Pressable, PressableProps } from 'react-native';

type FilterType = {
  name: 'all' | 'unread';
  label: string;
};

type ChatCardProps = {
  name: string;
  imageUrl: string;
  message: string;
  numberOfUnreadMessages: number;
  dateTime: Date;
};

const filterTypes: FilterType[] = [
  { name: 'all', label: 'Semua' },
  { name: 'unread', label: 'Belum dibaca' },
];

function formatDateTime(dateTime: Date): string {
  {
    /*
    This function formats the dateTime based on following stipulations:
    - if today, then HH:MM
    - if yesterday, then 'kemarin'
    - else, then DD/M/YY
  */
  }

  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isToday = dateTime.toDateString() === now.toDateString();
  const isYesterday = dateTime.toDateString() === yesterday.toDateString();

  if (isToday) {
    return `${dateTime.getHours()}:${String(dateTime.getMinutes()).padStart(2, '0')}`;
  } else if (isYesterday) {
    return 'Kemarin';
  } else {
    return `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear() % 100}`;
  }
}

const chatCardProps: ChatCardProps[] = [
  {
    name: 'Daffa Ilhami',
    imageUrl: 'https://avatars.githubusercontent.com/u/74972129?v=4',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    numberOfUnreadMessages: 0,
    dateTime: new Date(),
  },
  {
    name: 'Imanima',
    imageUrl: 'https://hypixel.net/attachments/3216342/',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    numberOfUnreadMessages: 1,
    dateTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    name: 'Lorem ipsum dolor sit amet, consectetur',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2IYhSn8Y9S9_HF3tVaYOepJBcrYcd809pBA&s',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    numberOfUnreadMessages: 2,
    dateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
];

function ChatCard({
  name,
  imageUrl,
  message,
  numberOfUnreadMessages,
  dateTime,
  ...props
}: ChatCardProps & PressableProps) {
  return (
    <Pressable className='group rounded-lg border border-glassy-2' {...props}>
      <Box className='w-full flex-row gap-x-2.5 bg-surface px-2.5 py-3.5 group-active:opacity-50'>
        <Avatar size='lg'>
          <AvatarFallbackText className='text-on-surface'>
            {name}
          </AvatarFallbackText>
          <AvatarImage
            source={{
              uri: imageUrl,
            }}
          />
        </Avatar>
        <Box className='flex-1'>
          <Box className='flex-row gap-x-2.5'>
            <Heading className='line-clamp-1 flex-1 text-on-surface'>
              {name}
            </Heading>
            <Text
              className={cn('text-on-surface', {
                'font-semibold text-primary': numberOfUnreadMessages > 0,
              })}
            >
              {formatDateTime(dateTime)}
            </Text>
          </Box>
          <Box className='flex-row gap-x-2.5'>
            <Text className='line-clamp-1 flex-1 text-on-surface'>
              {message}
            </Text>
            {numberOfUnreadMessages > 0 && (
              <Center className='size-6 rounded-full bg-primary'>
                <Text className='text-sm font-semibold text-background'>
                  {numberOfUnreadMessages}
                </Text>
              </Center>
            )}
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
}

export default function () {
  console.debug('/(tabs)/chat is being rendered');

  const colorScheme = useColorScheme() || 'light';

  const [isInSelectingMode, setIsInSelectingMode] = React.useState(false);

  const [activeFilterType, setActiveFilterType] =
    React.useState<FilterType['name']>('all');

  return (
    <>
      <Tabs.Screen
        options={{
          title: !isInSelectingMode ? 'Chat' : '   1',
          headerLeft: () =>
            !isInSelectingMode ? null : (
              <>
                <Box className='w-2' />
                <IconButton onPress={() => setIsInSelectingMode(false)}>
                  <Ionicons
                    name='arrow-back'
                    size={24}
                    color={theme[colorScheme]['--color-on-background']}
                  />
                </IconButton>
              </>
            ),
        }}
      />
      <ScrollView className='min-h-full bg-background'>
        <Box className='flex-row gap-x-3 px-3 pt-4'>
          {filterTypes.map((filterType, i) => (
            <Chip
              key={i}
              label={filterType.label}
              isActive={filterType.name == activeFilterType}
              onPress={() => setActiveFilterType(filterType.name)}
            />
          ))}
        </Box>
        <Box className='w-full gap-y-1.5 p-3'>
          {/* Loop 3 times (Don't do this in productions) */}
          {chatCardProps.map((_, i) =>
            chatCardProps.map((_, i) =>
              chatCardProps.map(
                (
                  { name, imageUrl, message, numberOfUnreadMessages, dateTime },
                  i,
                ) => {
                  if (
                    activeFilterType == 'unread' &&
                    numberOfUnreadMessages < 1
                  ) {
                    return;
                  }

                  return (
                    <ChatCard
                      key={i}
                      name={name}
                      imageUrl={imageUrl}
                      message={message}
                      numberOfUnreadMessages={numberOfUnreadMessages}
                      dateTime={dateTime}
                      onPress={() => {
                        console.debug(`${name}'s Chat Card is being pressed`);
                      }}
                      onLongPress={(event) => {
                        if (!isInSelectingMode) setIsInSelectingMode(true);
                      }}
                    />
                  );
                },
              ),
            ),
          )}
        </Box>
      </ScrollView>
    </>
  );
}
