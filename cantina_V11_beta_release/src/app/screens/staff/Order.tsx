import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppContext } from '../../context';
import { ChevronLeft, Check, CheckCircle2, User } from 'lucide-react';
import { toast } from 'sonner';

export const StaffOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, markOrderDelivered } = useAppContext();
  const order = orders.find(o => o.id === orderId);

  if (!order) return <div>Pedido não encontrado</div>;

  const handleConfirm = () => {
    markOrderDelivered(order.id);
    toast.success('Pedido entregue com sucesso!');
    navigate('/staff/dashboard');
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)]">
      {/* Flat header, consistent with the rest of the app */}
      <div className="px-4 pt-12 pb-4 bg-white flex items-center shadow-sm relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center text-[var(--color-violet)] flex-shrink-0"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-[var(--color-violet)] flex-1 text-center pr-10 text-xl">
          Pedido {order.id}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 flex flex-col gap-4 mt-4">        {order.status === 'delivered' && (
          <div className="bg-green-50 p-4 rounded-2xl flex items-center gap-3 border border-green-200">
            <CheckCircle2 className="text-green-600 shrink-0" />
            <div>
              <p className="font-bold text-green-800">Pedido já entregue</p>
              <p className="text-green-700 text-xs">Este pedido já foi retirado pelo aluno.</p>
            </div>
          </div>
        )}

        {/* Cliente */}
        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--color-vanilla)] flex items-center justify-center shrink-0">
            <User size={22} className="text-[var(--color-apricot)]" />
          </div>
          <div>
            <p className="text-[var(--color-olive)] text-xs font-bold uppercase tracking-wide">Cliente</p>
            <p className="text-lg font-bold text-[var(--color-violet)]">{order.customerName}</p>
          </div>
        </div>

        {/* Itens, com miniatura de foto igual ao resto do app */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex flex-col gap-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[var(--color-vanilla)]/30 shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[var(--color-violet)] text-sm leading-tight">{item.product.name}</p>
                  <p className="text-[var(--color-olive)] text-xs mt-0.5">{item.quantity}x unidades</p>
                  {item.notes && (
                    <p className="text-xs text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded inline-block mt-1">
                      Obs: {item.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {order.status === 'paid' && (
        <div className="p-4 pb-28 bg-[var(--color-beige)] flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="w-full bg-[var(--color-apricot)] text-white font-bold py-4 rounded-2xl shadow-md flex items-center justify-center gap-2 text-base active:scale-95 transition-transform"
          >
            <Check size={22} strokeWidth={3} />
            Confirmar Entrega
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full text-[var(--color-olive)] font-semibold py-2 text-sm"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};
