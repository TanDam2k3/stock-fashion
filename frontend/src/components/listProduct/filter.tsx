import React from 'react';
import { IoSearch } from 'react-icons/io5';

interface FilterProps {
  filters: {
    maPhieu: string;
    nguonNhan: string;
    tinhTrang: string;
    tuNgay: string;
    denNgay: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FilterForm: React.FC<FilterProps> = ({ filters, onChange, onSubmit }) => {
  return (
    <form
      className="grid grid-cols-6 gap-4 p-6 bg-white shadow-md rounded-b-md items-end"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {/* Mã phiếu */}
      <div className="col-span-1">
        <label className="block text-sm text-gray-700 mb-1">Mã phiếu</label>
        <input
          type="text"
          name="maPhieu"
          value={filters.maPhieu}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Nguồn nhận */}
      <div className="col-span-1">
        <label className="block text-sm text-gray-700 mb-1">Nguồn nhận</label>
        <select
          name="nguonNhan"
          value={filters.nguonNhan}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="80">80</option>
        </select>
      </div>

      {/* Tình trạng */}
      <div className="col-span-1">
        <label className="block text-sm text-gray-700 mb-1">Tình trạng</label>
        <select
          name="tinhTrang"
          value={filters.tinhTrang}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value=""></option>
        </select>
      </div>

      {/* Từ ngày */}
      <div className="col-span-1">
        <label className="block text-sm text-gray-700 mb-1">Từ ngày</label>
        <div className="flex items-center gap-2">
          <input
            type="date"
            name="tuNgay"
            value={filters.tuNgay}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Đến ngày */}
      <div className="col-span-1">
        <label className="block text-sm text-gray-700 mb-1">Đến ngày</label>
        <div className="flex items-center gap-2">
          <input
            type="date"
            name="denNgay"
            value={filters.denNgay}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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

export default FilterForm;
