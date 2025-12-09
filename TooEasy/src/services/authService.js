// src/services/authService.js
// Servicios de autenticación con Firebase y bcryptjs

import { 
  collection, 
  addDoc, 
  doc,
  updateDoc,
  query, 
  where, 
  getDocs,
  serverTimestamp,
  increment
} from "firebase/firestore";
import { database } from "../config/fb";
import bcrypt from "bcryptjs";

// ========================================
// VERIFICAR SI EL USUARIO YA EXISTE
// ========================================
export const verificarUsuarioExistente = async (username, correo) => {
  try {
    console.log("🔍 Verificando usuario existente...");
    
    // Verificar username
    const usernameQuery = query(
      collection(database, "usuarios"),
      where("username", "==", username.trim())
    );
    const usernameSnapshot = await getDocs(usernameQuery);

    if (!usernameSnapshot.empty) {
      console.log("❌ Username ya existe");
      return { existe: true, mensaje: "Ese nombre de usuario ya está en uso." };
    }

    // Verificar correo
    const correoQuery = query(
      collection(database, "usuarios"),
      where("correo", "==", correo.trim().toLowerCase())
    );
    const correoSnapshot = await getDocs(correoQuery);

    if (!correoSnapshot.empty) {
      console.log("❌ Correo ya existe");
      return { existe: true, mensaje: "Ese correo ya está registrado." };
    }

    console.log("✅ Usuario disponible");
    return { existe: false };
    
  } catch (error) {
    console.error("Error verificando usuario:", error);
    throw new Error("Error al verificar los datos. Intenta nuevamente.");
  }
};

// ========================================
// REGISTRAR NUEVO USUARIO (CON BCRYPT)
// ========================================
export const registrarUsuario = async (datosUsuario) => {
  try {
    console.log("📝 Iniciando registro de usuario...");
    const { username, password, correo, edad, genero } = datosUsuario;

    // 🔐 PASO 1: Hashear la contraseña con bcrypt
    console.log("🔐 Hasheando contraseña...");
    const saltRounds = 10; // Número de rondas de encriptación (10 es el estándar)
    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log("✅ Contraseña hasheada exitosamente");

    // 📦 PASO 2: Crear el documento del usuario
    const nuevoUsuario = {
      username: username.trim(),
      correo: correo.trim().toLowerCase(),
      edad: parseInt(edad),
      genero: genero,
      password: passwordHash, // ✅ Guardamos el hash, NO la contraseña original
      monedas: 0,
      fechaRegistro: serverTimestamp(),
      ultimoAcceso: serverTimestamp(),
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

    // 💾 PASO 3: Guardar en Firestore
    console.log("💾 Guardando en Firestore...");
    const docRef = await addDoc(collection(database, "usuarios"), nuevoUsuario);
    console.log("✅ Usuario registrado con ID:", docRef.id);

    // 🎯 PASO 4: Retornar datos del usuario SIN la contraseña
    const { password: _, ...usuarioSinPassword } = nuevoUsuario;
    return {
      id: docRef.id,
      ...usuarioSinPassword
    };

  } catch (error) {
    console.error("❌ Error registrando usuario:", error);
    throw new Error("Error al crear la cuenta. Intenta nuevamente.");
  }
};

// ========================================
// INICIAR SESIÓN (CON BCRYPT)
// ========================================
export const iniciarSesion = async (username, password) => {
  try {
    console.log("🔑 Intentando iniciar sesión...");
    
    // 🔍 PASO 1: Buscar usuario por username
    const q = query(
      collection(database, "usuarios"),
      where("username", "==", username.trim())
    );
    
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("❌ Usuario no encontrado");
      return { 
        exito: false, 
        mensaje: "Usuario no encontrado." 
      };
    }

    // 📋 PASO 2: Obtener datos del usuario
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    console.log("✅ Usuario encontrado:", userData.username);

    // 🔐 PASO 3: Verificar contraseña con bcrypt
    console.log("🔐 Verificando contraseña...");
    const passwordValida = await bcrypt.compare(password, userData.password);
    
    if (!passwordValida) {
      console.log("❌ Contraseña incorrecta");
      return { 
        exito: false, 
        mensaje: "Contraseña incorrecta." 
      };
    }

    console.log("✅ Contraseña correcta");

    // 📅 PASO 4: Actualizar último acceso
    try {
      await updateDoc(doc(database, "usuarios", userDoc.id), {
        ultimoAcceso: serverTimestamp()
      });
    } catch (error) {
      console.warn("No se pudo actualizar último acceso:", error);
    }

    // 🎉 PASO 5: Login exitoso - retornar datos sin la contraseña
    const { password: _, ...usuarioSinPassword } = userData;
    
    return {
      exito: true,
      usuario: {
        id: userDoc.id,
        ...usuarioSinPassword
      }
    };

  } catch (error) {
    console.error("❌ Error en inicio de sesión:", error);
    throw new Error("Error al iniciar sesión. Intenta nuevamente.");
  }
};

// ========================================
// ACTUALIZAR PROGRESO DEL USUARIO
// ========================================
export const actualizarProgreso = async (userId, modulo, nivel, datos) => {
  try {
    console.log(`📊 Actualizando progreso: ${modulo} - ${nivel}`);
    
    const userRef = doc(database, "usuarios", userId);
    
    const updateData = {};
    updateData[`progreso.${modulo}.${nivel}`] = {
      ...datos,
      fechaActualizacion: serverTimestamp()
    };
    
    await updateDoc(userRef, updateData);
    
    console.log("✅ Progreso actualizado correctamente");
    return true;
    
  } catch (error) {
    console.error("❌ Error actualizando progreso:", error);
    throw new Error("Error al guardar el progreso.");
  }
};

// ========================================
// ACTUALIZAR MONEDAS
// ========================================
export const actualizarMonedas = async (userId, cantidad) => {
  try {
    console.log(`💰 Actualizando monedas: +${cantidad}`);
    
    const userRef = doc(database, "usuarios", userId);
    
    await updateDoc(userRef, {
      monedas: increment(cantidad)
    });
    
    console.log("✅ Monedas actualizadas");
    return true;
    
  } catch (error) {
    console.error("❌ Error actualizando monedas:", error);
    throw new Error("Error al actualizar las monedas.");
  }
};

// ========================================
// CAMBIAR CONTRASEÑA
// ========================================
export const cambiarPassword = async (userId, passwordActual, passwordNueva) => {
  try {
    console.log("🔐 Iniciando cambio de contraseña...");
    
    // 1. Obtener usuario
    const userRef = doc(database, "usuarios", userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error("Usuario no encontrado");
    }
    
    const userData = userDoc.data();
    
    // 2. Verificar contraseña actual
    const passwordValida = await bcrypt.compare(passwordActual, userData.password);
    
    if (!passwordValida) {
      return {
        exito: false,
        mensaje: "La contraseña actual es incorrecta"
      };
    }
    
    // 3. Hashear nueva contraseña
    const nuevoPasswordHash = await bcrypt.hash(passwordNueva, 10);
    
    // 4. Actualizar en Firestore
    await updateDoc(userRef, {
      password: nuevoPasswordHash,
      ultimaActualizacionPassword: serverTimestamp()
    });
    
    console.log("✅ Contraseña actualizada exitosamente");
    return {
      exito: true,
      mensaje: "Contraseña actualizada correctamente"
    };
    
  } catch (error) {
    console.error("❌ Error cambiando contraseña:", error);
    throw new Error("Error al cambiar la contraseña");
  }
};