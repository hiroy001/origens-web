import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppContext } from '../../context';
import { QrCode, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useAppContext();
  const order = orders.find(o => o.id === orderId);

  if (!order) return <div>Pedido não encontrado</div>;

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)]">
      <div className="pt-12 pb-4 px-4 bg-white flex items-center shadow-sm relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center text-[var(--color-violet)]"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-[var(--color-violet)] flex-1 text-center pr-10">Detalhes do Pedido</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 flex flex-col gap-6">
        {order.status === 'paid' ? (
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-[var(--color-vanilla)]/50 flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-apricot)]" />
            <p className="text-[var(--color-olive)] text-xs font-bold mb-4 uppercase tracking-widest text-center">
              Código de Retirada
            </p>
            <div className="bg-white p-3 rounded-3xl border-2 border-dashed border-[var(--color-vanilla)]">
              <QrCode size={180} strokeWidth={1} className="text-[var(--color-violet)]" />
            </div>
            <div className="mt-4 text-center bg-[var(--color-beige)]/30 w-full py-3 rounded-xl">
              <p className="font-black text-[var(--color-violet)] text-2xl tracking-widest">{order.id}</p>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 p-6 rounded-3xl shadow-sm border border-green-200 flex flex-col items-center">
            <CheckCircle2 size={64} className="text-green-500 mb-4" />
            <h2 className="text-xl font-bold text-green-700">Pedido Entregue!</h2>
            <p className="text-green-600/80 text-sm mt-2">Esperamos que tenha gostado.</p>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-sm border border-[var(--color-vanilla)]/30 p-5">
          <h3 className="font-bold text-[var(--color-violet)] mb-4 border-b border-[var(--color-vanilla)] pb-2">
            Itens do Pedido
          </h3>
          
          <div className="flex flex-col gap-4 mb-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="font-bold text-[var(--color-olive)]">{item.quantity}x</span>
                <div className="flex-1">
                  <p className="font-medium text-[var(--color-violet)] text-sm">{item.product.name}</p>
                  {item.notes && <p className="text-xs text-[var(--color-olive)] italic">"{item.notes}"</p>}
                </div>
                <span className="font-bold text-[var(--color-violet)]">
                  R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center border-t border-[var(--color-vanilla)] pt-4">
            <span className="text-[var(--color-olive)] font-medium">Total Pago</span>
            <span className="text-xl font-bold text-[var(--color-violet)]">
              R$ {order.total.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-[var(--color-vanilla)]/30 p-5 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-[var(--color-olive)]">Data do Pedido</span>
            <span className="font-medium text-[var(--color-violet)]">
              {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-olive)]">Status</span>
            <span className="font-medium text-[var(--color-violet)]">
              {order.status === 'paid' ? 'Pago - Aguardando Retirada' : 'Entregue'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
