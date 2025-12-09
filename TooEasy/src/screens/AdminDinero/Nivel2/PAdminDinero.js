import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PreguntasAdminDinero2({ navigation }) {
  // AQUÍ VAS A PEGAR LAS PREGUNTAS DE ESTE TEMA Y NIVEL
// Dentro de src/screens/AdminDinero/Nivel2/PAdminDinero.js
// Reemplaza SOLO el arreglo preguntas por esto:
  const preguntas = [
    {
      id: "1",
      pregunta: "¿Cuál es la distribución básica que propone la regla 50/30/20?",
      opciones: [
        "50 % deseos, 30 % necesidades, 20 % ahorro/deudas",
        "30 % necesidades, 50 % deseos, 20 % ahorro/deudas",
        "50 % necesidades, 30 % deseos, 20 % ahorro/deudas",
        "20 % necesidades, 30 % deseos, 50 % ahorro/deudas",
      ],
      correcta: 2,
    },
    {
      id: "2",
      pregunta:
        "¿Cuál de los siguientes gastos pertenece a la categoría de necesidades?",
      opciones: [
        "Suscripción a plataforma de streaming",
        "Pago de renta o vivienda",
        "Salida al cine",
        "Compra de videojuegos",
      ],
      correcta: 1,
    },
    {
      id: "3",
      pregunta:
        "Ahorrar o pagar deudas con al menos el 20 % del ingreso ayuda principalmente a:",
      opciones: [
        "Tener más gastos impulsivos.",
        "Construir un respaldo y mejorar tu estabilidad financiera.",
        "Aumentar tus deseos cada mes.",
        "Gastar sin preocuparte por el futuro.",
      ],
      correcta: 1,
    },
    {
      id: "4",
      pregunta:
        "Si tu sueldo neto es de $12,000 y aplicas la regla 50/30/20, ¿cuánto se destinaría aproximadamente a deseos?",
      opciones: ["$3,000", "$3,600", "$4,000", "$2,400"],
      correcta: 1,
    },
    {
      id: "5",
      pregunta:
        "La regla 50/30/20 se puede ajustar según tu situación económica.",
      opciones: ["VERDADERO", "FALSO"],
      correcta: 0,
    },
  ];


  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

  // Si aún no hay preguntas, mostramos un mensaje y no rompemos nada
  if (preguntas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Preguntas de Repaso</Text>
        <Text style={styles.pregunta}>
          Todavía no hay preguntas cargadas para este nivel.{"\n"}
          Cuando tengas el contenido, agrégalo en el arreglo "preguntas".
        </Text>

        <TouchableOpacity
          style={styles.btnContinuar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnContinuarTxt}>Regresar</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
      // Al terminar todas las preguntas regresas al menú del tema
      navigation.navigate("ADMenu");
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
        <TouchableOpacity style={styles.btnContinuar} onPress={siguientePregunta}>
          <Text style={styles.btnContinuarTxt}>
            {preguntaIndex + 1 < preguntas.length ? "Siguiente" : "Terminar"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ---------- ESTILOS (copiados del PFundamentos) ----------
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
