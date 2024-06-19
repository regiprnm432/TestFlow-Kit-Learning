import React from 'react';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Konfirmasi Hapus</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600" onClick={onConfirm}>
            Hapus
          </button>
          <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400" onClick={onCancel}>
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
