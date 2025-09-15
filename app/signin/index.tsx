import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

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
            <Text style={styles.headerTitle}>Sign In</Text>
            {/* This empty view is a spacer to help center the title correctly */}
            <View style={{ width: 28 }} />
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email or Phone number"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry={true}
            />

            <TouchableOpacity
                onPress={() => router.push('/forgotpassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.separatorText}>Or sign in with</Text>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={[styles.socialButton, { marginLeft: 10 }]}>
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.resendContainer}>
                          <Text style={styles.resendText}>Don't have an account?</Text>
                          <TouchableOpacity 
                            onPress={() => router.push('/signup')}
                            style={{
                              marginTop: 20
                            }}
                          >
                              <Text style={{color: '#3B0A45',fontFamily: 'PlusJakarta-Bold',fontSize: 18}}>
                                  Sign up
                              </Text>
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
  form: {
    marginTop: 30,
  },
  input: {
    backgroundColor: '#F3F1F8', // A light lavender color
    borderRadius: 15,
    padding: 18,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    fontFamily: 'PlusJakarta-Regular'
  },
  forgotPasswordText: {
    color: '#555',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 40,
    fontFamily: 'PlusJakarta-Medium'
  },
  signInButton: {
    backgroundColor: '#A020F0', // A vibrant purple
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
    marginVertical: 30
  },
  separatorText: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#F7F7F9',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
   button: {
    backgroundColor: '#3B0A45',
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
  },
   resendContainer: { 
    alignItems: 'center', 
    marginTop: 30 
  },
  resendText: { 
    color: '#888', 
    fontSize: 14,
    fontFamily: 'PlusJakarta-Regular'
  }
});