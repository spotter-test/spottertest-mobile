import { View, Text,StyleSheet,Dimensions,TouchableOpacity,ActivityIndicator } from 'react-native'
import React from 'react'

interface Props {
  title?: string;
  onPress?: () => any;
  isLoading?: boolean;
  color?: string;
}

const {width,height} = Dimensions.get('window');

const CustomeButtom:React.FC<Props> = ({title,onPress,isLoading,color}) => {
  return (
    <TouchableOpacity 
      style={[styles.containerStyle,{ backgroundColor: color,}]}
      onPress={onPress}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}
      >
        {
          isLoading ? <ActivityIndicator size={70} color={'#ffffff'}/> :   <Text
          style={styles.textStyle}
        >{title}</Text>
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignSelf: 'center',
    width: '100%',
    height: height / 15
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'medium',
    textAlign: 'center',
  }
});

export default CustomeButtom