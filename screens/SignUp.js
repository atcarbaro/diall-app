import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import AuthForm from '../components/AuthForm';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../config/firebaseConfig';

const auth = getAuth();

const SignUpScreen = ({ navigation }) => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  })

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      await addDoc(collection(db, "user_points"), {
        email: value.email,
        total_points: 0
      });
      await addDoc(collection(db, "users"), {
        email: value.email,
      });
      navigation.navigate('Sign In');
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
        submitText="Sign up"
        submitFunc={signUp}
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

export default SignUpScreen;
