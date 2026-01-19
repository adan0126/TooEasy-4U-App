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

// Imagenes disponibles
export default function FundamentosLeccionScreen({ navigation }) {
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

  const tarjetas = useMemo(() => {
    return tarjetasBase.map((t, i) => ({
      ...t,
      imagenFrente: frontImages[i % frontImages.length],
      imagenAtras: backImages[i % backImages.length],
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
          <FlashCard {...item} />
        )}
      />

      {indexActual === tarjetasBase.length - 1 && (
        <TouchableOpacity
          style={styles.btnRepaso}
          onPress={() => navigation.navigate("PTarjetas3")}
        >
          <Text style={styles.btnRepasoTxt}>Preguntas de Repaso</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.btnRegresar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnTxt}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

function FlashCard({ frente, atras, imagenFrente, imagenAtras }) {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const frontRotate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backRotate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const flip = () => {
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setIsFlipped(!isFlipped));
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={flip}
        style={styles.touch}
      >
        {/* FRENTE */}
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ perspective: 1000 }, { rotateY: frontRotate }],
            },
          ]}
        >
          <Image source={imagenFrente} style={styles.img} />
          <Text style={styles.textFront}>{frente}</Text>
        </Animated.View>

        {/* ATRÁS */}
        <Animated.View
          style={[
            styles.card,
            styles.back,
            {
              transform: [{ perspective: 1000 }, { rotateY: backRotate }],
            },
          ]}
        >
          <Image source={imagenAtras} style={styles.img} />
          <Text style={styles.textBack}>{atras}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

// ========================== ESTILOS ==========================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
  },

  item: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  touch: {
    width: width * 0.8,
    height: 420,
  },

  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    backgroundColor: "#415A77",
  },

  back: {
    backgroundColor: "#E0E1DD",
  },

  img: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    marginBottom: 16,
  },

  textFront: {
    color: "#FFF",
    fontSize: 22,
    textAlign: "center",
  },

  textBack: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },

  btnRegresar: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#778DA9",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 10,
  },

  btnTxt: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  btnRepaso: {
    position: "absolute",
    bottom: 110,
    alignSelf: "center",
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

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
