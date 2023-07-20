import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import utils from '../utils/constants';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text h1>Diall</Text>

      <View style={styles.buttons}>
        <Button title="Login" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign In')} />
        <Button title="Create Account" type="outline" titleStyle={styles.title} buttonStyle={styles.outlineButton} onPress={() => navigation.navigate('Sign Up')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 1,
    width: utils.width * 0.5,
    marginTop: 10
  },
  title: {
    color: '#fa622e',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#fa622e',
  },
  outlineButton: {
    marginTop: 10,
    borderColor: '#fa622e'
  }
});

export default WelcomeScreen;
