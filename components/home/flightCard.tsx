import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'

// interface flightCardProps {
//   key: string,
//   data: {

//   }
// }

const FlightCard = ({data}: any) => {
  return (
   <TouchableOpacity style={{ padding: 12 }}>
      <Image
        source={{ uri: data.content.image.url }} 
        style={{ 
          width: '100%', 
          height: 140,
          borderRadius: 10,
        }}        
        resizeMode="cover"
      />
      <Text style={{ marginTop: 8 }}>{data.content.location.name}</Text>
    </TouchableOpacity>
  )
}

export default FlightCard

const styles = StyleSheet.create({})