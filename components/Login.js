import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (route.params && route.params.userData) {
      setUserData(route.params.userData);
    }
  }, [route.params]);

  const handleLogin = () => {
    const user = userData.find((item) => item.email === email && item.password === password);
    if (user || (email === 'mobile@uc.com' && password === '12345')) {
      navigation.navigate('Home', { userData: userData });
      setEmail('');
      setPassword('');
      setErrMsg('');
    } else {
      setErrMsg('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{errMsg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF7E4',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#436850',
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    color: '#FF0000',
    marginTop: 6,
  },
});
