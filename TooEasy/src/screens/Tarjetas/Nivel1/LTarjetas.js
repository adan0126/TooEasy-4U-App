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

export default function TarjetasLeccionScreen({ navigation }) {
  // -------------------------------------------
  // Aquí defines las tarjetas de la lección
  // (Información actualizada: Tarjetas de Crédito)
  // -------------------------------------------
// -------------------------------------------
  // IMÁGENES DISPONIBLES
  // -------------------------------------------
  const frontImages = [
  require("../../../../img/tarjetaFrente1.jpg"),
  require("../../../../img/tarjetaFrente2.jpg"),
  require("../../../../img/tarjetaFrente3.jpg"),
  require("../../../../img/tarjetaFrente4.jpg"),
  require("../../../../img/tarjetaFrente5.jpg"),
  require("../../../../img/tarjetaFrente6.jpg"),
  require("../../../../img/tarjetaFrente7.jpg"),
  require("../../../../img/tarjetaFrente8.jpg"),
  require("../../../../img/tarjetaFrente9.jpg"),
  require("../../../../img/tarjetaFrente10.jpg"),
  require("../../../../img/tarjetaFrente11.jpg"),
];

const backImages = [
  require("../../../../img/tarjetaDetras1.jpg"),
  require("../../../../img/tarjetaDetras2.jpg"),
  require("../../../../img/tarjetaDetras3.jpg"),
  require("../../../../img/tarjetaDetras4.jpg"),
  require("../../../../img/tarjetaDetras5.jpg"),
  require("../../../../img/tarjetaDetras6.jpg"),
  require("../../../../img/tarjetaDetras7.jpg"),
];

  // -------------------------------------------
  // TARJETAS BASE
  // -------------------------------------------
  const tarjetasBase = [
    {
      id: "1",
      frente: "¿Qué es una tarjeta de crédito?",
      atras:
        "Una tarjeta de crédito es un medio de pago que permite al usuario utilizar dinero prestado por el banco para realizar compras.\n\nA diferencia de la de débito, el dinero no se descuenta de tu cuenta, sino que es un crédito que pagas después.\n\nSu uso responsable ayuda a construir un historial crediticio positivo para futuros préstamos.",
    },
    {
      id: "2",
      frente: "¿Cómo funciona?",
      atras:
        "Tienes un límite de crédito máximo para gastar. Al final del mes recibes un estado de cuenta con:\n\n• Fecha de corte: Resumen de compras.\n• Fecha de pago: Límite para pagar sin intereses.\n• Pago mínimo: Evita atrasos pero genera intereses.\n• Pago para no generar intereses: Cubre todo lo gastado.",
    },
    {
      id: "3",
      frente: "Débito vs Crédito",
      atras:
        "• Origen del dinero: Débito es tu dinero; Crédito es prestado.\n• Pago: Débito es inmediato; Crédito es al final del periodo.\n• Deuda: Débito no genera deuda; Crédito sí (intereses).\n• Historial: Solo la de crédito construye historial crediticio.\n• Riesgo: Mayor riesgo en crédito si no se administra bien.",
    },
    {
      id: "4",
      frente: "Ventajas",
      atras:
        "• Permite comprar a plazos sin tener todo el dinero al momento.\n• Crea historial crediticio para futuros proyectos.\n• Ofrece recompensas, puntos, millas o promociones.\n• Protección ante fraudes (el dinero no sale directo de tu cuenta).",
    },
    {
      id: "5",
      frente: "Riesgos y Tips",
      atras:
        "Un mal uso causa endeudamiento. Para una buena salud financiera:\n\n• Usa la tarjeta solo para gastos planeados.\n• Paga siempre el total (totalero) para evitar intereses.\n• No acumules muchas deudas.\n• Evita retirar efectivo (tiene comisiones altas).",
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
          onPress={() => navigation.navigate("PTarjetas1")}
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

// -------------------------------------------------------
// 🔥 COMPONENTE FLASHCARD con animación de FLIP
// -------------------------------------------------------
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
// --------------------- ESTILOS ---------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    justifyContent: "center",
    alignItems: "center",
  },

  cardWrapper: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: width * 0.85, // Un poco más ancho para que quepa bien el texto
    height: 450,         // Un poco más alto para la info detallada
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    position: "absolute",
  },

  cardFrente: { backgroundColor: "#415A77" },
  cardAtras: { backgroundColor: "#E0E1DD" },

  cardText: { 
    textAlign: "center", 
    fontSize: 24, 
    fontWeight: "bold",
    color: "#FFF" 
  },
  
  cardTextAtras: { 
    textAlign: "left", // Mejor lectura para listas
    fontSize: 16,      // Letra un poco más pequeña para que quepa todo
    color: "#000",
    lineHeight: 22     // Espaciado para legibilidad
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