import React, { useState, useEffect } from 'react';

const cardapio = [
  { id: 1, nome: '4 Queijos', preco: 51.99 },
  { id: 2, nome: 'Black', preco: 32.99 },
  { id: 3, nome: 'Cebolla Caliente', preco: 39.99 },
  { id: 4, nome: 'Max Costela Desfiada', preco: 42.99 },
];

const STORAGE_KEY = 'pedidos-lgg';

function Pedidos() {
  const [mesa, setMesa] = useState('');
  const [modoOnline, setModoOnline] = useState(false);
  const [quantidades, setQuantidades] = useState({});
  const [pedidosEnviados, setPedidosEnviados] = useState([]);

  useEffect(() => {
    const salvos = localStorage.getItem(STORAGE_KEY);
    if (salvos) setPedidosEnviados(JSON.parse(salvos));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pedidosEnviados));
  }, [pedidosEnviados]);

  const atualizarQuantidade = (id, valor) => {
    const val = parseInt(valor);
    if (!isNaN(val) && val >= 0) {
      setQuantidades({ ...quantidades, [id]: val });
    }
  };

  const enviarPedido = () => {
    const selecionados = cardapio
      .filter((item) => quantidades[item.id] > 0)
      .map((item) => ({
        ...item,
        quantidade: quantidades[item.id],
        total: quantidades[item.id] * item.preco,
      }));

    if (selecionados.length === 0) {
      alert('Selecione ao menos 1 item com quantidade > 0');
      return;
    }

    const novoPedido = {
      id: Date.now(),
      mesa: modoOnline ? 'Online' : mesa,
      itens: selecionados,
    };

    setPedidosEnviados((prev) => [...prev, novoPedido]);
    setQuantidades({});
    setMesa('');
  };

  const cancelarPedido = (id) => {
    const atualizados = pedidosEnviados.filter((p) => p.id !== id);
    setPedidosEnviados(atualizados);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Gerenciar Pedidos</h2>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={modoOnline}
            onChange={() => setModoOnline(!modoOnline)}
          />
          Pedido Online?
        </label>

        {!modoOnline && (
          <input
            type="text"
            value={mesa}
            onChange={(e) => setMesa(e.target.value)}
            placeholder="Número da mesa"
            className="p-2 border border-gray-300 rounded w-full sm:w-48"
          />
        )}
      </div>

      <h3 className="text-xl font-semibold mt-4 mb-2">Cardápio</h3>
      <table className="w-full bg-white shadow-md rounded mb-6">
        <thead className="bg-red-100 text-left">
          <tr>
            <th className="p-3">Item</th>
            <th className="p-3">Preço</th>
            <th className="p-3">Qtd</th>
          </tr>
        </thead>
        <tbody>
          {cardapio.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.nome}</td>
              <td className="p-3">R$ {item.preco.toFixed(2)}</td>
              <td className="p-3">
                <input
                  type="number"
                  min="0"
                  value={quantidades[item.id] || ''}
                  onChange={(e) => atualizarQuantidade(item.id, e.target.value)}
                  className="w-16 border rounded p-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={enviarPedido}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Enviar Pedido
      </button>

      {pedidosEnviados.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">Pedidos Enviados</h3>
          <ul className="space-y-4">
            {pedidosEnviados.map((pedido) => (
              <li key={pedido.id} className="bg-white shadow p-4 rounded">
                <div className="flex justify-between">
                  <p className="font-bold">Mesa: {pedido.mesa}</p>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => cancelarPedido(pedido.id)}
                  >
                    Cancelar
                  </button>
                </div>
                <ul className="mt-2 text-sm list-disc pl-5 text-gray-700">
                  {pedido.itens.map((item, i) => (
                    <li key={i}>
                      {item.quantidade}x {item.nome} – R$ {item.total.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Pedidos;