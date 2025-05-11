import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NovoPedido.css';

const NovoPedido = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [mesa, setMesa] = useState('');
  const [pedido, setPedido] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const baseURL = 'http://localhost:8000';

  const categoriasOrdenadas = [
    'PORÇOES',
    'CLASSICOS DE CARNE',
    'CLASSICOS DE RÚCULA',
    'CLASSICOS DE PICANHA',
    'CLASSICOS DE COSTELA',
    'CLASSICOS DE FRANGO',
    'CLASSICOS DE CALABRESA',
    'CLASSICOS RECHEADOS',
    'ESPECIAIS',
    'SEM CARNE',
    'EXTRAS',
    'BEBIDAS',
    'CERVEJA',
    'VINHOS',
    'PARA DEPOIS',
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/cardapio/cardapio/`);
        setMenuItems(response.data);
      } catch (error) {
        console.error('Erro ao carregar o cardápio:', error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/mesas/mesas/`);
        setMesas(response.data);
      } catch (error) {
        console.error('Erro ao carregar mesas:', error);
      }
    };

    fetchMesas();
  }, []);

  const adicionarItem = (itemId) => {
    const jaAdicionado = pedido.find((p) => p.item === itemId);
    if (!jaAdicionado) {
      setPedido([...pedido, { item: itemId, quantidade: 1 }]);
    }
  };

  const atualizarQuantidade = (itemId, quantidade) => {
    setPedido(
      pedido.map((p) =>
        p.item === itemId ? { ...p, quantidade: Number(quantidade) } : p
      )
    );
  };

  const removerItem = (itemId) => {
    setPedido(pedido.filter((p) => p.item !== itemId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/pedidos/`, {
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

  const itensOrdenados = categoriasOrdenadas.flatMap((categoria) =>
    menuItems.filter((item) => item.categoria === categoria)
  );

  return (
    <div className="novo-pedido-container">
      <h2>Criar Novo Pedido</h2>

      <div className="mesa-container">
        <label htmlFor="mesa">Selecione a Mesa:</label>
        <select
          id="mesa"
          value={mesa}
          onChange={(e) => setMesa(e.target.value)}
          required
        >
          <option value="">Selecione uma mesa</option>
          {mesas.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="cardapio-container">
        <h3>Selecione Itens:</h3>
        <select
          onChange={(e) => adicionarItem(Number(e.target.value))}
          defaultValue=""
        >
          <option value="" disabled>
            Selecione um item
          </option>
          {itensOrdenados.map((item) => (
            <option key={item.id} value={item.id}>
              {item.categoria} - {item.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="pedido-container">
        <h3>Itens Selecionados:</h3>
        {pedido.map((p) => {
          const item = menuItems.find((m) => m.id === p.item);
          return (
            <div key={p.item} className="pedido-item">
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
      </div>

      <button type="submit" className="enviar-btn" onClick={handleSubmit}>
        Enviar Pedido
      </button>

      {mensagem && <div className="mensagem">{mensagem}</div>}
    </div>
  );
};

export default NovoPedido;