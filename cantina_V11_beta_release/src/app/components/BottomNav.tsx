import React from 'react';
import { NavLink } from 'react-router';
import { Home, Coffee, ShoppingCart, ReceiptText, User } from 'lucide-react';
import { useAppContext } from '../context';
import { clsx } from 'clsx';

interface BottomNavProps {
  visible?: boolean;
}

export const BottomNav = ({ visible = true }: BottomNavProps) => {
  const { cart } = useAppContext();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { to: '/student/home', icon: Home, label: 'Início' },
    { to: '/student/menu', icon: Coffee, label: 'Cardápio' },
    { to: '/student/cart', icon: ShoppingCart, label: 'Carrinho', badge: cartItemsCount },
    { to: '/student/orders', icon: ReceiptText, label: 'Pedidos' },
    { to: '/student/profile', icon: User, label: 'Conta' },
  ];

  return (
    <div
      className={clsx(
        "absolute bottom-0 w-full bg-white border-t border-[var(--color-vanilla)]/40 flex justify-between px-4 py-3 z-50 transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      {navItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.to}
          className={({ isActive }) => clsx(
            "flex flex-col items-center gap-1 relative",
            isActive ? "text-[var(--color-apricot)]" : "text-[var(--color-olive)]/50"
          )}
        >
          <item.icon size={22} strokeWidth={2.3} />
          <span className="text-[10px] font-medium">{item.label}</span>
          {item.badge ? (
            <span className="absolute -top-1 -right-2 bg-[var(--color-apricot)] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              {item.badge}
            </span>
          ) : null}
        </NavLink>
      ))}
    </div>
  );
};
