// AGREGAR ESTA ESTRUCTURA AL USUARIO EN registrarUsuario():

const nuevoUsuario = {
  username: username.trim(),
  correo: correo.trim().toLowerCase(),
  edad: parseInt(edad),
  genero: genero,
  password: passwordHash,
  monedas: 0,
  fechaRegistro: serverTimestamp(),
  ultimoAcceso: serverTimestamp(),
  
  // ✅ NUEVA SECCIÓN: Datos Financieros
  finanzas: {
    ingresoMensual: 0,
    ahorroActual: 0,
    racha: 0,
    ultimaActualizacionRacha: null,
    
    // Meta de ahorro
    meta: {
      nombre: "",
      cantidad: 0,
      progreso: 0,
      estado: "No iniciada" // "En Progreso", "Completada", "No iniciada"
    },
    
    // Transacciones por mes/año
    transacciones: {
      // Estructura: "2025-12": { ingresos: [], egresos: [] }
      // Se creará dinámicamente
    }
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

// ========================================
// NUEVAS FUNCIONES PARA FINANZAS
// ========================================

// IMPORTANTE: Agregar este import al inicio del archivo authService.js:
// import { getDoc } from "firebase/firestore";

// Agregar transacción (ingreso o egreso)
export const agregarTransaccion = async (userId, tipo, datos) => {
  try {
    const { fecha, monto, descripcion, categoria } = datos;
    const mesAnio = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
    
    const userRef = doc(database, "usuarios", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    // Crear estructura del mes si no existe
    const transaccionesMes = userData.finanzas?.transacciones?.[mesAnio] || {
      ingresos: [],
      egresos: []
    };
    
    const nuevaTransaccion = {
      id: Date.now().toString(),
      fecha: fecha.toISOString(),
      monto: parseFloat(monto),
      descripcion: descripcion || "",
      categoria: categoria || "General",
      fechaCreacion: serverTimestamp()
    };
    
    // Agregar según tipo
    if (tipo === "ingreso") {
      transaccionesMes.ingresos.push(nuevaTransaccion);
    } else {
      transaccionesMes.egresos.push(nuevaTransaccion);
    }
    
    // Actualizar en Firebase
    const updateData = {};
    updateData[`finanzas.transacciones.${mesAnio}`] = transaccionesMes;
    
    await updateDoc(userRef, updateData);
    
    // Recalcular ahorro actual
    await recalcularAhorro(userId);
    
    console.log("✅ Transacción agregada");
    return nuevaTransaccion;
    
  } catch (error) {
    console.error("❌ Error agregando transacción:", error);
    throw new Error("Error al registrar la transacción");
  }
};

// Actualizar meta de ahorro
export const actualizarMeta = async (userId, metaData) => {
  try {
    const { nombre, cantidad } = metaData;
    
    const userRef = doc(database, "usuarios", userId);
    
    await updateDoc(userRef, {
      "finanzas.meta.nombre": nombre,
      "finanzas.meta.cantidad": parseFloat(cantidad),
      "finanzas.meta.estado": "En Progreso"
    });
    
    console.log("✅ Meta actualizada");
    return true;
    
  } catch (error) {
    console.error("❌ Error actualizando meta:", error);
    throw new Error("Error al actualizar la meta");
  }
};

// Recalcular ahorro actual
export const recalcularAhorro = async (userId) => {
  try {
    const userRef = doc(database, "usuarios", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    let totalIngresos = 0;
    let totalEgresos = 0;
    
    // Sumar todas las transacciones
    const transacciones = userData.finanzas?.transacciones || {};
    
    Object.values(transacciones).forEach(mes => {
      mes.ingresos?.forEach(ing => totalIngresos += ing.monto);
      mes.egresos?.forEach(eg => totalEgresos += eg.monto);
    });
    
    const ahorroActual = totalIngresos - totalEgresos;
    
    // Actualizar progreso de meta si existe
    const meta = userData.finanzas?.meta || {};
    let progreso = 0;
    if (meta.cantidad > 0) {
      progreso = Math.min((ahorroActual / meta.cantidad) * 100, 100);
    }
    
    await updateDoc(userRef, {
      "finanzas.ahorroActual": ahorroActual,
      "finanzas.meta.progreso": progreso
    });
    
    return ahorroActual;
    
  } catch (error) {
    console.error("❌ Error recalculando ahorro:", error);
    throw error;
  }
};

// Actualizar ingreso mensual
export const actualizarIngresoMensual = async (userId, ingresoMensual) => {
  try {
    const userRef = doc(database, "usuarios", userId);
    
    await updateDoc(userRef, {
      "finanzas.ingresoMensual": parseFloat(ingresoMensual)
    });
    
    console.log("✅ Ingreso mensual actualizado");
    return true;
    
  } catch (error) {
    console.error("❌ Error actualizando ingreso mensual:", error);
    throw new Error("Error al actualizar el ingreso mensual");
  }
};

// Obtener transacciones de un mes
export const obtenerTransaccionesMes = async (userId, mes, anio) => {
  try {
    const mesAnio = `${anio}-${String(mes).padStart(2, '0')}`;
    
    const userRef = doc(database, "usuarios", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    const transacciones = userData.finanzas?.transacciones?.[mesAnio] || {
      ingresos: [],
      egresos: []
    };
    
    return transacciones;
    
  } catch (error) {
    console.error("❌ Error obteniendo transacciones:", error);
    throw new Error("Error al obtener las transacciones");
  }
};

// Actualizar racha
export const actualizarRacha = async (userId) => {
  try {
    const userRef = doc(database, "usuarios", userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    const hoy = new Date();
    const ultimaActualizacion = userData.finanzas?.ultimaActualizacionRacha?.toDate();
    
    let nuevaRacha = userData.finanzas?.racha || 0;
    
    if (!ultimaActualizacion) {
      nuevaRacha = 1;
    } else {
      const diffDias = Math.floor((hoy - ultimaActualizacion) / (1000 * 60 * 60 * 24));
      
      if (diffDias === 1) {
        nuevaRacha += 1;
      } else if (diffDias > 1) {
        nuevaRacha = 1;
      }
    }
    
    await updateDoc(userRef, {
      "finanzas.racha": nuevaRacha,
      "finanzas.ultimaActualizacionRacha": serverTimestamp()
    });
    
    return nuevaRacha;
    
  } catch (error) {
    console.error("❌ Error actualizando racha:", error);
    throw error;
  }
};