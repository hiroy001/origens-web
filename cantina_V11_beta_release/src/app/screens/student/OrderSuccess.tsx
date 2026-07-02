import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppContext } from '../../context';
import { motion } from 'motion/react';
import { Check, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useAppContext();
  const order = orders.find(o => o.id === orderId);

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4A373', '#E6DAC8', '#F4F1EA']
    });
  }, []);

  if (!order) return <div>Pedido não encontrado</div>;

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)] p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-green-500/30"
        >
          <Check size={48} strokeWidth={3} />
        </motion.div>

        <h1 className="text-3xl font-bold text-[var(--color-violet)] text-center mb-2">Pagamento Aprovado!</h1>
        <p className="text-[var(--color-olive)] text-center mb-8">
          Seu pedido foi confirmado e já está na fila de preparo.
        </p>

        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-[var(--color-vanilla)]/30 flex flex-col items-center w-full max-w-[90%] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-apricot)] to-[var(--color-violet)]" />
          
          <p className="text-[var(--color-olive)] font-medium mb-6 uppercase tracking-widest text-xs">Apresente no balcão</p>
          
          <div className="bg-white p-3 rounded-3xl border-2 border-dashed border-[var(--color-vanilla)] mb-6">
            <QrCode size={200} strokeWidth={1} className="text-[var(--color-violet)]" />
          </div>
          
          <div className="text-center bg-[var(--color-beige)]/50 w-full py-4 rounded-2xl">
            <p className="text-[var(--color-olive)] text-xs mb-1 uppercase tracking-wider">Número do Pedido</p>
            <p className="text-3xl font-black text-[var(--color-violet)] tracking-widest">{order.id}</p>
          </div>
          
          <div className="text-[var(--color-olive)] mt-6 text-xs font-medium flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-apricot)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-apricot)]"></span>
            </span>
            Válido por 24 horas
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate('/student/orders')}
        className="w-full bg-[var(--color-violet)] text-white font-bold py-4 rounded-2xl shadow-md mt-6"
      >
        Ver Meus Pedidos
      </button>
    </div>
  );
};
