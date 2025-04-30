import React, { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const STORAGE_KEY = 'pedidos-lgg';

function Caixa() {
  const [pedidos, setPedidos] = useState([]);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const pdfRef = useRef();

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setPedidos(dados.filter(p => p.pago));
  }, []);

  const formatarData = (timestamp) => new Date(timestamp).toISOString().split('T')[0];

  const filtrarPedidos = () => {
    if (!dataInicio && !dataFim) return pedidos;

    return pedidos.filter(p => {
      const dataPedido = formatarData(p.id);
      return (!dataInicio || dataPedido >= dataInicio) &&
             (!dataFim || dataPedido <= dataFim);
    });
  };

  const exportarPDF = async () => {
    const input = pdfRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
  
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
  
    const logo = new Image();
    logo.src = '/logo.png';
  
    logo.onload = () => {
      pdf.addImage(logo, 'PNG', 10, 10, 40, 20);
      pdf.setFontSize(16);
      pdf.text('Relatório de Vendas – Lee Guzta', 60, 22);
  
      // Conteúdo do relatório
      pdf.addImage(imgData, 'PNG', 0, 40, pageWidth, pdfHeight);
  
      // Rodapé
      const dataAtual = new Date();
      const dataStr = dataAtual.toLocaleDateString();
      const horaStr = dataAtual.toLocaleTimeString();
  
      pdf.setFontSize(10);
      const rodapeY = pdfHeight + 48 > pageHeight - 20 ? pageHeight - 10 : pdfHeight + 48;
      pdf.text(`Emitido em ${dataStr} às ${horaStr}`, 10, rodapeY);
      pdf.text(`Período filtrado: ${dataInicio || '...'} até ${dataFim || '...'}`, 10, rodapeY + 6);
      pdf.text('Lee Guzta Hamburgueria • Sistema de Gestão Integrado', 10, rodapeY + 12);
  
      const pad = (n) => n.toString().padStart(2, '0');
const nomeArquivo = `relatorio-caixa-${pad(dataAtual.getDate())}${pad(dataAtual.getMonth() + 1)}${dataAtual.getFullYear()}${pad(dataAtual.getHours())}${pad(dataAtual.getMinutes())}.pdf`;
pdf.save(nomeArquivo);

    };
  };

  const pedidosFiltrados = filtrarPedidos();
  const totalGeral = pedidosFiltrados.reduce((t, p) =>
    t + p.itens.reduce((s, i) => s + i.total, 0), 0
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Caixa – Relatório de Vendas</h2>

      <div className="bg-white shadow p-4 rounded mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <label>
              De: <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="border p-1 rounded" />
            </label>
            <label>
              Até: <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} className="border p-1 rounded" />
            </label>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button onClick={exportarPDF} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Exportar PDF
            </button>
          </div>
        </div>
      </div>

      <div ref={pdfRef} className="bg-white shadow p-4 rounded text-sm">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Pedidos Pagos</h3>
        <p className="font-bold text-green-700 mb-4">Total: R$ {totalGeral.toFixed(2)}</p>

        {pedidosFiltrados.length === 0 ? (
          <p className="text-gray-500">Nenhum pedido encontrado para os filtros aplicados.</p>
        ) : (
          <ul className="space-y-4">
            {pedidosFiltrados.map((p) => (
              <li key={p.id} className="border-b pb-2">
                <p className="font-semibold">Mesa: {p.mesa}</p>
                <ul className="text-gray-600 list-disc pl-5">
                  {p.itens.map((i, idx) => (
                    <li key={idx}>{i.quantidade}x {i.nome} – R$ {i.total.toFixed(2)}</li>
                  ))}
                </ul>
                <p className="text-gray-500 mt-1">Data: {formatarData(p.id)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Caixa;