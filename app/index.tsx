// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';


export default function Index() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
 

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem('firstLogin');


      await new Promise(res => setTimeout(res, 200));

      if (isLoggedIn === 'true') {
        router.replace('/(tabs)');
      } else {
        router.replace('/welcome');
      }

      setChecking(false);
    };

    checkLogin();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={'#1d2855'}/>
      </View>
    );
  }

  return null;
}