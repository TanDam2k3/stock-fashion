import React from "react";

interface Props {
  onClearAll: () => void;
  onSaveAll: () => void;
  disabled: boolean;
}

const AddStockActions: React.FC<Props> = ({ onClearAll, onSaveAll, disabled }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onClearAll}
        disabled={disabled}
        className="bg-red-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
      >
        Clear All
      </button>
      <button
        onClick={onSaveAll}
        disabled={disabled}
        className="bg-green-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
      >
        Save All
      </button>
    </div>
  );
};

export default AddStockActions;
