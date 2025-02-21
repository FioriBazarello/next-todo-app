'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import Auth from '../components/Auth';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function AuthPage() {
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
        <div className="min-h-screen bg-gray-900 flex flex-col px-4">
            <div className="container mx-auto py-6">
                <Link href="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-400 hover:text-gray-300 flex items-center gap-2"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        Voltar para a página inicial
                    </motion.button>
                </Link>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <h1 className="text-4xl font-bold text-center text-gray-100 mb-2">
                        Bem-vindo
                    </h1>
                    <p className="text-gray-400 text-center mb-8">
                        Faça login ou crie uma conta para gerenciar suas tarefas
                    </p>
                    <Auth />
                </motion.div>
            </div>
        </div>
    );
} 