// VALIDACIONES FORMULARIO DE REGISTRO
// Nota: La verificación de usuarios duplicados ahora se hace en Firebase

// --- Validación principal ---
export const validarRegistro = ({ username, password, correo, edad, genero, terms }) => {

  // 1️⃣ Campos vacíos
  if (!username || !password || !correo || !edad || !genero) {
    return "Debes completar todos los campos.";
  }

  // 2️⃣ Username
  if (username.length < 5) {
    return "El nombre de usuario debe tener al menos 5 caracteres.";
  }

  if (username.startsWith(" ") || username.endsWith(" ")) {
    return "El nombre de usuario no puede iniciar ni terminar con espacios.";
  }

  // Validar caracteres especiales no permitidos
  const regexUsername = /^[a-zA-Z0-9_-]+$/;
  if (!regexUsername.test(username)) {
    return "El nombre de usuario solo puede contener letras, números, guiones y guiones bajos.";
  }

  // 3️⃣ Contraseña
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-\[\]{};:'",.<>\/?|`~]).{6,}$/;

  if (!regexPassword.test(password)) {
    return "La contraseña debe incluir: mayúscula, minúscula, número, símbolo y al menos 6 caracteres.";
  }

  // 4️⃣ Correo
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexCorreo.test(correo)) {
    return "El formato del correo es inválido.";
  }

  // 5️⃣ Edad
  if (!/^\d+$/.test(edad)) {
    return "La edad debe contener solo números enteros.";
  }

  const edadNum = parseInt(edad);
  if (edadNum <= 0 || edadNum > 99) {
    return "La edad debe ser entre 1 y 99.";
  }

  if (edadNum < 13) {
    return "Debes tener al menos 13 años para registrarte.";
  }

  // 6️⃣ Género
  if (genero !== "Hombre" && genero !== "Mujer" && genero !== "Otro") {
    return "Debes seleccionar un género válido.";
  }

  // 7️⃣ Términos
  if (!terms) {
    return "Debes aceptar los términos y condiciones.";
  }

  // Si todo está correcto
  return null;
};

// --- Validación de Login ---
export const validarLogin = (username, password) => {
  if (!username || !password) {
    return "Debes ingresar tu usuario y contraseña.";
  }

  if (username.length < 3) {
    return "El nombre de usuario es demasiado corto.";
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }

  return null;
};