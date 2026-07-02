import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext, Category } from '../../context';
import { ChevronLeft, Search, CheckCircle2, XCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { toast } from 'sonner';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export const StaffInventory = () => {
  const navigate = useNavigate();
  const { products, toggleProductAvailability } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const { visible, onScroll } = useScrollDirection();

  const categories: Category[] = ['Todos', 'Salgados', 'Doces', 'Bebidas', 'Outros'];
  const filteredProducts = products.filter(p => activeCategory === 'Todos' || p.category === activeCategory);

  const handleToggle = (id: string, currentStatus: boolean) => {
    toggleProductAvailability(id);
    toast.success(currentStatus ? 'Marcado como Esgotado' : 'Marcado como Disponível');
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)]">
      <div className={clsx(
        "px-4 bg-[var(--color-beige)] text-[var(--color-violet)] overflow-hidden transition-all duration-300 ease-out",
        visible ? "pt-12 pb-4 max-h-48" : "pt-3 pb-3 max-h-16"
      )}>
        <div className={clsx("flex items-center", visible ? "mb-4" : "mb-0")}>
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center -ml-2 flex-shrink-0"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className={clsx("font-bold flex-1 transition-all duration-300", visible ? "text-xl" : "text-base")}>
            Controle de Estoque
          </h1>
        </div>
        
        <div className={clsx(
          "relative overflow-hidden transition-all duration-300",
          visible ? "max-h-14 opacity-100" : "max-h-0 opacity-0"
        )}>
          <input
            type="text"
            placeholder="Buscar produto..."
            className="w-full bg-white text-[var(--color-violet)] placeholder-[var(--color-olive)]/50 rounded-xl py-3 pl-10 pr-4 outline-none shadow-sm border border-transparent focus:border-[var(--color-apricot)]"
          />
          <Search size={20} className="absolute left-3 top-3.5 text-[var(--color-olive)]/50" />
        </div>
      </div>

      <div className={clsx("px-4 transition-all duration-300 ease-out", visible ? "mt-4" : "mt-2")}>
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                "px-5 py-2 rounded-full whitespace-nowrap font-semibold text-sm transition-colors border",
                activeCategory === cat
                  ? "bg-[var(--color-apricot)] text-white border-[var(--color-apricot)] shadow-sm"
                  : "bg-white text-[var(--color-olive)] border-transparent"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div onScroll={onScroll} className="flex-1 mt-2 px-4 overflow-y-auto pb-24 flex flex-col gap-3">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-3 rounded-2xl shadow-sm border border-[var(--color-vanilla)]/30 flex gap-3 items-center">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--color-vanilla)]/20 flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[var(--color-violet)] text-sm leading-tight">{product.name}</h3>
              <p className="text-[var(--color-olive)] text-xs font-medium">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
              <div className="mt-1">
                {product.isAvailable ? (
                  <span className="text-green-600 text-[10px] font-bold bg-green-100 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                    <CheckCircle2 size={10} /> Disponível
                  </span>
                ) : (
                  <span className="text-red-600 text-[10px] font-bold bg-red-100 px-2 py-0.5 rounded flex items-center gap-1 w-max">
                    <XCircle size={10} /> Esgotado
                  </span>
                )}
              </div>
            </div>
            
            <button
              onClick={() => handleToggle(product.id, product.isAvailable)}
              className={clsx(
                "w-24 py-2 rounded-xl text-xs font-bold transition-colors",
                product.isAvailable 
                  ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100" 
                  : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
              )}
            >
              {product.isAvailable ? 'Esgotar' : 'Voltar Estoque'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
