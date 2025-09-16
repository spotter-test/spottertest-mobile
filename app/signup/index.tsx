import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons  from '@expo/vector-icons/Ionicons';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Validationerror from '@/components/Validationerror';
import { useAuth } from '@/hooks/useAuth';
import CustomeButtom from '@/components/CustomeButtom';
import { storeToken,setFirstLogin } from '@/utils/token';
import { useLocalSearchParams } from 'expo-router';

export default function index() {
    const router = useRouter();
    const {LoginUser} = useAuth();
    const [error,setError] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    const formData = useFormik({
        initialValues: {
          email: '',
          password: '',
          firstName: '',
          lastName: ''
        },
        validationSchema: Yup.object({
          email: Yup.string()
           .email('Invalid email')
           .required('Email is required'),
          password: Yup.string()
           .min(6, 'Password must be at least 6 characters long')
           .required('Password is required'),
          firstName: Yup.string()
            .required('Firstname is required'),
          lastName: Yup.string()
            .required('Lastname is required')
          
        }),
        onSubmit: async(values) => {
          setIsLoading(true);
          const response = await LoginUser(values);
          if(response.status != 'success'){
            setIsLoading(false);
            setTimeout(() => {
    
            },1500);
            setError(response.message);
          } else {
            setIsLoading(false);
            setError('');
            await storeToken(response.token)
            await setFirstLogin();
            router.push('/(tabs)');
          }
          
          // TODO: Send the form data to the server
        }
      })
      const [showPassword,setShowPassword] = useState(false);
      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
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
            <Text style={styles.headerTitle}>Sign up</Text>
            {/* This empty view is a spacer to help center the title correctly */}
            <View style={{ width: 28 }} />
          </View>

          <View style={styles.form}>
            <TextInput
              style={[styles.input,{marginTop: 20}]}
              placeholder="First Name"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={formData.handleChange('firstName')}
              onBlur={formData.handleBlur('firstName')}
            />
            {
              formData.touched.firstName && formData.errors.firstName && (<Validationerror title={formData.errors.firstName}/>)
            }
            
            <TextInput
              style={[styles.input,{marginTop: 20}]}
              placeholder="Last Name"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={formData.handleChange('lastName')}
              onBlur={formData.handleBlur('lastName')}
            />
            {
              formData.touched.lastName && formData.errors.lastName && (<Validationerror title={formData.errors.lastName}/>)
            }
            
            <TextInput
              style={[styles.input,{marginTop: 20}]}
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={formData.handleChange('email')}
              onBlur={formData.handleBlur('email')}
            />
             {
              formData.touched.email && formData.errors.email && (<Validationerror title={formData.errors.email}/>)
            }

            <View
                style={[styles.input,{marginTop: 20}]}
            >
                <TextInput
                    style={{
                        width: '90%'
                    }}
                    placeholder="Password"
                    placeholderTextColor="#A9A9A9"
                    secureTextEntry={!showPassword}
                    onChangeText={formData.handleChange('password')}
                    onBlur={formData.handleBlur('password')}
                />
                <TouchableOpacity 
                    onPress={toggleShowPassword} 
                    style={{
                        
                    }}
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}  // swap icons
                        size={22}
                        color="#888"
                    />
                </TouchableOpacity>

            </View>
            {
              formData.touched.password && formData.errors.password && (<Validationerror title={formData.errors.password}/>)
            }
            
            
          <View style={{width: 100, marginTop: 100}}/>
                            <CustomeButtom 
                                title="Sign up" 
                                onPress={formData.handleSubmit}
                                isLoading={isLoading}
                                color={'#007AFF'}
                            />
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
    backgroundColor: '#f1f3f8ff', // A light lavender color
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    color: '#333',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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