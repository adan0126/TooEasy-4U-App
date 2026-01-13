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

export default function AdminDineroLeccionNivel2({ navigation }) {
  // -------------------------------------------
  // IMÁGENES DISPONIBLES
  // -------------------------------------------
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
      frente: "¿Qué es la regla 50/30/20?",
      atras:
        "Es un método sencillo para organizar el presupuesto mensual. Propone usar aproximadamente 50 % del ingreso para necesidades básicas, 30 % para deseos o gastos personales y 20 % para ahorro o pago de deudas. No es rígida, pero sirve como guía inicial.",
    },
    {
      id: "2",
      frente: "50 % para necesidades básicas",
      atras:
        "En esta parte entran los gastos que sí o sí debes cubrir: renta o vivienda, alimentos, transporte, servicios básicos, salud y otros compromisos indispensables. La idea es que estas obligaciones no superen la mitad de tu ingreso, para que tengas margen para lo demás.",
    },
    {
      id: "3",
      frente: "30 % para deseos o gastos personales",
      atras:
        "Aquí se incluyen actividades y compras que mejoran tu calidad de vida, pero que no son esenciales: salidas, ropa extra, entretenimiento, hobbies, antojos, plataformas de streaming, etc. Tener un porcentaje definido evita sentir culpa y también gastar de más.",
    },
    {
      id: "4",
      frente: "20 % para ahorro o pago de deudas",
      atras:
        "Este porcentaje se destina a construir un fondo de ahorro, invertir o reducir deudas. Aunque al inicio parezca poco, ser constante con ese 20 % te ayuda a crear un respaldo ante emergencias y avanzar en metas financieras a mediano y largo plazo.",
    },
    {
      id: "5",
      frente: "Cómo aplicar la regla 50/30/20 paso a paso",
      atras:
        "Calcula tu ingreso neto mensual. Después, suma tus gastos básicos y verifica si están cerca del 50 %. Luego define cuánto usarás para deseos (hasta el 30 %). Finalmente aparta al menos el 20 % para ahorro o deudas. Si las proporciones no encajan, ajusta poco a poco.",
    },
    {
      id: "6",
      frente: "Ejemplo: sueldo de $12,000 con la regla 50/30/20",
      atras:
        "Con un ingreso neto de $12,000 al mes, la regla propone algo como: $6,000 para necesidades, $3,600 para deseos y $2,400 para ahorro o deudas. Los montos pueden cambiar, pero el objetivo es mantener un equilibrio entre vivir el presente y cuidar tu futuro financiero.",
    },
  ];

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
          onPress={() => navigation.navigate("PAdminDinero2")}
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
