import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

// Pantalla principal
function Bienvenida({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>TOO EASY</Text>
        <Text style={styles.subtitle}>JUEGA HOY, TRIUNFA MAÑANA</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>CREAR CUENTA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
      </TouchableOpacity>
    </View>
  );
}

// Pantalla de registro
function Registro({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityWord, setSecurityWord] = useState('');

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !securityWord.trim()) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    try {
      // SE GUARDAN LOS DATOS LOCALMENTE, POSTERIORMENTE SE TIENE QUE CAMBIAR
      await AsyncStorage.setItem('userData', JSON.stringify({ username, password }));
      Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada correctamente.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el registro.');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>REGÍSTRATE</Text>
      <View style={styles.avatarPlaceholder}></View>

      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Palabra de seguridad"
        style={styles.input}
        value={securityWord}
        onChangeText={setSecurityWord}
      />

      <TouchableOpacity style={styles.formButton} onPress={handleRegister}>
        <Text style={styles.formButtonText}>CREAR CUENTA</Text>
      </TouchableOpacity>
    </View>
  );
}

// Pantalla de inicio de sesión
function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const savedData = await AsyncStorage.getItem('userData');
      if (savedData) setRegisteredUser(JSON.parse(savedData));
    };
    getUserData();
  }, []);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Campos incompletos', 'Por favor ingresa usuario y contraseña.');
      return;
    }

    if (!registeredUser) {
      Alert.alert('Sin registro', 'Primero debes registrarte antes de iniciar sesión.');
      return;
    }

    if (
      username === registeredUser.username &&
      password === registeredUser.password
    ) {
      Alert.alert('Bienvenido', `Hola, ${username}!`, [
        { text: 'OK', onPress: () => navigation.navigate('Lessons') },
      ]);
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos.');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>INICIA SESIÓN</Text>
      <View style={styles.avatarPlaceholder}></View>

      <TextInput
        placeholder="Nombre de usuario"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.formButton} onPress={handleLogin}>
        <Text style={styles.formButtonText}>INICIAR SESIÓN</Text>
      </TouchableOpacity>

      <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
    </View>
  );
}

// Pantalla de lecciones
function Lecciones({ navigation }) {
  const [registeredUser, setRegisteredUser] = useState(null);

  useEffect(() => {
    const checkRegistration = async () => {
      const savedData = await AsyncStorage.getItem('userData');
      if (!savedData) {
        Alert.alert('Acceso denegado', 'Debes registrarte antes de acceder.', [
          { text: 'OK', onPress: () => navigation.navigate('Home') },
        ]);
      } else {
        setRegisteredUser(JSON.parse(savedData));
      }
    };
    checkRegistration();
  }, []);

  const lessons = [
    { title: 'Fundamentos', color: '#2f3e57' },
    { title: 'Cuentas Bancarias', color: '#8fa6c9' },
    { title: 'Deudas y Créditos', color: '#2f3e57' },
    { title: 'Administración de Dinero', color: '#8fa6c9' },
    { title: 'Tarjetas', color: '#2f3e57' },
  ];

  return (
    <ScrollView style={styles.lessonsContainer}>
      <Text style={styles.lessonsTitle}>Lecciones</Text>
      {lessons.map((lesson, index) => (
        <View key={index} style={[styles.lessonCard, { backgroundColor: lesson.color }]}>
          <Text style={styles.lessonText}>{lesson.title}</Text>
          <Image
            source={require('./assets/logo.png')}
            style={styles.lessonImage}
            resizeMode="contain"
          />
        </View>
      ))}
    </ScrollView>
  );
}

// Navegación principal
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Bienvenida} />
        <Stack.Screen name="Register" component={Registro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Lessons" component={Lecciones} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  // Home
  homeContainer: {
    flex: 1,
    backgroundColor: '#8fa6c9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 160,
    height: 160,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  subtitle: {
    color: '#000',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginVertical: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },

  // Formularios
  formContainer: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#8fa6c9',
    borderRadius: 60,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 6,
  },
  formButton: {
    backgroundColor: '#b58c5c',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 15,
  },
  formButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#1f2a44',
    marginTop: 10,
  },

  // Lecciones
  lessonsContainer: {
    flex: 1,
    backgroundColor: '#d9d9d9',
    padding: 20,
  },
  lessonsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  lessonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: '60%',
  },
  lessonImage: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});
