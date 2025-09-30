// Detectar si se accede desde red local o localhost
const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  
  // Si se accede por IP de red, usar esa IP para el backend
  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    // Acceso desde red - usar la IP del servidor
    return window.location.port === '8501' 
      ? `http://${hostname}:8501/api`    // Nginx proxy
      : `http://${hostname}:8600/api`;   // Backend directo
  } else {
    // Acceso local
    return window.location.port === '8501' 
      ? 'http://localhost:8501/api'      // Nginx proxy
      : 'http://localhost:8600/api';     // Desarrollo directo
  }
};

const API_BASE_URL = getApiBaseUrl();

console.log('🔧 API_BASE_URL configurada:', API_BASE_URL);
console.log('🌐 Hostname detectado:', window.location.hostname);

const api = {
  // Obtener equipos por línea
  getEquiposByLinea: async (linea) => {
    const url = `${API_BASE_URL}/checklist/equipos/${linea}`;
    console.log('📡 Solicitando equipos:', url);
    
    try {
      const response = await fetch(url);
      console.log('📡 Respuesta recibida:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Equipos obtenidos:', data);
      return data;
    } catch (error) {
      console.error('❌ Error al obtener equipos:', error);
      throw error;
    }
  },

  // Obtener checklist por equipo
  getChecklistByEquipo: async (equipo) => {
    const response = await fetch(`${API_BASE_URL}/checklist/checklist/${encodeURIComponent(equipo)}`);
    return response.json();
  },

  // Guardar checklist
  guardarChecklist: async (data) => {
    const response = await fetch(`${API_BASE_URL}/checklist/guardar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Obtener historial
  getHistorial: async (tabla, limite = 50) => {
    const response = await fetch(`${API_BASE_URL}/checklist/historial/${tabla}?limite=${limite}`);
    return response.json();
  }
};

export default api;