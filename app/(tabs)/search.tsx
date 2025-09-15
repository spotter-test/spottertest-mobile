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
import { results } from '@/constants/flightsEverywhere';
import FlightCard from '../../components/home/flightCard';


const { width, height } = Dimensions.get("window");
const screenWidth = Dimensions.get("window").width;

const TRIP_TYPES = ['Round trip', 'One way'];
const FLIGHT_CLASSES = ['Economy', 'Premium', 'Business', 'First'];


const index = () => {

  const router = useRouter();

  const [tripType, setTripType] = useState('Round trip');
  const [travelers, setTravelers] = useState(1);
  const [flightClass, setFlightClass] = useState('Economy');

  const [departure, setDeparture] = useState('London');
  const [destination, setDestination] = useState('Paris');

  // Set initial dates based on the screenshot for visual accuracy
  const initialDepartureDate = new Date(2025, 9, 8); // October is month 9 (0-indexed)
  const initialReturnDate = new Date(2025, 9, 11);

  const [departureDate, setDepartureDate] = useState(initialDepartureDate);
  const [returnDate, setReturnDate] = useState(initialReturnDate);

  const [isDeparturePickerVisible, setDeparturePickerVisibility] = useState(false);
  const [isReturnPickerVisible, setReturnPickerVisibility] = useState(false);

  const [isTripTypeModalVisible, setTripTypeModalVisible] = useState(false);
  const [isTravelersModalVisible, setTravelersModalVisible] = useState(false);
  const [isClassModalVisible, setClassModalVisible] = useState(false);


  const showDeparturePicker = () => setDeparturePickerVisibility(true);
  const hideDeparturePicker = () => setDeparturePickerVisibility(false);
  const showReturnPicker = () => setReturnPickerVisibility(true);
  const hideReturnPicker = () => setReturnPickerVisibility(false);

  const handleDepartureConfirm = (date: any) => {
    setDepartureDate(date);
    hideDeparturePicker();
  };

  const handleReturnConfirm = (date: any) => {
    setReturnDate(date);
    hideReturnPicker();
  };
  
  const formatDate = (date: any) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const OptionModal = ({ visible, onClose, options, selected, onSelect }: any) => (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          {options.map((option: any) => (
            <TouchableOpacity key={option} style={styles.modalOption} onPress={() => onSelect(option)}>
              <Text style={[styles.modalOptionText, selected === option && styles.selectedOptionText]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );

  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState<any[]>([]);
  

  const handleSearch = async () => {
    setLoading(true);
    try {
      // Step 1: Get skyIds
    //   const originData: any = await searchAirports(departure);
    //   const destinationData: any = await searchAirports(destination);

    //   const originSkyId = originData.data[0].skyId;
    //   const originEntityId = originData.data[0].entityId;

    //   const destinationSkyId = destinationData.data[0].skyId;
    //   const destinationEntityId = destinationData.data[0].entityId;

    //   // Step 2: Search flights
    //   const _flights: any = await searchFlights(originSkyId, destinationSkyId, departureDate,travelers,flightClass,returnDate,originEntityId,destinationEntityId);
    //   console.log(_flights);
      // setFlights(_flights);
    } catch (err) {
      console.error("Error:", err);
    }
  };



  
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
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Search Flights</Text>
            </View>
          
            <View 
              style={styles.flightsContainer}
            >
               <View style={styles.searchContainer}>
                
                  <View style={styles.topOptionsRow}>
                    <TouchableOpacity style={styles.optionButton} onPress={() => setTripTypeModalVisible(true)}>
                      <Ionicons name="swap-horizontal" size={16} color="black" />
                      <Text style={styles.optionText}>{tripType}</Text>
                      <Ionicons name="chevron-down" size={16} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton} onPress={() => setTravelersModalVisible(true)}>
                      <Ionicons name="person" size={16} color="#000" />
                      <Text style={styles.optionText}>{travelers}</Text>
                      <Ionicons name="chevron-down" size={16} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionButton} onPress={() => setClassModalVisible(true)}>
                      <Text style={styles.optionText}>{flightClass}</Text>
                      <Ionicons name="chevron-down" size={16} color="#000" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.locationRow}>
                    <View style={styles.inputContainer}>
                      <TextInput 
                        style={styles.textInput} 
                        value={departure} 
                        onChangeText={setDeparture} 
                        placeholderTextColor="#8E8E93" 
                        placeholder='Where from ?'
                      />
                    </View>
                    <View style={styles.swapButton} >
                      <Ionicons name="swap-vertical" size={24} color="#FFF" />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput 
                        style={styles.textInput} 
                        value={destination} 
                        onChangeText={setDestination} 
                        placeholderTextColor="#8E8E93" 
                        placeholder='Where to ?'
                      />
                    </View>
                  </View>
                  
                  <View style={styles.separator} />

                  <View style={styles.dateRow}>
                    <TouchableOpacity onPress={showDeparturePicker} style={styles.datePicker}>
                      <Ionicons name="calendar" size={24} color="black" style={{ marginRight: 15 }} />
                      <Text style={styles.dateText}>{formatDate(departureDate)}</Text>
                    </TouchableOpacity>
                    <View style={styles.dateSeparator} />
                    <TouchableOpacity 
                      onPress={showReturnPicker} 
                      style={styles.datePicker} 
                      disabled={tripType === 'One way'}>
                      <Text style={[styles.dateText, tripType === 'One way' && styles.disabledText]}>
                        {tripType === 'One way' ? '---' : formatDate(returnDate)}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity 
                    style={styles.searchButton}
                    onPress={handleSearch}
                  >
                    <Text style={styles.searchButtonText}>Search</Text>
                  </TouchableOpacity>
                </View>
            
            </View>  
             <OptionModal
                visible={isTripTypeModalVisible}
                onClose={() => setTripTypeModalVisible(false)}
                options={TRIP_TYPES}
                selected={tripType}
                onSelect={(option: any) => {
                  setTripType(option);
                  setTripTypeModalVisible(false);
                }}
              />
              <OptionModal
                visible={isClassModalVisible}
                onClose={() => setClassModalVisible(false)}
                options={FLIGHT_CLASSES}
                selected={flightClass}
                onSelect={(option: any) => {
                  setFlightClass(option);
                  setClassModalVisible(false);
                }}
              />    
            <Modal visible={isTravelersModalVisible} transparent={true} animationType="fade" onRequestClose={() => setTravelersModalVisible(false)}>
              <Pressable style={styles.modalOverlay} onPress={() => setTravelersModalVisible(false)}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Travelers</Text>
                  <View style={styles.travelerControlRow}>
                    <TouchableOpacity style={styles.controlButton} onPress={() => setTravelers(prev => Math.max(1, prev - 1))}>
                      <Ionicons name="remove-circle-outline" size={32} color={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.travelerCount}>{travelers}</Text>
                    <TouchableOpacity style={styles.controlButton} onPress={() => setTravelers(prev => prev + 1)}>
                      <Ionicons name="add-circle-outline" size={32} color={'black'} />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.doneButton} onPress={() => setTravelersModalVisible(false)}>
                      <Text style={styles.doneButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Modal>
            <Modal visible={loading} transparent={true} animationType="fade" onRequestClose={() => setLoading(false)}>
                <Pressable style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginVertical: 20
                    }}
                  >Loading...</Text>
                  <ActivityIndicator size="large" color={'#1d2855'}/>
                </View>
              </Pressable>
            </Modal>
 
            <DateTimePickerModal
                isVisible={isDeparturePickerVisible}
                mode="date"
                onConfirm={handleDepartureConfirm}
                onCancel={hideDeparturePicker}
                date={departureDate}
            />
            <DateTimePickerModal
                isVisible={isReturnPickerVisible}
                mode="date"
                onConfirm={handleReturnConfirm}
                onCancel={hideReturnPicker}
                date={returnDate}
            />
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
  headerContainer: {
    marginTop: 20
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600'
  },
  flightsContainer: {
    marginTop: 30
  },
  flightsHeaderText: {
    fontSize: 20,
    fontWeight: '500'
  },
  subSectionFlight: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center'
  },
  flightSelect: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    borderColor: '#1280ED'
  },
  searchContainer: {
    backgroundColor: '',
    borderRadius: 16,
    padding: 16
  },
  topOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#1280ED',
    borderRadius: 5
  },
  optionText: {
    fontSize: 14,
    marginHorizontal: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#1280ED',
    borderRadius: 5,
    padding: 9
  },
  textInput: {
    fontSize: 15,
    flex: 1,
  },
  swapButton: {
    padding: 8,
    marginHorizontal: 8,
    backgroundColor: '#555',
    borderRadius: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  datePicker: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 9,
    borderRadius: 5
  },
  dateText: {
    fontSize: 16,
  },
  dateSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: '',
    marginHorizontal: 15,
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
    marginTop: 20
  },
  searchButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: 'white'
  },
  disabledText: { color: 'black'},

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, width: '90%', alignItems: 'center' },
  modalOption: { paddingVertical: 15, width: '100%', alignItems: 'center' },
  modalOptionText: { color: 'black', fontSize: 18 },
  selectedOptionText: { color: 'black', fontWeight: 'bold' },
  modalTitle: { color: 'black', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },

  // Traveler Modal Specific
  travelerControlRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', marginBottom: 20 },
  controlButton: { padding: 10 },
  travelerCount: { color: 'black', fontSize: 36, fontWeight: 'bold', marginHorizontal: 20 },
  doneButton: { backgroundColor: '', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 25 },
  doneButtonText: { color: 'black', fontSize: 16, fontWeight: 'bold' },

})