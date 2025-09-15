import { StyleSheet, Text, View, Image, TouchableOpacity,Linking,Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useRouter } from 'expo-router';
import { getToken } from '@/utils/token';

const FlightCard = ({ data }: any) => {
    const router = useRouter();
    const itinerary = data.data.itinerary;
    const legs = itinerary.legs;
    const pricingOptions = itinerary.pricingOptions;

    const [token,setToken] = useState();
    
      const GetToken = async() => {
        const _token: any = await getToken();
        setToken(_token);
      }
    
      useEffect(() => {
        GetToken();
      },[])

    // Format duration from minutes to hours and minutes
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    // Format date and time
    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        return date.toLocaleString();
    };

    // Find the best price
    const bestPrice = pricingOptions.reduce((min: any, option: any) => 
        option.totalPrice < min.totalPrice ? option : min, pricingOptions[0]
    );

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Flight Route Summary */}
                <View style={styles.routeSummary}>
                    <Text style={styles.routeText}>
                        {legs[0].origin.city} ({legs[0].origin.displayCode}) → 
                        {legs[0].destination.city} ({legs[0].destination.displayCode})
                    </Text>
                    <Text style={styles.priceText}>From ${bestPrice.totalPrice}</Text>
                </View>

                {/* Flight Details */}
                {legs.map((leg: any) => (
                    <View key={leg.id} style={styles.legContainer}>
                        <View style={styles.airlineContainer}>
                            <Image
                                source={{ uri: leg.segments[0].marketingCarrier.logo }}
                                style={styles.airlineLogo}
                            />
                            <Text style={styles.airlineName}>
                                {leg.segments[0].marketingCarrier.name}
                            </Text>
                            <Text style={styles.flightNumber}>
                                Flight {leg.segments[0].flightNumber}
                            </Text>
                        </View>

                        <View style={styles.timeContainer}>
                            <View style={styles.timeBlock}>
                                <Text style={styles.time}>{formatDateTime(leg.departure).split(', ')[1]}</Text>
                                <Text style={styles.airportCode}>{leg.origin.displayCode}</Text>
                                <Text style={styles.date}>{formatDateTime(leg.departure).split(', ')[0]}</Text>
                            </View>

                            <View style={styles.durationContainer}>
                                <Text style={styles.duration}>{formatDuration(leg.duration)}</Text>
                                <View style={styles.flightLine}>
                                    <View style={styles.line} />
                                    <Text>✈️</Text>
                                </View>
                            </View>

                            <View style={styles.timeBlock}>
                                <Text style={styles.time}>{formatDateTime(leg.arrival).split(', ')[1]}</Text>
                                <Text style={styles.airportCode}>{leg.destination.displayCode}</Text>
                                <Text style={styles.date}>{formatDateTime(leg.arrival).split(', ')[0]}</Text>
                            </View>
                        </View>

                        <View style={styles.airportInfo}>
                            <Text style={styles.airportName}>{leg.origin.name}</Text>
                            <Text style={styles.airportName}>{leg.destination.name}</Text>
                        </View>
                    </View>
                ))}

                {/* Pricing Options */}
                <View style={styles.pricingContainer}>
                    <Text style={styles.pricingTitle}>Available from:</Text>
                    {pricingOptions.map((option: any, index: number) => (
                        <View key={index} style={styles.priceOption}>
                            <Text style={styles.agentName}>{option.agents[0].name}</Text>
                            <Text style={styles.agentPrice}>${option.totalPrice}</Text>
                        </View>
                    ))}
                </View>

                {/* Book Button */}
                <TouchableOpacity 
                    style={styles.bookButton}
                    onPress={() => {
                        if (token) {
                        // ✅ User is logged in → open booking link
                        Linking.openURL(bestPrice.agents[0].url);
                        } else {
                        // 🚨 Show alert first
                        Alert.alert(
                            'Login Required',
                            'You need to log in before booking this flight.',
                            [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Login', onPress: () => router.push('/signin') },
                            ]
                        );
                        }
                    }}
                >
                    <Text style={styles.bookButtonText}>Book Now ${bestPrice.totalPrice}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FlightCard

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginTop: 10
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%',
        borderRadius: 12,
        padding: 16,
        backgroundColor: 'white'
    },
    routeSummary: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    routeText: {
        fontWeight: '600',
        fontSize: 16,
        color: '#333'
    },
    priceText: {
        fontWeight: '700',
        fontSize: 18,
        color: '#007AFF'
    },
    legContainer: {
        marginBottom: 20
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
    flightNumber: {
        fontWeight: '400',
        fontSize: 12,
        color: '#999'
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
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
    airportCode: {
        fontWeight: '700',
        fontSize: 18,
        color: '#000'
    },
    date: {
        fontWeight: '400',
        fontSize: 12,
        color: '#666'
    },
    durationContainer: {
        alignItems: 'center',
        flex: 2
    },
    duration: {
        fontWeight: '500',
        fontSize: 12,
        color: '#666',
        marginBottom: 4
    },
    flightLine: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd'
    },
    airportInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    airportName: {
        fontWeight: '400',
        fontSize: 12,
        color: '#666',
        flex: 1
    },
    pricingContainer: {
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    pricingTitle: {
        fontWeight: '600',
        fontSize: 14,
        color: '#333',
        marginBottom: 8
    },
    priceOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6
    },
    agentName: {
        fontWeight: '400',
        fontSize: 14,
        color: '#666'
    },
    agentPrice: {
        fontWeight: '600',
        fontSize: 14,
        color: '#333'
    },
    bookButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16
    },
    bookButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    }
});