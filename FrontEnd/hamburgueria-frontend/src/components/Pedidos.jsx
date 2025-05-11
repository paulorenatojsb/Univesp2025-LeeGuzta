import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Pedidos.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get('/pedidos/')
      .then(response => {
        setPedidos(response.data);
        setErro('');
      })
      .catch(error => {
        console.error('Erro ao buscar pedidos:', error);
        setErro('Erro ao carregar pedidos.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="pedidos-container">
      <h2 className="titulo">📋 Pedidos em Andamento</h2>

      {loading && <p className="loading">Carregando pedidos...</p>}
      {erro && <p className="erro">{erro}</p>}

      <div className="grid-pedidos">
        {pedidos.map(pedido => (
          <div key={pedido.id} className="pedido-card">
            <h3>Mesa {pedido.mesa}</h3>
            <ul>
              {pedido.itens.map((item, index) => (
                <li key={index}>{item.nome} x{item.quantidade}</li>
              ))}
            </ul>
            <p>Status: <strong>{pedido.status}</strong></p>
            <p><small>{new Date(pedido.criado_em).toLocaleString()}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pedidos;