import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import StockFilter from '../../components/stock/filter';
import StockTable from '../../components/stock/table';
import { housewareService } from '../../services/api-housewares';
import ConfirmDeletePopup from '../../components/popup/confirm-deleted-popup';
import EditStockPopup from '../../components/stock/edit-popup';
import { Houseware } from '../../interfaces';

const StockList: React.FC = () => {
  const [filters, setFilters] = useState({
    name: '',
    city: '',
    createdAt: ''
  });

  const [stocks, setStocks] = useState<Houseware[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [stockToDelete, setStockToDelete] = useState<string | null>(null);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [stockToEdit, setStockToEdit] = useState<Houseware | null>(null);
  const [formData, setFormData] = useState({ name: '', address: '', city: '' });

  const itemsPerPage = 10;

  const getListHouseware = async () => {
    try {
      const stockList = await housewareService.getListHouseware({
        status: "active"
      });
      console.log('stockList', stockList)
      setStocks(stockList);
    } catch (error) {
      console.error('Error fetching stock list:', error);
    }
  };

  useEffect(() => {
    getListHouseware();
  }, []);

  // DELETE
  const handleDeleteClick = (id: string) => {
    setStockToDelete(id);
    setShowConfirmPopup(true);
  };

  const handleDelete = async () => {
    if (!stockToDelete) return;

    const response = await housewareService.delete(stockToDelete);
    if (response) {
      toast.success("Deleted successfully!");
      getListHouseware();
    } else {
      toast.warning("Delete failed!");
    }
    setShowConfirmPopup(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmPopup(false);
  };

  // EDIT
  const handleEditClick = (stock: Houseware) => {
    setStockToEdit(stock);
    setFormData({
      name: stock.name,
      address: stock.address,
      city: stock.city,
    });
    setShowEditPopup(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockToEdit) return;

    const updatedStock = {
      _id: stockToEdit._id,
      ...formData,
    } as unknown as Houseware;

    const response = await housewareService.update(updatedStock);
    if (response?.message?.includes('success')) {
      toast.success("updated successfully!!");
      getListHouseware();
    } else {
      toast.warning("update failed");
    }
    setShowEditPopup(false);
  };

  // FILTER
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // PAGINATION + FILTER
  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    (filters.city ? stock.city === filters.city : true) &&
    (filters.createdAt ? stock.createdAt.startsWith(filters.createdAt) : true)
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
          <StockTable
            stocks={paginatedStocks}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
          />
        </div>
      </div>

      {showConfirmPopup && (
        <ConfirmDeletePopup
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showEditPopup && (
        <EditStockPopup
          formData={formData}
          onChange={handleEditChange}
          onSubmit={handleEditSubmit}
          onCancel={() => setShowEditPopup(false)}
        />
      )}
    </div>
  );
};

export default StockList;
