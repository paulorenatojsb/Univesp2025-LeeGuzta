import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'estoque-lgg';

function Estoque() {
  const [estoque, setEstoque] = useState([]);
  const [novoItem, setNovoItem] = useState({ item: '', quantidade: '', status: 'OK' });
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const salvos = localStorage.getItem(STORAGE_KEY);
    if (salvos) setEstoque(JSON.parse(salvos));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estoque));
  }, [estoque]);

  const adicionarItem = () => {
    if (!novoItem.item || !novoItem.quantidade) {
      alert('Preencha todos os campos');
      return;
    }

    setEstoque([...estoque, { ...novoItem, id: Date.now() }]);
    setNovoItem({ item: '', quantidade: '', status: 'OK' });
  };

  const excluirItem = (id) => {
    setEstoque(estoque.filter((e) => e.id !== id));
  };

  const iniciarEdicao = (id) => setEditandoId(id);

  const salvarEdicao = (id, campo, valor) => {
    setEstoque(
      estoque.map((e) =>
        e.id === id ? { ...e, [campo]: valor } : e
      )
    );
  };

  const concluirEdicao = () => setEditandoId(null);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Controle de Estoque</h2>

      <div className="bg-white p-4 mb-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Adicionar Novo Item</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Item"
            className="border p-2 rounded"
            value={novoItem.item}
            onChange={(e) => setNovoItem({ ...novoItem, item: e.target.value })}
          />
          <input
            type="text"
            placeholder="Quantidade"
            className="border p-2 rounded"
            value={novoItem.quantidade}
            onChange={(e) => setNovoItem({ ...novoItem, quantidade: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={novoItem.status}
            onChange={(e) => setNovoItem({ ...novoItem, status: e.target.value })}
          >
            <option value="OK">OK</option>
            <option value="Baixo">Baixo</option>
            <option value="Repor">Repor</option>
          </select>
        </div>
        <button
          onClick={adicionarItem}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Adicionar
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-green-100">
          <tr>
            <th className="text-left p-3">Item</th>
            <th className="text-left p-3">Quantidade</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map((e) => (
            <tr key={e.id} className="border-t">
              <td className="p-3">
                {editandoId === e.id ? (
                  <input
                    value={e.item}
                    onChange={(e2) => salvarEdicao(e.id, 'item', e2.target.value)}
                    onBlur={concluirEdicao}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <span onClick={() => iniciarEdicao(e.id)} className="cursor-pointer">{e.item}</span>
                )}
              </td>
              <td className="p-3">
                {editandoId === e.id ? (
                  <input
                    value={e.quantidade}
                    onChange={(e2) => salvarEdicao(e.id, 'quantidade', e2.target.value)}
                    onBlur={concluirEdicao}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <span onClick={() => iniciarEdicao(e.id)} className="cursor-pointer">{e.quantidade}</span>
                )}
              </td>
              <td className="p-3">
                {editandoId === e.id ? (
                  <select
                    value={e.status}
                    onChange={(e2) => salvarEdicao(e.id, 'status', e2.target.value)}
                    onBlur={concluirEdicao}
                    className="border p-1 rounded"
                  >
                    <option value="OK">OK</option>
                    <option value="Baixo">Baixo</option>
                    <option value="Repor">Repor</option>
                  </select>
                ) : (
                  <span
                    onClick={() => iniciarEdicao(e.id)}
                    className={`cursor-pointer font-medium ${
                      e.status === 'Repor'
                        ? 'text-red-600'
                        : e.status === 'Baixo'
                        ? 'text-yellow-600'
                        : 'text-green-700'
                    }`}
                  >
                    {e.status}
                  </span>
                )}
              </td>
              <td className="p-3">
                <button
                  onClick={() => excluirItem(e.id)}
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

export default Estoque;