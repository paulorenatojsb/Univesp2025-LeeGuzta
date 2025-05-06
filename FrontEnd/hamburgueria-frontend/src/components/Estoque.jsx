import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Estoque.css';

const Estoque = () => {
  const [itens, setItens] = useState([]);
  const [filtro, setFiltro] = useState('Todos');

  const buscarEstoque = () => {
    api.get('estoque/')
      .then(response => setItens(response.data))
      .catch(error => console.error('Erro ao buscar estoque:', error));
  };

  useEffect(() => {
    buscarEstoque();
  }, []);

  const filtrarItens = (status) => {
    setFiltro(status);
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Baixo':
        return 'vermelho';
      case 'Alto':
        return 'amarelo';
      case 'OK':
      default:
        return 'verde';
    }
  };

  const itensFiltrados = filtro === 'Todos'
    ? itens
    : itens.filter(item => item.status === filtro);

  return (
    <div className="estoque-container">
      <h2>Controle de Estoque</h2>

      <div className="filtros">
        <select onChange={e => filtrarItens(e.target.value)} value={filtro}>
          <option value="Todos">Todos</option>
          <option value="OK">OK</option>
          <option value="Baixo">Baixo</option>
          <option value="Alto">Alto</option>
        </select>
        <button onClick={buscarEstoque}>🔄 Atualizar</button>
      </div>

      <div className="estoque-grid">
        {itensFiltrados.map(item => (
          <div key={item.id} className={`estoque-card ${statusColor(item.status)}`}>
            <div className="estoque-nome">{item.nome}</div>
            <div className="estoque-quantidade">{item.quantidade} {item.unidade}</div>
            <div className="estoque-status">{item.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Estoque;