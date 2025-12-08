// VALIDACIONES FORMULARIO DE REGISTRO

// Simulación temporal de usuarios ya registrados (reemplazar por backend)
const usuariosRegistrados = {
  correos: ["fouryoutooeasy@gmail.com", "marioadan.granados@gmail.com"],
  usernames: ["SuperAdministrador1", "PusYoJeJe"]
};

// --- Validación principal ---
export const validarRegistro = ({ username, password, correo, edad, genero, terms }) => {

  // Campos vacíos
  if (!username || !password || !correo || !edad || !genero) {
    return "Debes completar todos los campos.";
  }

  // Username
  if (username.length < 5) {
    return "El nombre de usuario debe tener al menos 5 caracteres.";
  }

  if (username.startsWith(" ") || username.endsWith(" ")) {
    return "El nombre de usuario no puede iniciar ni terminar con espacios.";
  }

  if (usuariosRegistrados.usernames.includes(username.trim())) {
    return "Ese nombre de usuario ya está en uso.";
  }

  // Contraseña
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-\[\]{};:'",.<>\/?|`~]).{6,}$/;

  if (!regexPassword.test(password)) {
    return "La contraseña debe incluir: mayúscula, minúscula, número, símbolo y al menos 6 caracteres.";
  }

  // Correo
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexCorreo.test(correo)) {
    return "El formato del correo es inválido.";
  }

  if (usuariosRegistrados.correos.includes(correo.trim())) {
    return "Ese correo ya está registrado.";
  }

  // Edad
  if (!/^\d+$/.test(edad)) {
    return "La edad debe contener solo números enteros.";
  }

  const edadNum = parseInt(edad);
  if (edadNum <= 0 || edadNum > 99) {
    return "La edad debe ser entre 1 y 99.";
  }

  // Género
  if (genero !== "Hombre" && genero !== "Mujer" && genero !== "Otro") {
    return "Debes seleccionar un género válido.";
  }

  // Términos
  if (!terms) {
    return "Debes aceptar los términos y condiciones.";
  }

  // Si todo está correcto
  return null;
};
