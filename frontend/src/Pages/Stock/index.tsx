import React, { useState } from 'react';
import StockFilter from '../../components/stock/filter';
import StockTable from '../../components/stock/table';

const StockList: React.FC = () => {
  const [filters, setFilters] = useState({
    name: '',
    city: ''
  });

  const [stocks] = useState([
    {
      id: '1',
      name: 'Kho Hà Nội',
      city: 'Hà Nội',
      address: '123 Lê Duẩn',
      createdAt: '2024-04-01',
      updatedAt: '2025-04-01'
    },
    {
      id: '2',
      name: 'Kho Sài Gòn',
      city: 'Hồ Chí Minh',
      address: '456 Nguyễn Huệ',
      createdAt: '2023-10-10',
      updatedAt: '2025-03-22'
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Filters:', filters);
    // Ở đây bạn có thể gọi API filter
  };

  // Filter tạm (demo)
  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    (filters.city ? stock.city === filters.city : true)
  );

  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  const paginatedStocks = filteredStocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-100 font-sans">
      <div className="max-w-full min-h-screen p-4 bg-gray-100">
        <div className="max-w-[1200px] mx-auto bg-white shadow-sm rounded-sm">
          <div className="bg-black text-white font-semibold text-lg px-6 py-3 select-none">
            DANH SÁCH KHO HÀNG
          </div>
          <StockFilter filters={filters} onChange={handleFilterChange} onSubmit={handleSubmit} />
          <StockTable stocks={paginatedStocks} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default StockList;
