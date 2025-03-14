import { theme } from '@/configs';
import { useState } from 'react';
import { View, useWindowDimensions, Text, useColorScheme } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const routes = [
  { key: 'history', title: 'Riwayat' },
  { key: 'inProcess', title: 'Dalam Proses' },
];

function HistoryScreen() {
  return <Text className='text-success-500 font-bold'>History Screen</Text>;
}
function InProcessScreen() {
  return <Text className='text-success-500 font-bold'>In Process Screen</Text>;
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
