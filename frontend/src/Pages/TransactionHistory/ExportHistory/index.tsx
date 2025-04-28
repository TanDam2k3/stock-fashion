import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { FaEye } from 'react-icons/fa'; 
import ProductDetailPopup from '../../../components/transaction-history/edit-popup';

interface Product {
  id: string;
  stock: string; 
  quantity: number;
  product: string;
  username: string;
  createAt: Date,
  imageId:string;
}

interface FormValues {
  products: Product[];
}

const ExportHistory: React.FC = () => {
  const apiProducts: Product[] = [
    {
      id: 'SP001',
      stock:'HCM',
      quantity: 2,
      product: 'Áo thun cổ tròn',
      username: 'user1',
      createAt: new Date('2023-11-20'), 
      imageId: '123456'

    },
  ];

  const { register, control, watch } = useForm<FormValues>({
    defaultValues: {
      products: apiProducts,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'products',
  });

  const products = watch('products');
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="w-full rounded-md flex flex-col p-5 min-h-full">
      <div className="max-w-7xl mx-auto">
        {/* Bộ lọc khoảng ngày */}
        <div className="bg-white rounded-md px-2">
          <h1 className='text-xl font-semibold'>EXPORT HISTORY</h1>
          <form className="bg-white rounded-md p-4 sm:p-6 mb-6 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6">
            <div>
              <label htmlFor="from-date" className="block text-xs font-semibold text-[#1E1E1E] mb-1">
                Từ ngày
              </label>
              <div className="relative">
                <input
                  id="from-date"
                  type="date"
                  className="w-full border border-[#E5E7EB] rounded-md bg-white text-xs sm:text-sm text-[#6B7280] py-2 px-3 pl-9"
                />
                <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm pointer-events-none"></i>
              </div>
            </div>

            <div>
              <label htmlFor="to-date" className="block text-xs font-semibold text-[#1E1E1E] mb-1">
                Đến ngày
              </label>
              <div className="relative">
                <input
                  id="to-date"
                  type="date"
                  className="w-full border border-[#E5E7EB] rounded-md bg-white text-xs sm:text-sm text-[#6B7280] py-2 px-3 pl-9"
                />
                <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm pointer-events-none"></i>
              </div>
            </div>
          </form>
        </div>

        {/* Bảng sản phẩm */}
        <section className="bg-white rounded-md p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#1E1E1E] font-semibold text-sm sm:text-base">
              Thông tin phiếu xuất kho
            </h2>
          </div>

          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#C6D5F7] text-[#0B2E65] font-semibold text-center">
                <th className="py-2 px-3 border border-[#AFC3F7]">Mã phiếu</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Tên kho hàng</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Tên sản phẩm</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Số lượng</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Người thực hiện</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">View</th> 
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="text-center text-[#1E1E1E]">
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      {...register(`products.${index}.id`)}
                      readOnly
                      className="w-full border rounded px-2 py-1 bg-[#F9FAFB] cursor-not-allowed text-center"
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      {...register(`products.${index}.stock`)}
                      readOnly
                      className="w-full border rounded px-2 py-1 bg-[#F9FAFB] cursor-not-allowed text-center"
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      {...register(`products.${index}.product`)}
                      readOnly
                      className="w-full border rounded px-2 py-1 bg-[#F9FAFB] cursor-not-allowed text-center"
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      type="number"
                      {...register(`products.${index}.quantity`, { valueAsNumber: true })}
                      readOnly
                      className="w-full border rounded px-2 py-1 bg-[#F9FAFB] cursor-not-allowed text-center"
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      {...register(`products.${index}.username`)}
                      readOnly
                      className="w-full border rounded px-2 py-1 bg-[#F9FAFB] cursor-not-allowed text-center"
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <button
                      type="button"
                      onClick={() => handleViewDetail(products[index])}
                      className="flex justify-center items-center w-full text-blue-500 hover:text-blue-700"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {/* Show Product Detail Popup */}
      {isPopupOpen && selectedProduct && (
        <ProductDetailPopup product={selectedProduct} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default ExportHistory;
