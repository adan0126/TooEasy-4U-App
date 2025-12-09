import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function PreguntasRepasoScreen({ navigation }) {
  // ----------------------------------------------------------
  // ARRAY DE PREGUNTAS (ACTUALIZADO: TARJETAS BÁSICAS, CLÁSICAS Y DEPARTAMENTALES)
  // ----------------------------------------------------------
  const preguntas = [
    {
      id: "1",
      pregunta: "¿Cuál de las siguientes opciones describe mejor una tarjeta de crédito básica?",
      opciones: [
        "Es una tarjeta exclusiva para compras en tiendas departamentales.",
        "Ofrece beneficios premium y requiere ingresos altos.",
        "Es una tarjeta sencilla con límite bajo, ideal para quienes inician su historial crediticio."
      ],
      correcta: 2, // Equivale a la opción C
    },
    {
      id: "2",
      pregunta: "Las tarjetas clásicas suelen ofrecer programas de recompensas y requieren comprobar ingresos estables. Verdadero o falso:",
      opciones: [
        "Verdadero",
        "Falso"
      ],
      correcta: 0, // Equivale a la opción A (Verdadero)
    },
    {
      id: "3",
      pregunta: "¿Qué característica distingue a las tarjetas departamentales de las demás?",
      opciones: [
        "Solo se pueden usar en comercios o tiendas específicas.",
        "Permiten usar dinero directamente de tu cuenta de ahorro.",
        "No generan intereses bajo ninguna circunstancia."
      ],
      correcta: 0, // Equivale a la opción A
    },
    {
      id: "4",
      pregunta: "Una persona que está comenzando a manejar crédito debería solicitar primero:",
      opciones: [
        "Una tarjeta clásica.",
        "Una tarjeta básica.",
        "Una tarjeta oro o platino."
      ],
      correcta: 1, // Equivale a la opción B
    },
    {
      id: "5",
      pregunta: "Las tarjetas departamentales siempre están respaldadas por un banco. Verdadero o falso:",
      opciones: [
        "Verdadero",
        "Falso"
      ],
      correcta: 1, // Equivale a la opción B (Falso)
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
      <Text style={styles.titulo}>Repaso: Tipos de Tarjeta</Text>

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