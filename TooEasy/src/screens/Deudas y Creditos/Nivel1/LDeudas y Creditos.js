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
      frente: "Criterios de Evaluación Crediticia",
      atras:
        "Criterios de las instituciones financieras\n\nAntes de aprobar un préstamo o una línea de crédito, las instituciones financieras analizan una serie de factores que les permiten determinar si una persona o empresa tiene la capacidad y la responsabilidad necesarias para cumplir con los pagos.\n\nEste proceso se conoce como evaluación crediticia, y su objetivo principal es reducir el riesgo de impago.",
    },
    {
      id: "2",
      frente: "Historial Crediticio",
      atras:
        "Historial crediticio\n\nEs el registro del comportamiento de pago del solicitante. Incluye información sobre créditos anteriores, pagos puntuales o atrasados, y el nivel de endeudamiento actual.\n\nUn buen historial demuestra responsabilidad y aumenta las posibilidades de aprobación. Por el contrario, atrasos o incumplimientos pueden limitar el acceso a nuevos créditos o incrementar las tasas de interés.",
    },
    {
      id: "3",
      frente: "Capacidad de Pago",
      atras:
        "Capacidad de pago\n\nSe refiere a la proporción de los ingresos que una persona puede destinar al pago de deudas sin comprometer sus necesidades básicas.\n\nLos bancos revisan el salario, ingresos adicionales y gastos mensuales para determinar si el solicitante podrá asumir el compromiso financiero sin riesgo de sobreendeudamiento.",
    },
    {
      id: "4",
      frente: "Estabilidad Laboral",
      atras:
        "Estabilidad laboral\n\nLa antigüedad y el tipo de empleo son indicadores de seguridad económica.\n\nLas instituciones financieras prefieren otorgar créditos a personas con trabajos formales, ingresos constantes y antigüedad laboral comprobable, ya que esto reduce la probabilidad de incumplimiento.",
    },
    {
      id: "5",
      frente: "Relación con el Banco",
      atras:
        "Relación con el banco\n\nLos clientes que mantienen una buena relación con su institución financiera (por ejemplo, mediante cuentas de ahorro, inversiones o créditos previos bien manejados) suelen tener mayores facilidades para obtener nuevos préstamos.\n\nLa confianza construida a lo largo del tiempo juega un papel importante en las decisiones de aprobación.",
    },
    {
      id: "6",
      frente: "Garantías o Avales",
      atras:
        "Garantías o avales\n\nEn algunos casos, se solicitan bienes o personas que respalden el crédito.\n\nLas garantías (como una propiedad o un vehículo) o los avales (personas que se comprometen a pagar si el titular no lo hace) representan una seguridad adicional para el banco en caso de incumplimiento.",
    },
    {
      id: "7",
      frente: "Recomendaciones",
      atras:
        "Recomendaciones para obtener un préstamo\n• Mantén un historial crediticio positivo y revisa tu reporte con regularidad.\n• No acumules deudas innecesarias ni excedas tu capacidad de pago.\n• Presenta comprobantes de ingresos actualizados y verificables.\n• Solicita únicamente la cantidad que realmente necesitas y que podrás pagar.\n• Conserva estabilidad en tu empleo y evita cambios laborales frecuentes antes de solicitar un crédito.\n• Ahorra y demuestra capacidad de planificación financiera, ya que los bancos valoran a los clientes con hábitos responsables.",
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
          onPress={() => navigation.navigate("PDeudasyCreditos1")}
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
