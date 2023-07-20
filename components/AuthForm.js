import { View, StyleSheet } from 'react-native'
import React from 'react'
import CustomInput from './CustomInput';
import utils from '../utils/constants';
import { Button } from 'react-native-elements';

export default function AuthForm({
    emailValue,
    passwordValue,
    emailInputFunc,
    passwordInputFunc,
    submitFunc,
    submitText,
}) {
  return (
    <View style={styles.controls}>
        <CustomInput
            placeholder="Email"
            containerStyle={styles.control}
            value={emailValue}
            onChangeFunc={emailInputFunc}
            autoCapitalize={false}
            icon='envelope'
        />
        <CustomInput
            placeholder="Password"
            containerStyle={styles.control}
            value={passwordValue}
            onChangeFunc={passwordInputFunc}
            secureTextEntry={true}
            icon='key'
        />
        <Button title={submitText} buttonStyle={styles.buttonControl} onPress={submitFunc} />
    </View>
  )
}

const styles = StyleSheet.create({
    controls: {
      flex: 1,
      width: utils.width * 0.8
    },
    control: {
      marginTop: 10,
    },
    buttonControl: {
        marginTop: 10,
        backgroundColor: '#fa622e'
    }
  });
