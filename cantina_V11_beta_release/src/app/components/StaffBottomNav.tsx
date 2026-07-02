import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, ScanLine, Package, User } from 'lucide-react';
import { clsx } from 'clsx';

interface StaffBottomNavProps {
  visible?: boolean;
}

export const StaffBottomNav = ({ visible = true }: StaffBottomNavProps) => {
  const navItems = [
    { to: '/staff/dashboard', icon: LayoutDashboard, label: 'Painel' },
    { to: '/staff/scan', icon: ScanLine, label: 'Escanear' },
    { to: '/staff/inventory', icon: Package, label: 'Estoque' },
    { to: '/staff/profile', icon: User, label: 'Perfil' }, // Profile used as mock switch
  ];

  return (
    <div
      className={clsx(
        "absolute bottom-0 w-full bg-[var(--color-vanilla)] border-t border-[var(--color-vanilla)] flex justify-around px-4 py-3 z-50 transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      {navItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.to}
          className={({ isActive }) => clsx(
            "flex flex-col items-center gap-1",
            isActive ? "text-[var(--color-apricot)]" : "text-[var(--color-olive)]"
          )}
        >
          <item.icon size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};
