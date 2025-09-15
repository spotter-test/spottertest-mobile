import AsyncStorage from '@react-native-async-storage/async-storage';
import { formData } from './enums';


export async function saveExpoPushToken(token: string, platform: string) {
  try {
    const data = JSON.stringify({ token, platform });
    await AsyncStorage.setItem('expoPushToken', data);
    console.log('✅ Expo Push Token saved!');
  } catch (error) {
    console.error('❌ Failed to save token', error);
  }
}

// Get the token
export async function getExpoPushToken() {
  try {
    const data = await AsyncStorage.getItem('expoPushToken');
    if (data) {
      return JSON.parse(data); // { token: string, platform: 'ios' | 'android' }
    }
  } catch (error) {
    console.error('❌ Failed to read token from storage', error);
  }
  return null;
}



// Save token
export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('userToken', token);
    console.log('✅ Token stored');
  } catch (e) {
    console.error('❌ Failed to store token', e);
  }
};

export const saveFormdata = async(data: any) => {
  try{
    const jsonValue = JSON.stringify(data); // ✅ convert object to string
    await AsyncStorage.setItem('userData', jsonValue);
  }catch (e) {
    console.error('❌ Failed to store token', e);
  }
}

export const getFormdata = async (): Promise<formData | null> => {
  try {
    const value = await AsyncStorage.getItem('userData');
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error('❌ Failed to retrieve data', e);
    return null;
  }
};


// Get token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (e) {
    console.error('❌ Failed to fetch token', e);
    return null;
  }
};

// Remove token
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    console.log('🚫 Token removed');
  } catch (e) {
    console.error('❌ Failed to remove token', e);
  }
};

export const setFirstLogin = async () => {
    try {
      await AsyncStorage.setItem('firstLogin', 'true');
    } catch (e) {
      console.error('Error saving first login flag', e);
    }
};

export const clearFirstLogin = async () => {
    try {
      await AsyncStorage.removeItem('firstLogin');
    } catch (e) {
      console.error('Error clearing first login flag', e);
    }
  };
  