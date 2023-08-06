import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import DatosBebeScreen from '../screens/DatosBebeScreen';
import ResultadoScreen from '../screens/ResultadoScreen'; // Nueva importación
import BottomTab from './BottomTab';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoadingScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" color="#00CFEB" />
  </View>
);

const Navigation = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DatosBebeScreen"
          component={DatosBebeScreen}
          options={{headerShown: false}}
        />

        {/* Nueva pantalla de resultados */}
        <Stack.Screen
          name="ResultadoScreen"
          component={ResultadoScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
