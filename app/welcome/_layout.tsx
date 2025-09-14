import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

const _layout = () => {
//   const [fontsLoaded] = useFonts({
//     'PlusJakarta-Regular': require('../../assets/fonts/PlusJakartaSans-Regular.ttf'),
//     'PlusJakarta-Medium': require('../../assets/fonts/PlusJakartaSans-Medium.ttf'),
//     'PlusJakarta-SemiBold': require('../../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
//     'PlusJakarta-Bold': require('../../assets/fonts/PlusJakartaSans-Bold.ttf'),
//      'PlusJakarta-ExtraBold': require('../../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
//   });

//   if (!fontsLoaded) {
//     return null;
//   }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default _layout;