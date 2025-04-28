import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

interface Product {
  id: string;
  name: string;
  quantity: number;
  product: string;
  username: string;
}


interface FormValues {
  products: Product[];
}

const ExportHistory: React.FC = () => {
  const { register, control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      products: [
        {
          id: '',
          name: '',
          quantity: 1,
          product: '',
          username:'',

        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const products = watch('products');



  return (
    <div className="w-full rounded-md flex flex-col p-5 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-[#0B2E65] font-semibold text-xl sm:text-2xl">Phiếu Xuất Kho</h1>
          <button
            type="button"
            className="bg-[#0B2E65] text-white text-sm sm:text-base font-medium py-2 px-4 rounded"
          >
            In phiếu xuất kho
          </button>
        </div>

        {/* Form Thông tin chung */}
        <form className="bg-white rounded-md p-4 sm:p-6 mb-6 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6">
          <div>
            <label htmlFor="ma-phieu" className="block text-xs font-semibold text-[#1E1E1E] mb-1">
              Mã phiếu xuất kho
            </label>
            <input
              id="ma-phieu"
              type="text"
              value="XK250428-021"
              readOnly
              className="w-full border border-[#E5E7EB] rounded-md bg-[#F9FAFB] text-xs sm:text-sm text-[#6B7280] py-2 px-3 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="ngay-xuat" className="block text-xs font-semibold text-[#1E1E1E] mb-1">
              Ngày xuất kho
            </label>
            <div className="relative">
              <input
                id="ngay-xuat"
                type="date"
                defaultValue="2025-04-28"
                className="w-full border border-[#E5E7EB] rounded-md text-xs sm:text-sm text-[#1E1E1E] py-2 px-3 pl-9"
              />
              <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm pointer-events-none"></i>
            </div>
          </div>

          <div>
            <label htmlFor="nguoi-xuat" className="block text-xs font-semibold text-[#1E1E1E] mb-1">
              Người xuất kho
            </label>
            <input
              id="nguoi-xuat"
              type="text"
              placeholder="Nhập tên người xuất kho"
              className="w-full border border-[#E5E7EB] rounded-md text-xs sm:text-sm py-2 px-3 placeholder:text-[#9CA3AF]"
            />
          </div>

          <div>
            <label htmlFor="ma-don-hang" className="block text-xs font-semibold text-[#1E1E1E] mb-1">
              Mã đơn hàng (nếu có)
            </label>
            <input
              id="ma-don-hang"
              type="text"
              placeholder="Nhập mã đơn hàng (nếu có)"
              className="w-full border border-[#E5E7EB] rounded-md text-xs sm:text-sm py-2 px-3 placeholder:text-[#9CA3AF]"
            />
          </div>
        </form>

        {/* Bảng sản phẩm */}
        <section className="bg-white rounded-md p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#1E1E1E] font-semibold text-sm sm:text-base">
              Thông tin sản phẩm xuất kho
            </h2>
            <button
              type="button"
              onClick={() =>
                append({
                  id: '',
                  name: '',
                  quantity: 1,
                  product: '',
                  username:'',
                })
              }
              className="flex items-center gap-1 border border-[#D1D5DB] rounded px-2 py-1 text-sm text-[#1E1E1E] hover:bg-[#F3F7F6]"
            >
              <i className="fas fa-plus"></i> Thêm sản phẩm
            </button>
          </div>

          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#C6D5F7] text-[#0B2E65] font-semibold text-center">
                <th className="py-2 px-3 border border-[#AFC3F7]">Mã SP</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Tên sản phẩm</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Loại</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Màu sắc</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Kích thước</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Số lượng</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Đơn giá</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Thành tiền</th>
                <th className="py-2 px-3 border border-[#C6D5F7]"></th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="text-center text-[#1E1E1E]">
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      {...register(`products.${index}.id`)}
                      placeholder="Mã SP"
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      {...register(`products.${index}.name`)}
                      placeholder="Tên sản phẩm"
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
               
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      {...register(`products.${index}`)}
                      placeholder="Màu sắc"
                      className="w-full border rounded px-2 py-1"
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <select
                      {...register(`products.${index}.size`)}
                      className="w-full border rounded px-2 py-1"
                    >
                      <option value="">Size</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      type="number"
                      {...register(`products.${index}.quantity`, { valueAsNumber: true })}
                      min="1"
                      className="w-full border rounded px-2 py-1 text-center"
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      type="number"
                      {...register(`products.${index}.price`, { valueAsNumber: true })}
                      min="0"
                      className="w-full border rounded px-2 py-1 text-center"
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1 text-right pr-3 font-semibold text-[#0B2E65]">
                    {products[index]?.quantity * products[index]?.price || 0} VNĐ
                  </td>
                  <td
                    className="border border-[#E5E7EB] p-1 text-center text-[#1E1E1E] cursor-pointer select-none"
                    onClick={() => remove(index)}
                  >
                    ×
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[#E6EFF3] text-[#1E1E1E] font-semibold text-xs sm:text-sm">
                <td colSpan={7} className="text-right pr-3 py-2 border border-[#D1D5DB]">
                  Tổng giá trị:
                </td>
                <td className="text-[#0B2E65] text-right pr-3 py-2 border border-[#D1D5DB]">
                  {totalAmount} VNĐ
                </td>
                <td className="border border-[#E6EFF3]"></td>
              </tr>
            </tfoot>
          </table>
        </section>
      </div>
    </div>
  );
};

export default ExportHistory;
