import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAppContext, Category } from '../../context';
import { Search } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'motion/react';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export const StudentMenu = () => {
  const { products } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const initialCategory = (location.state as { category?: Category } | null)?.category ?? 'Todos';
  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const { visible, onScroll } = useScrollDirection();

  const categories: Category[] = ['Todos', 'Salgados', 'Doces', 'Bebidas', 'Outros'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(searchLower) || p.description.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)]">
      <div
        className={clsx(
          "px-4 bg-[var(--color-beige)] text-[var(--color-violet)] overflow-hidden transition-all duration-300 ease-out",
          visible ? "pt-12 pb-4 max-h-44" : "pt-3 pb-2 max-h-16"
        )}
      >
        <h1 className={clsx("font-bold transition-all duration-300", visible ? "text-2xl mb-4" : "text-lg mb-2")}>
          Cardápio
        </h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Buscar lanche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-[var(--color-violet)] placeholder-[var(--color-olive)]/50 rounded-xl py-3 pl-10 pr-4 outline-none shadow-sm border border-transparent focus:border-[var(--color-apricot)] transition-colors"
          />
          <Search size={20} className="absolute left-3 top-3.5 text-[var(--color-olive)]/50" />
        </div>
      </div>

      <div className={clsx("px-4 transition-all duration-300 ease-out", visible ? "mt-2" : "mt-1")}>
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                "px-5 py-2 rounded-full whitespace-nowrap font-semibold text-sm transition-all",
                activeCategory === cat
                  ? "bg-[var(--color-apricot)] text-white shadow-md scale-105"
                  : "bg-white text-[var(--color-olive)] hover:bg-[var(--color-vanilla)]/40"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div onScroll={onScroll} className="flex-1 mt-4 px-4 overflow-y-auto pb-24">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => navigate(`/student/product/${product.id}`)}
              className="bg-white rounded-2xl p-3 shadow-sm flex flex-col cursor-pointer relative active:scale-95 transition-transform"
            >
              {!product.isAvailable && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl">
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    ESGOTADO
                  </span>
                </div>
              )}
              <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-[var(--color-vanilla)]/20">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-[var(--color-violet)] text-sm leading-tight mb-1">{product.name}</h3>
              <p className="text-[var(--color-olive)] text-xs font-medium mt-auto">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};