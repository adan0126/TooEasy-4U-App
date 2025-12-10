// Pantalla de flashcards para los fundamentos

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

export default function FundamentosLeccionScreen({ navigation }) {
  // -------------------------------------------
  // Aquí defines las tarjetas de la lección
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
      frente: "Mi seguridad financiera",
      atras:
        "La seguridad financiera se refiere a la tranquilidad de saber que puedes cubrir tus necesidades básicas y enfrentar imprevistos sin depender de préstamos, tarjetas o de otras personas. No significa tener mucho dinero, sino administrar bien lo que tienes y planear para el futuro.",
    },
    {
      id: "2",
      frente: "¿Qué es un fondo de emergencia?",
      atras:
        "Un fondo de emergencia es una reserva de dinero separada del resto de tus ahorros, destinada exclusivamente a cubrir gastos imprevistos o urgencias. Por ejemplo: Reparaciones del hogar o del automóvil, gastos médicos no planeados, pérdida de empleo o emergencias familiares.",
    },
    {
      id: "3",
      frente: "¿Cuánto dinero debe tener mi fondo de emergencias?",
      atras:
        "Según BBVA (2024), el fondo ideal debería cubrir entre 3 y 6 meses de tus gastos fijos mensuales. Esto significa que, si tus gastos básicos (renta, comida, transporte, servicios) suman $8,000 pesos al mes, tu fondo de emergencia debería ser entre $24,000 y $48,000 pesos. No es necesario reunirlo de inmediato. Puedes empezar con pequeñas cantidades mensuales y hacerlo crecer poco a poco.",
    },
    {
      id: "4",
      frente: "¿Dónde guardar el fondo de emergencia?",
      atras:
        "Es importante mantenerlo en un lugar seguro y accesible, pero que no te invite a gastarlo fácilmente. Como: Una cuenta de ahorro de fácil acceso: Ideal si necesitas disponer del dinero rápido, pero sin mezclarlo con tu cuenta principal; o algunos instrumentos de inversión de bajo riesgo: Algunos bancos ofrecen opciones que generan un pequeño rendimiento sin comprometer la liquidez, como cuentas de ahorro con intereses o CETES.",
    },
    {
      id: "5",
      frente: "Características de una persona con seguridad financiera",
      atras:
        "Una persona con seguridad financiera: Tiene control sobre sus ingresos y gastos, cuenta con ahorros para emergencias, Evita deudas innecesarias y se siente tranquila al tomar decisiones económicas.",
    },
    {
      id: "6",
      frente: "Beneficios de tener un fondo de emergencia",
      atras:
        "Algunos de los beneficios de un fondo de emergencia son: La tranquilidad ante cualquier imprevisto, evitas endeudarte con préstamos o tarjetas, te permite mantener tus metas de ahorro sin interrumpirlas y	fomenta la disciplina financiera",
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
          onPress={() => navigation.navigate("PFundamentos3")}
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
    width: width * 0.8,
    height: 300,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    position: "absolute",
  },

  cardFrente: { backgroundColor: "#415A77" },
  cardAtras: { backgroundColor: "#E0E1DD" },

  cardText: { textAlign: "center", fontSize: 22, color: "#FFF" },
  cardTextAtras: { textAlign: "center", fontSize: 20, color: "#000" },

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
