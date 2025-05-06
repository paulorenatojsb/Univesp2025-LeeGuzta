import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Cardapio.css';

const agruparPorCategoria = (itens) => {
  return itens.reduce((acc, item) => {
    const categoria = item.categoria || 'OUTROS';
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(item);
    return acc;
  }, {});
};

const Cardapio = () => {
  const [grupos, setGrupos] = useState({});

  useEffect(() => {
    api.get('cardapio/cardapio/')
      .then(response => {
        setGrupos(agruparPorCategoria(response.data));
      })
      .catch(error => {
        console.error("Erro ao carregar o cardápio:", error);
      });
  }, []);

  return (
    <div className="cardapio">
      {Object.entries(grupos).map(([categoria, itens]) => (
        <div key={categoria} className="categoria-bloco">
          <h2 className="categoria-titulo">{categoria.toUpperCase()}</h2>
          <div className="grid-produtos">
            {itens.map(item => (
              <div key={item.id} className="produto-card">
                <div className="produto-info">
                  <h3>{item.nome}</h3>
                  <p>{item.descricao}</p>
                  <span className="preco">R$ {Number(item.preco).toFixed(2)}</span>
                </div>
                {item.imagem && (
                  <img
                    src={`http://localhost:8000${item.imagem}`}
                    alt={item.nome}
                    className="produto-img"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cardapio;