'use client';

interface TodoProps {
    id: string;
    text: string;
    completed: boolean;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function Todo({ id, text, completed, onToggle, onDelete }: TodoProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggle(id)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className={`ml-3 ${completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {text}
                </span>
            </div>
            <button
                onClick={() => onDelete(id)}
                className="text-red-500 hover:text-red-700"
            >
                Excluir
            </button>
        </div>
    );
} 