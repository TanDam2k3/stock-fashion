import React, { useState, useEffect, useRef } from 'react';

interface FilterProps {
  filters: {
    name: string;
    city: string;
    createdAt: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const StockFilter: React.FC<FilterProps> = ({ filters, onChange, onSubmit }) => {
  const cities = [
    "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "An Giang", "Bà Rịa - Vũng Tàu",
    "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương",
    "Bình Phước", "Bình Thuận", "Cà Mau", "Cao Bằng", "Đắk Lắk", "Đắk Nông", "Điện Biên",
    "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Tĩnh", "Hải Dương", "Hậu Giang",
    "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn",
    "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên",
    "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La",
    "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh",
    "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const [visibleCities, setVisibleCities] = useState<string[]>([]);
  const [cityPage, setCityPage] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const citiesPerPage = 10;

  const loadMoreCities = () => {
    const filteredCities = cities.filter(city => 
      city.toLowerCase().includes(filters.city.toLowerCase())
    );
    
    const nextCities = filteredCities.slice(
      cityPage * citiesPerPage, 
      (cityPage + 1) * citiesPerPage
    );
    
    setVisibleCities(prev => [...prev, ...nextCities]);
    setCityPage(prev => prev + 1);
  };

  const handleScroll = () => {
    if (!dropdownRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      loadMoreCities();
    }
  };

  useEffect(() => {
    if (showDropdown) {
      setCityPage(0);
      setVisibleCities([]);
      loadMoreCities();
    }
  }, [showDropdown, filters.city]);

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white shadow-md rounded-md relative"
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
      <div className="relative">
        <label className="block text-sm text-gray-700 mb-1">Thành phố</label>
        <input
          type="text"
          name="city"
          value={filters.city}
          onChange={(e) => {
            onChange(e);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Chọn hoặc nhập thành phố..."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {showDropdown && (
          <div
            ref={dropdownRef}
            onScroll={handleScroll}
            className="absolute mt-1 max-h-48 w-full overflow-y-auto rounded-md border bg-white shadow-lg z-10"
          >
            {visibleCities.map((city) => (
              <div
                key={city}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  const fakeEvent = {
                    target: { name: "city", value: city }
                  } as unknown as React.ChangeEvent<HTMLInputElement>;
                  onChange(fakeEvent);
                  setShowDropdown(false);
                }}
              >
                {city}
              </div>
            ))}
          </div>
        )}
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