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
  FlatList,
  Linking,
  ImageBackground,
  Keyboard
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React,{useState,useRef, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Ionicons,AntDesign, Fontisto,MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRouter } from 'expo-router';
import { searchFlights,searchAirports,searchFlightEveryWhere } from '@/utils/skyScrapperApi';
import FlightCard from '@/components/search/flightCard';
import { Data } from '@/constants/data';


const { width, height } = Dimensions.get("window");
const screenWidth = Dimensions.get("window").width;

const TRIP_TYPES = ['Round trip', 'One way'];
const FLIGHT_CLASSES = ['Economy', 'Premium', 'Business', 'First'];


const index = () => {

  const router = useRouter();
  const [loading,setLoading] = useState(false);
  
  return (
    <SafeAreaView
      style={styles.container}
    >
      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios'? 'padding' : 'height'}
         style={{flex: 1}}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '90%',
            margin: 'auto'
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
                  marginTop: 25
                }}
              >
                {Data.map((entry) =>
                  entry.data.itineraries.map((itinerary) => (
                    <FlightCard key={itinerary.id} data={itinerary} />
                  ))
                )}

              </View>
            
            </View> 
             
            <Modal visible={loading} transparent={true} animationType="fade" onRequestClose={() => setLoading(false)}>
                <Pressable style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginVertical: 30
                    }}
                  >Loading...</Text>
                  <ActivityIndicator size="large" color={'#1d2855'} style={{
                    marginBottom: 30 
                  }}/>
                </View>
              </Pressable>
            </Modal>

        </ScrollView>
      </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default index;

const styles = StyleSheet.create({
   container: { 
    flex: 1, 
    backgroundColor: "#fff",
    // marginTop: 50 
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
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, width: '90%', alignItems: 'center' },
  modalOption: { paddingVertical: 15, width: '100%', alignItems: 'center' },
  modalOptionText: { color: 'black', fontSize: 18 },
  selectedOptionText: { color: 'black', fontWeight: 'bold' },
  modalTitle: { color: 'black', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },

  results: {
    marginTop: 20
  }

})