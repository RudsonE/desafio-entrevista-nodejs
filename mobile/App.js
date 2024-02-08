import * as React from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login';
import AboutScreen from './screens/About';
import { StatusBar } from 'expo-status-bar';


const Stack = createNativeStackNavigator();


  
export default function App() {
  return (
    <NavigationContainer>
     
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} navigationKey='login'/>
        <Stack.Screen name="About" component={AboutScreen} navigationKey='about'/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


