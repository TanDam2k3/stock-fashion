import React, { useState, useRef, useEffect } from 'react';
import { ProductSearchPayload } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

interface FilterProps {
  filters: ProductSearchPayload;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FilterForm: React.FC<FilterProps> = ({ filters, onChange, onSubmit }) => {
  const types = ["Áo", "Áo khoác", "Quần", "Đầm", "Váy", "Chân váy", "Áo sơ mi", 
    "Áo len", "Áo thun", "Áo dài", "Bộ đồ", "Vest", "Áo hoodie", "Áo tanktop", "Áo croptop"];
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter types based on search term
  const filteredTypes = types.filter(type =>
    type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTypeSelect = (type: string) => {
    const event = {
      target: {
        name: 'type',
        value: type === "Tất cả" ? "" : type
      }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
    setShowDropdown(false);
    setSearchTerm("");
  };

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
      <div className="col-span-1 relative" ref={dropdownRef}>
        <label className="block text-sm text-gray-700 mb-1">Loại hàng hóa</label>
        <div className="relative">
          <input
            type="text"
            name="type"
            value={showDropdown ? searchTerm : filters.type}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!showDropdown) setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showDropdown && (
            <div className="absolute mt-1 w-full max-h-60 overflow-y-auto rounded-md border bg-white shadow-lg z-10">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm font-medium text-blue-500"
                onClick={() => handleTypeSelect("Tất cả")}
              >
                Tất cả
              </div>
              {filteredTypes.length > 0 ? (
                filteredTypes.map((item) => (
                  <div
                    key={item}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleTypeSelect(item)}
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  Không tìm thấy kết quả
                </div>
              )}
            </div>
          )}
        </div>
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