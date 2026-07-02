import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ScanLine } from 'lucide-react';
import { useAppContext } from '../../context';
import { toast } from 'sonner';

export const StaffScan = () => {
  const navigate = useNavigate();
  const { orders } = useAppContext();
  const [manualCode, setManualCode] = useState('');

  const handleSimulateScan = () => {
    // find a pending order to simulate
    const pending = orders.find(o => o.status === 'paid');
    if (pending) {
      toast.success('QR Code lido com sucesso!');
      navigate(`/staff/order/${pending.id}`);
    } else {
      toast.error('Nenhum pedido pendente para simular.');
    }
  };

  const handleManualSearch = () => {
    const order = orders.find(o => o.id === manualCode || o.id === `ORD-${manualCode}`);
    if (order) {
      navigate(`/staff/order/${order.id}`);
    } else {
      toast.error('Pedido não encontrado.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-white relative">
      <div className="absolute top-12 left-4 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-md"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e67056058e1?w=800&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
        
        <div className="relative z-10 w-64 h-64 border-4 border-[var(--color-apricot)] rounded-3xl flex items-center justify-center overflow-hidden">
          <div className="absolute w-full h-1 bg-[var(--color-apricot)] top-0 animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_15px_rgba(212,149,77,0.8)]"></div>
          <ScanLine size={48} className="text-white/30" />
        </div>
        
        <p className="mt-8 relative z-10 font-medium text-lg text-center px-8">
          Posicione o QR Code do aluno<br/>no quadro acima
        </p>

        <button 
          onClick={handleSimulateScan}
          className="mt-8 relative z-10 bg-[var(--color-apricot)] text-white px-8 py-3 rounded-full font-bold shadow-lg"
        >
          Simular Leitura de QR Code
        </button>
      </div>

      <div className="bg-white rounded-t-3xl p-6 pb-24 relative z-10">
        <h3 className="text-[var(--color-violet)] font-bold mb-4 text-center">Ou digite o código do pedido</h3>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ex: ORD-1234"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            className="flex-1 bg-[var(--color-beige)] border border-[var(--color-vanilla)] rounded-xl px-4 py-3 text-[var(--color-violet)] font-medium outline-none focus:border-[var(--color-apricot)]"
          />
          <button 
            onClick={handleManualSearch}
            className="bg-[var(--color-violet)] text-white px-6 font-bold rounded-xl"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};
