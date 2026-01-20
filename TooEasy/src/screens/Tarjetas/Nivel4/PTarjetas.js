import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useUser } from "../../../context/UserContext";
import { actualizarProgresoLeccion } from "../../../services/authService";

export default function PreguntasRepasoScreen({ navigation }) {
  const { user } = useUser();
  
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
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [guardando, setGuardando] = useState(false);

  const preguntaActual = preguntas[preguntaIndex];

  const seleccionarRespuesta = (idx) => {
    if (respuestaSeleccionada !== null) return;

    setRespuestaSeleccionada(idx);
    setRespuestaCorrecta(preguntaActual.correcta);

    // Contar si es correcta
    if (idx === preguntaActual.correcta) {
      setRespuestasCorrectas(prev => prev + 1);
    }
  };

  const siguientePregunta = () => {
    if (preguntaIndex + 1 < preguntas.length) {
      setPreguntaIndex(preguntaIndex + 1);
      setRespuestaSeleccionada(null);
      setRespuestaCorrecta(null);
    } else {
      // Finalizar y guardar progreso
      finalizarCuestionario();
    }
  };

  const finalizarCuestionario = async () => {
    const totalPreguntas = preguntas.length;
    const aprobado = respuestasCorrectas === totalPreguntas;

    if (aprobado) {
      setGuardando(true);
      
      try {
        // Actualizar progreso en Firebase
        const resultado = await actualizarProgresoLeccion(
          user.id,
          'tarjetas',
          4,
          true
        );

        if (resultado.primerVez) {
          Alert.alert(
            "¡Felicidades! 🎉",
            `Aprobaste todas las preguntas correctamente.\n\nRespuestas correctas: ${respuestasCorrectas}/${totalPreguntas}`,
            `Ganaste ${resultado.monedasOtorgadas} 🪙 monedas`,
            [
              {
                text: "Continuar",
                onPress: () => navigation.navigate("TMenu")
              }
            ]
          );
        } else {
          Alert.alert(
            "¡Bien hecho!",
            "Has vuelto a completar este nivel correctamente.",
            [
              {
                text: "Continuar",
                onPress: () => navigation.navigate("TMenu")
              }
            ]
          );
        }

      } catch (error) {
        console.error("Error guardando progreso:", error);
        Alert.alert("Error", "No se pudo guardar el progreso");
      } finally {
        setGuardando(false);
      }

    } else {
      Alert.alert(
        "Intenta de nuevo",
        `Necesitas aprobar todas las preguntas para avanzar.\n\nRespuestas correctas: ${respuestasCorrectas}/${totalPreguntas}`,
        [
          {
            text: "Reintentar",
            onPress: () => {
              setPreguntaIndex(0);
              setRespuestaSeleccionada(null);
              setRespuestaCorrecta(null);
              setRespuestasCorrectas(0);
            }
          },
          {
            text: "Volver al menú",
            onPress: () => navigation.navigate("TMenu")
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Preguntas de Repaso</Text>
      
      <View style={styles.progressIndicator}>
        <Text style={styles.progressText}>
          Pregunta {preguntaIndex + 1} de {preguntas.length}
        </Text>
        <Text style={styles.correctasText}>
          Correctas: {respuestasCorrectas}
        </Text>
      </View>

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
            disabled={guardando}
          >
            <Text style={styles.opcionTxt}>{opcion}</Text>
          </TouchableOpacity>
        );
      })}

      {respuestaSeleccionada !== null && (
        <TouchableOpacity
          style={[styles.btnContinuar, guardando && styles.btnDisabled]}
          onPress={siguientePregunta}
          disabled={guardando}
        >
          <Text style={styles.btnContinuarTxt}>
            {guardando 
              ? "Guardando..." 
              : preguntaIndex + 1 < preguntas.length
                ? "Siguiente"
                : "Terminar"
            }
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

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
  progressIndicator: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  progressText: {
    color: "#E0E1DD",
    fontSize: 14,
    fontWeight: "600",
  },
  correctasText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "bold",
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
  btnDisabled: {
    opacity: 0.6,
  },
  btnContinuarTxt: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});