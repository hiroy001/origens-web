import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppContext } from '../../context';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export const Processing = () => {
  const navigate = useNavigate();
  const { createOrder } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      const orderId = createOrder();
      navigate(`/student/success/${orderId}`, { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [createOrder, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[var(--color-violet)] text-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="mb-6"
      >
        <Loader2 size={64} className="text-[var(--color-apricot)]" />
      </motion.div>
      <h2 className="text-2xl font-bold mb-2">Processando...</h2>
      <p className="text-[var(--color-vanilla)]">Aguardando confirmação do pagamento</p>
    </div>
  );
};
