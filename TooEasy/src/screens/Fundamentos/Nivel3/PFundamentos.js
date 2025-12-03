// Pantalla de preguntas de repaso para el nivel 3 de Fundamentos

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
  // Agrega aquí tus preguntas, respuestas y la correcta
  // ----------------------------------------------------------
  const preguntas = [
    {
      id: "1",
      pregunta: "La seguridad financiera significa tener mucho dinero ahorrado para poder gastar sin preocuparte.",
      opciones: [
        "VERDADERO",
        "FALSO"
      ],
      correcta: 1, // índice de la respuesta correcta
    },
    {
      id: "2",
      pregunta: "El fondo de emergencia sirve para cubrir gastos imprevistos, como una reparación o una emergencia médica.",
      opciones: [
        "VERDADERO",
        "FALSO"
      ],
      correcta: 0,
    },
    {
      id: "3",
      pregunta: "¿Cuál es el principal propósito del fondo de emergencia?",
      opciones: [
        "Ahorrar para vacaciones o regalos.",
        "Invertir en la bolsa de valores.",
        "Guardar efectivo para gastos diarios.",
        "Tener dinero para emergencias o gastos imprevistos.",
      ],
      correcta: 3,
    },
    {
      id: "4",
      pregunta: "¿Cuántos meses de gastos fijos debería cubrir idealmente un fondo de emergencia?",
      opciones: [
        "1 a 2 meses.",
        "6 a 12 meses.",
        "3 a 6 meses.",
        "Más de 12 meses.",
      ],
      correcta: 2,
    },
    {
      id: "5",
      pregunta: "El fondo de emergencia debe guardarse junto con el dinero del día a día, para poder usarlo fácilmente cuando se necesite.",
      opciones: [
        "VERDADERO",
        "FALSO"
      ],
      correcta: 1,
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
