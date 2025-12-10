// src/navigation/NavigatorApp.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useUser } from '../context/UserContext';

// ========== PANTALLAS DE AUTENTICACIÓN ==========
import IniciarSesion from '../screens/login';
import CrearCuenta from '../screens/cuenta';
import Main from '../screens/home';

// ========== PANTALLA PRINCIPAL ==========
import Lecciones from '../screens/lecciones';

// ========== PANTALLAS DE NAVEGACIÓN ==========
import DashboardFinanzas from '../screens/DashboardFinanzas';
import Retos from '../screens/retos/RetosScreen';
import Perfil from '../screens/perfil';

// ========== PANTALLAS DEL DASHBOARD DE FINANZAS ==========
import EditarIngresoMensual from '../screens/EditarIngresoMensual';
import RegistrarTransaccion from '../screens/RegistrarTransaccion';

// ========== FUNDAMENTOS ==========
import FMenu from '../screens/Fundamentos/FMenu';
// Nivel 1 - Ingresos y Gastos
import LFundamentos1 from '../screens/Fundamentos/Nivel1/LFundamentos';
import PFundamentos1 from '../screens/Fundamentos/Nivel1/PFundamentos';
// Nivel 2 - Ahorro
import LFundamentos2 from '../screens/Fundamentos/Nivel2/LFundamentos';
import PFundamentos2 from '../screens/Fundamentos/Nivel2/PFundamentos';
// Nivel 3 - Fondos de Emergencia
import LFundamentos3 from '../screens/Fundamentos/Nivel3/LFundamentos';
import PFundamentos3 from '../screens/Fundamentos/Nivel3/PFundamentos';

// ========== CUENTAS BANCARIAS ==========
import CBMenu from '../screens/Cuentas Bancarias/CBMeu';
// Nivel 1 - Cuenta de Ahorro
import LCuentasBancarias1 from '../screens/Cuentas Bancarias/Nivel 1/LCuentasBancarias';
import PCuentasBancarias1 from '../screens/Cuentas Bancarias/Nivel 1/PCuentasBancarias';
// Nivel 2 - Cuenta de Nómina
import LCuentasBancarias2 from '../screens/Cuentas Bancarias/Nivel 2/LCuentasBancarias';
import PCuentasBancarias2 from '../screens/Cuentas Bancarias/Nivel 2/PCuentasBancarias';
// Nivel 3 - Intereses y Comisiones
import LCuentasBancarias3 from '../screens/Cuentas Bancarias/Nivel 3/LCuentasBancarias';
import PCuentasBancarias3 from '../screens/Cuentas Bancarias/Nivel 3/PCuentasBancarias';

// ========== ADMINISTRACIÓN DE DINERO ==========
import ADMenu from '../screens/AdminDinero/ADMenu';
// Nivel 1 - Bases para administrar dinero
import LAdminDinero1 from '../screens/AdminDinero/Nivel1/LAdminDinero';
import PAdminDinero1 from '../screens/AdminDinero/Nivel1/PAdminDinero';
// Nivel 2 - Regla 50/30/20
import LAdminDinero2 from '../screens/AdminDinero/Nivel2/LAdminDinero';
import PAdminDinero2 from '../screens/AdminDinero/Nivel2/PAdminDinero';
// Nivel 3 - Presupuesto mensual
import LAdminDinero3 from '../screens/AdminDinero/Nivel3/LAdminDinero';
import PAdminDinero3 from '../screens/AdminDinero/Nivel3/PAdminDinero';

// ========== TARJETAS ==========
import TMenu from '../screens/Tarjetas/TMenu';
// Nivel 1 - Tarjeta de Crédito
import LTarjetas1 from '../screens/Tarjetas/Nivel1/LTarjetas';
import PTarjetas1 from '../screens/Tarjetas/Nivel1/PTarjetas';
// Nivel 2 - Tarjeta de Débito
import LTarjetas2 from '../screens/Tarjetas/Nivel2/LTarjetas';
import PTarjetas2 from '../screens/Tarjetas/Nivel2/PTarjetas';
// Nivel 3 - Tarjetas Oro y Platino
import LTarjetas3 from '../screens/Tarjetas/Nivel3/LTarjetas';
import PTarjetas3 from '../screens/Tarjetas/Nivel3/PTarjetas';
// Nivel 4 - Tipos de Tarjeta
import LTarjetas4 from '../screens/Tarjetas/Nivel4/LTarjetas';
import PTarjetas4 from '../screens/Tarjetas/Nivel4/PTarjetas';

