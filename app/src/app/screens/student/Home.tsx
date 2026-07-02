import React from 'react';
import { useNavigate } from 'react-router';
import { useAppContext, Category } from '../../context';
import { motion } from 'motion/react';
import { Bell, User, Search, SlidersHorizontal, ChevronDown, ChevronRight, Clock, Star, Sandwich, CupSoda, UtensilsCrossed, Cookie, Gift } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { BetaTag } from '../../components/BetaTag';

const categoryShortcuts: { label: string; icon: React.ElementType; category: Category }[] = [
  { label: 'Lanches', icon: Sandwich, category: 'Salgados' },
  { label: 'Bebidas', icon: CupSoda, category: 'Bebidas' },
  { label: 'Refeições', icon: UtensilsCrossed, category: 'Outros' },
  { label: 'Doces', icon: Cookie, category: 'Doces' },
  { label: 'Combos', icon: Gift, category: 'Todos' },
];

export const StudentHome = () => {
  const { products, orders } = useAppContext();
  const navigate = useNavigate();
  // Still drives the bottom-nav auto-hide-on-scroll behavior.
  const { onScroll } = useScrollDirection();

  const maisPedidos = products.filter(p => p.isAvailable).slice(0, 6);
  const lastOrder = orders[0];

  const goToMenu = (category?: Category) => {
    navigate('/student/menu', category ? { state: { category } } : undefined);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)]">
      {/* Fixed top bar: delivery location + notifications + profile */}
      <div className="shrink-0 pt-12 pb-3 px-4 bg-[var(--color-beige)]">
        <div className="flex items-center justify-between mb-4">
          <button className="flex flex-col items-start">
            <span className="flex items-center gap-1.5 text-[11px] text-[var(--color-olive)]">
              Entregar em
              <BetaTag />
            </span>
            <span className="flex items-center gap-1 font-bold text-[var(--color-violet)]">
              Escola Municipal
              <ChevronDown size={16} className="text-[var(--color-apricot)]" />
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform">
              <Bell size={18} className="text-[var(--color-violet)]" />
            </button>
            <button
              onClick={() => navigate('/student/profile')}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            >
              <User size={18} className="text-[var(--color-violet)]" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToMenu()}
            className="flex-1 flex items-center gap-2 bg-white rounded-xl px-3 py-3 text-left shadow-sm"
          >
            <Search size={18} className="text-[var(--color-olive)]/60" />
            <span className="text-sm text-[var(--color-olive)]/60">Busque por lanche ou refeição</span>
          </button>
          <button
            onClick={() => goToMenu()}
            className="w-11 h-11 shrink-0 rounded-xl bg-white flex items-center justify-center shadow-sm active:scale-95 transition-transform"
          >
            <SlidersHorizontal size={18} className="text-[var(--color-apricot)]" />
          </button>
        </div>
      </div>

      <div onScroll={onScroll} className="flex-1 overflow-y-auto px-4 pb-24 flex flex-col gap-8">

        {/* Hero banner */}
        <div
          onClick={() => goToMenu()}
          className="rounded-3xl bg-gradient-to-br from-[var(--color-vanilla)] to-[var(--color-apricot)]/40 p-5 flex items-center justify-between gap-3 cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-[var(--color-violet)] leading-snug mb-2">
              Sabor que todo<br />mundo gosta!
            </h1>
            <p className="text-xs text-[var(--color-olive)] leading-snug">
              Lanches e refeições<br />quentinhos, como você gosta.
            </p>
          </div>
          {maisPedidos[0] && (
            <img
              src={maisPedidos[0].image}
              alt={maisPedidos[0].name}
              className="w-24 h-24 object-cover rounded-2xl shadow-lg shrink-0"
            />
          )}
        </div>

        {/* Category shortcuts */}
        <section>
          <div className="flex justify-between">
            {categoryShortcuts.map((item) => (
              <button
                key={item.label}
                onClick={() => goToMenu(item.category)}
                className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center">
                  <item.icon size={22} className="text-[var(--color-apricot)]" />
                </div>
                <span className="text-xs font-medium text-[var(--color-violet)]">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Mais pedidos da galera */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[var(--color-violet)] text-lg">Mais pedidos<br />da galera</h2>
            <button
              onClick={() => goToMenu()}
              className="text-sm font-semibold text-[var(--color-apricot)] flex items-center gap-0.5"
            >
              Ver mais <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex overflow-x-auto hide-scrollbar gap-3 -mx-4 px-4 pb-1">
            {maisPedidos.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate(`/student/product/${product.id}`)}
                className="bg-white rounded-2xl p-3 shadow-sm flex flex-col cursor-pointer active:scale-95 transition-transform shrink-0 w-32"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-[var(--color-vanilla)]/20">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-[var(--color-violet)] text-sm leading-tight mb-1 truncate">
                  {product.name}
                </h3>
                {product.rating && (
                  <span className="flex items-center gap-1 text-xs text-[var(--color-olive)] mb-0.5">
                    <Star size={12} className="text-[var(--color-apricot)] fill-[var(--color-apricot)]" />
                    {product.rating.toFixed(1).replace('.', ',')}
                  </span>
                )}
                <p className="text-[var(--color-violet)] text-sm font-bold">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Último pedido */}
        {lastOrder && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={18} className="text-[var(--color-apricot)]" />
              <h2 className="font-bold text-[var(--color-violet)]">Último Pedido</h2>
            </div>

            <div
              onClick={() => navigate(`/student/order/${lastOrder.id}`)}
              className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer active:scale-95 transition-transform"
            >
              <div>
                <p className="text-xs text-[var(--color-olive)] font-medium mb-1">
                  {format(new Date(lastOrder.createdAt), "dd MMM, HH:mm", { locale: ptBR })}
                </p>
                <p className="font-bold text-[var(--color-violet)]">
                  {lastOrder.items.length} itens • R$ {lastOrder.total.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="bg-[var(--color-vanilla)]/20 p-2 rounded-full">
                <ChevronRight size={20} className="text-[var(--color-olive)]" />
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
