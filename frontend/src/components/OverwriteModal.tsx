import React from 'react';
import { type UserData } from '../types';

interface OverwriteModalProps {
  isOpen: boolean;
  previousData: UserData | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const OverwriteModal: React.FC<OverwriteModalProps> = ({
  isOpen,
  previousData,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !previousData) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-slate-800 to-purple-900 p-8 rounded-2xl border border-purple-500/30 max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-white mb-4">Previous Data Found</h3>
        <p className="text-purple-300 mb-4">You have existing data from:</p>
        <p className="text-white font-mono text-sm mb-6 bg-white/10 p-3 rounded-lg">
          {new Date(previousData.updated_at).toLocaleString()}
        </p>
        <p className="text-purple-300 mb-6">
          Do you want to overwrite it with the new values?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            Overwrite
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};