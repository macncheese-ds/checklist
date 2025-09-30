import React, { useState, useEffect } from 'react';
import api from '../api';

function ChecklistForm() {
  const [step, setStep] = useState('seleccion'); // 'seleccion', 'formulario', 'completado'
  const [selectedLinea, setSelectedLinea] = useState('');
  const [selectedEquipo, setSelectedEquipo] = useState('');
  const [equiposDisponibles, setEquiposDisponibles] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [currentCheckIndex, setCurrentCheckIndex] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [formData, setFormData] = useState({
    turno: '',
    empleado: '',
    modelo: '',
    observaciones: ''
  });
  const [esNoProductivo, setEsNoProductivo] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cargar equipos cuando se selecciona una línea
  useEffect(() => {
    if (selectedLinea) {
      const fetchEquipos = async () => {
        try {
          const equipos = await api.getEquiposByLinea(selectedLinea);
          setEquiposDisponibles(equipos);
        } catch (error) {
          console.error('Error al cargar equipos:', error);
        }
      };
      fetchEquipos();
    }
  }, [selectedLinea]);

  // Cargar checklist cuando se selecciona un equipo
  useEffect(() => {
    if (selectedEquipo) {
      const fetchChecklist = async () => {
        try {
          const checklistData = await api.getChecklistByEquipo(selectedEquipo);
          if (Array.isArray(checklistData)) {
            setChecklist(checklistData);
          } else {
            alert('Checklist aún no configurado para este equipo');
          }
        } catch (error) {
          console.error('Error al cargar checklist:', error);
        }
      };
      fetchChecklist();
    }
  }, [selectedEquipo]);

  const handleLineaChange = (e) => {
    setSelectedLinea(e.target.value);
    setSelectedEquipo('');
    setEquiposDisponibles([]);
  };

  const handleEquipoChange = (e) => {
    setSelectedEquipo(e.target.value);
  };

  const iniciarChecklist = () => {
    if (!selectedLinea || !selectedEquipo) {
      alert('Por favor selecciona línea y equipo');
      return;
    }
    
    if (!formData.turno || !formData.empleado) {
      alert('Por favor completa turno y empleado');
      return;
    }

    setStep('formulario');
    setCurrentCheckIndex(0);
  };

  const handleRespuesta = (valor) => {
    const currentCheck = checklist[currentCheckIndex];
    const newRespuestas = {
      ...respuestas,
      [currentCheck.id]: valor
    };
    setRespuestas(newRespuestas);
  };

  const siguienteItem = () => {
    if (currentCheckIndex < checklist.length - 1) {
      setCurrentCheckIndex(currentCheckIndex + 1);
    } else {
      // Último item, guardar checklist
      guardarChecklist();
    }
  };

  const anteriorItem = () => {
    if (currentCheckIndex > 0) {
      setCurrentCheckIndex(currentCheckIndex - 1);
    }
  };

  const guardarChecklist = async () => {
    setLoading(true);
    try {
      const data = {
        equipo: selectedEquipo,
        linea: selectedLinea !== 'Lavado' ? selectedLinea : null,
        turno: formData.turno,
        empleado: formData.empleado,
        modelo: formData.modelo,
        esNoProductivo,
        respuestas,
        observaciones: formData.observaciones
      };

      const result = await api.guardarChecklist(data);
      
      if (result.success) {
        setStep('completado');
      } else {
        alert('Error al guardar: ' + result.error);
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el checklist');
    } finally {
      setLoading(false);
    }
  };

  const reiniciarFormulario = () => {
    setStep('seleccion');
    setSelectedLinea('');
    setSelectedEquipo('');
    setEquiposDisponibles([]);
    setChecklist([]);
    setCurrentCheckIndex(0);
    setRespuestas({});
    setFormData({
      turno: '',
      empleado: '',
      modelo: '',
      observaciones: ''
    });
    setEsNoProductivo(false);
  };

  const manejarNoProductivo = async () => {
    setEsNoProductivo(true);
    await guardarChecklist();
  };

  // Render de selección inicial
  if (step === 'seleccion') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuevo Checklist</h2>
          
          <div className="space-y-4">
            {/* Selección de Línea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Línea de Producción
              </label>
              <select
                value={selectedLinea}
                onChange={handleLineaChange}
                className="select-field"
              >
                <option value="">Selecciona una línea</option>
                <option value="1">Línea 1</option>
                <option value="2">Línea 2</option>
                <option value="3">Línea 3</option>
                <option value="4">Línea 4</option>
                <option value="Lavado">Lavado</option>
              </select>
            </div>

            {/* Selección de Equipo */}
            {equiposDisponibles.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Equipo
                </label>
                <select
                  value={selectedEquipo}
                  onChange={handleEquipoChange}
                  className="select-field"
                >
                  <option value="">Selecciona un equipo</option>
                  {equiposDisponibles.map((equipo, index) => (
                    <option key={index} value={equipo}>
                      {equipo}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Información del operador */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Turno
              </label>
              <select
                value={formData.turno}
                onChange={(e) => setFormData({...formData, turno: e.target.value})}
                className="select-field"
              >
                <option value="">Selecciona turno</option>
                <option value="1er Turno">1er Turno</option>
                <option value="2do Turno">2do Turno</option>
                <option value="3er Turno">3er Turno</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Empleado
              </label>
              <input
                type="text"
                value={formData.empleado}
                onChange={(e) => setFormData({...formData, empleado: e.target.value})}
                className="input-field"
                placeholder="Nombre del empleado"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo (Opcional)
              </label>
              <input
                type="text"
                value={formData.modelo}
                onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                className="input-field"
                placeholder="Modelo del producto"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observaciones (Opcional)
              </label>
              <textarea
                value={formData.observaciones}
                onChange={(e) => setFormData({...formData, observaciones: e.target.value})}
                className="input-field"
                rows={3}
                placeholder="Observaciones adicionales"
              />
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={iniciarChecklist}
                disabled={!selectedLinea || !selectedEquipo || !formData.turno || !formData.empleado}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Iniciar Checklist
              </button>
              
              <button
                onClick={manejarNoProductivo}
                disabled={!selectedLinea || !selectedEquipo || !formData.turno || !formData.empleado || loading}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Guardando...' : 'NP (No Produce)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render del formulario paso a paso
  if (step === 'formulario' && checklist.length > 0) {
    const currentCheck = checklist[currentCheckIndex];
    const currentResponse = respuestas[currentCheck.id];

    return (
      <div className="max-w-3xl mx-auto">
        <div className="card">
          {/* Header con progreso */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {selectedEquipo} - Línea {selectedLinea}
              </h2>
              <span className="text-sm text-gray-600">
                {currentCheckIndex + 1} de {checklist.length}
              </span>
            </div>
            
            {/* Barra de progreso */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCheckIndex + 1) / checklist.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Item actual del checklist */}
          <div className="checklist-item">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {currentCheck.titulo}
            </h3>
            
            <div className="mb-4">
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Inspección:</span> {currentCheck.inspeccion}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Método:</span> {currentCheck.metodo}
              </p>
            </div>

            {/* Campo de respuesta */}
            <div className="mb-6">
              {currentCheck.tipo === 'select' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resultado:
                  </label>
                  <select
                    value={currentResponse || ''}
                    onChange={(e) => handleRespuesta(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Selecciona una opción</option>
                    {currentCheck.opciones.map((opcion, index) => (
                      <option key={index} value={opcion}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
              ) : currentCheck.tipo === 'number' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor ({currentCheck.unidad}):
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={currentResponse || ''}
                    onChange={(e) => handleRespuesta(e.target.value)}
                    className="input-field"
                    placeholder={`Rango: ${currentCheck.rango_min} - ${currentCheck.rango_max} ${currentCheck.unidad}`}
                  />
                  {currentCheck.valor_esperado && (
                    <p className="text-sm text-gray-600 mt-1">
                      Valor esperado: {currentCheck.valor_esperado} {currentCheck.unidad}
                    </p>
                  )}
                </div>
              ) : null}
            </div>

            {/* Botones de navegación */}
            <div className="flex justify-between">
              <button
                onClick={anteriorItem}
                disabled={currentCheckIndex === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Anterior
              </button>
              
              <button
                onClick={siguienteItem}
                disabled={!currentResponse}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentCheckIndex === checklist.length - 1 ? 'Finalizar' : 'Siguiente →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render de completado
  if (step === 'completado') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Checklist Completado!</h2>
            <p className="text-gray-600">
              El checklist para {selectedEquipo} ha sido guardado exitosamente.
            </p>
          </div>
          
          <button
            onClick={reiniciarFormulario}
            className="btn-primary"
          >
            Nuevo Checklist
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <p className="text-center text-gray-600">Cargando...</p>
      </div>
    </div>
  );
}

export default ChecklistForm;