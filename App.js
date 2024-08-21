import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Home from './components/Home';
import Add from './components/Add';
import Navbar from './components/Navbar';
import EditScreen from './components/EditScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerTitle: (props) => <Navbar {...props} /> }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            headerTitle: (props) => <Navbar {...props} />, 
            headerLeft: null // Hide the back button
          }}
        />
        <Stack.Screen 
          name="Add" 
          component={Add} 
          options={{ 
            headerTitle: (props) => <Navbar {...props} />, 
            headerLeft: null // Hide the back button
          }}
        />
        {/* Stack.Screen for EditScreen */}
        <Stack.Screen 
          name="Edit" 
          component={EditScreen} 
          options={{ 
            headerTitle: (props) => <Navbar {...props} />,
            headerLeft: null // Hide the back button
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
