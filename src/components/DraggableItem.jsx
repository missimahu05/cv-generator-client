import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';

const DraggableItem = ({ id, children, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border border-gray-200 rounded-md p-3 relative group ${
        isDragging ? 'shadow-lg ring-2 ring-blue-400' : ''
      }`}
    >
      <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={18} className="text-gray-400 hover:text-gray-600" />
      </div>
      
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onEdit && (
          <button 
            onClick={onEdit}
            className="text-gray-400 hover:text-blue-500 p-1"
            title="Modifier"
          >
            <Pencil size={16} />
          </button>
        )}
        {onDelete && (
          <button 
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500 p-1"
            title="Supprimer"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      
      <div className="ml-6">
        {children}
      </div>
    </div>
  );
};

export default DraggableItem;