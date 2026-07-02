import React from 'react';
import { useNavigate } from 'react-router';
import { User, LogOut, ScanLine } from 'lucide-react';
import { useAppContext } from '../../context';

export const StaffProfile = () => {
  const navigate = useNavigate();
  const { setRole } = useAppContext();

  const handleLogout = () => {
    setRole(null);
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)] p-6">
      <div className="flex items-center gap-4 mb-8 pt-4">
        <div className="w-20 h-20 bg-[var(--color-vanilla)] rounded-full flex items-center justify-center shadow-inner text-[var(--color-olive)]">
          <User size={40} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-violet)]">Maria Souza</h1>
          <p className="text-[var(--color-olive)] font-medium text-sm bg-[var(--color-vanilla)] px-2 py-1 rounded-md inline-block mt-1">
            Funcionária - Caixa
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4 flex-1">
        <button
          onClick={() => navigate('/staff/scan')}
          className="bg-[var(--color-violet)] text-white w-full py-4 rounded-xl font-bold text-lg shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <ScanLine size={24} />
          Escanear QR Code
        </button>
      </div>

      <div className="mt-auto pb-24">
        <button
          onClick={handleLogout}
          className="w-full bg-red-100 text-red-600 border border-red-200 py-4 rounded-xl font-bold text-lg shadow-sm hover:bg-red-200 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={24} />
          Sair da Conta
        </button>
      </div>
    </div>
  );
};
