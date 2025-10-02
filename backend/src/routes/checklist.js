
const stencilWasherChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Realice limpieza con trapo antipelusa y alcohol',
    metodo: 'Limpie con un wipe o trapo anti pelusa humedecido con alcohol, solamente las partes metálicas',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'funcionamiento_torretas',
    titulo: 'Compruebe el funcionamiento correcto de las torretas',
    inspeccion: 'Revisa que cambie de color al abrir alguna guarda del equipo',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'valvula_desague',
    titulo: 'Compruebe que la válvula para desagüe se encuentre cerrada',
    inspeccion: 'Revisión de locación de la válvula',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'paro_emergencia',
    titulo: 'Compruebe el funcionamiento del paro de emergencia',
    inspeccion: 'Revisa funcionamiento del botón',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'area_trabajo',
    titulo: 'Verifique que el área de trabajo se encuentre libre de obstrucciones',
    inspeccion: 'Revisa la zona de trabajo que no tenga obstrucciones',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'funcionamiento_seguros',
    titulo: 'Compruebe el funcionamiento de los seguros (candados)',
    inspeccion: 'Revisa que no presenten atoramiento o sonido extraño',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'manometro',
    titulo: 'Compruebe que el manometro marque 85Psi (±15 Mpa)',
    inspeccion: 'Revision de valor neumático, anótelo en la siguiente columna',
    metodo: 'Visual',
    tipo: 'number',
    unidad: 'Mpa',
    valor_esperado: 85,
    rango_min: 70,
    rango_max: 100
  }
];

const smartNozzleCleanerChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Realice limpieza con trapo antipelusa y alcohol',
    metodo: 'Limpie con un wipe o trapo anti pelusa humedecido con alcohol, solamente las partes metálicas',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'manometro',
    titulo: 'Compruebe que el manometro marque 0.4 Mpa (±0.5 Mpa)',
    inspeccion: 'Revision de valor neumático, anótelo en la siguiente columna',
    metodo: 'Visual',
    tipo: 'number',
    unidad: 'Mpa',
    valor_esperado: 0.4,
    rango_min: -0.1,
    rango_max: 0.9
  },
  {
    id: 'funcionamiento_pistones',
    titulo: 'Compruebe el funcionamiento correcto de los pistones de la guarda',
    inspeccion: 'Revisa que no presenten atoramiento o sonido extraño',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'paro_emergencia',
    titulo: 'Compruebe el funcionamiento del paro de emergencia',
    inspeccion: 'Revisa funcionamiento del botón',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'area_trabajo',
    titulo: 'Verifique que el área de trabajo se encuentre libre de obstrucciones',
    inspeccion: 'Revisa la zona de trabajo que no tenga obstrucciones',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'estado_bandas',
    titulo: 'Verifique el estado de las bandas',
    inspeccion: 'Revisa la condición de las bandas que no presenten daños o desgastes',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
];
const express = require('express');
const router = express.Router();
const db = require('../db');

// Mapeo de equipos por línea
const equiposLinea = {
  '1': ['Screen Printer (Yamaha)', 'Reflow Oven (Heller)', 'Loader Vacuum', 'Magazine Unloader', 'Laser Marking', 'Bottom Inspection', 'Arom System', 'Post-Reflow AOI 3D (Kohyoung)', 'Reflow Oven (SMT)', 'Pre-Reflow AOI 3D (Kohyoung)', 'SMD Mounter', '3D SPI', 'Screen Printer (DEK)', 'X-RAY'],
  '2': ['Screen Printer (Yamaha)', 'Reflow Oven (Heller)', 'Loader Vacuum', 'Magazine Unloader', 'Laser Marking', 'Bottom Inspection', 'Arom System', 'Post-Reflow AOI 3D (Kohyoung)', 'Reflow Oven (SMT)', 'Pre-Reflow AOI 3D (Kohyoung)', 'SMD Mounter', '3D SPI', 'Screen Printer (DEK)', 'X-RAY'],
  '3': ['Screen Printer (Yamaha)', 'Reflow Oven (Heller)', 'Loader Vacuum', 'Magazine Unloader', 'Laser Marking', 'Bottom Inspection', 'Arom System', 'Post-Reflow AOI 3D (Kohyoung)', 'Reflow Oven (SMT)', 'Pre-Reflow AOI 3D (Kohyoung)', 'SMD Mounter', '3D SPI', 'Screen Printer (DEK)', 'X-RAY'],
  '4': ['Screen Printer (Yamaha)', 'Reflow Oven (Heller)', 'Loader Vacuum', 'Magazine Unloader', 'Laser Marking', 'Bottom Inspection', 'Arom System', 'Post-Reflow AOI 3D (Kohyoung)', 'Reflow Oven (SMT)', 'Pre-Reflow AOI 3D (Kohyoung)', 'SMD Mounter', '3D SPI', 'Screen Printer (DEK)', 'X-RAY'],
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
  'Pre-Reflow AOI 3D (Kohyoung)': 'chkl16',
  'SMD Mounter': 'chkl17',
  '3D SPI': 'chkl18',
  'Screen Printer (DEK)': 'chkl19',
  'X-RAY': 'chkl20'
};

