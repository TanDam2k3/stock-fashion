import React from 'react';

interface FilterProps {
  filters: {
    name: string;
    city: string;
    createdAt: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const StockFilter: React.FC<FilterProps> = ({ filters, onChange, onSubmit }) => {
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white shadow-md rounded-md"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {/* Tên kho hàng */}
      <div>
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
      <div>
        <label className="block text-sm text-gray-700 mb-1">Thành phố</label>
        <select
          name="city"
          value={filters.city}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tất cả</option>
          <option value="Hanoi">Hà Nội</option>
          <option value="HCM">Hồ Chí Minh</option>
          <option value="DaNang	">Đà Nẵng</option>
          <option value="CanTho">Cần Thơ</option>
        </select>
      </div>

      {/* Ngày tạo */}
      <div>
        <label className="block text-sm text-gray-700 mb-1">Ngày tạo</label>
        <input
          type="date"
          name="createdAt"
          value={filters.createdAt}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
};

export default StockFilter;
