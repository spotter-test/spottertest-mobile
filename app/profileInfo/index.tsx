import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Image,
    ActivityIndicator
  } from 'react-native';
  import React, { useState,useRef,useEffect } from 'react';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import FontAwesome from '@expo/vector-icons/FontAwesome';
  import { router } from 'expo-router';
  import * as Yup from 'yup';
  import {useFormik} from 'formik';
//   import { useAuth } from '@/hooks/useAuth';
  import Toast from 'react-native-toast-message';
  import ModalPopup from '@/components/ModalPopup';
  import CustomeButtom from '@/components/CustomeButtom';
  import { SafeAreaView } from 'react-native-safe-area-context';
  
  const {width,height} = Dimensions.get('window');
  
  const index = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showloader,setShowLoader] = useState(false);
    const [loading,setLoading] = useState(false);
    const userData = {}
    // const {GetUser} = useAuth();
    const [visible,setVisible] = useState(false);

    // const loaduserData = async () => {
    //   if(userData){
    //     const data:any  = await GetUser(userData);
    //     signUpForm.setValues({
    //       firstname: data.user.firstname || '',
    //       lastname: data.user.lastname || '',
    //       email: data.user.email || '',
    //       phonenumber: data.user.phonenumber || ''
    //     });
    //   }
    // };

    // useEffect(() => {
    //   loaduserData();
    // }, [userData]);


    const signUpForm = useFormik({
      initialValues: {
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: ''
      },
      validationSchema: Yup.object().shape({}),
      onSubmit: async (values, actions) => {
        setVisible(true);
        try {
  
        
        } catch (err) {
          console.error('Account creation failed:', err);
          // Optionally show error to the user
          Toast.show({
            text1: 'Profile update failed',
            text2: '',
            type: 'error',
          })
        } finally {
          actions.setSubmitting(false); // Reset submission state
        }
      },
      
    })
    
  
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust for platform
          style={{ flex: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: '300%' }}>
              <Toast />
              <View style={styles.header}>
                <AntDesign name="left" size={24} color="black" onPress={() => router.back()} />
                <View>
                  <Text style={styles.headerText}> Profile Info</Text>
                </View>
              </View>
              
              <View style={{ width: '90%', marginHorizontal: 'auto' }}>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.loginTextHeader}>Firstname</Text>
                  <View style={styles.loginContainerText}>
                    <TextInput
                      placeholder=""
                      keyboardType="default"
                      style={styles.loginInput}
                      value={signUpForm.values.firstname}
                      onChangeText={signUpForm.handleChange('firstname')}
                    />
                  </View>
                </View>
            
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.loginTextHeader}>Lastname</Text>
                  <View style={styles.loginContainerText}>
                    <TextInput
                      placeholder=""
                      keyboardType="default"
                      style={styles.loginInput}
                      value={signUpForm.values.lastname}
                      onChangeText={signUpForm.handleChange('lastname')}
                    />
                  </View>
                </View>
  
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.loginTextHeader}>Email</Text>
                  <View style={styles.loginContainerText}>
                    <TextInput
                      placeholder=""
                      keyboardType="email-address"
                      style={styles.loginInput}
                      value={signUpForm.values.email}
                      onChangeText={signUpForm.handleChange('email')}
                    />
                  </View>
                </View>
  
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.loginTextHeader}>Phone number </Text>
                  <View style={styles.loginContainerText}>
                    <TextInput
                      placeholder=""
                      keyboardType="number-pad"
                      style={styles.loginInput}
                      value={signUpForm.values.phonenumber}
                      onChangeText={signUpForm.handleChange('phonenumber')}
                      onBlur={signUpForm.handleBlur('phonenumber')}
                    />
                  </View>
                </View>

                  <TouchableOpacity 
                    style={styles.containerStyle}
                    onPress={() => signUpForm.handleSubmit()}
                  >
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                      }}
                    >
                      {
                        showloader ? <ActivityIndicator size={130} color={'#ffffff'}/> :  <Text
                        style={styles.textStyle}
                      >{'Save changes'}</Text>
                      }
                    </View>
                  </TouchableOpacity>
              </View>
              <ModalPopup 
                visible={visible}
              >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Text> Done!!! </Text>
                <View 
                  style={{
                    marginTop: '8%'
                  }}
                >
                  <FontAwesome name="check-circle" size={24} color="black" />
                </View>
                <Text
                  style={{
                    marginTop: '10%',
                    marginBottom: '5%',
                    fontSize: 18,
                  }}
                > Profile Info updated successfully </Text>
                <View
                  style={{
                    marginTop: '5%',
                    width: '100%',
                  }}
                >
                  <CustomeButtom 
                    title='Continue'
                    onPress={() => setVisible(false)}
                    color={'#1280ED'}
                  />
                </View>
              </View>
              </ModalPopup>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default index;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      marginHorizontal: 'auto',
      marginTop: '10%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      width: '70%',
    },
    headerText: {
      fontSize: 25,
      fontWeight: '600',
      textAlign: 'center',
    },
    loginContainerText: {
      flexDirection: 'row',
      backgroundColor: '#E1E1E1',
      borderRadius: 7,
      alignItems: 'center',
      paddingLeft: 15,
      marginTop: 10,
    },
    countryInput: {
      flexDirection: 'row',
      backgroundColor: '#E1E1E1',
      borderRadius: 7,
      alignItems: 'center',
      padding: 7,
      marginTop: 10,
      width: '100%'
    },
    countryInputText: {
      backgroundColor: '#E1E1E1',
      borderRadius: 7
    },
    loginTextHeader: {
      fontSize: 20,
      fontWeight: '400',
    },
    loginInput: {
      padding: 7,
      marginBottom: 10,
      borderRadius: 7,
      marginTop: 10,
      fontSize: 18,
      width: '85%',
    },
    privacy: {
      alignItems: 'center',
      marginTop: 20,
      width: '85%',
      marginHorizontal: 'auto',
      marginBottom: 10,
    },
    error: {
      marginVertical: 15
    },
    containerStyle: {
      backgroundColor: '#1280ED',
      padding: 15,
      borderRadius: 10,
      margin: 10,
      alignSelf: 'center',
      width: '100%',
      height: height / 13,
      marginTop: '30%'
    },
    textStyle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'medium',
      textAlign: 'center',
    }
  });
  