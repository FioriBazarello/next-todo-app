'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import TodoList from '../components/TodoList';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function TasksPage() {
    const [user, loading] = useAuthState(auth);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth');
        }
    }, [user, loading, router]);

    if (!isClient || loading) {
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

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-1 py-8">
                <div className="container mx-auto px-4">
                    <motion.div
                        key="todolist"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <TodoList />
                    </motion.div>
                </div>
            </main>
        </div>
    );
} 