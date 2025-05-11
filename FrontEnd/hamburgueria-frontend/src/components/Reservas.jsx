import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    api.get('reservas/')
      .then(response => {
        setReservas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar reservas:', error);
      });
  }, []);

  return (
    <div>
      <h2>Reservas Confirmadas</h2>
      <ul>
        {reservas.map(reserva => (
          <li key={reserva.id}>
            Mesa {reserva.mesa} - {reserva.nome} - {reserva.data} {reserva.hora}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservas;