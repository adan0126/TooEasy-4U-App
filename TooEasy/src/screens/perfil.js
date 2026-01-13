import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { database } from "../config/fb";

export default function PerfilScreen({ navigation }) {
  const { user, logout } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Índices de los carruseles
  const [idxCasa, setIdxCasa] = useState(0);
  const [idxCastor, setIdxCastor] = useState(0);

  // Configuración
  const MAX_LEVEL = 10;
  const COSTO_CASA_BASE = 20;
  const COSTO_CASTOR_BASE = 34;

  // Mapeo de skins
  const DB_SKINS = {
    skin_default: require("../../assets/casaN1.png"),
    skin_1: require("../../assets/casaN1.png"),
    skin_2: require("../../assets/casaN2.png"),
    skin_3: require("../../assets/casaN3.png"),
    skin_4: require("../../assets/casaN4.png"),
    skin_5: require("../../assets/casaN5.png")
  };

  const SKIN_NAMES = {
    skin_default: "Choza Inicial",
    skin_1: "Casa Nivel 2",
    skin_2: "Casa Nivel 4",
    skin_3: "Casa Nivel 6",
    skin_4: "Casa Nivel 8",
    skin_5: "Mansión Nivel 10"
  };

  const DB_CASTORES = {
    castor_default: require("../../assets/mapacheN1.png"),
    castor_1: require("../../assets/mapacheN1.png"),
    castor_2: require("../../assets/mapacheN2.png"),
    castor_3: require("../../assets/mapacheN3.png"),
    castor_4: require("../../assets/mapacheN4.png"),
    castor_5: require("../../assets/mapacheN5.png")
  };

  const CASTOR_NAMES = {
    castor_default: "Castor Bebé",
    castor_1: "Castor Aprendiz",
    castor_2: "Castor Obrero",
    castor_3: "Castor Ingeniero",
    castor_4: "Castor Maestro",
    castor_5: "Rey Castor"
  };

  const UNLOCKS_CASA_LIST = ["skin_default", "skin_1", "skin_2", "skin_3", "skin_4", "skin_5"];
  const UNLOCKS_CASTOR_LIST = ["castor_default", "castor_1", "castor_2", "castor_3", "castor_4", "castor_5"];

  // Cargar datos del usuario
  useEffect(() => {
    cargarDatosUsuario();
  }, []);

  const cargarDatosUsuario = async () => {
    try {
      setLoading(true);
      const userRef = doc(database, "usuarios", user.id);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        // Agregar campos si no existen
        const datosCompletos = {
          ...data,
          wood: data.wood || 0,
          house_level: data.house_level || 1,
          beaver_level: data.beaver_level || 1,
          current_appearance: data.current_appearance || "skin_default",
          current_beaver: data.current_beaver || "castor_default"
        };
        setUserData(datosCompletos);
        
        // Configurar carruseles
        setIdxCasa(obtenerIndiceSkin(datosCompletos.current_appearance, UNLOCKS_CASA_LIST));
        setIdxCastor(obtenerIndiceSkin(datosCompletos.current_beaver, UNLOCKS_CASTOR_LIST));
      }
    } catch (error) {
      console.error("Error cargando perfil:", error);
      Alert.alert("Error", "No se pudieron cargar los datos del perfil");
    } finally {
      setLoading(false);
    }
  };

  const obtenerIndiceSkin = (skinId, lista) => {
    const idx = lista.indexOf(skinId);
    return idx === -1 ? 0 : idx;
  };

  const mejorarCasa = async () => {
    if (userData.house_level >= MAX_LEVEL) {
      Alert.alert("Nivel Máximo", "¡Tu casa ya está al máximo nivel!");
      return;
    }

    if (userData.wood < COSTO_CASA_BASE) {
      Alert.alert("Sin recursos", "No tienes suficiente madera");
      return;
    }

    try {
      const userRef = doc(database, "usuarios", user.id);
      await updateDoc(userRef, {
        wood: increment(-COSTO_CASA_BASE),
        house_level: increment(1)
      });

      setUserData(prev => ({
        ...prev,
        wood: prev.wood - COSTO_CASA_BASE,
        house_level: prev.house_level + 1
      }));

      Alert.alert("¡Mejorado!", "Casa mejorada con éxito");
    } catch (error) {
      console.error("Error mejorando casa:", error);
      Alert.alert("Error", "No se pudo mejorar la casa");
    }
  };

  const entrenarCastor = async () => {
    if (userData.beaver_level >= MAX_LEVEL) {
      Alert.alert("Nivel Máximo", "¡Tu castor ya está al máximo nivel!");
      return;
    }

    if (userData.monedas < COSTO_CASTOR_BASE) {
      Alert.alert("Sin recursos", "No tienes suficientes monedas");
      return;
    }

    try {
      const userRef = doc(database, "usuarios", user.id);
      await updateDoc(userRef, {
        monedas: increment(-COSTO_CASTOR_BASE),
        beaver_level: increment(1)
      });

      setUserData(prev => ({
        ...prev,
        monedas: prev.monedas - COSTO_CASTOR_BASE,
        beaver_level: prev.beaver_level + 1
      }));

      Alert.alert("¡Entrenado!", "Castor entrenado con éxito");
    } catch (error) {
      console.error("Error entrenando castor:", error);
      Alert.alert("Error", "No se pudo entrenar el castor");
    }
  };

  const equiparSkin = async (skinId, type) => {
    try {
      const userRef = doc(database, "usuarios", user.id);
      const campo = type === 'house' ? 'current_appearance' : 'current_beaver';
      
      await updateDoc(userRef, {
        [campo]: skinId
      });

      setUserData(prev => ({
        ...prev,
        [campo]: skinId
      }));

      Alert.alert("Equipado", "Apariencia actualizada");
    } catch (error) {
      console.error("Error equipando skin:", error);
      Alert.alert("Error", "No se pudo equipar la skin");
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que deseas salir?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Salir", onPress: async () => {
          await logout();
          navigation.navigate("Main");
        }}
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C35EB9" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar el perfil</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={cargarDatosUsuario}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Calcular nivel requerido para skin actual
  const nivelRequeridoCasa = (idxCasa === 0) ? 1 : idxCasa * 2;
  const nivelRequeridoCastor = (idxCastor === 0) ? 1 : idxCastor * 2;
  const casaDesbloqueada = userData.house_level >= nivelRequeridoCasa;
  const castorDesbloqueado = userData.beaver_level >= nivelRequeridoCastor;

  const skinIdCasa = UNLOCKS_CASA_LIST[idxCasa];
  const skinIdCastor = UNLOCKS_CASTOR_LIST[idxCastor];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.welcomeText}>Hola, {userData.username}!</Text>
          <Text style={styles.subtitle}>Perfil</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Recursos */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>🪙</Text>
          <Text style={styles.statValue}>{userData.monedas || 0}</Text>
          <Text style={styles.statLabel}>Monedas</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statIcon}>🪵</Text>
          <Text style={styles.statValue}>{userData.wood || 0}</Text>
          <Text style={styles.statLabel}>Madera</Text>
        </View>
      </View>

      {/* Info Usuario */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nivel Casa:</Text>
          <Text style={styles.infoValue}>{userData.house_level}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nivel Castor:</Text>
          <Text style={styles.infoValue}>{userData.beaver_level}</Text>
        </View>
      </View>

      {/* Botones de Mejora */}
      <View style={styles.upgradeSection}>
        <TouchableOpacity 
          style={[
            styles.upgradeBtn,
            styles.upgradeBtnCasa,
            (userData.house_level >= MAX_LEVEL || userData.wood < COSTO_CASA_BASE) && styles.upgradeBtnDisabled
          ]}
          onPress={mejorarCasa}
          disabled={userData.house_level >= MAX_LEVEL || userData.wood < COSTO_CASA_BASE}
        >
          <Text style={styles.upgradeBtnIcon}>🏠</Text>
          <View style={styles.upgradeBtnTextContainer}>
            <Text style={styles.upgradeBtnTitle}>
              {userData.house_level >= MAX_LEVEL ? "Casa al Máximo" : "Mejorar Casa"}
            </Text>
            {userData.house_level < MAX_LEVEL && (
              <Text style={styles.upgradeBtnCost}>{COSTO_CASA_BASE} 🪵</Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.upgradeBtn,
            styles.upgradeBtnCastor,
            (userData.beaver_level >= MAX_LEVEL || userData.monedas < COSTO_CASTOR_BASE) && styles.upgradeBtnDisabled
          ]}
          onPress={entrenarCastor}
          disabled={userData.beaver_level >= MAX_LEVEL || userData.monedas < COSTO_CASTOR_BASE}
        >
          <Text style={styles.upgradeBtnIcon}>🦫</Text>
          <View style={styles.upgradeBtnTextContainer}>
            <Text style={styles.upgradeBtnTitle}>
              {userData.beaver_level >= MAX_LEVEL ? "Castor al Máximo" : "Entrenar Castor"}
            </Text>
            {userData.beaver_level < MAX_LEVEL && (
              <Text style={styles.upgradeBtnCost}>{COSTO_CASTOR_BASE} 🪙</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Visor de Casa */}
      <View style={styles.skinViewer}>
        <Text style={styles.skinViewerTitle}>🏠 Tu Hogar</Text>
        
        <View style={styles.skinDisplay}>
          <Image 
            source={DB_SKINS[skinIdCasa]} 
            style={[
              styles.skinImage,
              !casaDesbloqueada && styles.skinImageLocked
            ]}
          />
          {userData.current_appearance === skinIdCasa && (
            <View style={styles.equippedBadge}>
              <Text style={styles.equippedText}>✅ Equipado</Text>
            </View>
          )}
        </View>

        <View style={styles.skinControls}>
          <TouchableOpacity 
            style={styles.navBtn}
            onPress={() => idxCasa > 0 && setIdxCasa(idxCasa - 1)}
            disabled={idxCasa === 0}
          >
            <Text style={styles.navBtnText}>◀</Text>
          </TouchableOpacity>

          <View style={styles.skinInfo}>
            <Text style={styles.skinName}>
              {casaDesbloqueada ? SKIN_NAMES[skinIdCasa] : `🔒 Nivel ${nivelRequeridoCasa}`}
            </Text>
            <TouchableOpacity 
              style={[
                styles.equipBtn,
                userData.current_appearance === skinIdCasa && styles.equipBtnEquipped,
                !casaDesbloqueada && styles.equipBtnLocked
              ]}
              onPress={() => equiparSkin(skinIdCasa, 'house')}
              disabled={!casaDesbloqueada || userData.current_appearance === skinIdCasa}
            >
              <Text style={styles.equipBtnText}>
                {userData.current_appearance === skinIdCasa ? "Equipado" : 
                 casaDesbloqueada ? "Equipar" : "Bloqueado"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.navBtn}
            onPress={() => idxCasa < UNLOCKS_CASA_LIST.length - 1 && setIdxCasa(idxCasa + 1)}
            disabled={idxCasa === UNLOCKS_CASA_LIST.length - 1}
          >
            <Text style={styles.navBtnText}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Visor de Castor */}
      <View style={styles.skinViewer}>
        <Text style={styles.skinViewerTitle}>🦫 Tu Castor</Text>
        
        <View style={styles.skinDisplay}>
          <Image 
            source={DB_CASTORES[skinIdCastor]} 
            style={[
              styles.skinImage,
              !castorDesbloqueado && styles.skinImageLocked
            ]}
          />
          {userData.current_beaver === skinIdCastor && (
            <View style={styles.equippedBadge}>
              <Text style={styles.equippedText}>✅ Equipado</Text>
            </View>
          )}
        </View>

        <View style={styles.skinControls}>
          <TouchableOpacity 
            style={styles.navBtn}
            onPress={() => idxCastor > 0 && setIdxCastor(idxCastor - 1)}
            disabled={idxCastor === 0}
          >
            <Text style={styles.navBtnText}>◀</Text>
          </TouchableOpacity>

          <View style={styles.skinInfo}>
            <Text style={styles.skinName}>
              {castorDesbloqueado ? CASTOR_NAMES[skinIdCastor] : `🔒 Nivel ${nivelRequeridoCastor}`}
            </Text>
            <TouchableOpacity 
              style={[
                styles.equipBtn,
                userData.current_beaver === skinIdCastor && styles.equipBtnEquipped,
                !castorDesbloqueado && styles.equipBtnLocked
              ]}
              onPress={() => equiparSkin(skinIdCastor, 'beaver')}
              disabled={!castorDesbloqueado || userData.current_beaver === skinIdCastor}
            >
              <Text style={styles.equipBtnText}>
                {userData.current_beaver === skinIdCastor ? "Equipado" : 
                 castorDesbloqueado ? "Equipar" : "Bloqueado"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.navBtn}
            onPress={() => idxCastor < UNLOCKS_CASTOR_LIST.length - 1 && setIdxCastor(idxCastor + 1)}
            disabled={idxCastor === UNLOCKS_CASTOR_LIST.length - 1}
          >
            <Text style={styles.navBtnText}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#E63946",
    marginBottom: 20,
  },
  retryBtn: {
    backgroundColor: "#C35EB9",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "#2c3e50",
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
    backBtn: {
    fontSize: 28,
    color: "#FFF",
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "#ecf0f1",
    marginTop: 4,
  },
  logoutBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "white",
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statBox: {
    alignItems: "center",
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  statLabel: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  infoLabel: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  upgradeSection: {
    padding: 15,
  },
  upgradeBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  upgradeBtnCasa: {
    backgroundColor: "#e67e22",
  },
  upgradeBtnCastor: {
    backgroundColor: "#27ae60",
  },
  upgradeBtnDisabled: {
    backgroundColor: "#95a5a6",
    opacity: 0.6,
  },
  upgradeBtnIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  upgradeBtnTextContainer: {
    flex: 1,
  },
  upgradeBtnTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  upgradeBtnCost: {
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  skinViewer: {
    backgroundColor: "#d2b48c",
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    padding: 15,
  },
  skinViewerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a3b2a",
    marginBottom: 15,
    textAlign: "center",
  },
  skinDisplay: {
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
  },
  skinImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  skinImageLocked: {
    opacity: 0.4,
  },
  equippedBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#27ae60",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  equippedText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  skinControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 10,
    borderRadius: 15,
  },
  navBtn: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  navBtnText: {
    fontSize: 20,
    color: "#2c3e50",
  },
  skinInfo: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  skinName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  equipBtn: {
    backgroundColor: "#2c3e50",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
  },
  equipBtnEquipped: {
    backgroundColor: "#4CAF50",
  },
  equipBtnLocked: {
    backgroundColor: "#95a5a6",
  },
  equipBtnText: {
    color: "white",
    fontWeight: "600",
  },
});