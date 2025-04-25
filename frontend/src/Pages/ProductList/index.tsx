import React, { useState } from 'react';
import FilterForm from '../../components/listProduct/filter';
import ProductTable from '../../components/listProduct/table-in-stock';

const ProductList: React.FC = () => {
  const [filters, setFilters] = useState({
    maPhieu: '',
    nguonNhan: '80',
    tinhTrang: '',
    tuNgay: '',
    denNgay: ''
  });

  const [products] = useState([
    {
      id: '#20462',
      image: 'https://placehold.co/40x40?text=&bg=8B5CF6&fg=fff&font=roboto',
      name: 'Matt Dickerson',
      source: 'Việt Nam',
      category: 'Áo thun',
      gender: 'Nam',
      price: '100.000$'
    },
    {
      id: '#18933',
      image: 'https://placehold.co/40x40?text=&bg=3B82F6&fg=fff&font=roboto',
      name: 'Wiktoria',
      source: 'Việt Nam',
      category: 'Áo thun',
      gender: 'Nam',
      price: '100.000$'
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
    console.log('Filters submitted:', filters);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-gray-100 font-sans">
      <div className="max-w-full min-h-screen p-4 bg-gray-100">
        <div className="max-w-[1200px] mx-auto bg-white shadow-sm rounded-sm">
          <div className="bg-black text-white font-semibold text-lg px-6 py-3 select-none">
            DANH SÁCH HÀNG HÓA
          </div>

          <FilterForm filters={filters} onChange={handleFilterChange} onSubmit={handleSubmit} />
          <ProductTable products={paginatedProducts} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
