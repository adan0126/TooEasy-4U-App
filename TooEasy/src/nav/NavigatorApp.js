// src/navigation/NavigatorApp.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useUser } from '../context/UserContext';

// Pantallas de autenticación
import IniciarSesion from '../screens/login';
import CrearCuenta from '../screens/cuenta';
import Main from '../screens/home';

// Pantalla principal de lecciones
import Lecciones from '../screens/lecciones';

// Pantalla del DashBoard de Finanzas
import DashboardFinanzas from '../screens/DashboardFinanzas';
import RegistrarTransaccion from '../screens/RegistrarTransaccion';
import EditarIngresoMensual from '../screens/EditarIngresoMensual';
import { EditarMeta } from '../screens/EditarIngresoMensual'; // Están juntas

// ========== FUNDAMENTOS ==========
import FMenu from '../screens/Fundamentos/FMenu';
// Nivel 1
import LFundamentos1 from '../screens/Fundamentos/Nivel1/LFundamentos';
import PFundamentos1 from '../screens/Fundamentos/Nivel1/PFundamentos';
// Nivel 2
import LFundamentos2 from '../screens/Fundamentos/Nivel2/LFundamentos';
import PFundamentos2 from '../screens/Fundamentos/Nivel2/PFundamentos';
// Nivel 3
import LFundamentos3 from '../screens/Fundamentos/Nivel3/LFundamentos';
import PFundamentos3 from '../screens/Fundamentos/Nivel3/PFundamentos';

// ========== CUENTAS BANCARIAS ==========
import CBMenu from '../screens/Cuentas Bancarias/CBMeu';
// Nivel 1
import LCuentasBancarias1 from '../screens/Cuentas Bancarias/Nivel 1/LCuentasBancarias';
import PCuentasBancarias1 from '../screens/Cuentas Bancarias/Nivel 1/PCuentasBancarias';
// Nivel 2
import LCuentasBancarias2 from '../screens/Cuentas Bancarias/Nivel 2/LCuentasBancarias';
import PCuentasBancarias2 from '../screens/Cuentas Bancarias/Nivel 2/PCuentasBancarias';
// Nivel 3
import LCuentasBancarias3 from '../screens/Cuentas Bancarias/Nivel 3/LCuentasBancarias';
import PCuentasBancarias3 from '../screens/Cuentas Bancarias/Nivel 3/PCuentasBancarias';

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

  const initialRouteName = isAuthenticated() ? "Lecciones" : "Main";

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={initialRouteName} 
        screenOptions={{ headerShown: false }}
      >

        {/* ========== PANTALLAS DE AUTENTICACIÓN ========== */}
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="IniciarAcc" component={IniciarSesion} />
        <Stack.Screen name="CrearAcc" component={CrearCuenta} />
        
        {/* ========== PANTALLA PRINCIPAL ========== */}
        <Stack.Screen name="Lecciones" component={Lecciones} />

        {/* ========== DASHBOARD DE FINANZAS ========== */}
        <Stack.Screen name="DashboardFinanzas" component={DashboardFinanzas} />
        <Stack.Screen name="RegistrarTransaccion" component={RegistrarTransaccion} />
        <Stack.Screen name="EditarIngresoMensual" component={EditarIngresoMensual} />
        <Stack.Screen name="EditarMeta" component={EditarMeta} />

        {/* ========== FUNDAMENTOS ========== */}
        <Stack.Screen name="FMenu" component={FMenu} />
        {/* Nivel 1 - Ingresos y Gastos */}
        <Stack.Screen name="LFundamentos1" component={LFundamentos1} />
        <Stack.Screen name="PFundamentos1" component={PFundamentos1} />
        {/* Nivel 2 - Ahorro */}
        <Stack.Screen name="LFundamentos2" component={LFundamentos2} />
        <Stack.Screen name="PFundamentos2" component={PFundamentos2} />
        {/* Nivel 3 - Fondos de Emergencia */}
        <Stack.Screen name="LFundamentos3" component={LFundamentos3} />
        <Stack.Screen name="PFundamentos3" component={PFundamentos3} />

        {/* ========== CUENTAS BANCARIAS ========== */}
        <Stack.Screen name="CBMenu" component={CBMenu} />
        {/* Nivel 1 - Cuenta de Ahorro */}
        <Stack.Screen name="LCuentasBancarias1" component={LCuentasBancarias1} />
        <Stack.Screen name="PCuentasBancarias1" component={PCuentasBancarias1} />
        {/* Nivel 2 - Cuenta de Nómina */}
        <Stack.Screen name="LCuentasBancarias2" component={LCuentasBancarias2} />
        <Stack.Screen name="PCuentasBancarias2" component={PCuentasBancarias2} />
        {/* Nivel 3 - Intereses y Comisiones */}
        <Stack.Screen name="LCuentasBancarias3" component={LCuentasBancarias3} />
        <Stack.Screen name="PCuentasBancarias3" component={PCuentasBancarias3} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
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