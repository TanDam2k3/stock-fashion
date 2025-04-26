import React from "react";

interface EditProductPopupProps {
  formData: { name: string; price: number };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const EditProductPopup: React.FC<EditProductPopupProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-60 z-50 transition-all ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-sm transform transition-transform duration-300 scale-95 hover:scale-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Chỉnh sửa sản phẩm
        </h3>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700">
              Giá sản phẩm
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              min={0}
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2 bg-gray-300 text-gray-800 rounded-md text-sm font-semibold transition hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 text-white rounded-md text-sm font-semibold transition hover:bg-purple-700"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPopup;
