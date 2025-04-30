import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pedidos from './components/Pedidos';
import Reservas from './components/Reservas';
import Estoque from './components/Estoque';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-red-100 to-orange-200 flex flex-col justify-center items-center p-8">
        <header className="text-center max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Lee Guzta – Sistema Integrado
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            Plataforma para gestão de pedidos, reservas e estoque.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <Link to="/pedidos" className="bg-white hover:bg-red-100 shadow-lg p-6 rounded-lg border border-red-200 transition transform hover:scale-105">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Pedidos Online</h2>
              <p className="text-gray-700">Gerencie pedidos online com eficiência.</p>
            </Link>
            <Link to="/reservas" className="bg-white hover:bg-yellow-100 shadow-lg p-6 rounded-lg border border-yellow-200 transition transform hover:scale-105">
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">Reservas</h2>
              <p className="text-gray-700">Administre mesas e horários com facilidade.</p>
            </Link>
            <Link to="/estoque" className="bg-white hover:bg-green-100 shadow-lg p-6 rounded-lg border border-green-200 transition transform hover:scale-105">
              <h2 className="text-xl font-semibold text-green-600 mb-2">Estoque</h2>
              <p className="text-gray-700">Controle insumos e evite desperdícios.</p>
            </Link>
          </div>

          <footer className="mt-8 text-sm text-gray-500">
            Projeto Integrador – UNIVESP | Grupo 017 | 2025
          </footer>
        </header>

        <Routes>
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/estoque" element={<Estoque />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;