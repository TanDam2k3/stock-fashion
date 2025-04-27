import React from 'react';
import { ProductSearchPayload } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

interface FilterProps {
  filters: ProductSearchPayload;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FilterForm: React.FC<FilterProps> = ({ filters, onChange, onSubmit }) => {
  const navigate = useNavigate();
  return (
    <form
      className="grid grid-cols-6 gap-4 p-6 bg-white shadow-md rounded-b-md items-end"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {/* Tên hàng hóa */}
      <div className="col-span-1">
        <label className="block text-sm text-gray-700 mb-1">Tên hàng hóa</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loại hàng hóa */}
      <div className="col-span-1">
        <label className="block text-sm text-gray-700 mb-1">Loại hàng hóa</label>
        <input
          type="text"
          name="type"
          value={filters.type}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Ngày tạo */}
      <div className="col-span-1">
        <label className="block text-sm text-gray-700 mb-1">Ngày tạo</label>
        <input
          type="date"
          name="createdAt"
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Nút tìm kiếm */}
      <div className="col-span-3 flex justify-end">
        <button
          onClick={() => navigate('create')}
          type="submit"
          className="flex items-center font-medium justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm rounded-md px-6 py-4"
        >
          + Thêm sản phẩm
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
