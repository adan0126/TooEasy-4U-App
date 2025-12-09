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

export default function TarjetasLeccionScreen({ navigation }) {
  // -------------------------------------------
  // Aquí defines las tarjetas de la lección
  // (Información actualizada: Tipos de Tarjetas de Crédito)
  // -------------------------------------------
  const tarjetas = [
    {
      id: "1",
      frente: "Clasificación de Tarjetas",
      atras:
        "Las tarjetas de crédito se clasifican en distintos tipos según los beneficios que ofrecen, el nivel de ingresos del cliente y los servicios adicionales que incluyen.\n\nEl tipo de tarjeta que una persona puede obtener depende de su capacidad de pago, su historial crediticio y la relación con el banco o institución financiera.",
    },
    {
      id: "2",
      frente: "Tarjeta de Crédito Básica",
      atras:
        "1. Tarjeta de crédito básica\nLas tarjetas básicas son las más comunes y accesibles. Están pensadas para personas que comienzan a usar crédito por primera vez o que desean mantener un control sencillo de sus gastos.\nCaracterísticas principales:\n• No exigen un ingreso muy alto para solicitarla.\n• Ofrecen un límite de crédito bajo o moderado.\n• No suelen tener programas de recompensas ni beneficios premium.\n• Cobran comisiones e intereses más simples y transparentes.\n• Son ideales para construir un historial crediticio responsable.\nVentajas:\n• Fácil aprobación.\n• Ideal para usuarios nuevos.\n• Permite aprender a manejar el crédito sin riesgo de endeudamiento excesivo.",
    },
    {
      id: "3",
      frente: "Tarjeta de Crédito Clásica",
      atras:
        "2. Tarjeta de crédito clásica\nLas tarjetas clásicas representan un nivel intermedio. Ofrecen más beneficios que las básicas y están dirigidas a personas con ingresos estables y cierto historial financiero.\nCaracterísticas:\n• Límite de crédito mayor.\n• Pueden incluir programas de puntos, cashback o seguros básicos.\n• Requieren comprobar ingresos y buen comportamiento crediticio.\n• Cobran una comisión anual moderada.\nVentajas:\n• Acceso a promociones y descuentos.\n• Posibilidad de mejorar el puntaje crediticio.\n• Más flexibilidad para compras y pagos a plazos.",
    },
    {
      id: "4",
      frente: "Tarjetas Departamentales",
      atras:
        "3. Tarjetas departamentales\nLas tarjetas departamentales son emitidas por tiendas o comercios específicos (por ejemplo, Liverpool, Sears, Coppel, etc.).\nPermiten comprar dentro de esa tienda y, en algunos casos, en comercios afiliados.\nCaracterísticas:\n• No siempre están respaldadas por un banco.\n• Solo pueden usarse en las tiendas de la marca o sus asociadas.\n• Suelen ofrecer descuentos, meses sin intereses o promociones exclusivas.\n• Los intereses pueden ser más altos si no se paga a tiempo.\nVentajas:\n• Facilitan el acceso al crédito sin necesidad de una cuenta bancaria.\n• Promociones frecuentes para clientes habituales.\n• Son una buena forma de iniciar el historial crediticio.",
    },
    {
      id: "5",
      frente: "Recomendaciones Generales",
      atras:
        "Recomendaciones generales:\n• Compara las opciones antes de solicitar una tarjeta. Analiza tasas, comisiones y beneficios.\n• Usa la tarjeta adecuada para tu situación. Si estás iniciando, comienza con una básica.\n• Evita tener muchas tarjetas a la vez. Demasiadas líneas de crédito pueden afectar tu historial.\n• Paga puntualmente. Retrasos o saldos altos afectan tu score crediticio.",
    },
  ];

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
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIndexActual(index);
        }}
        renderItem={({ item }) => (
          <FlashCard frente={item.frente} atras={item.atras} />
        )}
      />

      {/* 🌟 SOLO aparece al finalizar todas las tarjetas */}
      {/* 🛑 Se ha cambiado la navegación a "PTarjetas4" */}
      {indexActual === tarjetas.length - 1 && (
        <TouchableOpacity
          style={styles.btnRepaso}
          onPress={() => navigation.navigate("PTarjetas4")}
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
        {/* Frente */}
        {ladoFrente && (
          <Animated.View
            style={[
              styles.card,
              styles.cardFrente,
              estiloFrente,
            ]}
          >
            <Text style={styles.cardText}>{frente}</Text>
          </Animated.View>
        )}

        {/* Reverso */}
        {!ladoFrente && (
          <Animated.View
            style={[
              styles.card,
              styles.cardAtras,
              estiloAtras,
              { position: 'absolute' },
            ]}
          >
            {/* Ajuste de estilo para texto largo en el reverso */}
            <Text style={styles.cardTextAtras}>{atras}</Text>
          </Animated.View>
        )}
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