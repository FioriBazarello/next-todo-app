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
            className="flex items-start justify-between p-4 bg-gray-800 rounded-lg shadow-lg mb-2 group"
        >
            <div className="flex items-start flex-1 min-w-0">
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="relative w-5 h-5 mt-1"
                    onClick={() => onToggle(id)}
                >
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => { }}
                        className="absolute inset-0 w-5 h-5 accent-emerald-500 rounded border-gray-600 bg-gray-700 cursor-pointer opacity-0"
                    />
                    <div className="absolute inset-0 w-5 h-5 rounded border border-gray-600 bg-gray-700">
                        {completed && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center text-emerald-500"
                            >
                                ✓
                            </motion.div>
                        )}
                    </div>
                </motion.div>
                <span className={`ml-3 ${completed ? 'line-through text-gray-500' : 'text-gray-200'} transition-colors break-words overflow-hidden`}
                    style={{
                        maxWidth: 'calc(100% - 2rem)',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap'
                    }}
                >
                    {text}
                </span>
            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(id)}
                className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all ml-4 flex-shrink-0"
            >
                <TrashIcon className="h-5 w-5" />
            </motion.button>
        </motion.div>
    );
} 