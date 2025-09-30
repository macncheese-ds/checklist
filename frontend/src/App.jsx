import React, { useState } from 'react';
import ChecklistForm from './pages/ChecklistForm';

function App() {
  const [currentPage, setCurrentPage] = useState('checklist');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Sistema de Checklist SMT</h1>
          <p className="text-blue-100 mt-1">Control de Equipos - Líneas de Producción</p>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        {currentPage === 'checklist' && <ChecklistForm />}
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Sistema de Checklist SMT. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;