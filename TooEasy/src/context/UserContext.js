// UserContext.js
// Manejo global del usuario autenticado

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

  // Cargar sesión guardada al iniciar
  useEffect(() => {
    const loadSavedSession = async () => {
      try {
        const savedSession = await AsyncStorage.getItem('userSession');

        if (savedSession) {
          const sessionData = JSON.parse(savedSession);
          setUser(sessionData.user || null);
          setPerfil(sessionData.perfil || null);
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

  // Actualizar datos financieros del usuario en memoria
  const updateUserFinanzas = (updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      return updated;
    });

    AsyncStorage.setItem(
      'userSession',
      JSON.stringify({
        user: { ...user, ...updates },
        perfil,
      })
    ).catch((error) => {
      console.error('Error actualizando sesión en AsyncStorage:', error);
    });
  };

  const value = {
    user,
    setUser,
    perfil,
    setPerfil,
    login,
    logout,
    isAuthenticated: () => user !== null,
    isLoading,
    updateUserFinanzas,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
