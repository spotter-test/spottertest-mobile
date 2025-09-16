import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const FlightLocationScreen = () => {
  const params: any = useLocalSearchParams();
  const locationData = JSON.parse(params.locationdata);
  const { content }: any = locationData;
  const { location, flightQuotes, image, flightRoutes } = content;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image
          source={{ uri: image.url }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Location Info Card */}
        <View style={styles.card}>
          <Text style={styles.locationName}>{location.name}</Text>
          <View style={styles.locationDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.detailText}>{location.type}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="earth-outline" size={20} color="#666" />
              {/* FIXED: Removed nested Text */}
              <Text style={styles.detailText}>
                {location.continent.name} ({location.continent.code})
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="code-slash-outline" size={20} color="#666" />
              <Text style={styles.detailText}>SkyCode: {location.skyCode}</Text>
            </View>
          </View>
        </View>

        {/* Flight Quotes */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Flight Prices</Text>
          
          <View style={styles.priceRow}>
            <View style={styles.priceItem}>
              <Ionicons name="pricetag-outline" size={20} color="#4CAF50" />
              <Text style={styles.priceLabel}>Cheapest</Text>
              <Text style={styles.priceValue}>{flightQuotes.cheapest.price}</Text>
              {/* FIXED: Use string instead of nested Text */}
              <Text style={styles.priceSubtext}>
                {flightQuotes.cheapest.direct ? 'Direct' : 'With stops'}
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.priceItem}>
              <Ionicons name="rocket-outline" size={20} color="#2196F3" />
              <Text style={styles.priceLabel}>Direct</Text>
              <Text style={styles.priceValue}>{flightQuotes.direct.price}</Text>
              {/* FIXED: Use string instead of nested Text */}
              <Text style={styles.priceSubtext}>
                {flightQuotes.direct.direct ? 'Non-stop' : 'Multiple stops'}
              </Text>
            </View>
          </View>
        </View>

        {/* Flight Routes */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Flight Availability</Text>
          <View style={styles.availabilityRow}>
            <Ionicons 
              name={flightRoutes.directFlightsAvailable ? "checkmark-circle" : "close-circle"} 
              size={24} 
              color={flightRoutes.directFlightsAvailable ? "#4CAF50" : "#F44336"} 
            />
            {/* FIXED: Use string interpolation instead of nested Text */}
            <Text style={styles.availabilityText}>
              Direct flights {flightRoutes.directFlightsAvailable ? 'available' : 'not available'}
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  heroImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#d3dde6ff'
  },
  card: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  locationDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  priceItem: {
    alignItems: 'center',
    flex: 1,
  },
  separator: {
    width: 1,
    height: 60,
    backgroundColor: '#EEE',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  priceSubtext: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  availabilityText: {
    fontSize: 16,
    color: '#666',
  },
  actionContainer: {
    padding: 16,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2196F3',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FlightLocationScreen;