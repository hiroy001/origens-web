import React from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context';
import { LogOut, User, Bell, Settings, HelpCircle } from 'lucide-react';
import { BetaTag } from '../../components/BetaTag';

export const Profile = () => {
  const navigate = useNavigate();
  const { setRole, role } = useAppContext();

  const handleLogout = () => {
    setRole(null);
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)]">
      <div className="pt-12 pb-4 px-6 bg-[var(--color-beige)] text-[var(--color-violet)]">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          Perfil
          <BetaTag />
        </h1>

        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 bg-[var(--color-vanilla)] rounded-full flex items-center justify-center">
            <User size={32} className="text-[var(--color-apricot)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--color-violet)]">Aluno Exemplar</h2>
            <p className="text-[var(--color-olive)] text-sm">Matrícula: EXEMPLO-0001</p>
            <span className="inline-block mt-1 bg-[var(--color-apricot)]/10 text-xs px-2 py-0.5 rounded text-[var(--color-apricot)] font-semibold">
              {role === 'student' ? 'Aluno IFPI' : role === 'staff' ? 'Funcionária' : 'Gerente'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 mt-2 pb-24">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="w-full flex items-center gap-4 p-4 border-b border-[var(--color-vanilla)]/40 opacity-50">
            <Bell size={20} className="text-[var(--color-apricot)]" />
            <span className="font-medium text-[var(--color-violet)] flex-1">Notificações</span>
            <BetaTag label="Em breve" />
          </div>
          <div className="w-full flex items-center gap-4 p-4 border-b border-[var(--color-vanilla)]/40 opacity-50">
            <Settings size={20} className="text-[var(--color-apricot)]" />
            <span className="font-medium text-[var(--color-violet)] flex-1">Configurações</span>
            <BetaTag label="Em breve" />
          </div>
          <div className="w-full flex items-center gap-4 p-4 opacity-50">
            <HelpCircle size={20} className="text-[var(--color-apricot)]" />
            <span className="font-medium text-[var(--color-violet)] flex-1">Ajuda e Suporte</span>
            <BetaTag label="Em breve" />
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-white text-red-500 font-bold py-4 rounded-2xl shadow-sm border border-red-100 flex items-center justify-center gap-2 active:bg-red-50"
        >
          <LogOut size={20} />
          Sair da Conta
        </button>
      </div>
    </div>
  );
};
