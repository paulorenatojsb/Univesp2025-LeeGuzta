import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const NovoPedido = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [mesa, setMesa] = useState('');

  useEffect(() => {
    // Buscar itens do cardápio
    axios.get('http://localhost:8000/api/menu/items/')
      .then(response => {
        const options = response.data.map(item => ({
          value: item.id,
          label: item.nome
        }));
        setMenuItems(options);
      })
      .catch(error => {
        console.error('Erro ao buscar itens do cardápio:', error);
      });
  }, []);

  const handleItemChange = selectedOptions => {
    setSelectedItems(selectedOptions || []);
  };

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: quantity
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const pedido = {
      mesa,
      itens: selectedItems.map(item => ({
        id: item.value,
        quantidade: quantities[item.value] || 1
      }))
    };
    // Enviar pedido para o backend
    axios.post('http://localhost:8000/api/pedidos/', pedido)
      .then(response => {
        console.log('Pedido criado com sucesso:', response.data);
        // Resetar formulário
        setMesa('');
        setSelectedItems([]);
        setQuantities({});
      })
      .catch(error => {
        console.error('Erro ao criar pedido:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Novo Pedido</h2>
      <div>
        <label>Mesa:</label>
        <input
          type="text"
          value={mesa}
          onChange={e => setMesa(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Itens do Cardápio:</label>
        <Select
          options={menuItems}
          isMulti
          onChange={handleItemChange}
          value={selectedItems}
        />
      </div>
      {selectedItems.map(item => (
        <div key={item.value}>
          <label>{item.label} - Quantidade:</label>
          <input
            type="number"
            min="1"
            value={quantities[item.value] || 1}
            onChange={e => handleQuantityChange(item.value, parseInt(e.target.value))}
            required
          />
        </div>
      ))}
      <button type="submit">Criar Pedido</button>
    </form>
  );
};

export default NovoPedido;