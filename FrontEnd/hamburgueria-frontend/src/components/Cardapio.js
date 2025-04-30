import React from 'react';

const cardapio = [
  {
    categoria: 'Porções',
    itens: [
      { nome: 'Batata Grande', descricao: '400g batata palito 7mm', preco: 32.00 },
      { nome: 'Batata Rústica', descricao: '300g com manteiga derretida', preco: 28.00 },
      { nome: 'Cebola Empanada Grande', descricao: '25 anéis de cebola', preco: 39.00 },
    ],
  },
  {
    categoria: 'Hambúrgueres Especiais',
    itens: [
      { nome: '4 Queijos', descricao: '200g + 4 tipos de queijo + batata frita', preco: 51.99 },
      { nome: 'Cebolla Caliente', descricao: '150g + cebola empanada + molho picante', preco: 39.99 },
      { nome: 'Max Costela Desfiada', descricao: 'Costela + cebola roxa + pão francês', preco: 42.99 },
    ],
  },
  {
    categoria: 'Bebidas',
    itens: [
      { nome: 'Heineken Long Neck', descricao: '330ml', preco: 10.00 },
      { nome: 'Del Valle Goiaba', descricao: 'Suco lata 290ml', preco: 8.00 },
      { nome: 'Cerveja Jabuticaba', descricao: 'Leve, frisante, levemente ácida', preco: 27.00 },
    ],
  },
  {
    categoria: 'Extras',
    itens: [
      { nome: 'Potinho Catupiry', descricao: 'Extra para lanches', preco: 9.00 },
      { nome: 'Potinho Molho Barbecue', descricao: 'Molho defumado agridoce', preco: 4.00 },
    ],
  },
];

function Cardapio() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Cardápio Lee Guzta</h2>

      {cardapio.map((categoria, index) => (
        <div key={index} className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 border-b pb-1 mb-3">{categoria.categoria}</h3>
          <ul className="space-y-3">
            {categoria.itens.map((item, i) => (
              <li key={i} className="bg-white shadow p-4 rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium text-gray-900">{item.nome}</p>
                    <p className="text-sm text-gray-600">{item.descricao}</p>
                  </div>
                  <p className="text-green-700 font-semibold text-lg">R$ {item.preco.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Cardapio;