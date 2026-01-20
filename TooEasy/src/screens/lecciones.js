// src/screens/lecciones.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import BottomNavigation from "../components/BottomNavigation";
import { useUser } from "../context/UserContext";
import { obtenerProgresoTema, calcularPorcentajeProgreso } from "../services/authService";

export default function LeccionesScreen({ navigation }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [progreso, setProgreso] = useState({
    fundamentos: 0,
    cuentasBancarias: 0,
    adminDinero: 0,
    tarjetas: 0,
    deudas: 0,
  });

  useEffect(() => {
    cargarProgreso();
  }, []);

  // Recargar progreso cuando la pantalla gane foco
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      cargarProgreso();
    });

    return unsubscribe;
  }, [navigation]);

  const cargarProgreso = async () => {
    try {
      setLoading(true);

      // Cargar progreso de cada tema
      const [
        fundamentosData,
        cuentasData,
        adminData,
        tarjetasData,
        deudasData
      ] = await Promise.all([
        obtenerProgresoTema(user.id, 'fundamentos'),
        obtenerProgresoTema(user.id, 'cuentasBancarias'),
        obtenerProgresoTema(user.id, 'adminDinero'),
        obtenerProgresoTema(user.id, 'tarjetas'),
        obtenerProgresoTema(user.id, 'deudas'),
      ]);

      setProgreso({
        fundamentos: calcularPorcentajeProgreso(fundamentosData),
        cuentasBancarias: calcularPorcentajeProgreso(cuentasData),
        adminDinero: calcularPorcentajeProgreso(adminData),
        tarjetas: calcularPorcentajeProgreso(tarjetasData),
        deudas: calcularPorcentajeProgreso(deudasData),
      });

    } catch (error) {
      console.error("Error cargando progreso:", error);
    } finally {
      setLoading(false);
    }
  };

  const LeccionCard = ({ titulo, progresoPorcentaje, imagen, onPress, isDark = true }) => (
    <View>
      <View style={isDark ? styles.cardDark : styles.cardLight}>
        {imagen ? (
          <Image source={imagen} style={styles.icon} />
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
        <Text style={styles.cardTitle}>{titulo}</Text>
        <TouchableOpacity
          style={isDark ? styles.playButton : styles.playButtonLight}
          onPress={onPress}
        >
          <Text style={isDark ? styles.playText : styles.playTextLight}>▶</Text>
        </TouchableOpacity>
      </View>
      
      {/* Barra de progreso */}
      <View style={isDark ? styles.progressBarContainer : styles.progressBarContainerLight}>
        <View 
          style={[
            isDark ? styles.progressBarFill : styles.progressBarFillLight, 
            { width: `${progresoPorcentaje}%` }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>{progresoPorcentaje}%</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#233A57" />
        <Text style={styles.loadingText}>Cargando progreso...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Lecciones</Text>

        <View style={styles.coinContainer}>
          <Image source={require("../../assets/coin.png")} style={styles.coin} />
          <Text style={styles.coinText}>{user?.monedas || 0}</Text>
        </View>

        <ScrollView 
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* FUNDAMENTOS */}
          <LeccionCard
            titulo="Fundamentos"
            progresoPorcentaje={progreso.fundamentos}
            imagen={require("../../assets/pig.png")}
            onPress={() => navigation.navigate("FMenu")}
            isDark={true}
          />

          {/* CUENTAS BANCARIAS */}
          <LeccionCard
            titulo="Cuentas Bancarias"
            progresoPorcentaje={progreso.cuentasBancarias}
            onPress={() => navigation.navigate("CBMenu")}
            isDark={false}
          />

          {/* DEUDAS Y CRÉDITOS */}
          <LeccionCard
            titulo="Deudas y Créditos"
            progresoPorcentaje={progreso.deudas}
            onPress={() => navigation.navigate("DMenu")}
            isDark={true}
          />

          {/* ADMINISTRACIÓN DE DINERO */}
          <LeccionCard
            titulo="Administración de Dinero"
            progresoPorcentaje={progreso.adminDinero}
            onPress={() => navigation.navigate("ADMenu")}
            isDark={false}
          />

          {/* TARJETAS */}
          <LeccionCard
            titulo="Tarjetas"
            progresoPorcentaje={progreso.tarjetas}
            onPress={() => navigation.navigate("TMenu")}
            isDark={true}
          />

          <View style={{ height: 20 }} />
        </ScrollView>
      </View>

      <BottomNavigation navigation={navigation} activeRoute="Lecciones" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  content: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 10,
  },
  coinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  coin: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  coinText: {
    fontSize: 18,
    fontWeight: "800",
  },
  scroll: {
    paddingHorizontal: 15,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  cardDark: {
    backgroundColor: "#233A57",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  cardLight: {
    backgroundColor: "#9EB3CC",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  iconPlaceholder: {
    width: 50,
    height: 50,
    marginRight: 15,
    backgroundColor: "#889CB5",
    borderRadius: 10,
  },
  cardTitle: {
    flex: 1,
    fontSize: 17,
    color: "white",
    fontWeight: "600",
  },
  playButton: {
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonLight: {
    width: 35,
    height: 35,
    backgroundColor: "#E6ECF4",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  playText: {
    fontSize: 18,
    color: "#233A57",
    fontWeight: "900",
  },
  playTextLight: {
    fontSize: 18,
    color: "#233A57",
    fontWeight: "900",
  },
  progressBarContainer: {
    width: "90%",
    alignSelf: "center",
    height: 5,
    backgroundColor: "#C9C9C9",
    borderRadius: 10,
    marginTop: 5,
  },
  progressBarContainerLight: {
    width: "90%",
    alignSelf: "center",
    height: 5,
    backgroundColor: "#C9C9C9",
    borderRadius: 10,
    marginTop: 5,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#233A57",
    borderRadius: 10,
  },
  progressBarFillLight: {
    height: "100%",
    backgroundColor: "#9EB3CC",
    borderRadius: 10,
  },
  progressText: {
    width: "90%",
    textAlign: "right",
    color: "#4A4A4A",
    fontWeight: "700",
    marginBottom: 10,
  },
});