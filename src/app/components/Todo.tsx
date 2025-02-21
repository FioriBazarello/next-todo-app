'use client';

import { motion } from 'framer-motion';
import { TrashIcon } from '@heroicons/react/24/outline';

interface TodoProps {
    id: string;
    text: string;
    completed: boolean;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function Todo({ id, text, completed, onToggle, onDelete }: TodoProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-lg mb-2 group"
        >
            <div className="flex items-center flex-1">
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="relative"
                >
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => onToggle(id)}
                        className="w-5 h-5 accent-emerald-500 rounded border-gray-600 bg-gray-700 cursor-pointer"
                    />
                    {completed && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <span className="text-emerald-500">✓</span>
                        </motion.div>
                    )}
                </motion.div>
                <span className={`ml-3 ${completed ? 'line-through text-gray-500' : 'text-gray-200'} transition-colors`}>
                    {text}
                </span>
            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(id)}
                className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
                <TrashIcon className="h-5 w-5" />
            </motion.button>
        </motion.div>
    );
} 