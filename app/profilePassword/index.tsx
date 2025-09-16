import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    ScrollView,
    Platform,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions
  } from 'react-native'
  import { SafeAreaView } from 'react-native-safe-area-context';
  import Entypo from '@expo/vector-icons/Entypo';
  import FontAwesome from '@expo/vector-icons/FontAwesome';
  import React,{useState} from 'react';
  import CustomeButtom from '@/components/CustomeButtom';

  import { router,useLocalSearchParams } from 'expo-router';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import Validationerror from '@/components/Validationerror';
  import * as Yup from 'yup';
  import { useFormik } from 'formik';
  import { useAuth } from '@/hooks/useAuth';
  import Toast from 'react-native-toast-message';
  import ModalPopup from '@/components/ModalPopup';

  const {width,height} = Dimensions.get('window');
  
  const index = () => {
    const {email,previous_screen} = useLocalSearchParams();
    const [showPassword,setShowPassword] = useState(false);
    const [shownewPassword,setShowNewPassword] = useState(false);
    const [loading,setLoading] = useState(false);
    const {UpdatePassword} = useAuth();
    const [visible,setVisible] = useState(false);
    
    const formData = useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },
      validationSchema: Yup.object({}),
      onSubmit: async(values) => {  
        setLoading(true);
        // setVisible(true);
        if (!values.password || !values.confirmPassword) {
          setLoading(false);
          alert('Please fill in both password fields');
          return; 
        }
        const response = await UpdatePassword({
          currentPassword: values.password,
          newPassword: values.confirmPassword
        })
        if(response.status == 'error'){
          Toast.show({
                      text1: response.message,
                      text2: '',
                      type: 'error',
                    })
                    setLoading(false);
        
        }else {
          setVisible(true)
          setLoading(false);
        }
      },
    });
    
  
  
    return (
      <SafeAreaView 
        style={styles.container}
      >
         <Toast 
          position="top" 
          topOffset={50} 
          visibilityTime={3000} 
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios'? 'padding' : 'height'}
          style={{
            flex:1
          }}
        >
          <ScrollView
            style={styles.headerContainer}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={styles.header}
              onPress={() => router.back()}
            >
              <AntDesign name="left" size={24} color="black"/>
            </TouchableOpacity>
            <View>
              <Text
                style={styles.headerText}
              > Change password </Text>
              <Text
                style={styles.headerSubText} 
              > Your new password must be different from previous password </Text>
            </View>
            <View
                  style={{
                    marginTop: 20
                  }}
            >
                <Text
                  style={styles.loginTextHeader}
                > Current Password </Text>
                <View 
                  style={styles.loginContainerText}
                >
                  <TextInput
                      id='password'
                      placeholder="Enter Current Password"
                      keyboardType="default"
                      style={styles.loginInput}
                      secureTextEntry={!showPassword}
                      onChangeText={formData.handleChange('password')}
                      onBlur={formData.handleBlur('password')}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Entypo 
                        name={showPassword ? 'eye' : 'eye-with-line'} 
                        size={20} 
                        color="black" 
                      />
                    </TouchableOpacity>
                </View>
              </View>
              <View
                  style={{
                    marginTop: 20
                  }}
                >
                <Text
                  style={styles.loginTextHeader}
                > New Password </Text>
                <View 
                  style={styles.loginContainerText}
                >
                  <TextInput
                      id='confirmpassword'
                      placeholder="New Password"
                      keyboardType="default"
                      style={styles.loginInput}
                      secureTextEntry={!shownewPassword}
                      onChangeText={formData.handleChange('confirmPassword')}
                      onBlur={formData.handleBlur('confirmPassword')}
                    />
                    <TouchableOpacity
                      onPress={() => setShowNewPassword(!shownewPassword)}
                    >
                      <Entypo 
                        name={shownewPassword ? 'eye' : 'eye-with-line'} 
                        size={20} 
                        color="black" 
                      />
                    </TouchableOpacity>
                </View>
              </View>
              <View
                style={styles.button}
              >
                 <TouchableOpacity 
                                    style={styles.containerStyle}
                                    onPress={() => formData.handleSubmit()}
                                  >
                                    <View
                                      style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1
                                      }}
                                    >
                                      {
                                        loading ? <ActivityIndicator size={130} color={'#ffffff'}/> :  <Text
                                        style={styles.textStyle}
                                      >{'Change password'}</Text>
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
                > Password updated successfully </Text>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
  
  export default index
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    headerContainer: {
      width: '90%',
      marginHorizontal: 'auto',
      marginTop: '15%'
    },
    headerText: {
      fontSize: 30,
      fontWeight: 'bold',
      marginVertical: 20
    },
    headerSubText: {
      marginTop: 10,
      fontSize: 15,
      color:  '#5E5E5E'
    },
    loginContainer: {
      marginTop: 40,
      marginBottom: 20
    },
    loginContainerText: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#E1E1E1',
      borderRadius: 7,
      alignItems: 'center',
      paddingLeft: 15,
      marginTop: 10
    },
    loginTextHeader: {
      fontSize: 20,
      fontWeight: 'medium'
    },
    loginInput: {
      padding: 7,
      marginBottom: 10,
      borderRadius: 7,
      marginTop: 10,
      fontSize: 18,
      width: '85%'
    },
    header: {
    paddingBottom: 15
    },
    button: {
      marginTop: 40
    },
    error: {
      borderWidth: 1,
      borderColor: '#E60023',
      borderRadius: 10
    },
    errorText: {
      color: '#E60023',
      fontSize: 15,
      padding: 10,
      marginHorizontal: 20,
      marginBottom: 10
    },
    toast: {
      zIndex: 100, // Ensures it stands out above other components
      elevation: 10, // For Android (zIndex alone doesn’t work on Android)
      backgroundColor: '#333', // Dark background
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000', // Adds shadow for a "floating" effect
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
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
  
  })