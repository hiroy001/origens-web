import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppContext } from '../../context';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useAppContext();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!product) return <div>Produto não encontrado</div>;

  const handleAddToCart = () => {
    if (!product.isAvailable) return;
    addToCart(product, quantity, notes);
    toast.success(`${quantity}x ${product.name} adicionado ao carrinho`);
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-beige)] relative">
      <div 
        className="h-72 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${product.image})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[var(--color-violet)] shadow-md"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 bg-white -mt-6 rounded-t-3xl p-6 pb-24 flex flex-col relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="bg-[var(--color-vanilla)] text-[var(--color-olive)] text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold text-[var(--color-violet)] leading-tight">{product.name}</h1>
          </div>
          <p className="text-2xl font-bold text-[var(--color-apricot)]">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
        </div>

        <p className="text-[var(--color-olive)] text-sm mb-6 leading-relaxed">
          {product.description}
        </p>

        <div className="mb-6">
          <label className="block text-sm font-bold text-[var(--color-violet)] mb-2">Observações</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ex: Sem ketchup, bem passado..."
            className="w-full bg-[var(--color-beige)] border border-[var(--color-vanilla)] rounded-xl p-3 text-sm outline-none focus:border-[var(--color-apricot)] resize-none h-24"
          />
        </div>

        <div className="mt-auto flex items-center gap-4">
          <div className="flex items-center bg-[var(--color-beige)] rounded-2xl border border-[var(--color-vanilla)] p-1">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 flex items-center justify-center text-[var(--color-violet)]"
            >
              <Minus size={20} />
            </button>
            <span className="w-8 text-center font-bold text-[var(--color-violet)]">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 flex items-center justify-center text-[var(--color-violet)]"
            >
              <Plus size={20} />
            </button>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className="flex-1 bg-[var(--color-violet)] text-white font-bold py-4 rounded-2xl shadow-md disabled:opacity-50 disabled:bg-gray-400"
          >
            {product.isAvailable ? `Adicionar R$ ${(product.price * quantity).toFixed(2).replace('.', ',')}` : 'Esgotado'}
          </button>
        </div>
      </div>
    </div>
  );
};
