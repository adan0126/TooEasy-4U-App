// src/screens/CuentasBancarias/Nivel1/LCuentasBancarias.js
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

// ---------------- IMÁGENES AUTOMÁTICAS ----------------
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

const randomImage = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function AdminDineroLeccionNivel1({ navigation }) {
  // -------- TARJETAS BASE (solo texto) --------
  const baseTarjetas = [
    {
      id: "1",
      frente: "¿Por qué es importante organizar tu sueldo?",
      atras:
        "Si no planeas en qué usarás tu sueldo, el dinero se va sin que notes en qué. Organizarlo te ayuda a cubrir primero tus necesidades, separar una parte para ahorro o deudas y después destinar algo a gustos. Así evitas quedarte sin dinero a mitad de mes.",
    },
    {
      id: "2",
      frente: "¿Qué es el principio de dividir ingresos?",
      atras:
        "Es la idea de separar tu ingreso en partes con diferentes propósitos desde que lo recibes. En lugar de gastar y ver qué sobra, decides de forma consciente cuánto va a necesidades, cuánto a deseos y cuánto a ahorro o deudas. Es la base de muchas reglas de presupuesto.",
    },
    {
      id: "3",
      frente: "Categorías básicas al dividir tu sueldo",
      atras:
        "Al dividir tu ingreso puedes pensar en tres grandes grupos: 1) Necesidades: renta, comida, transporte, servicios. 2) Deseos: salidas, ropa, entretenimiento, hobbies. 3) Ahorro y pago de deudas: dinero guardado para el futuro o para liquidar lo que debes.",
    },
    {
      id: "4",
      frente: "Cómo aplicar el principio paso a paso",
      atras:
        "Primero identifica tu ingreso neto real, es decir, lo que sí llega a tu cuenta. Después haz una lista de tus gastos esenciales. Luego define cuánto quieres destinar a deseos. Finalmente aparta un porcentaje fijo para ahorro o pago de deudas y revisa cada mes si necesitas ajustar.",
    },
    {
      id: "5",
      frente: "Ejemplo: organizando un sueldo de $10,000",
      atras:
        "Imagina que recibes $10,000 al mes. Podrías separar una parte para renta y servicios, otra para transporte y comida, otra para salidas y gustos, y al menos un 20 % ($2,000) para ahorro o deudas. Lo importante no es la cifra exacta, sino que tengas un plan claro desde el inicio.",
    },
    {
      id: "6",
      frente: "Ventajas y retos de organizar tu dinero",
      atras:
        "Las ventajas son tener más control, evitar gastos impulsivos y contar con un respaldo para emergencias. El reto principal es ser constante: respetar lo que asignaste a cada categoría y no usar el dinero de ahorro para cubrir deseos de último momento.",
    },
  ];

  // ---- GENERAR TARJETAS CON IMÁGENES ALEATORIAS ----
  const tarjetas = useMemo(() => {
    return baseTarjetas.map((t) => ({
      ...t,
      imagenFrente: randomImage(frontImages),
      imagenAtras: randomImage(backImages),
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
            imgFrente={item.imagenFrente}
            imgAtras={item.imagenAtras}
          />
        )}
      />

      {indexActual === tarjetas.length - 1 && (
        <TouchableOpacity
          style={styles.btnRepaso}
          onPress={() => navigation.navigate("PAdminDinero1")}
        >
          <Text style={styles.btnRepasoTxt}>Preguntas de Repaso</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.btnRegresar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.btnRegresarTxt}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

// ----------------- FLASHCARD -----------------
function FlashCard({ frente, atras, imgFrente, imgAtras }) {
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
    }).start(() => setLadoFrente(!ladoFrente));
  };

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity activeOpacity={1} onPress={flipCard}>
        {/* Frente */}
        <Animated.View
          style={[
            styles.card,
            { transform: [{ rotateY: rotacionFrente }] },
            { opacity: ladoFrente ? 1 : 0 },
          ]}
        >
          <Image source={imgFrente} style={styles.img} />
          <Text style={styles.cardText}>{frente}</Text>
        </Animated.View>

        {/* Atrás */}
        <Animated.View
          style={[
            styles.card,
            { transform: [{ rotateY: rotacionAtras }] },
            { opacity: ladoFrente ? 0 : 1 },
          ]}
        >
          <Image source={imgAtras} style={styles.img} />
          <Text style={styles.cardTextAtras}>{atras}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

// ----------------- ESTILOS -----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    justifyContent: "center",
    alignItems: "center",
  },
  cardWrapper: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.8,
    height: 350,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    position: "absolute",
    backgroundColor: "#FFF",
  },
  img: {
    width: "100%",
    height: 160,
    resizeMode: "contain",
    marginBottom: 10,
  },
  cardText: {
    textAlign: "center",
    fontSize: 20,
    color: "#000",
  },
  cardTextAtras: {
    textAlign: "center",
    fontSize: 18,
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