// Definición de checklist para X-RAY - chkl20
const xrayChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Realice limpieza con trapo antipelusa y alcohol',
    metodo: 'Limpie con un wipe o trapo antipelusa humedecido con alcohol, solamente las partes metálicas',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'inspeccion_rieles',
    titulo: 'Inspección de rieles transportadores',
    inspeccion: 'Compruebe la correcta transferencia del material',
    metodo: 'Inspección visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'verificacion_programa',
    titulo: 'Verificación de programa',
    inspeccion: 'Verificar que el programa cargado sea correcto y corresponde con el modelo',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'medicion_radiacion_entrada',
    titulo: 'Medicion de radiacion en Entrada',
    inspeccion: 'Revisar la medicion en el dispositivo digital en la entrada del equipo',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'uSv/h'
  },
  {
    id: 'medicion_radiacion_salida',
    titulo: 'Medicion de radiacion en Salida',
    inspeccion: 'Revisar la medicion en el dispositivo digital en la salida del equipo',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'uSv/h'
  }
];

// Definición de checklist para Screen Printer (Yamaha) - chkl1
const screenPrinterYamahaChecklist = [
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
    metodo: 'Verifique visualmente que el manómetro principal se encuentre en el rango 0.4 - 0.6Mpa',
    tipo: 'number',
    unidad: 'Mpa',
    valor_esperado: null,
    rango_min: 0.4,
    rango_max: 0.6
  },
  {
    id: 'temperatura',
    titulo: 'Temperatura',
    inspeccion: 'Temperatura interna',
    metodo: 'Registro de temperatura (22 a 28°C grados)',
    tipo: 'number',
    unidad: '°C',
    valor_esperado: null,
    rango_min: 22,
    rango_max: 28
  },
  {
    id: 'inspeccion_visual_squeegee',
    titulo: 'Inspección Visual de Squeegee (Navaja)',
    inspeccion: 'Verificar Físicamente antes de comenzar el proceso',
    metodo: 'Inspección de longitud e inspección visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
  ,
  {
    id: 'inspeccion_visual_stencil',
    titulo: 'Inspección Visual de Stencils antes de colocarlos en la Impresora',
    inspeccion: 'Verificar Físicamente antes de comenzar el proceso',
    metodo: 'Inspección visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
];

// Definición de checklist para Screen Printer (DEK) - chkl19
const screenPrinterDekChecklist = [
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
    metodo: 'Verifique visualmente que el manómetro principal se encuentre en el rango 0.4 - 0.6Mpa',
    tipo: 'number',
    unidad: 'Mpa',
    valor_esperado: null,
    rango_min: 0.4,
    rango_max: 0.6
  },
  {
    id: 'temperatura',
    titulo: 'Temperatura',
    inspeccion: 'Temperatura interna',
    metodo: 'Registro de temperatura (22 a 28°C grados)',
    tipo: 'number',
    unidad: '°C',
    valor_esperado: null,
    rango_min: 22,
    rango_max: 28
  },
  {
    id: 'inspeccion_visual_squeegee',
    titulo: 'Inspección Visual de Squeegee (Navaja)',
    inspeccion: 'Verificar Físicamente antes de comenzar el proceso',
    metodo: 'Inspección de longitud e inspección visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'inspeccion_visual_stencil',
    titulo: 'Inspección Visual de Stencils antes de colocarlos en la Impresora',
    inspeccion: 'Verificar Físicamente antes de comenzar el proceso',
    metodo: 'Inspección visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
];

// Definición de checklist para Squeeguee Cleaner
const squeegeecleanerChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Realice limpieza con trapo antipelusa y alcohol',
    metodo: 'Limpie con un wipe o trapo anti pelusa humedecido con alcohol, solamente las partes metálicas',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'funcionamiento_torretas',
    titulo: 'Compruebe el funcionamiento correcto de las torretas',
    inspeccion: 'Revisa que cambie de color al abrir alguna guarda del equipo',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'valvula_desague',
    titulo: 'Compruebe que la válvula para desagüe se encuentre cerrada',
    inspeccion: 'Revisión de locación de la válvula',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'paro_emergencia',
    titulo: 'Compruebe el funcionamiento del paro de emergencia',
    inspeccion: 'Revisa funcionamiento del botón',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'area_trabajo',
    titulo: 'Verifique que el área de trabajo se encuentre libre de obstrucciones',
    inspeccion: 'Revisa la zona de trabajo que no tenga obstrucciones',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  
];

