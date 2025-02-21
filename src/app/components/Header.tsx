'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

export default function Header() {
    const [user] = useAuthState(auth);

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-blue-600">
                            ✓ Minhas Tarefas
                        </h1>
                    </div>

                    {user && (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 hidden sm:inline">{user.email}</span>
                            <button
                                onClick={() => auth.signOut()}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                            >
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
} 