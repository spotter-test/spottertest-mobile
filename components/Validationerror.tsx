import React from 'react';
import {View, Text, TouchableOpacity, TextStyle, StyleProp,StyleSheet} from 'react-native';

//props for the Validationerror component

type ValidationerrorProps = {
  containerStyle?: StyleProp<TextStyle>;
  onPress?: () => void; // Callback function for TouchableOpacity press
  title?: string;
};
// Validationerror component definition

const Validationerror: React.FC<ValidationerrorProps> = ({
  onPress,
  title,
}) => {
  // Styling for the rectangular container

  const rectangle72 = {
    height: 30,
    borderRadius: 12,
    backgroundColor: '#e1cece',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    marginBottom: 10,
  };

  // Render the Validationerror component
  return (
    <TouchableOpacity onPress={onPress} style={[rectangle72, styles.containerStyle]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 17.6,
        letterSpacing: 0,
        color: 'red',
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    containerStyle: {
        height: 30,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#e1cece',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
        marginBottom: 10,
    }
})
// Export the Validationerror component as the default export
export default Validationerror;