// app/index.tsx
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn,setIsLoggedIn] = useState('false')

  useEffect(() => {

    const checkLogin = async () => {
      
      // Delay for splash if you want
      await new Promise(res => setTimeout(res, 200));

      if (isLoggedIn === 'true') {
        router.replace('/(tabs)');
      } else {
        router.replace('/welcome');
      }

      setTimeout(() => {
        setChecking(false);
      },2000)
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