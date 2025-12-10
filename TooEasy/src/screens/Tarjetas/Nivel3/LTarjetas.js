import React, { useRef, useState,useMemo } from "react";
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
  // (Información actualizada: Tarjetas Oro y Platino)
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
      frente: "Oro y Platino: Introducción",
      atras:
        "Las tarjetas de crédito Oro y Platino representan niveles más altos dentro de las categorías de crédito.\n\nEstán diseñadas para personas con mayor capacidad económica, buen historial crediticio y necesidades financieras más amplias.\n\nEstas tarjetas ofrecen límites de crédito elevados y beneficios exclusivos, pero también suelen implicar comisiones más altas.",
    },
    {
      id: "2",
      frente: "Tarjeta Oro: Características",
      atras:
        "1. Tarjeta Oro\nLas tarjetas Oro son una evolución de las tarjetas clásicas. Están pensadas para usuarios con ingresos medios-altos que buscan beneficios adicionales sin llegar a los niveles más exclusivos.\nCaracterísticas principales:\n• Límite de crédito alto.\n• Programas de recompensas y puntos por compras.\n• Promociones especiales en viajes, restaurantes o entretenimiento.\n• Seguros incluidos, como protección de compras y asistencia en viajes.\n• Comisión anual más elevada que las tarjetas básicas o clásicas.\nVentajas:\n• Mayor flexibilidad para gastos grandes.\n• Acceso a beneficios y descuentos exclusivos.\n• Mejora del historial crediticio con un buen manejo.",
    },
    {
      id: "3",
      frente: "Uso de la Tarjeta Oro",
      atras:
        "Recomendaciones para el uso de una Tarjeta Oro:\n• Úsala con disciplina, ya que los límites altos pueden llevar a gastar más de lo necesario.\n• Aprovecha las recompensas y beneficios, pero paga el total mensual para evitar intereses.\n• Evalúa si los beneficios realmente compensan la comisión anual.\n• Mantén un registro de tus gastos para no exceder tu presupuesto.",
    },
    {
      id: "4",
      frente: "Tarjeta Platino: Servicios Premium",
      atras:
        "2. Tarjeta Platino\nLas tarjetas Platino son productos premium que ofrecen servicios exclusivos y atención preferente.\nEstán dirigidas a personas con ingresos altos y excelente comportamiento crediticio.\nCaracterísticas principales:\n• Límite de crédito muy elevado.\n• Programas de recompensas premium y acceso a salas VIP en aeropuertos.\n• Seguros de viaje, asistencia médica internacional y protección contra fraudes.\n• Servicios personalizados (por ejemplo, concierge o atención preferente).\n• Comisión anual considerablemente mayor que otros niveles.\nVentajas:\n• Amplio respaldo financiero y beneficios internacionales.\n• Ideal para quienes viajan con frecuencia o realizan compras de alto valor.\n• Refuerza la reputación crediticia ante las instituciones financieras.",
    },
    {
      id: "5",
      frente: "Diferencias y Consejos",
      atras:
        "Diferencias entre Tarjeta Oro y Tarjeta Platino:\n• Límite de crédito: Alto (Oro) / Muy alto (Platino).\n• Ingreso requerido: Medio-alto (Oro) / Alto (Platino).\n• Beneficios: Recompensas y seguros básicos (Oro) / Servicios premium y atención personalizada (Platino).\n• Comisión anual: Moderada (Oro) / Alta (Platino).\n• Usuario ideal: Personas con finanzas estables (Oro) / Personas con alto poder adquisitivo y uso frecuente (Platino).\nRecomendaciones generales:\n• Asegúrate de que los beneficios compensen el costo anual.\n• Mantén un uso responsable del crédito para no comprometer tus finanzas personales.\n• No solicites una tarjeta de nivel superior solo por estatus; úsala solo si se adapta a tus necesidades financieras.",
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
          onPress={() => navigation.navigate("PTarjetas3")}
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

  const estiloFrente = {
    transform: [{ rotateY: rotacionFrente }, { perspective: 1000 }],
    opacity: ladoFrente ? 1 : 0,
  };

  const estiloAtras = {
    transform: [{ rotateY: rotacionAtras }, { perspective: 1000 }],
    opacity: ladoFrente ? 0 : 1,
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
    height: 450, // Un poco más alto para la info detallada
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
    fontSize: 16, // Letra un poco más pequeña para que quepa todo
    color: "#000",
    lineHeight: 22 // Espaciado para legibilidad
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