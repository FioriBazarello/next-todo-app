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

    return (
        <div className="max-w-md mx-auto mt-8">
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            <form onSubmit={addTodo} className="mb-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Adicionar nova tarefa..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500 bg-white"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Adicionar
                    </button>
                </div>
            </form>

            <div className="space-y-2">
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        {...todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </div>
        </div>
    );
} 