// Definición de checklist para Reflow Oven (Heller) - chkl7
const reflowHellerChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Realice limpieza con trapo antipelusa y alcohol',
    metodo: 'Limpie con un wipe o trapo anti pelusa humedecido con alcohol, solamente las partes metálicas',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'inspeccion_rieles',
    titulo: 'Inspección de rieles transportadores',
    inspeccion: 'Compruebe la correcta transferencia del material (Entrada y salida)',
    metodo: 'Inspección visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'soporte_central',
    titulo: 'Estado de soporte central',
    inspeccion: 'Verificación de ubicación de CBS vs MasterList',
    metodo: 'Comparación visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'estado_horno',
    titulo: 'Estado del horno',
    inspeccion: 'Compruebe si la lampara se encuentra encendida (verde)',
    metodo: 'Visualmente',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'o2_ppm',
    titulo: 'Concentración de oxígeno',
    inspeccion: '400-1000 ppm (concentración de oxígeno) - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'ppm',
    rango_min: 400,
    rango_max: 1000
  },
  {
    id: 'n2_kgcm3',
    titulo: 'Estado del suministro de nitrógeno',
    inspeccion: '5 a 8 Kg/cm3 - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'kg/cm3',
    rango_min: 5,
    rango_max: 8
  },
  
];


// Definición de checklist para Squeeguee Inspector
const squeegeeInspectorChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Realice limpieza con trapo antipelusa y alcohol',
    metodo: 'Limpie con un wipe o trapo anti pelusa humedecido con alcohol, solamente las partes metálicas',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'funcionamiento_lampara',
    titulo: 'Compruebe el funcionamiento correcto de la lampara interna',
    inspeccion: 'Revisa que la luz encienda',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'manometro',
    titulo: 'Compruebe que el manometro marque 0.3Mpa (±1 Mpa)',
    inspeccion: 'Revision de valor neumático, anótelo en la siguiente columna',
    metodo: 'Visual',
    tipo: 'number',
    unidad: 'Mpa',
    valor_esperado: 0.3,
    rango_min: 0.2,
    rango_max: 1.3
  },
  {
    id: 'funcionamiento_bizagras',
    titulo: 'Compruebe el funcionamiento de las bizagras',
    inspeccion: 'Revisa que no presenten atoramiento o sonido extraño',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'area_trabajo',
    titulo: 'Verifique que el área de trabajo se encuentre libre de obstrucciones',
    inspeccion: 'Revisa la zona de trabajo que no tenga obstrucciones',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
];

// Definición de checklist para Loader Vacuum - chkl8
const loaderVacuumChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Limpie con un wipe o trapo antipelusa y alcohol',
    metodo: 'Limpie con un wipe o trapo antipelusa humedecido con alcohol, solamente las partes metálicas',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'manometro_magazine_loader',
    titulo: 'Manómetro digital (Magazine Loader)',
    inspeccion: '4.0-6.0 Mpa comprobación de presión - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'Mpa',
    valor_esperado: null,
    rango_min: 4.0,
    rango_max: 6.0
  },
  {
    id: 'transferencia_pcb',
    titulo: 'Revisar correcta transferencia de PCB',
    inspeccion: 'Revisar que no haya problema o atoramiento a la transferencia de la PCB',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'verificacion_ventosas',
    titulo: 'Verificación de ventosas',
    inspeccion: 'Revisar que todas las ventosas estén colocadas al correr Bottom',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'vacio_ventosas',
    titulo: 'Vacío de las ventosas (Vacuum Loader)',
    inspeccion: 'Revisa el manómetro digital (inferior a -50 kPa) - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'kPa',
    valor_esperado: -50,
    rango_min: -100,
    rango_max: -50
  },
  {
    id: 'manometro_vacuum_loader',
    titulo: 'Manómetro digital (Vacuum Loader)',
    inspeccion: '4.0-6.0 Mpa comprobación de presión - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'Mpa',
    valor_esperado: null,
    rango_min: 4.0,
    rango_max: 6.0
  }
];

