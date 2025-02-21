'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/tasks');
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl text-gray-300"
        >
          Carregando...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="h-8 w-8 text-emerald-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
              Minhas Tarefas
            </h1>
          </div>
          <Link href="/auth">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Entrar
            </motion.button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-100 mb-6"
          >
            Organize suas tarefas de forma simples e elegante
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 mb-12"
          >
            Gerencie suas atividades diárias com uma interface moderna e intuitiva.
            Mantenha o foco no que realmente importa.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/auth">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-center gap-2 text-lg font-medium"
              >
                Começar agora
                <ArrowRightIcon className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="p-6 rounded-lg bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Simples e Intuitivo</h3>
            <p className="text-gray-400">Interface limpa e moderna para melhor organização</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Acesso em Qualquer Lugar</h3>
            <p className="text-gray-400">Sincronização automática em todos os dispositivos</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Totalmente Gratuito</h3>
            <p className="text-gray-400">Sem custos ou limitações, use à vontade</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
