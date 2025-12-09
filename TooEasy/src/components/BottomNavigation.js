// src/components/BottomNavigation.js
// Componente de menú inferior para navegación principal

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function BottomNavigation({ navigation, activeRoute = "Lecciones" }) {
  const menuItems = [
    {
      id: "dashboard",
      name: "DashboardFinanzas",
      route: "DashboardFinanzas",
      // 📸 IMAGEN: Coloca aquí el ícono de gráfico/progreso (graph icon)
      icon: require("../../assets/icon_dashboard-removebg-preview.png"),
    },
    {
      id: "lecciones",
      name: "Lecciones",
      route: "Lecciones",
      // 📸 IMAGEN: Coloca aquí el ícono de documento/pruebas (document icon)
      icon: require("../../assets/icono_lecciones-removebg-preview.png"),
    },
    {
      id: "retos",
      name: "Retos",
      route: "Retos",
      // 📸 IMAGEN: Coloca aquí el ícono de moneda/lecciones (coin icon)
      icon: require("../../assets/icono_retos-removebg-preview.png"),
    },
    {
      id: "perfil",
      name: "Perfil",
      route: "Perfil",
      // 📸 IMAGEN: Coloca aquí el ícono de usuario/perfil (user icon)
      icon: require("../../assets/icono_perfil-removebg-preview.png"),
    },
  ];

  const handleNavigation = (route) => {
    if (route === activeRoute) return; // No navegar si ya estás en esa pantalla
    
    // Aquí puedes agregar navegación cuando crees las pantallas
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {menuItems.map((item) => {
        const isActive = item.route === activeRoute;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleNavigation(item.route)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
              {/* 📸 NOTA: Si prefieres usar iconos de una librería como lucide-react,
                  puedes reemplazar el Image con componentes de íconos */}
              <Image
                source={item.icon}
                style={[styles.icon, isActive && styles.iconActive]}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#233A57",
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },

  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 8,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },

  iconContainerActive: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },

  icon: {
    width: 28,
    height: 28,
    tintColor: "#9EB3CC", // Color para íconos inactivos
  },

  iconActive: {
    tintColor: "#FFFFFF", // Color para ícono activo
  },

  label: {
    fontSize: 12,
    color: "#9EB3CC",
    fontWeight: "500",
    textAlign: "center",
  },

  labelActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});