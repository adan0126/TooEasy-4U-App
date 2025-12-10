import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useUser } from "../../context/UserContext";
import { fetchActiveChallenges } from "../../api/challengesApi";
import RetosPanel from "../../components/retos/RetosPanel";

export default function RetosScreen() {
  const { user, token } = useUser(); // asumiendo que ya existe
  const [challenges, setChallenges] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const retos = await fetchActiveChallenges(token);
        setChallenges(retos);
      } catch (e) {
        console.log("Error cargando retos:", e.message);
      }
    })();
  }, [user, token]);

  const destacado = challenges[0];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/retos_fondo.jpg")}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.headerCard}>
          <View>
            <Text style={styles.headerTitle}>Reto</Text>
            <Text style={styles.headerSubtitle}>
              {destacado?.description || "Debes juntar tanto dinero"}
            </Text>
          </View>
          <Text style={styles.headerArrow}>{">"}</Text>
        </View>

        <View style={styles.recomendacionCard}>
          <Text style={styles.recoTitle}>RECOMENDACIÓN:</Text>
          <Text style={styles.recoText}>
            Registra tus ingresos y gastos todos los días para mantener tus
            rachas activas. Los retos se completan automáticamente con tu
            actividad.
          </Text>
        </View>

        <TouchableOpacity style={styles.btnRetos} onPress={() => setOpen(true)}>
          <Text style={styles.btnRetosTxt}>Ver retos activos</Text>
        </TouchableOpacity>
      </ImageBackground>

      <Modal visible={open} transparent animationType="slide">
        <RetosPanel challenges={challenges} onClose={() => setOpen(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111625" },
  bg: { flex: 1, justifyContent: "space-between" },
  headerCard: {
    marginTop: 40,
    marginHorizontal: 16,
    backgroundColor: "#1B263B",
    borderRadius: 24,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  headerSubtitle: { color: "white", fontSize: 14 },
  headerArrow: { color: "white", fontSize: 20 },
  recomendacionCard: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 12,
  },
  recoTitle: { fontWeight: "bold", marginBottom: 4 },
  recoText: { fontSize: 13 },
  btnRetos: {
    alignSelf: "center",
    marginBottom: 40,
    backgroundColor: "#415A77",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  btnRetosTxt: { color: "#FFF", fontWeight: "bold" },
});
