import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'reservas-lgg';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [nome, setNome] = useState('');
  const [mesa, setMesa] = useState('');
  const [horario, setHorario] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    const salvas = localStorage.getItem(STORAGE_KEY);
    if (salvas) setReservas(JSON.parse(salvas));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservas));
  }, [reservas]);

  const adicionarReserva = () => {
    if (!nome || !mesa || !horario || !data) {
      alert('Preencha todos os campos');
      return;
    }

    const novaReserva = { id: Date.now(), nome, mesa, horario, data };
    setReservas((prev) => [...prev, novaReserva]);
    setNome('');
    setMesa('');
    setHorario('');
    setData('');
  };

  const excluirReserva = (id) => {
    setReservas(reservas.filter((r) => r.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-yellow-600">Reservas</h2>

      <div className="bg-white p-4 mb-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Nova Reserva</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Nome do cliente"
            className="border p-2 rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mesa"
            className="border p-2 rounded"
            value={mesa}
            onChange={(e) => setMesa(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <input
            type="time"
            className="border p-2 rounded"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          />
        </div>
        <button
          onClick={adicionarReserva}
          className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Adicionar Reserva
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-yellow-100">
          <tr>
            <th className="text-left p-3">Cliente</th>
            <th className="text-left p-3">Mesa</th>
            <th className="text-left p-3">Data</th>
            <th className="text-left p-3">Horário</th>
            <th className="text-left p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id} className="border-t">
              <td className="p-3">{reserva.nome}</td>
              <td className="p-3">{reserva.mesa}</td>
              <td className="p-3">{reserva.data}</td>
              <td className="p-3">{reserva.horario}</td>
              <td className="p-3">
                <button
                  onClick={() => excluirReserva(reserva.id)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservas;