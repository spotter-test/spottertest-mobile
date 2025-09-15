import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function index() {
    const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.headerTitle}>Forgot password</Text>
            {/* This empty view is a spacer to help center the title correctly */}
            <View style={{ width: 28 }} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Enter your email</Text>
            <Text style={styles.subtitle}>
              We'll send you a code to reset your password.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
                                style={styles.button}
                                onPress={() => router.push('/otp')}
                              >
                                <Text style={styles.buttonText}>Continue</Text>
                              </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  content: {
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontFamily: 'PlusJakarta-SemiBold',
    color: '#333',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 40,
    fontFamily: 'PlusJakarta-Regular'
  },
  input: {
    backgroundColor: '#F3F1F8', // Light lavender color
    borderRadius: 15,
    padding: 18,
    fontSize: 16,
    marginBottom: 30,
    color: '#333',
    fontFamily: 'PlusJakarta-Regular'
  },
   button: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 15,
    marginTop: 70,
    width: '100%',
    marginHorizontal: 'auto'
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'PlusJakarta-Bold'
  }
});