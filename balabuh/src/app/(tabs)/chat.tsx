import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Center,
  Chip,
  Heading,
  Text,
} from '@/components';
import { cn } from '@/utils';
import React from 'react';
import { ScrollView, Pressable } from 'react-native';

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
  { name: 'all', label: '   All   ' },
  { name: 'unread', label: 'Unread' },
];

function formatDateTime(dateTime: Date): string {
  {
    /*
    This function formats the dateTime based on following stipulations:
    - if today, then HH:MM
    - if yesterday, then 'yesterday'
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
    return 'yesterday';
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
  onPress,
}: ChatCardProps & { onPress: () => void }) {
  return (
    <Pressable
      className='group rounded-lg border border-outline'
      onPress={onPress}
    >
      <Box className='w-full flex-row bg-surface px-2 py-4 group-active:opacity-50'>
        <Avatar className='mr-2.5'>
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
          <Box className='flex-row'>
            <Heading className='mr-2 line-clamp-1 flex-1 text-on-surface'>
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
          <Box className='flex-row'>
            <Text className='mr-2 line-clamp-1 flex-1 text-on-surface'>
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

  const [activeFilterType, setActiveFilterType] =
    React.useState<FilterType['name']>('all');

  return (
    <ScrollView className='min-h-full bg-background px-3'>
      <Box className='flex-row gap-x-3 pb-3 pt-4'>
        {filterTypes.map((filterType, i) => (
          <Chip
            key={i}
            label={filterType.label}
            isActive={filterType.name == activeFilterType}
            onPress={() => setActiveFilterType(filterType.name)}
          />
        ))}
      </Box>
      <Box className='w-full gap-y-1.5'>
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
                  />
                );
              },
            ),
          ),
        )}
      </Box>
    </ScrollView>
  );
}
