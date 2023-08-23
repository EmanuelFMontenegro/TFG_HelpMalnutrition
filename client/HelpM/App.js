import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import StartScreen from './src/screens/StartScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './src/navigation/BottomTab';
import LoginScreen from './src/screens/LoginScreen';
import DatosBebeScreen from './src/screens/DatosBebeScreen';
import {
  CerrarSesionProvider,
  useCerrarSesion,
} from './src/controller/CerrarSesion';
const Stack = createStackNavigator();

const LoadingScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" color="#00CFEB" />
  </View>
);

const App = () => {
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

        <Stack.Screen name="BottomTab" options={{headerShown: false}}>
          {() => (
            <CerrarSesionProvider>
              <BottomTab />
            </CerrarSesionProvider>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
