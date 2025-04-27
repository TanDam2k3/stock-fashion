import React from "react";
import { useForm } from "react-hook-form";
import { Houseware } from "../../interfaces";

interface EditProductPopupProps {
  initialData: {
    name: string;
    type: string;
    quantity: number;
    price: number
    housewareId: string;
  };
  housewareOptions: Houseware[];
  onSubmit: (data: { name: string; type: string; quantity: number; price: number }) => void;
  onCancel: () => void;
}

const EditProductPopup: React.FC<EditProductPopupProps> = ({
  initialData,
  onSubmit,
  onCancel,
  housewareOptions
}) => {
  const { register, handleSubmit } = useForm({
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
          <div className="mb-4">
            <label htmlFor="housewareId" className="block text-sm font-medium text-gray-700">Houseware</label>
            <select
              id="housewareId"
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
              {...register("housewareId", { required: true })}
            >
              <option value="" disabled>
                Select houseware
              </option>
              {housewareOptions.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

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

          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Loại sản phẩm</label>
            <select
              id="type"
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
              {...register("type", { required: true })}
            >
              <option value="" disabled>
                Select type
              </option>
              <option>Áo</option>
              <option>Áo khoác</option>
              <option>Quần</option>
            </select>
          </div>

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

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Giá sản phẩm
            </label>
            <input
              type="number"
              {...register("price", { required: true, min: 0 })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
