import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react'
import { useRouter } from 'expo-router';

// interface flightCardProps {
//   key: string,
//   data: {

//   }
// }

const FlightCard = ({data}: any) => {
  const router = useRouter();
  return (
   <TouchableOpacity 
      style={{ padding: 12,marginTop: 10 }}
      onPress={() => {
        router.push({
          pathname: '/homeFlightDetails',
          params: {
            locationdata: JSON.stringify(data)
          }
        })
      }}
    >
      <Image
        source={{ uri: data.content.image.url }} 
        style={{ 
          width: '100%', 
          height: 150,
          borderRadius: 10,
          backgroundColor: '#F3F1F8'
        }}        
        resizeMode="cover"
      />
      <View 
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Text style={styles.title}>{data.content.location.name}</Text>
        <Text style={styles.title}>{data.content.flightQuotes.cheapest.price}</Text>
      </View>
      <View>{
        data.content.flightRoutes.directFlightsAvailable ? 
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 5
          }}
        >
          <Ionicons name="paper-plane-outline" size={20} color="black" />
          <Text
            style={{
              fontWeight: '500'
            }}
          >Direct Flight Available</Text>
        </View> : ''
        }</View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 5
          }}
        >
          <Fontisto name="world" size={20} color="black" />
          <Text
            style={{
              fontWeight: '500'
            }}
          >{data.content.location.continent.name}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default FlightCard

const styles = StyleSheet.create({
  title:{ 
    marginTop: 8,
    fontWeight: '500',
    fontSize: 17 
  }
})