// Definición de checklist para Magazine Unloader - chkl9
const magazineUnloaderChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Realice limpieza con trapo antipelusa y alcohol',
    metodo: 'Limpie con un wipe o trapo antipelusa humedecido con alcohol, solamente las partes metálicas',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'condicion_herramienta_empujar_pcba',
    titulo: 'Condición de la herramienta utilizada para empujar la PCBA',
    inspeccion: 'Revisar correcto funcionamiento y la limpieza',
    metodo: 'Visual / Operativa',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'sensor_seguridad',
    titulo: 'Sensor de seguridad',
    inspeccion: 'Cuando se abre la puerta, el equipo se detiene',
    metodo: 'Parada del equipo y confirmación de alarma al abrir la puerta',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'transferencia_pcb',
    titulo: 'Revisar correcta transferencia de PCB',
    inspeccion: 'Revisar que no haya problema o atoramiento a la transferencia de la PCB',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'manometro_principal_aire',
    titulo: 'Compruebe el manómetro principal de aire',
    inspeccion: '4.0-6.0 Mpa comprobación de presión - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'Mpa',
    valor_esperado: null,
    rango_min: 4.0,
    rango_max: 6.0
  }
  
];

// Definición de checklist para Laser Marking - chkl10
const laserMarkingChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Limpie con un wipe o trapo antipelusa humedecido con alcohol, solamente las partes metálicas',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'manometro_principal_aire',
    titulo: 'Compruebe el manómetro de aire',
    inspeccion: 'Revisa el manómetro 4.0-6.0 Mpa comprobación del estado - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'Mpa',
    valor_esperado: null,
    rango_min: 4.0,
    rango_max: 6.0
  },
  {
    id: 'transferencia_pcb',
    titulo: 'Revisar correcta transferencia de PCB',
    inspeccion: 'Revisar que no haya problema o atoramiento a la transferencia de la PCB',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'sensor_seguridad',
    titulo: 'Sensor de seguridad',
    inspeccion: 'Cuando se abre la puerta, verificar que se detenga o se active la alarma',
    metodo: 'Parada del equipo y confirmación de alarma cuando se abre la puerta',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'comprobacion_ionizador',
    titulo: 'Comprobación de funcionamiento del ionizador',
    inspeccion: 'Revisar que el ionizador esté encendido y funcionando',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
];

// Definición de checklist para Bottom Inspection - chkl12
const bottomInspectionChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Limpie con un wipe o trapo antipelusa humedecido con alcohol, solamente las partes metálicas',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'verificar_stopper',
    titulo: 'Verificar Stoper',
    inspeccion: 'Revisar que el stoper esté funcional',
    metodo: 'Visual/Operativa',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'transferencia_pcb',
    titulo: 'Revisar correcta transferencia de PCB',
    inspeccion: 'Revisar que no haya problema o atoramiento a la transferencia de la PCB',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'verificacion_programa',
    titulo: 'Verificación de programa',
    inspeccion: 'Verificar que el programa cargado sea correcto y corresponde con el modelo',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
];

// Definición de checklist para Post-Reflow AOI 3D (Kohyoung) - chkl14
const postReflowAOIChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Limpie con un wipe o trapo antipelusa humedecido con alcohol, solamente las partes metálicas',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'manometro_principal_aire',
    titulo: 'Compruebe el manómetro principal de aire',
    inspeccion: 'Revisa el manómetro 400-600 kPa comprobación del estado - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'kPa',
    valor_esperado: null,
    rango_min: 400,
    rango_max: 600
  },
  {
    id: 'sensor_seguridad',
    titulo: 'Sensor de seguridad',
    inspeccion: 'Cuando se abre la puerta, el equipo se detiene',
    metodo: 'Parada del equipo y confirmación de alarma al abrir la puerta',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'transferencia_pcb',
    titulo: 'Revisar correcta transferencia de PCB',
    inspeccion: 'Revisar que no haya problema o atoramiento a la transferencia de la PCB',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'verificacion_programa',
    titulo: 'Verificación de programa',
    inspeccion: 'Verificar que el programa cargado sea correcto y corresponde con el modelo',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
];

