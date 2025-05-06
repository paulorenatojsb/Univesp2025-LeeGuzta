import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NovoPedido.css';

const NovoPedido = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [mesa, setMesa] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Carregar itens do cardápio do backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/api/cardapio/cardapio/');
        console.log('Dados do cardápio recebidos:', response.data);

        // Agrupar itens por categoria
        const agrupado = response.data.reduce((acc, item) => {
          const categoria = item.categoria || 'OUTROS';
          if (!acc[categoria]) acc[categoria] = [];
          acc[categoria].push(item);
          return acc;
        }, {});
        setMenuItems(agrupado);
      } catch (error) {
        console.error('Erro ao carregar o cardápio:', error);
      }
    };

    fetchMenuItems();
  }, []);

  // Adicionar item ao pedido
  const adicionarItem = (itemId) => {
    const jaAdicionado = pedido.find((p) => p.item === itemId);
    if (!jaAdicionado) {
      setPedido([...pedido, { item: itemId, quantidade: 1 }]);
    }
  };

  // Atualizar quantidade de um item no pedido
  const atualizarQuantidade = (itemId, quantidade) => {
    setPedido(
      pedido.map((p) =>
        p.item === itemId ? { ...p, quantidade: Number(quantidade) } : p
      )
    );
  };

  // Remover item do pedido
  const removerItem = (itemId) => {
    setPedido(pedido.filter((p) => p.item !== itemId));
  };

  // Enviar pedido para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/pedidos/', {
        mesa,
        itens: pedido,
      });
      setMensagem('Pedido criado com sucesso!');
      setMesa('');
      setPedido([]);
    } catch (error) {
      setMensagem('Erro ao criar pedido.');
      console.error(error);
    }
  };

  return (
    <div className="novo-pedido-container">
      <h2>Criar Novo Pedido</h2>

      {/* Campo para número da mesa */}
      <label>Mesa:</label>
      <input
        type="text"
        value={mesa}
        onChange={(e) => setMesa(e.target.value)}
        placeholder="Digite o número da mesa"
        required
      />

      {/* Seleção de itens do cardápio */}
      <h3>Selecione Itens:</h3>
      <div className="itens-cardapio">
        {Object.entries(menuItems).map(([categoria, itens]) => (
          <div key={categoria}>
            <h4>{categoria}</h4>
            {itens.map((item) => (
              <button key={item.id} onClick={() => adicionarItem(item.id)}>
                {item.nome}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Lista de itens selecionados */}
      <h3>Itens Selecionados:</h3>
      {pedido.map((p) => {
        const item = Object.values(menuItems)
          .flat()
          .find((m) => m.id === p.item);
        return (
          <div key={p.item}>
            <strong>{item?.nome}</strong>
            <input
              type="number"
              min="1"
              value={p.quantidade}
              onChange={(e) => atualizarQuantidade(p.item, e.target.value)}
            />
            <button type="button" onClick={() => removerItem(p.item)}>
              Remover
            </button>
          </div>
        );
      })}

      {/* Botão para enviar o pedido */}
      <button type="submit" className="enviar-btn" onClick={handleSubmit}>
        Enviar Pedido
      </button>

      {/* Mensagem de sucesso ou erro */}
      {mensagem && <div className="mensagem">{mensagem}</div>}
    </div>
  );
};

export default NovoPedido;