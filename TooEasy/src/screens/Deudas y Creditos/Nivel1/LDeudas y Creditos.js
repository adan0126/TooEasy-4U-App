import React, { useRef, useState , useMemo} from "react";
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

// 🛑 El nombre del componente ha sido cambiado a DeudasyCreditosLeccionScreen
export default function DeudasyCreditosLeccionScreen({ navigation }) {
  // -------------------------------------------
  // Aquí defines las tarjetas de la lección
  // (Información actualizada: Criterios de las Instituciones Financieras)
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
            onPress={() => navigation.navigate("PDeudasyCreditos1")}
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
// 🔥 COMPONENTE FLASHCARD con animación de FLIP (Sin cambios)
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

// --------------------- ESTILOS --------------------- (Sin cambios)
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