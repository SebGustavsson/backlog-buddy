import React, { useEffect, ReactElement } from 'react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Popup({ isOpen, onClose, children }: PopupProps) {
  if (!isOpen) return null;

  useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div>
            <button
            onClick={onClose}
            className="float-right text-gray-400 hover:text-white"
            aria-label="Close popup"
            >
            ✕
            </button>
        </div>
        {children}
      </div>
    </div>
  );
}