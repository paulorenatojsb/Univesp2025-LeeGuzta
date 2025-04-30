import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    api.get('pedidos/') // Altere para a rota real
      .then(response => {
        setPedidos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar pedidos:', error);
      });
  }, []);

  return (
    <div>
      <h2>Pedidos Recebidos</h2>
      <ul>
        {pedidos.map(pedido => (
          <li key={pedido.id}>
            Mesa {pedido.mesa} - {pedido.status} - Total: R$ {pedido.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pedidos;