import React from "react";

interface EditStockPopupProps {
  formData: { name: string; address: string; city: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const EditStockPopup: React.FC<EditStockPopupProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-60 z-50 transition-all ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-sm transform transition-transform duration-300 scale-95 hover:scale-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Edit Stock</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700">City</label>
            <select
              name="city"
              value={formData.city}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Chọn thành phố --</option>
              <option value="Hanoi">Hà Nội</option>
              <option value="HCM">Hồ Chí Minh</option>
              <option value="DaNang">Đà Nẵng</option>
              <option value="CanTho">Cần Thơ</option>
            </select>
          </div>
          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-semibold transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md text-sm font-semibold transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStockPopup;
