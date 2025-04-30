import React from 'react';

const estoque = [
  { item: 'Batata Palito 7mm', quantidade: '5kg', status: 'OK' },
  { item: 'Cebola Empanada', quantidade: '1kg', status: 'Baixo' },
  { item: 'Pão de Hambúrguer Prime', quantidade: '20 unidades', status: 'OK' },
  { item: 'Maionese Caseira', quantidade: '500ml', status: 'Repor' },
];

function Estoque() {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center text-green-600">Controle de Estoque</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-green-100">
          <tr>
            <th className="text-left p-4">Item</th>
            <th className="text-left p-4">Quantidade</th>
            <th className="text-left p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {estoque.map((produto, index) => (
            <tr key={index} className="border-t">
              <td className="p-4">{produto.item}</td>
              <td className="p-4">{produto.quantidade}</td>
              <td className={`p-4 font-medium ${produto.status === 'Repor' ? 'text-red-600' : produto.status === 'Baixo' ? 'text-yellow-600' : 'text-green-700'}`}>
                {produto.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Estoque;