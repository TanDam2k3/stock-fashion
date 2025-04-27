import React from "react";
import { useForm } from "react-hook-form";

interface EditProductPopupProps {
  initialData: { name: string; type: string; quantity: number; price: number };
  onSubmit: (data: { name: string; type: string; quantity: number; price: number }) => void;
  onCancel: () => void;
}

const EditProductPopup: React.FC<EditProductPopupProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-60 z-50 transition-all ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-sm transform transition-transform duration-300 scale-95 hover:scale-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Chỉnh sửa sản phẩm
        </h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Tên sản phẩm */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Tên sản phẩm
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Loại sản phẩm */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Loại sản phẩm
            </label>
            <input
              type="text"
              {...register("type", { required: true })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Số lượng */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Số lượng
            </label>
            <input
              type="number"
              {...register("quantity", { required: true, min: 0 })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Giá */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700">
              Giá sản phẩm
            </label>
            <input
              type="number"
              {...register("price", { required: true, min: 0 })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Buttons */}
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
