'use client';

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';
import {
    collection,
    query,
    where,
    addDoc,
    deleteDoc,
    updateDoc,
    onSnapshot,
    doc,
    serverTimestamp,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/solid';
import Todo from './Todo';

interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Timestamp | null;
    userId: string;
}

export default function TodoList() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [user] = useAuthState(auth);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!user) {
            console.log('Nenhum usuário autenticado');
            return;
        }

        console.log('Iniciando listener do Firestore para usuário:', user.uid);

        const q = query(
            collection(db, 'todos'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q,
            (querySnapshot) => {
                console.log('Dados recebidos do Firestore:', querySnapshot.size, 'documentos');
                const todosData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as TodoItem[];
                setTodos(todosData);
            },
            (error) => {
                console.error('Erro ao escutar mudanças:', error);
                setError('Erro ao carregar tarefas: ' + error.message);
            }
        );

        return () => unsubscribe();
    }, [user]);

    const addTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim() || !user) return;

        try {
            console.log('Tentando adicionar nova tarefa para usuário:', user.uid);
            const docRef = await addDoc(collection(db, 'todos'), {
                text: newTodo.trim(),
                completed: false,
                userId: user.uid,
                createdAt: serverTimestamp()
            });
            console.log('Tarefa adicionada com ID:', docRef.id);
            setNewTodo('');
            setError('');
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
            setError('Erro ao adicionar tarefa: ' + (error as Error).message);
        }
    };

    const toggleTodo = async (id: string) => {
        const todoRef = doc(db, 'todos', id);
        const todo = todos.find(t => t.id === id);
        if (todo) {
            try {
                await updateDoc(todoRef, {
                    completed: !todo.completed
                });
            } catch (error) {
                console.error('Erro ao atualizar tarefa:', error);
            }
        }
    };

    const deleteTodo = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'todos', id));
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 100) {
            setNewTodo(value);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto mt-8"
        >
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-red-500/10 text-red-500 rounded-lg"
                >
                    {error}
                </motion.div>
            )}

            <form onSubmit={addTodo} className="mb-6">
                <div className="flex gap-2 items-start">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={handleInputChange}
                            placeholder="Adicionar nova tarefa..."
                            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-200 placeholder-gray-500"
                            maxLength={100}
                        />
                        <div className="mt-1 text-right text-sm text-gray-500">
                            {newTodo.length}/100 caracteres
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        className="w-12 h-12 bg-emerald-600 text-gray-100 rounded-full hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center justify-center shadow-lg flex-shrink-0"
                        title="Adicionar tarefa"
                    >
                        <PlusIcon className="h-6 w-6" />
                    </motion.button>
                </div>
            </form>

            <AnimatePresence>
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        {...todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
} 