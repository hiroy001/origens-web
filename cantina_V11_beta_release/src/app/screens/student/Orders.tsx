import React from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context';
import { QrCode, Receipt, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export const Orders = () => {
  const navigate = useNavigate();
  const { orders } = useAppContext();
  const { visible, onScroll } = useScrollDirection();

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)]">
      <div className={clsx(
        "px-4 bg-[var(--color-beige)] text-[var(--color-violet)] overflow-hidden transition-all duration-300 ease-out",
        visible ? "pt-12 pb-2 mb-2 max-h-32" : "pt-3 pb-1 mb-0 max-h-16"
      )}>
        <h1 className="text-2xl font-bold">Meus Pedidos</h1>
      </div>

      <div onScroll={onScroll} className="flex-1 px-4 overflow-y-auto pt-4 pb-24 flex flex-col gap-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[var(--color-olive)]">
            <Receipt size={48} className="opacity-50 mb-4" />
            <p>Você ainda não fez nenhum pedido.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div 
              key={order.id} 
              onClick={() => navigate(`/student/order/${order.id}`)}
              className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3 cursor-pointer"
            >
              <div className="flex justify-between items-center border-b border-[var(--color-vanilla)]/50 pb-3">
                <div>
                  <p className="font-bold text-[var(--color-violet)]">{order.id}</p>
                  <p className="text-xs text-[var(--color-olive)]">
                    {format(new Date(order.createdAt), "dd MMM, HH:mm", { locale: ptBR })}
                  </p>
                </div>
                <div className={clsx(
                  "px-3 py-1.5 rounded-xl text-xs font-bold border",
                  order.status === 'paid' 
                    ? "bg-[var(--color-apricot)]/10 text-[var(--color-apricot)] border-[var(--color-apricot)]/30" 
                    : "bg-green-50 text-green-700 border-green-200"
                )}>
                  {order.status === 'paid' ? '⏳ Aguardando Retirada' : '✅ Entregue'}
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-1">
                <div className="flex-1">
                  <p className="text-xs text-[var(--color-olive)] font-medium mb-1">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                  </p>
                  <p className="text-lg font-black text-[var(--color-violet)]">
                    R$ {order.total.toFixed(2).replace('.', ',')}
                  </p>
                </div>
                
                {order.status === 'paid' && (
                  <div className="bg-[var(--color-violet)] text-white p-3 rounded-2xl flex items-center justify-center shadow-md active:scale-95 transition-transform">
                    <QrCode size={24} />
                  </div>
                )}
                {order.status === 'delivered' && (
                  <div className="p-3 bg-[var(--color-vanilla)]/20 rounded-2xl">
                    <ChevronRight size={24} className="text-[var(--color-olive)]" />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
