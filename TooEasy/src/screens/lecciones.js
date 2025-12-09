import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

export default function LeccionesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      {/* Encabezado */}
      <Text style={styles.header}>Lecciones</Text>

      {/* Monedas */}
      <View style={styles.coinContainer}>
        <Image
          source={require("../../assets/coin.png")}
          style={styles.coin}
        />
        <Text style={styles.coinText}>500</Text>
      </View>

      <ScrollView style={styles.scroll}>

        {/* -------- LECCIÓN 1: FUNDAMENTOS -------- */}
        <View style={styles.cardDark}>
          <Image
            source={require("../../assets/pig.png")}
            style={styles.icon}
          />
          <Text style={styles.cardTitle}>Fundamentos</Text>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate("FMenu")}
          >
            <Text style={styles.playText}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFill} />
        </View>
        <Text style={styles.progressText}>60%</Text>

        {/* -------- LECCIÓN 2: CUENTAS BANCARIAS -------- */}
        <View style={styles.cardLight}>
          <View style={styles.iconPlaceholder} />
          <Text style={styles.cardTitle}>Cuentas Bancarias</Text>
          <TouchableOpacity
            style={styles.playButtonLight}
            onPress={() => navigation.navigate("CBMenu")}
          >
            <Text style={styles.playTextLight}>▶</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarContainerLight}>
          <View style={styles.progressBarFillLight} />
        </View>
        <Text style={styles.progressText}>60%</Text>

        {/* -------- LECCIÓN 3: DEUDAS Y CRÉDITOS -------- */}
        <View style={styles.cardDark}>
          <View style={styles.iconPlaceholder} />
          <Text style={styles.cardTitle}>Deudas y Créditos</Text>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => alert("Próximamente")}
          >
            <Text style={styles.playText}>🔒</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: "0%" }]} />
        </View>
        <Text style={styles.progressText}>0%</Text>

        {/* -------- LECCIÓN 4: ADMINISTRACIÓN DE DINERO -------- */}
        <View style={styles.cardLight}>
          <View style={styles.iconPlaceholder} />
          <Text style={styles.cardTitle}>Administración de Dinero</Text>
          <TouchableOpacity
            style={styles.playButtonLight}
            onPress={() => navigation.navigate("ADMenu")}
          >
            <Text style={styles.playTextLight}>🔒</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarContainerLight}>
          <View style={[styles.progressBarFillLight, { width: "0%" }]} />
        </View>
        <Text style={styles.progressText}>0%</Text>

        {/* -------- LECCIÓN 5: INVERSIONES -------- */}
        <View style={styles.cardDark}>
          <View style={styles.iconPlaceholder} />
          <Text style={styles.cardTitle}>Inversiones</Text>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => alert("Próximamente")}
          >
            <Text style={styles.playText}>🔒</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: "0%" }]} />
        </View>
        <Text style={styles.progressText}>0%</Text>

        {/* -------- LECCIÓN 6: PLANIFICACIÓN FINANCIERA -------- */}
        <View style={styles.cardLight}>
          <View style={styles.iconPlaceholder} />
          <Text style={styles.cardTitle}>Planificación Financiera</Text>
          <TouchableOpacity
            style={styles.playButtonLight}
            onPress={() => alert("Próximamente")}
          >
            <Text style={styles.playTextLight}>🔒</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBarContainerLight}>
          <View style={[styles.progressBarFillLight, { width: "0%" }]} />
        </View>
        <Text style={styles.progressText}>0%</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
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
    width: "60%",
    height: "100%",
    backgroundColor: "#233A57",
    borderRadius: 10,
  },
  progressBarFillLight: {
    width: "60%",
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