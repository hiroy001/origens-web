import React from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context';
import { ChevronLeft, CreditCard, Banknote, FlaskConical, Lock } from 'lucide-react';
import { clsx } from 'clsx';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { BetaTag } from '../../components/BetaTag';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartTotal } = useAppContext();
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
        )}>Pagamento</h1>
      </div>

      <div onScroll={onScroll} className="flex-1 p-6 overflow-y-auto pb-24">
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <p className="text-[var(--color-olive)] text-sm mb-1 text-center">Valor a Pagar</p>
          <p className="text-3xl font-bold text-[var(--color-violet)] text-center">
            R$ {cartTotal.toFixed(2).replace('.', ',')}
          </p>
        </div>

        {/* Experimental notice */}
        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[var(--color-apricot)]/10 flex items-center justify-center mb-4">
            <FlaskConical size={26} className="text-[var(--color-apricot)]" />
          </div>
          <div className="mb-2">
            <BetaTag label="Área Experimental" />
          </div>
          <h2 className="text-lg font-bold text-[var(--color-violet)] mb-2">
            Pagamento em breve disponível
          </h2>
          <p className="text-[var(--color-olive)] text-sm leading-relaxed">
            Nesta versão beta o pagamento pelo app ainda não está ativo. Em breve você vai poder
            pagar direto por aqui com PIX ou cartão.
          </p>
        </div>

        <h2 className="text-sm font-bold text-[var(--color-olive)]/70 uppercase tracking-wide mb-3">
          Prévia das formas de pagamento
        </h2>

        <div className="flex flex-col gap-3 opacity-50 pointer-events-none select-none">
          <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[var(--color-vanilla)] bg-white">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-vanilla)] text-[var(--color-olive)]">
              <Banknote size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-[var(--color-violet)]">PIX</p>
              <p className="text-xs text-[var(--color-olive)]">Aprovação imediata</p>
            </div>
            <Lock size={16} className="text-[var(--color-olive)]" />
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-[var(--color-vanilla)] bg-white">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-vanilla)] text-[var(--color-olive)]">
              <CreditCard size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-[var(--color-violet)]">Cartão de Crédito</p>
              <p className="text-xs text-[var(--color-olive)]">Crédito ou Débito</p>
            </div>
            <Lock size={16} className="text-[var(--color-olive)]" />
          </div>
        </div>
      </div>

      <div className="p-6 pb-24 bg-white border-t border-[var(--color-vanilla)]/30">
        <button
          disabled
          className="w-full bg-[var(--color-vanilla)] text-[var(--color-olive)] font-bold py-4 rounded-2xl cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Lock size={18} />
          Em breve disponível
        </button>
      </div>
    </div>
  );
};