// Definición de checklist para Reflow Oven (SMT) - chkl15
const reflowSMTChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Limpie con un wipe o trapo antipelusa humedecido con alcohol, solamente las partes metálicas',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'inspeccion_rieles',
    titulo: 'Inspección de rieles transportadores',
    inspeccion: 'Compruebe la correcta transferencia del material (Entrada y salida)',
    metodo: 'Inspección visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'soporte_central',
    titulo: 'Estado de soporte central',
    inspeccion: 'Verificación de ubicación de CBS vs MasterList',
    metodo: 'Comparación visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'estado_horno',
    titulo: 'Estado del horno',
    inspeccion: 'Compruebe si la lampara se encuentra encendida (verde)',
    metodo: 'Visualmente',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'o2_ppm',
    titulo: 'Concentración de oxígeno',
    inspeccion: '400-1000 ppm (concentración de oxígeno) - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'ppm',
    rango_min: 400,
    rango_max: 1000
  },
  {
    id: 'n2_kgcm2',
    titulo: 'Estado del suministro de nitrógeno (manómetro principal)',
    inspeccion: '5 a 8 Kg/cm2 - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'kg/cm2',
    rango_min: 5,
    rango_max: 8
  }
];

// Definición de checklist para Pre-Reflow AOI 3D (Kohyoung) - chkl16
const preReflowAOIChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Limpie con un wipe o trapo antipelusa humedecido con alcohol, solamente las partes metálicas',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'manometro_principal_aire',
    titulo: 'Compruebe el manómetro principal de aire',
    inspeccion: 'Revisa el manómetro 400-600 kPa comprobación del estado - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'kPa',
    valor_esperado: null,
    rango_min: 400,
    rango_max: 600
  },
  {
    id: 'inspeccion_rieles',
    titulo: 'Inspección de rieles transportadores',
    inspeccion: 'Compruebe la correcta transferencia del material (Entrada y salida)',
    metodo: 'Inspección visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'soporte_central',
    titulo: 'Estado de soporte central',
    inspeccion: 'Verificación de ubicación de CBS vs MasterList',
    metodo: 'Comparación visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'verificacion_programa',
    titulo: 'Verificación de programa',
    inspeccion: 'Verificar que el programa cargado sea correcto y corresponde con el modelo',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
];

// Definición de checklist para SMD Mounter - chkl17
const smdMounterChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Realice limpieza con trapo antipelusa y alcohol',
    metodo: 'Limpie con un wipe o trapo antipelusa humedecido con alcohol, solamente las partes metálicas',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'condicion_lente_camara',
    titulo: 'Condición de Lente de camara',
    inspeccion: 'Verificar que no se encuentren objetos extraños en la lente / extraños en lente',
    metodo: 'Visualmente',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'presion_en_la_base_1',
    titulo: 'Presion en la base',
    inspeccion: '0.400 - 0.600 Mpa comprobacion de presion en manometro digital',
    metodo: 'Visualmente',
    tipo: 'number',
    unidad: 'Mpa',
    rango_min: 0.4,
    rango_max: 0.6
  },
  {
    id: 'presion_en_la_base_2',
    titulo: 'Presion en la base',
    inspeccion: '0.400 - 0.600 Mpa comprobacion de presion en manometro digital',
    metodo: 'Visualmente',
    tipo: 'number',
    unidad: 'Mpa',
    rango_min: 0.4,
    rango_max: 0.6
  },
  {
    id: 'presion_de_vacio_1',
    titulo: 'Presion de vacio en la base',
    inspeccion: 'Verificar que la lectura en el manometro digital se encuentre en -60Kpa o inferior (anotar valor)',
    metodo: 'Visualmente',
    tipo: 'number',
    unidad: 'kPa',
    rango_min: -100,
    rango_max: -60
  },
  {
    id: 'presion_de_vacio_2',
    titulo: 'Presion de vacio en la base',
    inspeccion: 'Verificar que la lectura en el manometro digital se encuentre en -60Kpa o inferior (anotar valor)',
    metodo: 'Visualmente',
    tipo: 'number',
    unidad: 'kPa',
    rango_min: -100,
    rango_max: -60
  },
  {
    id: 'condicion_intercambio_boquillas',
    titulo: 'Condicion intercambio de boquillas',
    inspeccion: 'Verificar que no se encuentren objetos extraños en el intercambio/ador',
    metodo: 'Visualmente',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'sensor_seguridad',
    titulo: 'Sensor de seguridad',
    inspeccion: 'Cuando se abre la puerta, el equipo se detiene',
    metodo: 'Parada del equipo y confirmación de alarma al abrir la puerta',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'condicion_modulo',
    titulo: 'Condicion del modulo',
    inspeccion: 'Verificar que no se encuentren objetos extraños en la base de los feeders en la mesa de los modulos',
    metodo: 'Visualmente',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
];

