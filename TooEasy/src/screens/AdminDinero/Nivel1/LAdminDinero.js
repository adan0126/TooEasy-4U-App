// src/screens/CuentasBancarias/Nivel1/LCuentasBancarias.js
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function AdminDineroLeccionNivel1({ navigation }) {
  const tarjetas = [
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


  const [indexActual, setIndexActual] = useState(0);

  const handleScroll = (e) => {
    const nuevoIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndexActual(nuevoIndex);
  };

  return (
    <View style={styles.container}>
      {tarjetas.length === 0 && (
        <Text style={styles.msgVacio}>
          Aquí aún no hay tarjetas cargadas.  
          Cuando tengas el contenido, agrégalo en el arreglo "tarjetas".
        </Text>
      )}

      <FlatList
        data={tarjetas}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <FlashCard frente={item.frente} atras={item.atras} />
        )}
      />

      {/* Botón para ir a preguntas de repaso solo si hay tarjetas */}
      {tarjetas.length > 0 && indexActual === tarjetas.length - 1 && (
        <TouchableOpacity
          style={styles.btnRepaso}
          onPress={() => navigation.navigate("PAdminDinero1")}
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
function FlashCard({ frente, atras }) {
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
        {/* Frente */}
        <Animated.View
          style={[
            styles.card,
            styles.cardFrente,
            {
              transform: [{ rotateY: rotacionFrente }],
              opacity: ladoFrente ? 1 : 0,
            },
          ]}
        >
          <Text style={styles.cardText}>{frente}</Text>
        </Animated.View>

        {/* Reverso */}
        <Animated.View
          style={[
            styles.card,
            styles.cardAtras,
            {
              transform: [{ rotateY: rotacionAtras }],
              opacity: ladoFrente ? 0 : 1,
            },
          ]}
        >
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
