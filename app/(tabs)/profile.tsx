import { 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  SafeAreaView,
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


const index = () => {
  const [logoutModal,setLogoutModal] = React.useState(false);
  const [deleteaccountModal,setDeleteAccountModal] = React.useState(false);
  
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
            <View
              style={{
                width: '100%',
                backgroundColor: '#F1F1F1',
                height: '23%',
                marginBottom: '5%',
                marginTop: '5%',
                borderRadius: '5%',
                paddingLeft: '4%',
                paddingTop: '3%'
              }}
            >
              <View>
                <TouchableOpacity
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '3%'
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
              <View 
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  opacity: 0.2,
                  marginTop: '2%'
                }}
              />
              <View
              >
                <TouchableOpacity
                   style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: '3%'
                  }}
                  onPress={() => setDeleteAccountModal(true)}
                >
                  <MaterialIcons name="delete-outline" size={24} color="#C62121" />
                  <Text 
                    style={{
                      color: '#C62121',
                      fontSize: 18,
                      marginLeft: '5%'
                    }}
                  >
                    Delete Account
                  </Text>
                </TouchableOpacity>

              </View>
            </View>
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
                    onPress={() => setLogoutModal(false)}
                    color={'#1AACD5'}
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
                    color={'#1AACD5'}
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