// Definición de checklist para 3D SPI - chkl18
const spi3DChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Realice limpieza con trapo antipelusa y alcohol',
    metodo: 'Limpie con un wipe o trapo antipelusa humedecido con alcohol, solamente las partes metálicas',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'manometro_principal_aire',
    titulo: 'Compruebe el manómetro principal de aire',
    inspeccion: 'Revisa el manómetro 400-600 Kpa comprobacion del estado - anotar valor',
    metodo: 'Visualmente',
    tipo: 'number',
    unidad: 'kPa',
    rango_min: 400,
    rango_max: 600
  },
  {
    id: 'sensor_seguridad',
    titulo: 'Sensor de seguridad',
    inspeccion: 'Cuando se abre la puerta, el equipo se detiene',
    metodo: 'Parada del equipo y confirmación de alarma al abrir la puerta',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'transferencia_pcb',
    titulo: 'Revisar correcta transferencia de PCB',
    inspeccion: 'Revisar que no haya problema o atoramiento a la transferencia de la PCB',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'verificacion_programa',
    titulo: 'Verificación de programa',
    inspeccion: 'Verificar que el programa cargado sea correcto y corresponde con el modelo',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  }
];

// Definición de checklist para Arom System - chkl13
const aromSystemChecklist = [
  {
    id: 'limpieza_frontal',
    titulo: 'Limpieza de la parte frontal del equipo',
    inspeccion: 'Limpie con un wipe o trapo antipelusa humedecido con alcohol, solamente las partes metálicas',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'manometro_principal_aire',
    titulo: 'Compruebe el manómetro principal de aire',
    inspeccion: 'Revisa el manómetro 4.0-6.0 Mpa comprobación del estado - anotar valor',
    metodo: 'Medición',
    tipo: 'number',
    unidad: 'Mpa',
    valor_esperado: null,
    rango_min: 4.0,
    rango_max: 6.0
  },
  {
    id: 'transferencia_pcb',
    titulo: 'Revisar correcta transferencia de PCB',
    inspeccion: 'Revisar que no haya problema o atoramiento a la transferencia de la PCB',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'verificacion_programa',
    titulo: 'Verificación de programa',
    inspeccion: 'Verificar que el programa cargado sea correcto y corresponde con el modelo',
    metodo: 'Visual',
    tipo: 'select',
    opciones: ['OK', 'NO OK', 'N/A']
  },
  {
    id: 'sensor_seguridad',
    titulo: 'Sensor de seguridad',
    inspeccion: 'Cuando se abre la puerta, el equipo se detiene',
    metodo: 'Parada del equipo y confirmación de alarma al abrir la puerta',
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
    
    if (equipo === 'Screen Printer (Yamaha)') {
      res.json(screenPrinterYamahaChecklist);
    } else if (equipo === 'Screen Printer (DEK)') {
      res.json(screenPrinterDekChecklist);
    } else if (equipo === 'Squeeguee Cleaner') {
      res.json(squeegeecleanerChecklist);
    } else if (equipo === 'Reflow Oven (Heller)') {
      res.json(reflowHellerChecklist);
    } else if (equipo === 'Loader Vacuum') {
      res.json(loaderVacuumChecklist);
    } else if (equipo === 'Magazine Unloader') {
      res.json(magazineUnloaderChecklist);
    } else if (equipo === 'Laser Marking') {
      res.json(laserMarkingChecklist);
    } else if (equipo === 'Bottom Inspection') {
      res.json(bottomInspectionChecklist);
    } else if (equipo === 'Arom System') {
      res.json(aromSystemChecklist);
    } else if (equipo === 'Post-Reflow AOI 3D (Kohyoung)') {
      res.json(postReflowAOIChecklist);
    } else if (equipo === 'Reflow Oven (SMT)') {
      res.json(reflowSMTChecklist);
    } else if (equipo === 'SMD Mounter') {
      res.json(smdMounterChecklist);
    } else if (equipo === 'Pre-Reflow AOI 3D (Kohyoung)') {
      res.json(preReflowAOIChecklist);
    } else if (equipo === '3D SPI') {
      res.json(spi3DChecklist);
    } else if (equipo === 'X-RAY') {
      res.json(xrayChecklist);
    } else if (equipo === 'Squeeguee Inspector') {
      res.json(squeegeeInspectorChecklist);
    } else if (equipo === 'Stencil Washer') {
      res.json(stencilWasherChecklist);
    } else if (equipo === 'Smart Nozzle Cleaner') {
      res.json(smartNozzleCleanerChecklist);
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

    // For all Lavado equipment, force linea to 'Lavado'
    const lavadoEquipos = [
      'Squeeguee Cleaner',
      'Squeeguee Inspector',
      'Stencil Washer',
      'Smart Nozzle Cleaner'
    ];
    let lineaFinal = linea;
    if (lavadoEquipos.includes(equipo)) {
      lineaFinal = 'Lavado';
    }

    let valores = {
      linea: lineaFinal || null,
      turno: turno || null,
      fr: new Date(),
      empleado: empleado || null,
      modelo: modelo || null,
      observaciones: observaciones || null
    };

    // magazineUnloaderChecklist is defined at top-level so it can be reused by GET and POST

    // Obtener el checklist correspondiente al equipo
    let checklistActual = [];
    if (equipo === 'Screen Printer (Yamaha)') {
      checklistActual = screenPrinterYamahaChecklist;
    } else if (equipo === 'Screen Printer (DEK)') {
      checklistActual = screenPrinterDekChecklist;
    } else if (equipo === 'Squeeguee Cleaner') {
      checklistActual = squeegeecleanerChecklist;
    } else if (equipo === 'Reflow Oven (Heller)') {
      checklistActual = reflowHellerChecklist;
    } else if (equipo === 'Loader Vacuum') {
      checklistActual = loaderVacuumChecklist;
    } else if (equipo === 'Magazine Unloader') {
      checklistActual = magazineUnloaderChecklist;
    } else if (equipo === 'Laser Marking') {
      checklistActual = laserMarkingChecklist;
    } else if (equipo === 'Bottom Inspection') {
      checklistActual = bottomInspectionChecklist;
    } else if (equipo === 'Arom System') {
      checklistActual = aromSystemChecklist;
    } else if (equipo === 'Post-Reflow AOI 3D (Kohyoung)') {
      checklistActual = postReflowAOIChecklist;
    } else if (equipo === 'Reflow Oven (SMT)') {
      checklistActual = reflowSMTChecklist;
    } else if (equipo === 'SMD Mounter') {
      checklistActual = smdMounterChecklist;
    } else if (equipo === 'Pre-Reflow AOI 3D (Kohyoung)') {
      checklistActual = preReflowAOIChecklist;
    } else if (equipo === '3D SPI') {
      checklistActual = spi3DChecklist;
    } else if (equipo === 'X-RAY') {
      checklistActual = xrayChecklist;
    } else if (equipo === 'Squeeguee Inspector') {
      checklistActual = squeegeeInspectorChecklist;
    } else if (equipo === 'Stencil Washer') {
      checklistActual = stencilWasherChecklist;
    } else if (equipo === 'Smart Nozzle Cleaner') {
      checklistActual = smartNozzleCleanerChecklist;
    }

    const numOps = checklistActual.length;

    if (esNoProductivo) {
      // Si es NP, llenar todos los campos opN con 'NP'
      for (let i = 1; i <= numOps; i++) {
        valores[`op${i}`] = 'NP';
      }
    } else {
      // Llenar con las respuestas del checklist
      checklistActual.forEach((item, index) => {
        const campo = `op${index + 1}`;
        valores[campo] = respuestas[item.id] || null;
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