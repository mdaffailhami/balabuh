import {
  Box,
  Text,
  HStack,
  TextInput,
  Heading,
  VStack,
  TravelCard,
} from '@/components';
import { theme } from '@/configs';
import { FontAwesome6 } from '@expo/vector-icons';
import { Link } from 'expo-router';
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

type Travel = {
  picture: string;
  from: string;
  to: string;
  travelName: string;
  rating: number;
  routes: string[];
};

const travels: Travel[] = [
  {
    picture:
      'https://auto2000.co.id/berita-dan-tips/_next/image?url=https%3A%2F%2Fastradigitaldigiroomuat.blob.core.windows.net%2Fstorage-uat-001%2Fkelebihan-toyota-all-new-avanza.png&w=3840&q=75',
    from: 'Barabai',
    to: 'Banjarmasin',
    travelName: 'PT Travel UWU',
    rating: 4.5,
    routes: ['Barabai', 'Kandangan', 'Rantau', 'Banjarbaru', 'Banjarmasin'],
  },
  {
    picture:
      'https://auto2000.co.id/berita-dan-tips/_next/image?url=https%3A%2F%2Fastradigitaldigiroomuat.blob.core.windows.net%2Fstorage-uat-001%2Fkelebihan-toyota-all-new-avanza.png&w=3840&q=75',
    from: 'Bontang',
    to: 'Barabai',
    travelName: 'Imanima',
    rating: 4,
    routes: ['Bontang', 'Samarinda', 'Balikpapan', 'IKN', 'Tanjung', 'Barabai'],
  },
  {
    picture:
      'https://auto2000.co.id/berita-dan-tips/_next/image?url=https%3A%2F%2Fastradigitaldigiroomuat.blob.core.windows.net%2Fstorage-uat-001%2Fkelebihan-toyota-all-new-avanza.png&w=3840&q=75',
    from: 'Lorem ipsum dolor sit amet, consectetur',
    to: 'Lorem ipsum dolor sit amet, consectetur',
    travelName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    rating: 3.8,
    routes: ['ABC', 'DEF', 'GHI', 'XYZ'],
  },
];

function TravelRecommendationsSection() {
  return (
    <VStack className='gap-y-2'>
      <HStack className='items-center justify-between'>
        <Heading className='text-xl text-on-surface'>
          Rekomendasi untuk anda
        </Heading>
        {/* Below href is temporary */}
        <Link href='/chat' className='text-primary underline'>
          Lihat semua
        </Link>
      </HStack>
      <VStack className='gap-y-1.5'>
        {/* Below code is temporary */}
        {[1, 2].map((i) =>
          travels.map((travel, j) =>
            i == 2 && j == travels.length - 1 ? null : (
              <TravelCard
                key={i}
                picture={travel.picture}
                from={travel.from}
                to={travel.to}
                travelName={travel.travelName}
                rating={travel.rating}
                routes={travel.routes}
                onPress={() =>
                  console.debug(
                    `${travel.from} ➝ ${travel.to} Travel card is being pressed`,
                  )
                }
              />
            ),
          ),
        )}
      </VStack>
    </VStack>
  );
}

export default function () {
  return (
    <ScrollView>
      <VStack className='min-h-full gap-y-5 bg-background px-3 py-4'>
        <SearchSection />
        <TravelRecommendationsSection />
      </VStack>
    </ScrollView>
  );
}
