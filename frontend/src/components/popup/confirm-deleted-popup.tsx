import React from 'react';

interface ConfirmDeletePopupProps {
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({ 
  onConfirm, 
  onCancel,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone."
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-4 border border-gray-100">
        {/* Header with warning icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-8 h-8 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 text-center">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-center mb-8 text-lg">
          {description}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={onConfirm}
            className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="w-full py-3 px-6 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium rounded-lg text-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;