// src/screens/CuentasBancarias/Nivel1/PCuentasBancarias.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PreguntasAdminDineroCuentasNivel3({ navigation }) {
  // AQUÍ VAS A PEGAR LAS PREGUNTAS DE ESTE TEMA Y NIVEL
// Dentro de src/screens/AdminDinero/Nivel3/PAdminDinero.js
// Reemplaza SOLO el arreglo preguntas por esto:
  const preguntas = [
    {
      id: "1",
      pregunta:
        "¿Qué distingue a un presupuesto inteligente de simplemente dividir ingresos en porcentajes?",
      opciones: [
        "Que se hace una sola vez y ya no se revisa.",
        "Que incluye registrar, analizar y ajustar los gastos según tus metas.",
        "Que solo se enfoca en gastar más en deseos.",
        "Que solo considera los ingresos, no los gastos.",
      ],
      correcta: 1,
    },
    {
      id: "2",
      pregunta:
        "Registrar todos tus ingresos y gastos sirve principalmente para:",
      opciones: [
        "Comprobar que nunca te equivocas al gastar.",
        "Tener datos reales para saber en qué se va tu dinero.",
        "Pagar más comisiones bancarias.",
        "Poder gastar sin límites.",
      ],
      correcta: 1,
    },
    {
      id: "3",
      pregunta:
        "Si al revisar tu presupuesto descubres que tus ‘deseos’ superan por mucho el 30 % de tu ingreso, lo más recomendable es:",
      opciones: [
        "Aumentar todavía más tus deseos.",
        "Ignorar el problema y seguir igual.",
        "Reducir algunos gastos opcionales y redirigir dinero a ahorro o necesidades.",
        "Dejar de registrar tus gastos.",
      ],
      correcta: 2,
    },
    {
      id: "4",
      pregunta:
        "Monitorear mensualmente tu presupuesto te ayuda a:",
      opciones: [
        "Evitar deudas y mejorar tu salud financiera.",
        "Tener menos información sobre tus finanzas.",
        "Gastar todo tu dinero en un solo día.",
        "Solo aumentar tus deudas.",
      ],
      correcta: 0,
    },
    {
      id: "5",
      pregunta:
        "Un presupuesto inteligente debe poder ajustarse cuando cambian tus ingresos o tus necesidades.",
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
