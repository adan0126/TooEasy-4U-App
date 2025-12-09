// src/api/challengesApi.js

// Por ahora NO llamamos a backend, solo simulamos datos
export async function fetchActiveChallenges(token) {
  // Aquí luego usarás "token" para llamar a tu API real
  return [
    {
      id: 1,
      name: "Sin gastos hormiga",
      description: "Durante esta semana evita compras pequeñas no necesarias.",
      tier: "BRONCE",
      progress: 40,               // % de avance
      reward_type: "TRONCOS",     // lo usa ChallengeCard
      reward_trunks: 5,           // cantidad de troncos
      state: "IN_PROGRESS",       // o "COMPLETED"
      reward_granted: false,      // si ya se entregó la recompensa
    },
    {
      id: 2,
      name: "Control de ocio",
      description: "Mantén tus gastos de ocio por debajo del 15% de tus ingresos.",
      tier: "PLATA",
      progress: 70,
      reward_type: "TRONCOS",
      reward_trunks: 10,
      state: "IN_PROGRESS",
      reward_granted: false,
    },
    {
      id: 3,
      name: "Registrando diario",
      description: "Registra al menos un movimiento diario durante 7 días.",
      tier: "ORO",
      progress: 100,
      reward_type: "TRONCOS",
      reward_trunks: 20,
      state: "COMPLETED",
      reward_granted: true,
    },
  ];
}
