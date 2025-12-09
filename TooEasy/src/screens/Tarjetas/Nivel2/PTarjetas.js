import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function PreguntasRepasoScreen({ navigation }) {
  // ----------------------------------------------------------
  // ARRAY DE PREGUNTAS (ACTUALIZADO: TARJETAS DE DÉBITO)
  // ----------------------------------------------------------
  const preguntas = [
    {
      id: "1",
      pregunta: "¿Qué es una tarjeta de débito?",
      opciones: [
        "Una tarjeta que te permite gastar dinero prestado por el banco.",
        "Una tarjeta vinculada a una cuenta bancaria, que descuenta el dinero directamente al usarla.",
        "Una tarjeta que solo sirve para compras en línea."
      ],
      correcta: 1, // Equivale a la opción B
    },
    {
      id: "2",
      pregunta: "¿Qué sucede si intentas pagar con tu tarjeta de débito y no tienes suficiente saldo en tu cuenta?",
      opciones: [
        "El banco te da crédito temporal.",
        "La operación se cancela porque no hay fondos suficientes.",
        "El pago se completa y el saldo queda negativo."
      ],
      correcta: 1, // Equivale a la opción B
    },
    {
      id: "3",
      pregunta: "Una ventaja principal de la tarjeta de débito es que evita endeudarte. Verdadero o falso:",
      opciones: [
        "Verdadero",
        "Falso"
      ],
      correcta: 0, // Equivale a la opción A (Verdadero)
    },
    {
      id: "4",
      pregunta: "¿Cuál de las siguientes acciones es una buena práctica de seguridad al usar tu tarjeta de débito?",
      opciones: [
        "Compartir tu PIN con alguien de confianza.",
        "Revisar tus estados de cuenta con frecuencia.",
        "Guardar tu tarjeta y tu NIP juntos por comodidad."
      ],
      correcta: 1, // Equivale a la opción B
    },
    {
      id: "5",
      pregunta: "¿Qué característica distingue a una tarjeta de débito de una de crédito?",
      opciones: [
        "Permite gastar más de lo que tienes disponible.",
        "Está vinculada directamente a una cuenta bancaria.",
        "Genera intereses sobre tus compras."
      ],
      correcta: 1, // Equivale a la opción B
    },
  ];

  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

  const preguntaActual = preguntas[preguntaIndex];

  const seleccionarRespuesta = (idx) => {
    if (respuestaSeleccionada !== null) return;

    setRespuestaSeleccionada(idx);
    setRespuestaCorrecta(preguntaActual.correcta);
  };

  const siguientePregunta = () => {
    if (preguntaIndex + 1 < preguntas.length) {
      setPreguntaIndex(preguntaIndex + 1);
      setRespuestaSeleccionada(null);
      setRespuestaCorrecta(null);
    } else {
      navigation.navigate("TMenu"); // Finaliza y vuelve al menú
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Repaso: Tarjeta de Débito</Text>

      <Text style={styles.pregunta}>{preguntaActual.pregunta}</Text>

      {preguntaActual.opciones.map((opcion, idx) => {
        const esSeleccionada = idx === respuestaSeleccionada;
        const esCorrecta = idx === respuestaCorrecta;

        let estiloOpcion = styles.opcion;

        if (respuestaSeleccionada !== null) {
          if (esCorrecta) estiloOpcion = styles.correcta;
          else if (esSeleccionada) estiloOpcion = styles.incorrecta;
        }

        return (
          <TouchableOpacity
            key={idx}
            style={estiloOpcion}
            onPress={() => seleccionarRespuesta(idx)}
          >
            <Text style={styles.opcionTxt}>{opcion}</Text>
          </TouchableOpacity>
        );
      })}

      {respuestaSeleccionada !== null && (
        <TouchableOpacity
          style={styles.btnContinuar}
          onPress={siguientePregunta}
        >
          <Text style={styles.btnContinuarTxt}>
            {preguntaIndex + 1 < preguntas.length
              ? "Siguiente"
              : "Terminar"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ---------------------- ESTILOS ----------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    padding: 20,
    justifyContent: "center",
  },

  titulo: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },

  pregunta: {
    color: "#E0E1DD",
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
  },

  opcion: {
    backgroundColor: "#415A77",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },

  correcta: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },

  incorrecta: {
    backgroundColor: "#E63946",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },

  opcionTxt: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
  },

  btnContinuar: {
    marginTop: 20,
    backgroundColor: "#1B263B",
    padding: 14,
    borderRadius: 10,
  },

  btnContinuarTxt: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});