import React from 'react';
import { FaSort, FaEdit, FaTrashAlt } from 'react-icons/fa';

interface Product {
  id: string;
  image: string;
  name: string;
  source: string;
  category: string;
  gender: string;
  price: string;
}

interface TableProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductTable: React.FC<TableProps> = ({ products, currentPage, totalPages, onPageChange }) => {
  return (
    <>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-full text-sm text-gray-700 border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100 text-gray-900 font-semibold select-none">
              <th className="pl-6 py-3 text-left cursor-pointer">ID <FaSort className="inline ml-1" /></th>
              <th className="py-3 text-left cursor-pointer">Ảnh <FaSort className="inline ml-1" /></th>
              <th className="py-3 text-left cursor-pointer">Tên hàng hóa <FaSort className="inline ml-1" /></th>
              <th className="py-3 text-left cursor-pointer">Nguồn <FaSort className="inline ml-1" /></th>
              <th className="py-3 text-left">Danh mục</th>
              <th className="py-3 text-left">Giới tính</th>
              <th className="py-3 text-left cursor-pointer">Giá <FaSort className="inline ml-1" /></th>
              <th className="pr-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border border-gray-200 rounded-md`}>
                <td className="pl-6 py-4">{product.id}</td>
                <td className="py-4"><img src={product.image} alt={product.name} className="w-10 h-10 rounded-full object-cover" /></td>
                <td className="py-4">{product.name}</td>
                <td className="py-4">{product.source}</td>
                <td className="py-4">{product.category}</td>
                <td className="py-4">{product.gender}</td>
                <td className="py-4">{product.price}</td>
                <td className="pr-6 py-4 space-x-3 ">
                  <button onClick={() => console.log('Edit', product.id)} className="text-green-500 hover:scale-125"><FaEdit size={20} /></button>
                  <button onClick={() => console.log('Delete', product.id)} className="text-red-500 hover:scale-125"><FaTrashAlt size={20} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center space-x-3 py-6 select-none">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-md font-semibold text-sm ${
              page === currentPage ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <span
            className="text-gray-600 font-semibold cursor-pointer text-sm"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </span>
        )}
      </div>
    </>
  );
};

export default ProductTable;
