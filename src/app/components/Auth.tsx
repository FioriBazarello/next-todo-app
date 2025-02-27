'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { auth, googleProvider } from '../firebase/config';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';
import { EnvelopeIcon, LockClosedIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface PasswordRequirement {
    id: string;
    label: string;
    validator: (password: string, confirmPassword?: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
    {
        id: 'length',
        label: 'Pelo menos 8 caracteres',
        validator: (password) => password.length >= 8
    },
    {
        id: 'uppercase',
        label: 'Pelo menos uma letra maiúscula',
        validator: (password) => /[A-Z]/.test(password)
    },
    {
        id: 'lowercase',
        label: 'Pelo menos uma letra minúscula',
        validator: (password) => /[a-z]/.test(password)
    },
    {
        id: 'number',
        label: 'Pelo menos um número',
        validator: (password) => /[0-9]/.test(password)
    },
    {
        id: 'match',
        label: 'Senhas coincidem',
        validator: (password, confirmPassword) => password === confirmPassword && password !== ''
    }
];

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const [requirements, setRequirements] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const newRequirements = passwordRequirements.reduce((acc, req) => ({
            ...acc,
            [req.id]: req.validator(password, confirmPassword)
        }), {});
        setRequirements(newRequirements);
    }, [password, confirmPassword]);

    const allRequirementsMet = () => {
        return passwordRequirements.every(req => requirements[req.id]);
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isRegistering) {
            if (!allRequirementsMet()) {
                setError('A senha não atende a todos os requisitos.');
                return;
            }

            if (password !== confirmPassword) {
                setError('As senhas não coincidem.');
                return;
            }
        }

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Erro na autenticação. Verifique suas credenciais.');
            console.error(err);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            setError('Erro ao fazer login com Google.');
            console.error(err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-xl"
        >
            <form onSubmit={handleAuth} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email
                    </label>
                    <div className="mt-1 relative">
                        <EnvelopeIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-200"
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                        Senha
                    </label>
                    <div className="mt-1 relative">
                        <LockClosedIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-200"
                            required
                        />
                    </div>
                </div>

                {isRegistering && (
                    <>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                                Confirmar Senha
                            </label>
                            <div className="mt-1 relative">
                                <LockClosedIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-200"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-4 space-y-2">
                            <h3 className="text-sm font-medium text-gray-300">Requisitos da senha:</h3>
                            <ul className="space-y-2">
                                {passwordRequirements.map((req) => (
                                    <motion.li
                                        key={req.id}
                                        initial={false}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        {requirements[req.id] ? (
                                            <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                                        ) : (
                                            <XCircleIcon className="h-5 w-5 text-red-500" />
                                        )}
                                        <span className={requirements[req.id] ? 'text-emerald-500' : 'text-red-500'}>
                                            {req.label}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-500 text-sm"
                    >
                        {error}
                    </motion.p>
                )}
                <div className="flex items-center justify-between">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 text-gray-100 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium shadow-lg"
                    >
                        {isRegistering ? 'Registrar' : 'Entrar'}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="button"
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setError('');
                            setPassword('');
                            setConfirmPassword('');
                        }}
                        className="text-sm text-emerald-400 hover:text-emerald-300"
                    >
                        {isRegistering ? 'Já tem uma conta? Entre' : 'Criar nova conta'}
                    </motion.button>
                </div>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-gray-800 text-gray-400">Ou continue com</span>
                    </div>
                </div>

                <div className="mt-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-sm font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        <svg viewBox="0 0 24 24" className="w-5 h-5">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Entrar com Google
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
} 