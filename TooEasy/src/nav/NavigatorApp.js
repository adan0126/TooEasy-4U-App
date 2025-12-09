// src/navigation/NavigatorApp.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useUser } from '../context/UserContext';

import IniciarSesion from '../screens/login';
import CrearCuenta from '../screens/cuenta';
import Main from '../screens/home';
import Lecciones from '../screens/lecciones';
import FMenu from '../screens/Fundamentos/FMenu';
import LFundamentos1 from '../screens/Fundamentos/Nivel1/LFundamentos';
import LFundamentos2 from '../screens/Fundamentos/Nivel2/LFundamentos';
import LFundamentos3 from '../screens/Fundamentos/Nivel3/LFundamentos';
import PFundamentos1 from '../screens/Fundamentos/Nivel1/PFundamentos';
import PFundamentos2 from '../screens/Fundamentos/Nivel2/PFundamentos';
import PFundamentos3 from '../screens/Fundamentos/Nivel3/PFundamentos';
import RetosScreen from '../screens/retos/RetosScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C35EB9" />
      </View>
    );
  }

const initialRouteName = "Retos";

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{headerShown: false,}}>
        <Stack.Screen name="IniciarAcc" component={IniciarSesion} />
        <Stack.Screen name="CrearAcc" component={CrearCuenta} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Lecciones" component={Lecciones} />
        <Stack.Screen name="FMenu" component={FMenu} />
        <Stack.Screen name="LFundamentos1" component={LFundamentos1} />
        <Stack.Screen name="LFundamentos2" component={LFundamentos2} />
        <Stack.Screen name="LFundamentos3" component={LFundamentos3} />
        <Stack.Screen name="PFundamentos1" component={PFundamentos1} />
        <Stack.Screen name="PFundamentos2" component={PFundamentos2} />
        <Stack.Screen name="PFundamentos3" component={PFundamentos3} />
        <Stack.Screen name="Retos" component={RetosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111625',
  },
});

export default AppNavigator;