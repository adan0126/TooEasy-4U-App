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

  // ----------------------------------------------------------------------
  // 🖼️ AUTOMATIZACIÓN DE IMÁGENES (.jpg)
  // ----------------------------------------------------------------------

  // Carga automática de 11 imágenes para el frente
  const imagenesFrente = useMemo(() => {
    return [
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
  }, []);

  // Carga automática de 7 imágenes para el reverso
  const imagenesAtras = useMemo(() => {
    return [
      require("../../../../assets/tarjetaDetras1.png"),
      require("../../../../assets/tarjetaDetras2.png"),
      require("../../../../assets/tarjetaDetras3.png"),
      require("../../../../assets/tarjetaDetras4.png"),
      require("../../../../assets/tarjetaDetras5.png"),
      require("../../../../assets/tarjetaDetras6.png"),
      require("../../../../assets/tarjetaDetras7.png"),
    ];
  }, []);

  // ----------------------------------------------------------------------
  // ▶️ TARJETAS (Ahora asignan imágenes automáticamente)
  // ----------------------------------------------------------------------

  const tarjetasBase = [
    { frente: "¿Qué son los intereses?", atras: "Son el costo del dinero..." },
    { frente: "¿Cuándo pagas intereses?", atras: "Cuando el banco te presta dinero." },
    { frente: "¿Cuándo recibes intereses?", atras: "Cuando ahorras o inviertes." },
    { frente: "¿Qué es el interés activo?", atras: "Interés que cobra el banco." },
    { frente: "¿Qué es el interés pasivo?", atras: "Interés que te paga el banco." },
    { frente: "¿Qué es el interés simple?", atras: "Solo sobre el capital inicial." },
    { frente: "¿Qué es el interés compuesto?", atras: "Sobre capital + intereses." },
    { frente: "¿Qué son las comisiones bancarias?", atras: "Cobros por servicios." },
    { frente: "¿Por qué cobran comisiones?", atras: "Para operar y mantener servicios." },
    { frente: "¿Qué es comisión por manejo de cuenta?", atras: "Cobro fijo por tener cuenta." },
    { frente: "¿Qué es comisión por inactividad?", atras: "Cobro por no usar la cuenta." },
    { frente: "¿Qué es comisión por cajeros externos?", atras: "Cobro por cajeros de otro banco." },
    { frente: "¿Qué es comisión por saldo mínimo?", atras: "Cobro por bajar el saldo mínimo." },
    { frente: "¿Cómo evitar comisiones?", atras: "Usa cajeros y cuentas adecuadas." },
    { frente: "¿Por qué es importante conocer intereses?", atras: "Para elegir bien productos." },
  ];

  // Combina textos + imágenes
  const tarjetas = useMemo(() => {
    return tarjetasBase.map((t, i) => ({
      id: (i + 1).toString(),
      frente: t.frente,
      atras: t.atras,
      imagenFrente: imagenesFrente[i % imagenesFrente.length], // 11 imágenes → se repiten
      imagenAtras: imagenesAtras[i % imagenesAtras.length],     // 7 imágenes → se repiten
    }));
  }, [tarjetasBase, imagenesFrente, imagenesAtras]);

  const [indexActual, setIndexActual] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={tarjetas}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndexActual(index);
        }}
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
          onPress={() => navigation.navigate("PCuentasBancarias3")}
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


// -------------------------------------------------------
// 🔥 COMPONENTE FLASHCARD con animación + imágenes
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
    }).start(() => setLadoFrente(!ladoFrente));
  };

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity activeOpacity={1} onPress={flipCard}>

        {/* Frente */}
        <Animated.View
          style={[
            styles.card,
            styles.cardFrente,
            { transform: [{ rotateY: rotacionFrente }], opacity: ladoFrente ? 1 : 0 },
          ]}
        >
          {imagenFrente && (
            <Image source={imagenFrente} style={styles.img} resizeMode="contain" />
          )}
          <Text style={styles.cardText}>{frente}</Text>
        </Animated.View>

        {/* Reverso */}
        <Animated.View
          style={[
            styles.card,
            styles.cardAtras,
            { transform: [{ rotateY: rotacionAtras }], opacity: ladoFrente ? 0 : 1 },
          ]}
        >
          {imagenAtras && (
            <Image source={imagenAtras} style={styles.img} resizeMode="contain" />
          )}
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
    minHeight: 300,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backfaceVisibility: "hidden",
    position: "absolute",
  },
  img: {
    width: "70%",
    height: 140,
    marginBottom: 15,
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