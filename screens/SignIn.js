import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AuthForm from '../components/AuthForm';

const auth = getAuth();

const SignInScreen = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  })

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);

    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <View style={styles.container}>
      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
      <AuthForm
        emailValue={value.email}
        passwordValue={value.password}
        emailInputFunc={(text) => setValue({ ...value, email: text })}
        passwordInputFunc={(text) => setValue({ ...value, password: text })}
        submitText="Sign in"
        submitFunc={signIn}
      />
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

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignInScreen;
