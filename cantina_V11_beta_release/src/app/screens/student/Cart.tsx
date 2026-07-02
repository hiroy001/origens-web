import React from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context';
import { Trash2, ChevronLeft, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { clsx } from 'clsx';

export const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, cartTotal } = useAppContext();
  const { visible, onScroll } = useScrollDirection();

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)]">
      <div className={clsx(
        "px-4 bg-white flex items-center shadow-sm relative z-10 transition-all duration-300 ease-out",
        visible ? "pt-12 pb-4" : "pt-3 pb-3"
      )}>
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center text-[var(--color-violet)] flex-shrink-0"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className={clsx(
          "font-bold text-[var(--color-violet)] flex-1 text-center pr-10 transition-all duration-300",
          visible ? "text-xl" : "text-base"
        )}>Carrinho</h1>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 bg-[var(--color-vanilla)]/50 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart size={40} className="text-[var(--color-olive)] opacity-50" />
          </div>
          <h2 className="text-xl font-bold text-[var(--color-violet)] mb-2">Seu carrinho está vazio</h2>
          <p className="text-[var(--color-olive)] text-sm mb-6">Que tal adicionar um lanche delicioso?</p>
          <button 
            onClick={() => navigate('/student/home')}
            className="bg-[var(--color-apricot)] text-white px-6 py-3 rounded-xl font-bold shadow-sm"
          >
            Ver Cardápio
          </button>
        </div>
      ) : (
        <>
          <div onScroll={onScroll} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {cart.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-3 shadow-sm flex gap-3 relative border border-[var(--color-vanilla)]/30">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[var(--color-vanilla)]/20 flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-[var(--color-violet)] text-sm">{item.product.name}</h3>
                  {item.notes && <p className="text-[10px] text-[var(--color-olive)] mt-0.5 line-clamp-1 italic">"{item.notes}"</p>}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-bold text-[var(--color-olive)]">{item.quantity}x</span>
                    <span className="font-bold text-[var(--color-apricot)] text-sm">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-500 bg-red-50 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 pb-24 rounded-t-3xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)] border-t border-[var(--color-vanilla)]/30">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[var(--color-olive)] font-medium">Total</span>
              <span className="text-2xl font-bold text-[var(--color-violet)]">
                R$ {cartTotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <button 
              onClick={() => navigate('/student/checkout')}
              className="w-full bg-[var(--color-violet)] text-white font-bold py-4 rounded-2xl shadow-md"
            >
              Ir para Pagamento
            </button>
          </div>
        </>
      )}
    </div>
  );
};