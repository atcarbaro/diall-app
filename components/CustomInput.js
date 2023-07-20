import React from 'react'
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CustomInput({ icon, containerStyle, secureTextEntry, placeholder, value, onChangeFunc }) {
  return (
    <Input
        placeholder={placeholder}
        containerStyle={containerStyle}
        value={value}
        onChangeText={onChangeFunc}
        leftIcon={
          <Icon
              name={icon}
              size={16}
          />
        }
        secureTextEntry={secureTextEntry}
        autoCapitalize={false}
    />
  )
}
