import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();
  const slide = {
    image: require('../../assets/images/3.jpg'),
    title: 'Cheap Flights to your Destinations ',
    description: 'Find and book affordable flights to top destinations worldwide with ease.',
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.slide}>
        <Image
          source={typeof slide.image === 'string' ? { uri: slide.image } : slide.image}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/(tabs)')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '120%',
    height: 500,
    marginBottom: 20,
  },
  title: {
    color: '#000000',
    fontSize: 28,
    fontFamily: 'PlusJakarta-SemiBold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    opacity: 0.65,
    fontFamily: 'PlusJakarta-Regular'
  },
  button: {
    backgroundColor: '#1280ED',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 15,
    marginTop: 20,
     width: '100%',
    marginHorizontal: 'auto'
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'PlusJakarta-Bold'
  }
});

export default Index;