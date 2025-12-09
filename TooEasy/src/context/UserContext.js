// Para guardar el inicio de sesión del usuario

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar sesión guardada
  useEffect(() => {
    const loadSavedSession = async () => {
      try {
        const savedSession = await AsyncStorage.getItem('userSession');
        if (savedSession) {
          const sessionData = JSON.parse(savedSession);
          setUser(sessionData.user);
          setPerfil(sessionData.perfil);
        }
      } catch (error) {
        console.error('Error cargando sesión guardada:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedSession();
  }, []);

  // Iniciar sesión
  const login = async (userData, perfilData) => {
    setUser(userData);
    setPerfil(perfilData);

    // Guardar sesión permanente
    try {
      await AsyncStorage.setItem(
        'userSession',
        JSON.stringify({
          user: userData,
          perfil: perfilData,
        })
      );
    } catch (error) {
      console.error('Error guardando sesión:', error);
    }
  };

  // Cerrar sesión
  const logout = async () => {
    setUser(null);
    setPerfil(null);
    try {
      await AsyncStorage.removeItem('userSession');
    } catch (error) {
      console.error('Error eliminando sesión guardada:', error);
    }
  };

  const isAuthenticated = () => user !== null;

  const value = {
    user,
    perfil,
    login,
    logout,
    isAuthenticated,
    isLoading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
