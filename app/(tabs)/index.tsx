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
import { results } from '@/constants/flightsEverywhere';
import FlightCard from '../../components/home/flightCard';


const { width, height } = Dimensions.get("window");
const screenWidth = Dimensions.get("window").width;

const TRIP_TYPES = ['Round trip', 'One way'];
const FLIGHT_CLASSES = ['Economy', 'Premium', 'Business', 'First'];


const index = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState<any[]>([]);
  
  const [subFlights,setSubFlights] = useState<any>([])

  // const fetchFlights = async() => {
  //   const originData: any = await searchAirports('london');

  //   const originEntityId = originData.data[0].entityId;

  //   const fetch = await searchFlightEveryWhere(originEntityId);
  //   setFlights(fetch.data.results)

  // }

  useEffect(() => {
    // fetchFlights();

  },[]);

  
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
          <View
            style={styles.header}
          >
            <Text
              style={{
                fontSize: 18
              }}
            >Welcome,</Text>
            <TouchableOpacity
            >
              <Fontisto name="bell" size={24} color="black" />
            </TouchableOpacity>
          </View>
          
            <View
            style={{
              marginTop: 20,
              position: 'relative'
            }}
           >
              <Text 
                style={{
                  fontWeight: '500',
                  fontSize: 18,
                  marginBottom: 20
                }}
              > Find cheap flights from London to anywhere </Text>
              <Image 
                source={require('../../assets/images/2.jpg')}
                resizeMode='cover'
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 20,
                  backgroundColor: '#F3F1F8',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 40,
                  left: 20
                }}
              >
              </View>
          </View> 
            <View style={styles.flightsContainer}>
              <Text style={styles.flightsHeaderText}> Flights</Text>
              <View>
                {
                  results.map((r) => (
                    <FlightCard key={r.id} data={r}/>
                  ))
                }
              </View>
              
            </View>
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
    marginTop: 30,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerText: {
    fontWeight: '500',
    fontSize: 20
  },
  headerSection: {
    marginTop: 20,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    backgroundColor: '#F3F1F8',
  },
  icon: {
    marginRight: 10,
  },
  flightsContainer: {
    marginTop: 50
  },
  flightsHeaderText: {
    fontSize: 20,
    fontWeight: '500'
  },
 
})