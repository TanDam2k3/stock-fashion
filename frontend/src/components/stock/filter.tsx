import React from 'react';
import { IoSearch } from 'react-icons/io5';

interface FilterProps {
  filters: {
    name: string;
    city: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const StockFilter: React.FC<FilterProps> = ({ filters, onChange, onSubmit }) => {
  return (
    <form
      className="grid grid-cols-3 gap-4 p-6 bg-white shadow-md rounded-md items-end"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {/* Tên kho hàng */}
      <div className="col-span-1">
        <label className="block text-sm text-gray-700 mb-1">Tên kho</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={onChange}
          placeholder="Nhập tên kho..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Thành phố */}
      <div className="col-span-1">
        <label className="block text-sm text-gray-700 mb-1">Thành phố</label>
        <select
          name="city"
          value={filters.city}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tất cả</option>
          <option value="Hà Nội">Hà Nội</option>
          <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
          <option value="Đà Nẵng">Đà Nẵng</option>
          {/* Thêm thành phố khác nếu cần */}
        </select>
      </div>

      {/* Nút tìm kiếm */}
      <div className="col-span-1">
        <button
          type="submit"
          className="flex items-center font-medium justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm rounded-md px-6 py-2"
        >
          <IoSearch />
          Tìm kiếm
        </button>
      </div>
    </form>
  );
};

export default StockFilter;
