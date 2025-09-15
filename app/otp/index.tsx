import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CODE_LENGTH = 5;
const INITIAL_TIME = 299; // 4 minutes and 59 seconds

export default function VerificationScreen() {
  const [code, setCode] = useState(new Array(CODE_LENGTH).fill(''));
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const inputsRef = useRef<any>([]);

  const router = useRouter();

  // ---- Timer Logic ----
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  // ---------------------

  // ---- OTP Input Logic ----
  const handleInputChange = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move focus to the next input box
    if (text && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
    
    // If all codes are filled, dismiss keyboard
    if (newCode.every(digit => digit !== '')) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (e: any, index: any) => {
    // Move focus to the previous input box on backspace
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
  // -----------------------

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
            <Text style={styles.headerTitle}>Verification</Text>
            {/* This empty view is a spacer to help center the title correctly */}
            <View style={{ width: 28 }} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Enter the code</Text>
            <Text style={styles.subtitle}>
              We sent a verification code to your email. Please enter it below.
            </Text>

            <View style={styles.otpContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  style={styles.otpBox}
                  keyboardType="number-pad"
                  maxLength={1}
                  onChangeText={(text) => handleInputChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  value={digit}
                />
              ))}
            </View>

            <View style={styles.timerRow}>
              {/* <View style={styles.timerBox}>
                <Text style={styles.timerText}>{minutes}</Text>
              </View> */}
              <View style={styles.timerBox}>
                <Text style={styles.timerText}>{seconds}</Text>
              </View>
            </View>
            <View style={styles.timerLabelRow}>
              {/* <Text style={styles.timerLabel}>Minutes</Text> */}
              <Text style={styles.timerLabel}>Seconds</Text>
            </View>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

            <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the code?</Text>
                <TouchableOpacity disabled={timeLeft > 0}>
                    <Text style={[styles.resendLink, {color: timeLeft > 0 ? '#888' : '#3B0A45'}]}>
                        Resend
                    </Text>
                </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingTop: 20, paddingBottom: 10,
  },
  headerTitle: { 
    fontSize: 24, 
    fontFamily: 'PlusJakarta-SemiBold', 
    color: '#333' 
  },
  content: { 
    marginTop: 50 
  },
  title: { 
    fontSize: 28, 
    fontFamily: 'PlusJakarta-SemiBold',
    color: '#333', 
    marginBottom: 12 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#555', 
    lineHeight: 24, 
    marginBottom: 30,
    fontFamily: 'PlusJakarta-Regular'
  },
  otpContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 30,
    paddingHorizontal: 30
  },
  otpBox: {
    width: 50, 
    height: 60, 
    borderWidth: 1, 
    borderColor: '#ddd',
    borderRadius: 12, 
    textAlign: 'center', 
    fontSize: 24, 
    fontFamily: 'PlusJakarta-Bold',
    color: '#333', 
    backgroundColor: '#F3F1F8'
  },
  timerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around' 
  },
  timerBox: {
    width: 100, 
    padding: 15, 
    backgroundColor: '#F3F1F8', 
    borderRadius: 15,
    alignItems: 'center',
  },
  timerText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  timerLabelRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginTop: 8 
  },
  timerLabel: { 
    fontSize: 14, 
    color: '#555' 
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
  },
  resendLink: { 
    fontSize: 20, 
    fontFamily: 'PlusJakarta-Bold',
    marginTop: 20 ,
    color: 'black'
  }
});