'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/config';
import TodoList from './components/TodoList';
import Auth from './components/Auth';
import Header from './components/Header';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {user ? (
            <TodoList />
          ) : (
            <>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Faça login para gerenciar suas tarefas
              </h2>
              <Auth />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
