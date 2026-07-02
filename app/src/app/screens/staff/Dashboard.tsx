import React from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context';
import { ScanLine, PackageOpen, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { clsx } from 'clsx';

export const StaffDashboard = () => {
  const navigate = useNavigate();
  const { orders, products } = useAppContext();
  const { visible, onScroll } = useScrollDirection();

  const pendingOrders = orders.filter(o => o.status === 'paid');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const outOfStock = products.filter(p => !p.isAvailable);

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)]">
      <div className={clsx(
        "px-4 bg-[var(--color-beige)] text-[var(--color-violet)] overflow-hidden transition-all duration-300 ease-out",
        visible ? "pt-12 pb-4 max-h-32" : "pt-3 pb-2 max-h-16"
      )}>
        <h1 className="text-2xl font-bold mb-1">Painel da Cantina</h1>
        <p className="text-[var(--color-olive)] text-sm">Bom dia, Dona Maria!</p>
      </div>

      <div onScroll={onScroll} className="flex-1 p-4 pb-24 overflow-y-auto">
        {/* HUGE SCAN BUTTON */}
        <button 
          onClick={() => navigate('/staff/scan')}
          className="w-full bg-[var(--color-apricot)] text-white p-8 rounded-3xl shadow-lg flex flex-col items-center justify-center gap-4 mb-6 active:scale-95 transition-transform"
        >
          <div className="bg-white/20 p-4 rounded-full">
            <ScanLine size={64} strokeWidth={2} />
          </div>
          <span className="text-2xl font-bold">Escanear QR Code</span>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Toque aqui para entregar pedido</span>
        </button>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--color-vanilla)]/30">
            <p className="text-[var(--color-olive)] text-xs font-bold mb-1">Aguardando Retirada</p>
            <p className="text-3xl font-bold text-[var(--color-violet)]">{pendingOrders.length}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--color-vanilla)]/30">
            <p className="text-[var(--color-olive)] text-xs font-bold mb-1">Entregues Hoje</p>
            <p className="text-3xl font-bold text-green-600">{deliveredOrders.length}</p>
          </div>
        </div>

        {outOfStock.length > 0 && (
          <div className="bg-red-50 p-4 rounded-2xl border border-red-200 flex gap-3 items-start mb-6">
            <AlertCircle className="text-red-500 shrink-0" />
            <div>
              <p className="font-bold text-red-700 text-sm">Atenção ao Estoque</p>
              <p className="text-red-600 text-xs mt-1">
                {outOfStock.length} {outOfStock.length === 1 ? 'item está esgotado' : 'itens estão esgotados'}. 
                <button onClick={() => navigate('/staff/inventory')} className="font-bold underline ml-1">Gerenciar</button>
              </p>
            </div>
          </div>
        )}

        <h2 className="font-bold text-[var(--color-violet)] mb-3 flex items-center gap-2">
          <PackageOpen size={18} /> Últimos Entregues
        </h2>
        
        <div className="flex flex-col gap-3">
          {deliveredOrders.slice(0, 3).map(order => (
            <div key={order.id} className="bg-white p-3 rounded-xl shadow-sm border border-[var(--color-vanilla)]/30 flex justify-between items-center">
              <div>
                <p className="font-bold text-[var(--color-violet)] text-sm">{order.id}</p>
                <p className="text-xs text-[var(--color-olive)]">
                  {format(new Date(order.createdAt), "HH:mm", { locale: ptBR })} • {order.customerName}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[var(--color-violet)] text-sm">
                  R$ {order.total.toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>
          ))}
          {deliveredOrders.length === 0 && (
            <p className="text-center text-[var(--color-olive)] text-sm py-4">Nenhum pedido entregue ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
};
