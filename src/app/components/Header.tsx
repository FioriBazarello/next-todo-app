'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const handleSignOut = async () => {
        await auth.signOut();
        router.push('/auth');
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-gray-900 shadow-lg"
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href={user ? "/tasks" : "/"}>
                        <motion.div
                            className="flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                        >
                            <CheckCircleIcon className="h-8 w-8 text-emerald-500" />
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
                                Minhas Tarefas
                            </h1>
                        </motion.div>
                    </Link>

                    {user && (
                        <div className="flex items-center gap-4">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-gray-300 hidden sm:inline"
                            >
                                {user.email}
                            </motion.span>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSignOut}
                                className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm flex items-center gap-2 transition-colors"
                            >
                                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                                Sair
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </motion.header>
    );
} 