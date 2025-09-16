import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import FlightCard from '@/components/flightDetails/card';

const index = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [flightData, setFlightData] = useState(null);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      setLoading(true);
      try {
        const { legs, adults, currency, locale, market, cabinClass, countryCode }: any = params;

        // Construct the URL with dynamic parameters
        const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails?legs=${encodeURIComponent(
          legs
        )}&adults=${adults}&currency=${currency}&locale=${locale}&market=${market}&cabinClass=${cabinClass}&countryCode=${countryCode}`;

        const options = {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
            'x-rapidapi-key': '293384281mshe0127a23cae25bdp1c22bfjsnf647341053e8',
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          const data = await response.json();
          console.log(data)
        }
        const result = await response.json();
        setFlightData(result);
      } catch (error) {
        console.error('Error fetching flight details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params) {
      fetchFlightDetails();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '90%',
            margin: 'auto',
          }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Flight Details</Text>
            <View style={{ width: 28 }} />
          </View>
          <View style={styles.results}>
            <View
              style={{
                marginTop: 25,
              }}
            >
              {flightData ? <FlightCard data={flightData} /> : null}
            </View>
          </View>

          <Modal
            visible={loading}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setLoading(false)}
          >
            <Pressable style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    marginVertical: 30,
                  }}
                >
                  Loading...
                </Text>
                <ActivityIndicator
                  size="large"
                  color={'#1d2855'}
                  style={{
                    marginBottom: 30,
                  }}
                />
              </View>
            </Pressable>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'PlusJakarta-SemiBold',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalOption: { paddingVertical: 15, width: '100%', alignItems: 'center' },
  modalOptionText: { color: 'black', fontSize: 18 },
  selectedOptionText: { color: 'black', fontWeight: 'bold' },
  modalTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#1280ED',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 15,
    alignSelf: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: 'white',
  },
  results: {
    marginTop: 20,
  },
});