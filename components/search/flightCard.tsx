import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
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
            router.push('/flightDetails')
        }}
    >
      {/* <Image
        source={{ uri: data.content.image.url }} 
        style={{ 
          width: '100%', 
          height: 150,
          borderRadius: 10,
          backgroundColor: '#F3F1F8'
        }}        
        resizeMode="cover"
      /> */}
      <View 
        style={{
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}
      >
        <View>
            {
                data.legs.map((leg: any) => (
                    <View 
                        key={leg.id}
                        style={{
                            marginBottom: 40,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 5
                        }}
                    >
                        <Text style={{fontWeight: '500'}}>From: {leg.origin.city}</Text>
                        <Text style={{fontWeight: '500'}}>To: {leg.destination.city}</Text>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 5
                            }}
                        >
                            <Text style={{fontWeight: '500'}}>Airport</Text>
                            <View 
                                style={{
                                    gap: 5
                                }}
                            >
                                <Text style={{fontWeight: '500'}}>Departure: {leg.origin.name}</Text>
                                <Text style={{fontWeight: '500'}}>Arrival: {leg.destination.name}</Text>
                            </View>
                        </View>
                        <View style={{marginTop: 10}}>
                            <Text style={{fontWeight: '500'}}>
                                Duration: {Math.floor(leg.durationInMinutes / 60)}h {leg.durationInMinutes % 60}m
                            </Text>
                        </View>
                        <View style={{marginTop: 10}}>
                            {
                                leg.carriers.marketing.map((m: any) => (
                                    <View
                                        style={{
                                            gap: 5
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontWeight: '500',
                                                fontSize: 16
                                            }}
                                        >Airline</Text>
                                        <View
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 20,
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Image 
                                                source={{ uri: m.logoUrl }} 
                                                style={{ 
                                                width: 30, 
                                                height: 30,
                                                borderRadius: 5,
                                                backgroundColor: '#F3F1F8'
                                                }}        
                                                resizeMode="cover"
                                            />
                                            <Text style={{fontWeight: '500'}}>{m.name}</Text>
                                        </View>

                                    </View>
                                ))
                            }
                        </View>

                    </View>
                ))
            }
        </View>
        <Text style={styles.title}>{data.price.formatted}</Text>
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