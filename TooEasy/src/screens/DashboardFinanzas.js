// src/screens/DashboardFinanzas.js
// Pantalla para mostrar el dashboard del usuario
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { useUser } from "../context/UserContext";
import { 
  obtenerTransaccionesMes,
  actualizarRacha 
} from "../services/authService";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../config/fb";

const { width } = Dimensions.get("window");

export default function DashboardFinanzas({ navigation }) {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [datosFinanzas, setDatosFinanzas] = useState(null);
  const [mesActual, setMesActual] = useState(new Date());
  const [transacciones, setTransacciones] = useState({ ingresos: [], egresos: [] });
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, [mesActual]);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      // Obtener datos del usuario
      const userRef = doc(database, "usuarios", user.id);
      const userDoc = await getDoc(userRef);
      const userData = userDoc.data();
      
      setDatosFinanzas(userData.finanzas || {
        ingresoMensual: 0,
        ahorroActual: 0,
        racha: 0,
        meta: { nombre: "", cantidad: 0, progreso: 0, estado: "No iniciada" }
      });
      
      // Obtener transacciones del mes
      const trans = await obtenerTransaccionesMes(
        user.id,
        mesActual.getMonth() + 1,
        mesActual.getFullYear()
      );
      
      setTransacciones({
        ingresos: Array.isArray(trans?.ingresos) ? trans.ingresos : [],
        egresos: Array.isArray(trans?.egresos) ? trans.egresos : []
      });
      
      // Actualizar racha
      await actualizarRacha(user.id);
      
    } catch (error) {
      console.error("Error cargando datos:", error);
      Alert.alert("Error", "No se pudieron cargar los datos financieros");
    } finally {
      setLoading(false);
    }
  };

  const calcularTotalesMes = () => {
    const totalIngresos = (transacciones.ingresos || []).reduce(
      (sum, t) => sum + (t.monto || 0),
      0
    );
    const totalEgresos = (transacciones.egresos || []).reduce(
      (sum, t) => sum + (t.monto || 0),
      0
    );
    const balance = totalIngresos - totalEgresos;
    
    return { totalIngresos, totalEgresos, balance };
  };

  const obtenerDiasMes = () => {
    const anio = mesActual.getFullYear();
    const mes = mesActual.getMonth();
    const primerDia = new Date(anio, mes, 1);
    const ultimoDia = new Date(anio, mes + 1, 0);
    
    const dias = [];
    const primerDiaSemana = primerDia.getDay();
    
    // Espacios vacíos antes del primer día
    for (let i = 0; i < primerDiaSemana; i++) {
      dias.push(null);
    }
    
    // Días del mes
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      dias.push(dia);
    }
    
    return dias;
  };

  const verificarTransaccionEnDia = (dia) => {
    if (!dia) return { tieneIngreso: false, tieneEgreso: false };
    
    const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), dia);
    const fechaStr = fecha.toISOString().split('T')[0];
    
    const tieneIngreso = transacciones.ingresos.some(t => 
      t.fecha.split('T')[0] === fechaStr
    );
    
    const tieneEgreso = transacciones.egresos.some(t => 
      t.fecha.split('T')[0] === fechaStr
    );
    
    return { tieneIngreso, tieneEgreso };
  };

  const cambiarMes = (direccion) => {
    const nuevoMes = new Date(mesActual);
    nuevoMes.setMonth(mesActual.getMonth() + direccion);
    setMesActual(nuevoMes);
    setDiaSeleccionado(null);
  };

  const nombreMes = mesActual.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' }).toUpperCase();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5B7C99" />
        <Text style={styles.loadingText}>Cargando finanzas...</Text>
      </View>
    );
  }

  const { totalIngresos, totalEgresos, balance } = calcularTotalesMes();

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      {/* TARJETAS INFORMATIVAS */}
      <View style={styles.cardsContainer}>
        <View style={[styles.card, styles.cardBrown]}>
          <Text style={styles.cardLabel}>Ingreso Mensual Fijo</Text>
          <Text style={styles.cardValue}>
            ${datosFinanzas.ingresoMensual.toLocaleString()}
          </Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate("EditarIngresoMensual")}
          >
            <Text style={styles.editBtnText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.cardBlue]}>
          <Text style={styles.cardLabel}>Ahorro Actual</Text>
          <Text style={styles.cardValue}>
            ${datosFinanzas.ahorroActual.toLocaleString()}
          </Text>
        </View>

        <View style={[styles.card, styles.cardBrown]}>
          <Text style={styles.cardLabel}>Nombre de Meta</Text>
          <Text style={styles.cardValue}>
            {datosFinanzas.meta.nombre || "Sin meta"}
          </Text>
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate("EditarMeta")}
          >
            <Text style={styles.editBtnText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, styles.cardBlue]}>
          <Text style={styles.cardLabel}>Falta para Meta</Text>
          <Text style={styles.cardValue}>
            ${Math.max(0, datosFinanzas.meta.cantidad - datosFinanzas.ahorroActual).toLocaleString()}
          </Text>
        </View>

        <View style={[styles.card, styles.cardBrown]}>
          <Text style={styles.cardLabel}>Meta ($)</Text>
          <Text style={styles.cardValue}>
            ${datosFinanzas.meta.cantidad.toLocaleString()}
          </Text>
        </View>

        <View style={[styles.card, styles.cardBlue]}>
          <Text style={styles.cardLabel}>Estado</Text>
          <Text style={styles.cardValueSmall}>
            {datosFinanzas.meta.estado}
          </Text>
        </View>

        <View style={[styles.card, styles.cardBrown]}>
          <Text style={styles.cardLabel}>Racha</Text>
          <Text style={styles.cardValue}>{datosFinanzas.racha}</Text>
        </View>

        <View style={[styles.card, styles.cardWhite]}>
          <Text style={styles.cardLabel}>Racha</Text>
          <Text style={styles.cardValueEmpty}>- -</Text>
        </View>
      </View>

      {/* CALENDARIO */}
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => cambiarMes(-1)}>
            <Text style={styles.calendarArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.calendarTitle}>{nombreMes}</Text>
          <TouchableOpacity onPress={() => cambiarMes(1)}>
            <Text style={styles.calendarArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Días de la semana */}
        <View style={styles.weekDays}>
          {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((dia, i) => (
            <Text key={i} style={styles.weekDay}>{dia}</Text>
          ))}
        </View>

        {/* Días del mes */}
        <View style={styles.daysGrid}>
          {obtenerDiasMes().map((dia, index) => {
            if (!dia) {
              return <View key={`empty-${index}`} style={styles.dayCell} />;
            }

            const { tieneIngreso, tieneEgreso } = verificarTransaccionEnDia(dia);
            const esHoy = dia === new Date().getDate() && 
                          mesActual.getMonth() === new Date().getMonth();

            return (
              <TouchableOpacity
                key={dia}
                style={[
                  styles.dayCell,
                  esHoy && styles.dayCellToday,
                  diaSeleccionado === dia && styles.dayCellSelected
                ]}
                onPress={() => {
                  setDiaSeleccionado(dia);
                  navigation.navigate("RegistrarTransaccion", {
                    fecha: new Date(mesActual.getFullYear(), mesActual.getMonth(), dia)
                  });
                }}
              >
                <Text style={[styles.dayText, esHoy && styles.dayTextToday]}>
                  {dia}
                </Text>
                <View style={styles.dayIndicators}>
                  {tieneIngreso && <View style={styles.indicadorIngreso} />}
                  {tieneEgreso && <View style={styles.indicadorEgreso} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* GRÁFICA DE FINANZAS */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Finanzas</Text>
        
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4A90E2' }]} />
            <Text style={styles.legendText}>Ingresos Totales</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#E8A87C' }]} />
            <Text style={styles.legendText}>Egresos Totales</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#95A5A6' }]} />
            <Text style={styles.legendText}>Balance Neto</Text>
          </View>
        </View>

        {/* Barras del gráfico */}
        <View style={styles.chartBars}>
          <View style={styles.barContainer}>
            <Text style={styles.barValue}>${totalIngresos.toLocaleString()}</Text>
            <View style={[styles.bar, styles.barIngresos, { 
              height: Math.max(20, (totalIngresos / Math.max(totalIngresos, totalEgresos, Math.abs(balance))) * 150) 
            }]} />
            <Text style={styles.barLabel}>Ingresos</Text>
          </View>

          <View style={styles.barContainer}>
            <Text style={styles.barValue}>${totalEgresos.toLocaleString()}</Text>
            <View style={[styles.bar, styles.barEgresos, { 
              height: Math.max(20, (totalEgresos / Math.max(totalIngresos, totalEgresos, Math.abs(balance))) * 150) 
            }]} />
            <Text style={styles.barLabel}>Egresos</Text>
          </View>

          <View style={styles.barContainer}>
            <Text style={styles.barValue}>${balance.toLocaleString()}</Text>
            <View style={[styles.bar, styles.barBalance, { 
              height: Math.max(20, (Math.abs(balance) / Math.max(totalIngresos, totalEgresos, Math.abs(balance))) * 150),
              backgroundColor: balance >= 0 ? '#27AE60' : '#E74C3C'
            }]} />
            <Text style={styles.barLabel}>Balance</Text>
          </View>
        </View>
      </View>

      {/* NAVEGACIÓN INFERIOR */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navIcon}>📊</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navIcon}>📈</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navBtn}
          onPress={() => navigation.navigate("RegistrarTransaccion")}
        >
          <Text style={styles.navIcon}>➕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn}>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  header: {
    backgroundColor: "#5B4636",
    padding: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    minHeight: 80,
  },
  cardBrown: {
    backgroundColor: "#C9A882",
  },
  cardBlue: {
    backgroundColor: "#7B9AB8",
  },
  cardWhite: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  cardLabel: {
    fontSize: 12,
    color: "#333",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  cardValueSmall: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFF",
  },
  cardValueEmpty: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#CCC",
  },
  editBtn: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  editBtnText: {
    fontSize: 18,
  },
  calendarContainer: {
    backgroundColor: "#FFF",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  calendarArrow: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5B4636",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  weekDay: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    width: (width - 70) / 7,
    textAlign: "center",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: (width - 70) / 7,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  dayCellToday: {
    backgroundColor: "#5B7C99",
    borderRadius: 8,
  },
  dayCellSelected: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    color: "#333",
  },
  dayTextToday: {
    color: "#FFF",
    fontWeight: "bold",
  },
  dayIndicators: {
    flexDirection: "row",
    marginTop: 2,
  },
  indicadorIngreso: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#27AE60",
    marginHorizontal: 1,
  },
  indicadorEgreso: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E74C3C",
    marginHorizontal: 1,
  },
  chartContainer: {
    backgroundColor: "#FFF",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  legend: {
    marginBottom: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#666",
  },
  chartBars: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 200,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
  },
  barValue: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bar: {
    width: 60,
    borderRadius: 5,
    marginBottom: 8,
  },
  barIngresos: {
    backgroundColor: "#4A90E2",
  },
  barEgresos: {
    backgroundColor: "#E8A87C",
  },
  barBalance: {
    backgroundColor: "#95A5A6",
  },
  barLabel: {
    fontSize: 12,
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#5B4636",
    paddingVertical: 15,
    justifyContent: "space-around",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
  },
  navBtn: {
    padding: 10,
  },
  navIcon: {
    fontSize: 24,
  },
});