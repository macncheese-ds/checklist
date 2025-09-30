const express = require('express');
const router = express.Router();
const db = require('../db');

// Mapeo de equipos por línea
const equiposLinea = {
  '1': ['Screen Printer (Yamaha)', 'Reflow Oven (Heller)', 'Loader Vacuum', 'Magazine Unloader', 'Laser Marking', 'Bottom Inspection', 'Arom System', 'Post-Reflow AOI 3D (Kohyoung)', 'Reflow Oven (SMT)', 'Post-Reflow AOI 3D (Kohyoung)', 'SMD Mounter', '3D SPI', 'Screen Printer (DEK)', 'X-RAY'],
  '2': ['Screen Printer (Yamaha)', 'Reflow Oven (Heller)', 'Loader Vacuum', 'Magazine Unloader', 'Laser Marking', 'Bottom Inspection', 'Arom System', 'Post-Reflow AOI 3D (Kohyoung)', 'Reflow Oven (SMT)', 'Post-Reflow AOI 3D (Kohyoung)', 'SMD Mounter', '3D SPI', 'Screen Printer (DEK)', 'X-RAY'],
  '3': ['Screen Printer (Yamaha)', 'Reflow Oven (Heller)', 'Loader Vacuum', 'Magazine Unloader', 'Laser Marking', 'Bottom Inspection', 'Arom System', 'Post-Reflow AOI 3D (Kohyoung)', 'Reflow Oven (SMT)', 'Post-Reflow AOI 3D (Kohyoung)', 'SMD Mounter', '3D SPI', 'Screen Printer (DEK)', 'X-RAY'],
  '4': ['Screen Printer (Yamaha)', 'Reflow Oven (Heller)', 'Loader Vacuum', 'Magazine Unloader', 'Laser Marking', 'Bottom Inspection', 'Arom System', 'Post-Reflow AOI 3D (Kohyoung)', 'Reflow Oven (SMT)', 'Post-Reflow AOI 3D (Kohyoung)', 'SMD Mounter', '3D SPI', 'Screen Printer (DEK)', 'X-RAY'],
  'Lavado': ['Squeeguee Cleaner', 'Squeeguee Inspector', 'Stencil Washer', 'Smart Nozzle Cleaner']
};

// Mapeo de tabla por equipo
const tablaEquipo = {
  'Screen Printer (Yamaha)': 'chkl1',
  'Squeeguee Cleaner': 'chkl2',
  'Squeeguee Inspector': 'chkl3',
  'Stencil Washer': 'chkl4',
  'Smart Nozzle Cleaner': 'chkl5',
  'Reflow Oven (Heller)': 'chkl7',
  'Loader Vacuum': 'chkl8',
  'Magazine Unloader': 'chkl9',
  'Laser Marking': 'chkl10',
  'Bottom Inspection': 'chkl12',
  'Arom System': 'chkl13',
  'Post-Reflow AOI 3D (Kohyoung)': 'chkl14',
  'Reflow Oven (SMT)': 'chkl15',
  'SMD Mounter': 'chkl17',
  '3D SPI': 'chkl18',
  'Screen Printer (DEK)': 'chkl19',
  'X-RAY': 'chkl20'
};

