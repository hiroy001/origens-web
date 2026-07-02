import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Coffee } from 'lucide-react';
import { BetaTag } from '../components/BetaTag';

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[var(--color-beige)] text-[var(--color-violet)]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-24 h-24 bg-[var(--color-apricot)] rounded-full flex items-center justify-center shadow-lg">
          <Coffee size={48} className="text-[var(--color-violet)]" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Cantina IFPI</h1>
        <p className="text-[var(--color-olive)] font-medium">Lanche rápido, fila zero.</p>
        <BetaTag />
      </motion.div>
    </div>
  );
};
