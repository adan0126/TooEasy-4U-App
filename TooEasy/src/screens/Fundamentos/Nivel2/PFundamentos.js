// Pantalla de preguntas de repaso para el nivel 2 de Fundamentos

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

export default function PreguntasRepasoScreen({ navigation }) {
  // ----------------------------------------------------------
  // ARRAY DE PREGUNTAS
  // ----------------------------------------------------------
  const preguntas = [
    {
      id: "1",
      pregunta: "El ahorro es la parte del ingreso que decides no gastar hoy para usar en el futuro.",
      opciones: [
        "VERDADERO",
        "FALSO",
      ],
      correcta: 0,
    },
    {
      id: "2",
      pregunta: "Ahorrar significa dejar de disfrutar y no gastar nunca en gustos o entretenimiento.",
      opciones: [
        "VERDADERO",
        "FALSO"
      ],
      correcta: 1,
    },
    {
      id: "3",
      pregunta: "¿Cuál de las siguientes afirmaciones describe mejor la importancia del ahorro?",
      opciones: [
        "Permite gastar más en entretenimiento.",
        "Es una forma de evitar pagar impuestos.",
        "Ayuda a mantener estabilidad financiera y cumplir metas.",
        "Solo es necesario cuando se tienen ingresos altos."
      ],
      correcta: 2,
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
      navigation.navigate("FMenu"); // Finaliza
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Preguntas de Repaso</Text>

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