// ========== DEUDAS Y CRÉDITOS ==========
import DMenu from '../screens/Deudas y Creditos/DMenu';
// Nivel 1 - Criterios de Instituciones Financieras
import LDeudasyCreditos1 from '../screens/Deudas y Creditos/Nivel1/LDeudas y Creditos';
import PDeudasyCreditos1 from '../screens/Deudas y Creditos/Nivel1/PDeudas y Creditos';
// Nivel 2 - Historial Crediticio
import LDeudasyCreditos2 from '../screens/Deudas y Creditos/Nivel2/LDeudas y Creditos';
import PDeudasyCreditos2 from '../screens/Deudas y Creditos/Nivel2/PDeudas y Creditos';
// Nivel 3 - ¿Qué es la deuda?
import LDeudasyCreditos3 from '../screens/Deudas y Creditos/Nivel3/LDeudas y Creditos';
import PDeudasyCreditos3 from '../screens/Deudas y Creditos/Nivel3/PDeudas y Creditos';
// Nivel 4 - Deudas Buenas vs Malas
import LDeudasyCreditos4 from '../screens/Deudas y Creditos/Nivel4/LDeudas y Creditos';
import PDeudasyCreditos4 from '../screens/Deudas y Creditos/Nivel4/PDeudas y Creditos';

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

        {/* ========== PANTALLAS DE NAVEGACIÓN ========== */}
        <Stack.Screen name="DashboardFinanzas" component={DashboardFinanzas} />
        <Stack.Screen name="EditarIngresoMensual" component={EditarIngresoMensual} />
        <Stack.Screen name="RegistrarTransaccion" component={RegistrarTransaccion} />
        <Stack.Screen name="Retos" component={Retos} />
        <Stack.Screen name="Perfil" component={Perfil} />

        {/* ========== FUNDAMENTOS ========== */}
        <Stack.Screen name="FMenu" component={FMenu} />
        {/* Nivel 1 */}
        <Stack.Screen name="LFundamentos1" component={LFundamentos1} />
        <Stack.Screen name="PFundamentos1" component={PFundamentos1} />
        {/* Nivel 2 */}
        <Stack.Screen name="LFundamentos2" component={LFundamentos2} />
        <Stack.Screen name="PFundamentos2" component={PFundamentos2} />
        {/* Nivel 3 */}
        <Stack.Screen name="LFundamentos3" component={LFundamentos3} />
        <Stack.Screen name="PFundamentos3" component={PFundamentos3} />

        {/* ========== CUENTAS BANCARIAS ========== */}
        <Stack.Screen name="CBMenu" component={CBMenu} />
        {/* Nivel 1 */}
        <Stack.Screen name="LCuentasBancarias1" component={LCuentasBancarias1} />
        <Stack.Screen name="PCuentasBancarias1" component={PCuentasBancarias1} />
        {/* Nivel 2 */}
        <Stack.Screen name="LCuentasBancarias2" component={LCuentasBancarias2} />
        <Stack.Screen name="PCuentasBancarias2" component={PCuentasBancarias2} />
        {/* Nivel 3 */}
        <Stack.Screen name="LCuentasBancarias3" component={LCuentasBancarias3} />
        <Stack.Screen name="PCuentasBancarias3" component={PCuentasBancarias3} />

        {/* ========== ADMINISTRACIÓN DE DINERO ========== */}
        <Stack.Screen name="ADMenu" component={ADMenu} />
        {/* Nivel 1 */}
        <Stack.Screen name="LAdminDinero1" component={LAdminDinero1} />
        <Stack.Screen name="PAdminDinero1" component={PAdminDinero1} />
        {/* Nivel 2 */}
        <Stack.Screen name="LAdminDinero2" component={LAdminDinero2} />
        <Stack.Screen name="PAdminDinero2" component={PAdminDinero2} />
        {/* Nivel 3 */}
        <Stack.Screen name="LAdminDinero3" component={LAdminDinero3} />
        <Stack.Screen name="PAdminDinero3" component={PAdminDinero3} />

        {/* ========== TARJETAS ========== */}
        <Stack.Screen name="TMenu" component={TMenu} />
        {/* Nivel 1 */}
        <Stack.Screen name="LTarjetas1" component={LTarjetas1} />
        <Stack.Screen name="PTarjetas1" component={PTarjetas1} />
        {/* Nivel 2 */}
        <Stack.Screen name="LTarjetas2" component={LTarjetas2} />
        <Stack.Screen name="PTarjetas2" component={PTarjetas2} />
        {/* Nivel 3 */}
        <Stack.Screen name="LTarjetas3" component={LTarjetas3} />
        <Stack.Screen name="PTarjetas3" component={PTarjetas3} />
        {/* Nivel 4 */}
        <Stack.Screen name="LTarjetas4" component={LTarjetas4} />
        <Stack.Screen name="PTarjetas4" component={PTarjetas4} />

        {/* ========== DEUDAS Y CRÉDITOS ========== */}
        <Stack.Screen name="DMenu" component={DMenu} />
        {/* Nivel 1 */}
        <Stack.Screen name="LDeudasyCreditos1" component={LDeudasyCreditos1} />
        <Stack.Screen name="PDeudasyCreditos1" component={PDeudasyCreditos1} />
        {/* Nivel 2 */}
        <Stack.Screen name="LDeudasyCreditos2" component={LDeudasyCreditos2} />
        <Stack.Screen name="PDeudasyCreditos2" component={PDeudasyCreditos2} />
        {/* Nivel 3 */}
        <Stack.Screen name="LDeudasyCreditos3" component={LDeudasyCreditos3} />
        <Stack.Screen name="PDeudasyCreditos3" component={PDeudasyCreditos3} />
        {/* Nivel 4 */}
        <Stack.Screen name="LDeudasyCreditos4" component={LDeudasyCreditos4} />
        <Stack.Screen name="PDeudasyCreditos4" component={PDeudasyCreditos4} />
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