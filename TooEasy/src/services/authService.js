// ==============================
// IMPORTS NECESARIOS
// ==============================
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  serverTimestamp,
  query,
  collection,
  where,
  getDocs
} from "firebase/firestore";

import { database } from "../config/fb";

// 👉 bcryptjs funciona en React Native, PERO necesita un reemplazo para generar números aleatorios
import bcrypt from "bcryptjs";

// 👉 Importamos expo-crypto (FUNCIONA dentro de Expo / React Native)
import * as Crypto from "expo-crypto";


// ==========================================================
// ⚠️ FIX CRÍTICO: Permite que bcryptjs funcione en React Native
// ==========================================================
// React Native NO tiene WebCrypto ni crypto.randomBytes.
// Aquí forzamos a bcryptjs a usar expo-crypto como generador de entropía.
bcrypt.setRandomFallback((len) => {
  return Crypto.getRandomBytes(len); // ← devuelve Uint8Array
});
// ==========================================================



// ==============================
// VERIFICAR SI USUARIO EXISTE
// ==============================
export const verificarUsuarioExistente = async (username, correo) => {
  try {
    const correoRef = doc(database, "usuarios", correo.toLowerCase());
    const correoDoc = await getDoc(correoRef);

    if (correoDoc.exists()) {
      return {
        existe: true,
        mensaje: "Este correo ya está registrado"
      };
    }

    const usersRef = collection(database, "usuarios");
    const q = query(usersRef, where("username", "==", username.trim()));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        existe: true,
        mensaje: "Este nombre de usuario ya está en uso"
      };
    }

    return {
      existe: false,
      mensaje: "Usuario disponible"
    };

  } catch (error) {
    console.error("Error verificando usuario:", error);
    throw new Error("Error al verificar disponibilidad del usuario");
  }
};


// ==============================
// REGISTRO DE USUARIO
// ==============================
export const registrarUsuario = async ({ username, correo, password, edad, genero }) => {
  try {
    // ====================================================
    // 🔐 Generar hash de contraseña usando bcryptjs + expo-crypto
    // ====================================================
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    // ====================================================

    const userRef = doc(database, "usuarios", correo.toLowerCase());

    const nuevoUsuario = {
      id: correo.toLowerCase(),
      username: username.trim(),
      correo: correo.trim().toLowerCase(),
      edad: parseInt(edad),
      genero: genero,
      password: passwordHash,

      monedas: 0,
      wood: 0,
      house_level: 1,
      beaver_level: 1,
      current_appearance: "skin_default",
      current_beaver: "castor_default",

      fechaRegistro: serverTimestamp(),
      ultimoAcceso: serverTimestamp(),

      finanzas: {
        ingresoMensual: 0,
        ahorroActual: 0,
        racha: 0,
        ultimaActualizacionRacha: null,

        meta: {
          nombre: "",
          cantidad: 0,
          progreso: 0,
          estado: "No iniciada"
        },

        transacciones: {}
      },

      progreso: {
        fundamentos: {
          nivel1: { completado: false, puntuacion: 0, intentos: 0 },
          nivel2: { completado: false, puntuacion: 0, intentos: 0 },
          nivel3: { completado: false, puntuacion: 0, intentos: 0 }
        },
        cuentasBancarias: {
          nivel1: { completado: false, puntuacion: 0, intentos: 0 },
          nivel2: { completado: false, puntuacion: 0, intentos: 0 },
          nivel3: { completado: false, puntuacion: 0, intentos: 0 }
        }
      }
    };

    await setDoc(userRef, nuevoUsuario);

    console.log("✅ Usuario registrado exitosamente");
    return nuevoUsuario;

  } catch (error) {
    console.error("❌ Error registrando usuario:", error);
    throw new Error("No se pudo registrar el usuario");
  }
};


// ==============================
// INICIAR SESIÓN
// ==============================
export const iniciarSesion = async (correo, password) => {
  try {
    const userRef = doc(database, "usuarios", correo.toLowerCase());
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return {
        exito: false,
        mensaje: "El usuario no existe"
      };
    }

    const data = userDoc.data();

    // ====================================================
    // 🔐 Comparar contraseña con bcryptjs
    // ====================================================
    const passwordCorrecta = bcrypt.compareSync(password, data.password);
    // ====================================================

    if (!passwordCorrecta) {
      return {
        exito: false,
        mensaje: "Contraseña incorrecta"
      };
    }

    await updateDoc(userRef, {
      ultimoAcceso: serverTimestamp(),
    });

    return {
      exito: true,
      usuario: data,
      mensaje: "Inicio de sesión exitoso"
    };

  } catch (error) {
    console.error("❌ Error iniciando sesión:", error);
    return {
      exito: false,
      mensaje: "Error al iniciar sesión"
    };
  }
};
