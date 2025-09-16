import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export default function RootLayout() {
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // if (!loaded) {
  //   // Async font loading only occurs in development.
  //   return null;
  // }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index'/>
        <Stack.Screen name='welcome'/>
        <Stack.Screen name='(tabs)'/>
        <Stack.Screen name='flightDetails'/>
        <Stack.Screen name='otp'/>
        <Stack.Screen name='forgotpassword'/>
        <Stack.Screen name='signup'/>
        <Stack.Screen name='signin'/>
        <Stack.Screen name="profilePassword" />
        <Stack.Screen name="profileInfo" />
        <Stack.Screen name="homeFlightDetails" />

       
      </Stack>
    </>
  );
}