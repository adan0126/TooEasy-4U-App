import React, { useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

export default function AdminDineroLeccionNivel3({ navigation }) {
  // AQUÍ VAS A PEGAR LAS TARJETAS DE ESTE TEMA Y NIVEL
// Dentro de src/screens/AdminDinero/Nivel3/LAdminDinero.js
// Reemplaza SOLO el contenido del arreglo tarjetas por esto:
  const frontImages = [
  require("../../../../assets/tarjetaFrente1.png"),
  require("../../../../assets/tarjetaFrente2.png"),
  require("../../../../assets/tarjetaFrente3.png"),
  require("../../../../assets/tarjetaFrente4.png"),
  require("../../../../assets/tarjetaFrente5.png"),
  require("../../../../assets/tarjetaFrente6.png"),
  require("../../../../assets/tarjetaFrente7.png"),
  require("../../../../assets/tarjetaFrente8.png"),
  require("../../../../assets/tarjetaFrente9.png"),
  require("../../../../assets/tarjetaFrente10.png"),
  require("../../../../assets/tarjetaFrente11.png"),
];

const backImages = [
  require("../../../../assets/tarjetaDetras1.png"),
  require("../../../../assets/tarjetaDetras2.png"),
  require("../../../../assets/tarjetaDetras3.png"),
  require("../../../../assets/tarjetaDetras4.png"),
  require("../../../../assets/tarjetaDetras5.png"),
  require("../../../../assets/tarjetaDetras6.png"),
  require("../../../../assets/tarjetaDetras7.png"),
];

  // -------------------------------------------
  // TARJETAS BASE
  // -------------------------------------------
  const tarjetasBase = [
    {
      id: "1",
      frente: "¿Qué es un presupuesto inteligente?",
      atras:
        "Es una forma de planear y controlar tus ingresos y gastos de manera consciente. No solo se trata de dividir el dinero, sino de revisar cómo lo usas, detectar problemas y hacer ajustes para acercarte a tus metas financieras.",
    },
    {
      id: "2",
      frente: "Primer paso: registrar ingresos y gastos",
      atras:
        "Un presupuesto inteligente comienza anotando todo lo que entra y sale de tu bolsillo o cuenta. Incluye salario, apoyos, ventas, y también gastos fijos y variables. Entre más claro tengas los números, más fácil será tomar decisiones.",
    },
    {
      id: "3",
      frente: "Categorizar y analizar tus gastos",
      atras:
        "Después de registrar, separa tus gastos en necesidades, deseos y ahorro/deudas. Luego revisa dónde se está yendo la mayor parte del dinero. Así puedes identificar fugas, gastos innecesarios o categorías que están creciendo demasiado.",
    },
    {
      id: "4",
      frente: "Ajustar y definir metas financieras",
      atras:
        "Con la información clara, decides qué cambiar: reducir ciertos deseos, aumentar el ahorro, pagar más rápido una deuda, o crear un fondo de emergencia. También puedes fijar metas concretas, como ahorrar cierta cantidad en un plazo determinado.",
    },
    {
      id: "5",
      frente: "Usar la regla 50/30/20 como referencia",
      atras:
        "La regla 50/30/20 puede servirte como punto de partida para evaluar tu presupuesto. Si tus deseos están muy por encima del 30 % o las necesidades superan el 50 %, puedes analizar qué modificar para lograr un equilibrio más sano.",
    },
    {
      id: "6",
      frente: "Beneficios de un presupuesto inteligente",
      atras:
        "Te permite anticiparte a problemas, evitar deudas innecesarias, construir ahorro y tomar decisiones con más tranquilidad. Además, te ayuda a que tu dinero trabaje a tu favor, en lugar de sentir que desaparece sin saber en qué se fue.",
    },
  ];

  // -------------------------------------------
    // COMBINAR TARJETAS + IMÁGENES AUTOMÁTICAMENTE
    // -------------------------------------------
    const tarjetas = useMemo(() => {
      return tarjetasBase.map((t, i) => ({
        ...t,
        imagenFrente: frontImages[i % frontImages.length], // 11 imágenes → se repiten
        imagenAtras: backImages[i % backImages.length],     // 7 imágenes → se repiten
      }));
    }, []);

  const [indexActual, setIndexActual] = useState(0);

  const handleScroll = (e) => {
    const nuevoIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndexActual(nuevoIndex);
  };

return (
    <View style={styles.container}>
      <FlatList
        data={tarjetas}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <FlashCard
            frente={item.frente}
            atras={item.atras}
            imagenFrente={item.imagenFrente}
            imagenAtras={item.imagenAtras}
          />
        )}
      />

      {indexActual === tarjetas.length - 1 && (
        <TouchableOpacity
          style={styles.btnRepaso}
          onPress={() => navigation.navigate("PAdminDinero3")}
        >
          <Text style={styles.btnRepasoTxt}>Preguntas de Repaso</Text>
        </TouchableOpacity>
      )}

      {/* Botón regresar */}
      <TouchableOpacity
        style={styles.btnRegresar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnRegresarTxt}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- COMPONENTE FLASHCARD (igual al de Fundamentos, pero genérico) ----------
function FlashCard({ frente, atras, imagenFrente, imagenAtras }) {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [ladoFrente, setLadoFrente] = useState(true);

  const rotacionFrente = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const rotacionAtras = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: ladoFrente ? 180 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setLadoFrente(!ladoFrente);
    });
  };

  return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity activeOpacity={1} onPress={flipCard}>
          {/* FRENTE */}
          <Animated.View
            style={[
              styles.card,
              styles.cardFrente,
              { transform: [{ rotateY: rotacionFrente }], opacity: ladoFrente ? 1 : 0 },
            ]}
          >
            <Image source={imagenFrente} style={styles.img} resizeMode="contain" />
            <Text style={styles.cardText}>{frente}</Text>
          </Animated.View>
  
          {/* ATRÁS */}
          <Animated.View
            style={[
              styles.card,
              styles.cardAtras,
              { transform: [{ rotateY: rotacionAtras }], opacity: ladoFrente ? 0 : 1 },
            ]}
          >
            <Image source={imagenAtras} style={styles.img} resizeMode="contain" />
            <Text style={styles.cardTextAtras}>{atras}</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
// ---------- ESTILOS ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    justifyContent: "center",
    alignItems: "center",
  },
  msgVacio: {
    color: "#E0E1DD",
    fontSize: 16,
    marginHorizontal: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  cardWrapper: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.8,
    height: 300,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    position: "absolute",
  },
  cardFrente: {
    backgroundColor: "#415A77",
  },
  cardAtras: {
    backgroundColor: "#E0E1DD",
  },
  cardText: {
    textAlign: "center",
    fontSize: 22,
    color: "#FFF",
  },
  cardTextAtras: {
    textAlign: "center",
    fontSize: 20,
    color: "#000",
  },
  btnRepaso: {
    position: "absolute",
    bottom: 110,
    backgroundColor: "#1B263B",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnRepasoTxt: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  btnRegresar: {
    position: "absolute",
    bottom: 40,
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: "#778DA9",
    borderRadius: 10,
  },
  btnRegresarTxt: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
