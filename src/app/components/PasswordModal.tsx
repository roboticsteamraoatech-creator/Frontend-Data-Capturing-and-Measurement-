import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  password?: string;
  onConfirm?: () => void;
  title?: string;
  message?: string;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  password,
  onConfirm,
  title = 'Password Generated',
  message = 'The new password has been generated successfully:'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-transparent" 
        onClick={onClose}
      />
      <div 
        className="relative bg-white rounded-lg shadow-xl z-50 max-w-md w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
          <p className="text-gray-600 mb-4">{message}</p>
          
          {password && (
            <div className="mb-6">
              <div className="bg-gray-100 rounded-lg p-3 font-mono text-center">
                <span className="text-gray-800">{password}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Please share this password with the user securely</p>
            </div>
          )}
          
          <div className="flex justify-center gap-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Close
            </button>
            {onConfirm && (
              <button
                className="px-4 py-2 bg-[#5D2A8B] text-white rounded-lg hover:bg-purple-700"
                onClick={onConfirm}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;