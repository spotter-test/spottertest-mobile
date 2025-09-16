import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity 
} from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalPopup from '@/components/ModalPopup';
import CustomeButtom from '@/components/CustomeButtom';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from '@/utils/api';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';


const index = () => {
  const [logoutModal,setLogoutModal] = React.useState(false);
  const [deleteaccountModal,setDeleteAccountModal] = React.useState(false);

  const navigation = useNavigation<StackNavigationProp<any>>();
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios'? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <ScrollView
          style={styles.headerContainer}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* <AntDesign name="left" size={24} color="black" onPress={() => router.back()} /> */}
            <Text 
              style={styles.headerText}
            > Account Settings </Text>  
          </View>
          <View style={{marginTop: '2%'}}>
            <Text style={{color: '#868686'}}>Update your profile data </Text>
          </View>
          <View style={{marginTop: '10%'}}>
            <View>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
                onPress={() => {
                  router.push('/profileInfo');
                }}
              >
                <AntDesign name="user" size={20} color={'#000000'} />
                <View 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    marginLeft: '3%',
                    padding: 5
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    > Profile Information </Text>
                    <Text 
                      style={{
                        color: '#868686',
                        marginTop: '5%'
                      }}
                    > Change your account information </Text>
                  </View>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <View 
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  opacity: 0.2,
                  marginTop: '2%'
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '5%'
                }}
                onPress={() => {
                  router.push('/profilePassword')
                }}
              >
                <Feather name="lock" size={20} color="black" />
                <View 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    marginLeft: '3%',
                    padding: 5
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    > Change password </Text>
                    <Text 
                      style={{
                        color: '#868686',
                        marginTop: '5%'
                      }}
                    > Change your account password </Text>
                  </View>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <View 
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  opacity: 0.2,
                  marginTop: '2%'
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '5%'
                }}
              >
                <EvilIcons name="location" size={28} color="black" />
                <View 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    marginLeft: '3%',
                    padding: 5
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    > Location </Text>
                    <Text 
                      style={{
                        color: '#868686',
                        marginTop: '7%'
                      }}
                    > Edit your location </Text>
                  </View>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <View 
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  opacity: 0.2,
                  marginTop: '2%'
                }}
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: '5%'
                }}
              >
                <Ionicons name="hand-right-outline" size={24} color="black" />
                <View 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    marginLeft: '3%',
                    padding: 5
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    > Privacy </Text>
                    <Text 
                      style={{
                        color: '#868686',
                        marginTop: '7%'
                      }}
                    > protect your data </Text>
                  </View>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <View 
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  opacity: 0.2,
                  marginTop: '2%'
                }}
              />
            </View>
            <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 100,
                    borderWidth: 1,
                    padding: 20,
                    borderRadius: 10,
                    borderColor: '#1280ED'
                  }}
                  onPress={() => setLogoutModal(true)}
                >
                  <AntDesign name="logout" size={22} color="#C62121" />
                  <Text
                     style={{
                      color: '#C62121',
                      fontSize: 18,
                      marginLeft: '5%'
                    }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
          </View> 
          <ModalPopup 
                visible={logoutModal}
              >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Text> Are you sure you want to logout </Text>
                <View
                  style={{
                    marginTop: '5%',
                    width: '100%'
                  }}
                >
                  <CustomeButtom 
                    title='Yes'
                    onPress={() => {
                      setLogoutModal(false)
                      logout()
                       router.replace({
                          pathname: '/signin',
                          params: {
                            ref: 'signin',
                            previous: 'logout'
                          }
                      });
                    }}
                    color={'#1280ED'}
                  />
                  <CustomeButtom 
                    title='No'
                    onPress={() => setLogoutModal(false)}
                    color={'#E60023'}
                  />
                </View>
              </View>
          </ModalPopup>
          <ModalPopup 
                visible={deleteaccountModal}
              >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Text> Are you sure you want to delete accoutnt permanently? </Text>
                <View
                  style={{
                    marginTop: '5%',
                    width: '100%'
                  }}
                >
                  <CustomeButtom 
                    title='Yes'
                    onPress={() => setDeleteAccountModal(false)}
                    color={'#1280ED'}
                  />
                  <CustomeButtom 
                    title='No'
                    onPress={() => setDeleteAccountModal(false)}
                    color={'#E60023'}
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
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    width: '90%',
    marginHorizontal: 'auto',
    marginTop: '10%'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 500,
    marginTop: '5%'
  },
  subServices: {
    paddingVertical: 10,
    borderRadius: 5
  }
})