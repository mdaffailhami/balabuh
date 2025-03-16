import { Box, Heading } from '@/components';
import { months, theme } from '@/configs';
import { formatRupiah } from '@/utils';
import { Entypo, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  useColorScheme,
  Pressable,
  ScrollView,
  PressableProps,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const routes = [
  { key: 'history', title: 'Riwayat' },
  { key: 'inProcess', title: 'Dalam Proses' },
];

function formatDate(date: Date): string {
  // This function formats the date based on following format:
  // <date> <month_name> <year>

  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString();
  return `${day} ${month} ${year}`;
}

type ActivityCardProps = {
  isFinished: boolean;
  from: string;
  to: string;
  date: Date;
  price: number;
};

function ActivityCard({
  isFinished,
  from,
  to,
  date,
  price,
  ...props
}: ActivityCardProps & PressableProps) {
  const colorScheme = useColorScheme() || 'light';
  return (
    <Pressable className='group rounded-lg border border-glassy-2' {...props}>
      <Box className='w-full flex-row gap-x-2.5 bg-surface px-3.5 py-3.5 group-active:opacity-50'>
        <Box className='flex-1'>
          <Box className='flex-row gap-x-2'>
            <Heading
              className='overflow-hidden truncate text-xl text-on-surface'
              numberOfLines={1}
            >
              {from}
            </Heading>
            <FontAwesome6
              name='arrow-right-long'
              size={16}
              color={theme[colorScheme]['--color-on-surface']}
              className='translate-y-1.5'
            />
            <Heading className='text-xl text-on-surface'>{to}</Heading>
          </Box>
          <Text className='text-glassy-3'>{formatDate(date)}</Text>
          <Text className='text-xl font-semibold text-primary'>
            {formatRupiah(price)}
          </Text>
        </Box>
        <Box className='mr-2.5 items-center justify-center'>
          {isFinished ? (
            <FontAwesome6
              name='check'
              size={24}
              color={theme[colorScheme]['--color-primary']}
            />
          ) : (
            <Entypo
              name='dots-three-horizontal'
              size={24}
              color={theme[colorScheme]['--color-primary']}
            />
          )}
          <Text className='text-on-surface'>
            {isFinished ? 'Selesai' : 'Proses'}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}

const histories: ActivityCardProps[] = [
  {
    isFinished: true,
    from: 'Banjarbaru asjdbsakdb kasj dbaskjdb kasjdb',
    to: 'Kandangan',
    date: new Date(),
    price: 100000,
  },
  {
    isFinished: true,
    from: 'Barabai',
    to: 'Banjarmasin',
    date: new Date(
      Date.now() - (new Date().getMonth() - 1) * 30 * 24 * 60 * 60 * 1000,
    ),
    price: 1_000_000,
  },
  {
    isFinished: true,
    from: 'Barabai',
    to: 'Bontang',
    date: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000),
    price: 99_123_456,
  },
];

const inProcesses: ActivityCardProps[] = [
  {
    isFinished: false,
    from: 'Banjarbaru',
    to: 'Kandangan',
    date: new Date(),
    price: 100000,
  },
  {
    isFinished: false,
    from: 'Barabai',
    to: 'Banjarmasin',
    date: new Date(
      Date.now() - (new Date().getMonth() - 1) * 30 * 24 * 60 * 60 * 1000,
    ),
    price: 1_000_000,
  },
  {
    isFinished: false,
    from: 'Barabai',
    to: 'Bontang',
    date: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000),
    price: 99_123_456,
  },
];

function HistoryScreen() {
  return (
    <ScrollView>
      <Box className='min-h-full gap-y-1.5 bg-background px-3 py-3'>
        {histories.map((_) =>
          histories.map((_) =>
            histories.map((history, i) => (
              <ActivityCard
                key={i}
                isFinished={history.isFinished}
                from={history.from}
                to={history.to}
                date={history.date}
                price={history.price}
              />
            )),
          ),
        )}
      </Box>
    </ScrollView>
  );
}
function InProcessScreen() {
  return (
    <ScrollView>
      <Box className='min-h-full gap-y-1.5 bg-background px-3 py-3'>
        {inProcesses.map((_) =>
          inProcesses.map((_) =>
            inProcesses.map((history, i) => (
              <ActivityCard
                key={i}
                isFinished={history.isFinished}
                from={history.from}
                to={history.to}
                date={history.date}
                price={history.price}
              />
            )),
          ),
        )}
      </Box>
    </ScrollView>
  );
}

function MyTabBar(props: any) {
  const colorScheme = useColorScheme() || 'light';

  return (
    <TabBar
      indicatorStyle={{
        backgroundColor: theme[colorScheme]['--color-primary'],
      }}
      style={{
        backgroundColor: theme[colorScheme]['--color-background'],
      }}
      activeColor={theme[colorScheme]['--color-primary']}
      inactiveColor={theme[colorScheme]['--color-glassy-3']}
      {...props}
    />
  );
}

export default function () {
  console.debug('/(tabs)/activity is being rendered');

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <TabView
      renderTabBar={MyTabBar}
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        history: HistoryScreen,
        inProcess: InProcessScreen,
      })}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
