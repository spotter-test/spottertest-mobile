import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

const FlightCard = ({ data,adults,currency,locale,market,cabinClass,countryCode }: any) => {
    const router = useRouter();
    const firstLeg = data.legs[0];
    const airline = firstLeg.carriers.marketing[0];

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => router.push({
                pathname: '/flightDetails',
                params: { 
                    legs: data.legs, 
                    adults, 
                    currency, 
                    locale, 
                    market, 
                    cabinClass, 
                    countryCode 
                }
            })}
        >
            <View style={styles.card}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.price}>{data.price.formatted||''}</Text>
                    {data.tags?.includes('cheapest') && (
                        <Text style={styles.tag || ''}>💰 Cheapest</Text>
                    )}
                </View>

                {/* Route */}
                <Text style={styles.route}>
                    {firstLeg.origin.displayCode || ''} → {firstLeg.destination.displayCode || ''}
                </Text>

                {/* Airline */}
                <View style={styles.airlineContainer}>
                    <Image 
                        source={{ uri: airline.logoUrl || '' }} 
                        style={styles.airlineLogo}
                    />
                    <Text style={styles.airlineName}>{airline.name || ''}</Text>
                </View>

                {/* Flight Times */}
                <View style={styles.timeContainer}>
                    <View style={styles.timeBlock}>
                        <Text style={styles.time}>{new Date(firstLeg.departure).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                        <Text style={styles.airport}>{firstLeg.origin.displayCode}</Text>
                    </View>
                    
                    <Text style={styles.duration}>
                        {Math.floor(firstLeg.durationInMinutes / 60)}h {firstLeg.durationInMinutes % 60}m
                    </Text>
                    
                    <View style={styles.timeBlock}>
                        <Text style={styles.time}>{new Date(firstLeg.arrival).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                        <Text style={styles.airport}>{firstLeg.destination.displayCode}</Text>
                    </View>
                </View>

                {/* Additional info */}
                <Text style={styles.additionalInfo}>
                    {data.legs.length === 2 ? 'Round trip' : 'One way'} • {firstLeg.stopCount === 0 ? 'Direct' : `${firstLeg.stopCount} stop${firstLeg.stopCount > 1 ? 's' : ''}`}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default FlightCard

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginTop: 10
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 16,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    price: {
        fontWeight: '700',
        fontSize: 18,
        color: '#007AFF'
    },
    tag: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        fontSize: 12,
        fontWeight: '600'
    },
    route: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 8,
        color: '#333'
    },
    airlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8
    },
    airlineLogo: {
        width: 24,
        height: 24,
        borderRadius: 12
    },
    airlineName: {
        fontWeight: '500',
        fontSize: 14,
        color: '#666'
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    timeBlock: {
        alignItems: 'center',
        flex: 1
    },
    time: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333'
    },
    airport: {
        fontWeight: '500',
        fontSize: 14,
        color: '#666'
    },
    duration: {
        fontWeight: '500',
        fontSize: 12,
        color: '#999'
    },
    additionalInfo: {
        fontSize: 12,
        color: '#888',
        textAlign: 'center'
    }
})