import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { useAppContext } from '../context';
import { useNavigate } from 'react-router';

interface ManagerBottomNavProps {
  visible?: boolean;
}

export const ManagerBottomNav = ({ visible = true }: ManagerBottomNavProps) => {
  const { setRole } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setRole(null);
    navigate('/login');
  };

  return (
    <div
      className={clsx(
        "absolute bottom-0 w-full bg-[var(--color-vanilla)] border-t border-[var(--color-vanilla)] flex justify-around px-4 py-3 z-50 transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <NavLink
        to="/manager/dashboard"
        className={({ isActive }) => clsx(
          "flex flex-col items-center gap-1",
          isActive ? "text-[var(--color-apricot)]" : "text-[var(--color-olive)]"
        )}
      >
        <LayoutDashboard size={24} strokeWidth={2.5} />
        <span className="text-[10px] font-medium">Painel</span>
      </NavLink>

      <button
        onClick={handleLogout}
        className="flex flex-col items-center gap-1 text-[var(--color-olive)]"
      >
        <LogOut size={24} strokeWidth={2.5} />
        <span className="text-[10px] font-medium">Sair</span>
      </button>
    </div>
  );
};
