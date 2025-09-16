import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getToken } from '@/utils/token';
import { Ionicons } from '@expo/vector-icons';

const Flightcard = ({data}: any) => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [token, setToken] = useState('');
    const [flightData, setFlightData] = useState<any>(null);

    // Parse flight data from params
    useEffect(() => {
         setFlightData(data);
    }, []);

    const GetToken = async () => {
        const _token: any = await getToken();
        setToken(_token);
    }

    useEffect(() => {
        GetToken();
    }, []);

    // Format duration from minutes to hours and minutes
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    // Format date and time
    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        return {
            date: date.toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
            }),
            time: date.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            })
        };
    };

    const handleBookNow = () => {
        if (token) {
             Alert.alert(
                'getFlightsDetails endpoint deprecated',
                'wendpoint not working',
                [
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
        } else {
            Alert.alert(
                'Login Required',
                'You need to log in before booking this flight.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Login', onPress: () => router.push('/signin') },
                ]
            );
        }
    };

    if (!flightData) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading flight details...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            {/* <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Flight Details</Text>
                <View style={{ width: 24 }} />
            </View> */}

            {/* Price Summary */}
            <View style={styles.priceSummary}>
                <Text style={styles.price}>{flightData.price.formatted}</Text>
                <Text style={styles.priceSubtext}>Total price per person</Text>
            </View>

            {/* Flight Legs */}
            {flightData.legs.map((leg: any, index: number) => (
                <View key={leg.id} style={styles.legContainer}>
                    <Text style={styles.legTitle}>
                        {index === 0 ? 'Outbound' : 'Return'} Flight
                    </Text>
                    
                    {/* Airline Info */}
                    <View style={styles.airlineInfo}>
                        <Image
                            source={{ uri: leg.carriers.marketing[0].logoUrl }}
                            style={styles.airlineLogo}
                        />
                        <View>
                            <Text style={styles.airlineName}>
                                {leg.carriers.marketing[0].name}
                            </Text>
                            <Text style={styles.flightNumber}>
                                Flight {leg.segments[0].flightNumber}
                            </Text>
                        </View>
                    </View>

                    {/* Flight Route */}
                    <View style={styles.routeContainer}>
                        <View style={styles.timeBlock}>
                            <Text style={styles.time}>
                                {formatDateTime(leg.departure).time}
                            </Text>
                            <Text style={styles.airportCode}>
                                {leg.origin.displayCode}
                            </Text>
                            <Text style={styles.airportName}>
                                {leg.origin.name}
                            </Text>
                            <Text style={styles.date}>
                                {formatDateTime(leg.departure).date}
                            </Text>
                        </View>

                        <View style={styles.durationContainer}>
                            <Text style={styles.duration}>
                                {formatDuration(leg.durationInMinutes)}
                            </Text>
                            <View style={styles.flightLine}>
                                <View style={styles.line} />
                                <Ionicons name="airplane" size={16} color="#666" />
                            </View>
                            <Text style={styles.stopInfo}>
                                {leg.stopCount === 0 ? 'Non-stop' : `${leg.stopCount} stop${leg.stopCount > 1 ? 's' : ''}`}
                            </Text>
                        </View>

                        <View style={styles.timeBlock}>
                            <Text style={styles.time}>
                                {formatDateTime(leg.arrival).time}
                            </Text>
                            <Text style={styles.airportCode}>
                                {leg.destination.displayCode}
                            </Text>
                            <Text style={styles.airportName}>
                                {leg.destination.name}
                            </Text>
                            <Text style={styles.date}>
                                {formatDateTime(leg.arrival).date}
                            </Text>
                        </View>
                    </View>

                    {/* Flight Details */}
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailItem}>
                            <Ionicons name="time-outline" size={16} color="#666" />
                            <Text style={styles.detailText}>
                                Duration: {formatDuration(leg.durationInMinutes)}
                            </Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Ionicons name="business-outline" size={16} color="#666" />
                            <Text style={styles.detailText}>
                                Operated by: {leg.segments[0].operatingCarrier.name}
                            </Text>
                        </View>
                    </View>
                </View>
            ))}

            {/* Fare Policy */}
            <View style={styles.policyContainer}>
                <Text style={styles.sectionTitle}>Fare Policy</Text>
                <View style={styles.policyItem}>
                    <Ionicons 
                        name={flightData.farePolicy.isChangeAllowed ? "checkmark-circle" : "close-circle"} 
                        size={20} 
                        color={flightData.farePolicy.isChangeAllowed ? "#4CAF50" : "#F44336"} 
                    />
                    <Text style={styles.policyText}>
                        Change allowed: {flightData.farePolicy.isChangeAllowed ? 'Yes' : 'No'}
                    </Text>
                </View>
                <View style={styles.policyItem}>
                    <Ionicons 
                        name={flightData.farePolicy.isCancellationAllowed ? "checkmark-circle" : "close-circle"} 
                        size={20} 
                        color={flightData.farePolicy.isCancellationAllowed ? "#4CAF50" : "#F44336"} 
                    />
                    <Text style={styles.policyText}>
                        Cancellation allowed: {flightData.farePolicy.isCancellationAllowed ? 'Yes' : 'No'}
                    </Text>
                </View>
            </View>

            {/* Tags */}
            {flightData.tags && flightData.tags.length > 0 && (
                <View style={styles.tagsContainer}>
                    <Text style={styles.sectionTitle}>Features</Text>
                    <View style={styles.tagsRow}>
                        {flightData.tags.map((tag: string, index: number) => (
                            <View key={index} style={styles.tag}>
                                <Text style={styles.tagText}>
                                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Book Button */}
            <TouchableOpacity 
                style={styles.bookButton}
                onPress={handleBookNow}
            >
                <Text style={styles.bookButtonText}>
                    Book Now - {flightData.price.formatted}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Flightcard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    priceSummary: {
        backgroundColor: '#FFF',
        padding: 20,
        alignItems: 'center',
        margin: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    priceSubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    legContainer: {
        backgroundColor: '#FFF',
        margin: 16,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    legTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    airlineInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    airlineLogo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    airlineName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    flightNumber: {
        fontSize: 14,
        color: '#666',
    },
    routeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    timeBlock: {
        alignItems: 'center',
        flex: 1,
    },
    time: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    airportCode: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 2,
    },
    airportName: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginBottom: 4,
    },
    date: {
        fontSize: 12,
        color: '#888',
    },
    durationContainer: {
        alignItems: 'center',
        flex: 2,
    },
    duration: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
        marginBottom: 8,
    },
    flightLine: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 8,
    },
    line: {
        flex: 1,
        height: 2,
        backgroundColor: '#DDD',
    },
    stopInfo: {
        fontSize: 12,
        color: '#666',
    },
    detailsContainer: {
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        paddingTop: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    policyContainer: {
        backgroundColor: '#FFF',
        margin: 16,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 16,
    },
    policyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    policyText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 8,
    },
    tagsContainer: {
        backgroundColor: '#FFF',
        margin: 16,
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tagsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    tagText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#1976D2',
    },
    bookButton: {
        backgroundColor: '#007AFF',
        margin: 16,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    bookButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
});