// Definición de checklists para Screen Printer
const screenPrinterChecklist = [
  {
    id: 'limpieza_exterior',
    titulo: 'Limpieza de la parte exterior del equipo',
    inspeccion: 'Realice limpieza con trapo anti pelusa humedecido con alcohol decílicamente las partes metálicas.',
    metodo: 'Limpia con un trapo o paño anti pelusa humedecido con alcohol',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'deposito_condensacion',
    titulo: 'Deposito de condensación de agua',
    inspeccion: 'Realizar el vaciado del contenido del deposito',
    metodo: 'Retirar el contenedor y drenar',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'sensor_seguridad',
    titulo: 'Sensor de seguridad',
    inspeccion: 'Cuando se abre la puerta verificar que se detenga o se alarme el equipo',
    metodo: 'Parada del equipo y confirmación de alarma siendo la puerta abierta',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'inspeccion_transportadores',
    titulo: 'Inspección de transportadores',
    inspeccion: 'Compruebe la correcta transferencia del material',
    metodo: 'Inspección visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'estado_impresion_pcb',
    titulo: 'Estado de impresión del PCB',
    inspeccion: 'Verificar estado de primera pieza (Verificar que sea 100% OK)',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'presion_aire',
    titulo: 'Presión de Aire',
    inspeccion: 'Comprobación de correcta alimentación de entrada principal (MAIN PRESSURE)',
    metodo: 'Verifique visualmente que el manómetro marque 0.413Mpa',
    tipo: 'number',
    unidad: 'Mpa',
    valor_esperado: 0.413,
    rango_min: 0.4,
    rango_max: 0.42
  },
  {
    id: 'temperatura',
    titulo: 'Temperatura',
    inspeccion: 'Temperatura interna',
    metodo: 'Registro de temperatura (22 a 26°C grados)',
    tipo: 'number',
    unidad: '°C',
    valor_esperado: 24,
    rango_min: 22,
    rango_max: 26
  },
  {
    id: 'inspeccion_visual_squeegee',
    titulo: 'Inspección Visual de Squeegee (Navaja)',
    inspeccion: 'Verificar Físicamente antes de comenzar el proceso',
    metodo: 'Inspección de longitud e inspección visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
];

// Obtener equipos por línea
router.get('/equipos/:linea', async (req, res) => {
  try {
    const { linea } = req.params;
    console.log(`📡 Solicitud de equipos para línea: ${linea}`);
    
    const equipos = equiposLinea[linea] || [];
    console.log(`✅ Equipos encontrados: ${equipos.length} para línea ${linea}`);
    
    res.json(equipos);
  } catch (error) {
    console.error('❌ Error al obtener equipos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener checklist por equipo
router.get('/checklist/:equipo', async (req, res) => {
  try {
    const { equipo } = req.params;
    
    if (equipo === 'Screen Printer (Yamaha)' || equipo === 'Screen Printer (DEK)') {
      res.json(screenPrinterChecklist);
    } else {
      res.json({ message: 'Checklist aún no configurado para este equipo' });
    }
  } catch (error) {
    console.error('Error al obtener checklist:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Guardar checklist completado
router.post('/guardar', async (req, res) => {
  try {
    const {
      equipo,
      linea,
      turno,
      empleado,
      modelo,
      esNoProductivo,
      respuestas,
      observaciones
    } = req.body;

    const tabla = tablaEquipo[equipo];
    if (!tabla) {
      return res.status(400).json({ error: 'Equipo no válido' });
    }

    let valores = {
      linea: linea || null,
      turno: turno || null,
      fr: new Date(),
      empleado: empleado || null,
      modelo: modelo || null,
      observaciones: observaciones || null
    };

    if (esNoProductivo) {
      // Si es NP, llenar todos los campos op con 'NP'
      for (let i = 1; i <= 8; i++) {
        valores[`op${i}`] = 'NP';
      }
      valores.op = 'NP';
    } else {
      // Llenar con las respuestas del checklist
      screenPrinterChecklist.forEach((item, index) => {
        const campo = index === 0 ? 'op' : `op${index + 1}`;
        if (campo === 'op' || index < 8) {
          valores[campo] = respuestas[item.id] || null;
        }
      });
    }

    const campos = Object.keys(valores).join(', ');
    const placeholders = Object.keys(valores).map(() => '?').join(', ');
    const valoresArray = Object.values(valores);

    const query = `INSERT INTO ${tabla} (${campos}) VALUES (${placeholders})`;
    
    const [result] = await db.execute(query, valoresArray);
    
    res.json({ 
      success: true, 
      message: 'Checklist guardado exitosamente',
      id: result.insertId
    });

  } catch (error) {
    console.error('Error al guardar checklist:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener historial de checklists
router.get('/historial/:tabla', async (req, res) => {
  try {
    const { tabla } = req.params;
    const { limite = 50 } = req.query;
    
    const query = `SELECT * FROM ${tabla} ORDER BY fr DESC LIMIT ?`;
    const [rows] = await db.execute(query, [parseInt(limite)]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;