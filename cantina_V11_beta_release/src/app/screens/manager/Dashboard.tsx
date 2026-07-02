import React from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context';
import { TrendingUp, AlertTriangle, Users, LogOut, ChevronLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { clsx } from 'clsx';

export const ManagerDashboard = () => {
  const navigate = useNavigate();
  const { setRole, orders } = useAppContext();
  const { visible, onScroll } = useScrollDirection();

  const handleLogout = () => {
    setRole(null);
    navigate('/login');
  };

  const revenueData = [
    { id: 'rev-1', name: 'Seg', valor: 450 },
    { id: 'rev-2', name: 'Ter', valor: 620 },
    { id: 'rev-3', name: 'Qua', valor: 580 },
    { id: 'rev-4', name: 'Qui', valor: 890 },
    { id: 'rev-5', name: 'Sex', valor: 1200 },
  ];

  const alerts = [
    { id: 'alert-1', name: 'Refrigerante Lata', status: 'ESGOTADO', type: 'error' },
    { id: 'alert-2', name: 'Pão de Queijo', status: 'ACABANDO (5 un)', type: 'warning' },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)] relative">
      <button 
        onClick={handleLogout}
        className="absolute top-12 right-4 text-[var(--color-olive)] p-2 z-20"
      >
        <LogOut size={20} />
      </button>

      <div className={clsx(
        "px-4 bg-[var(--color-beige)] text-[var(--color-violet)] overflow-hidden transition-all duration-300 ease-out relative",
        visible ? "pt-12 pb-4 max-h-32" : "pt-3 pb-2 max-h-16"
      )}>
        <h1 className="text-2xl font-bold mb-1">Visão Geral</h1>
        <p className="text-[var(--color-olive)] text-sm">Dashboard da Gerência</p>
      </div>

      <div onScroll={onScroll} className="flex-1 p-4 pb-24 overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--color-vanilla)]/30">
            <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mb-2">
              <TrendingUp size={16} className="text-green-600" />
            </div>
            <p className="text-[var(--color-olive)] text-xs font-bold mb-1">Faturamento Hoje</p>
            <p className="text-xl font-bold text-[var(--color-violet)]">R$ 1.250,00</p>
          </div>
          
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[var(--color-vanilla)]/30">
            <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mb-2">
              <Users size={16} className="text-blue-600" />
            </div>
            <p className="text-[var(--color-olive)] text-xs font-bold mb-1">Pedidos Concluídos</p>
            <p className="text-xl font-bold text-[var(--color-violet)]">142</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[var(--color-vanilla)]/30 mb-6">
          <h2 className="font-bold text-[var(--color-violet)] mb-4">Vendas da Semana</h2>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#775533' }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                  {revenueData.map((entry) => (
                    <Cell key={entry.id} fill="#D4954D" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-red-50 p-5 rounded-2xl border border-red-200">
          <h2 className="font-bold text-red-800 mb-3 flex items-center gap-2">
            <AlertTriangle size={18} /> Alertas de Estoque
          </h2>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex justify-between items-center bg-white p-3 rounded-xl">
                <span className={alert.type === 'error' ? "font-medium text-red-900 text-sm" : "font-medium text-[var(--color-violet)] text-sm"}>
                  {alert.name}
                </span>
                <span className={alert.type === 'error' ? "bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded" : "bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded"}>
                  {alert.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
