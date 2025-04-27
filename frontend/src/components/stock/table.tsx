import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Houseware } from '../../interfaces';


interface TableProps {
  stocks: Houseware[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onEdit: (stock: Houseware) => void; // ✅ thêm prop onEdit
}

const StockTable: React.FC<TableProps> = ({
  stocks,
  currentPage,
  totalPages,
  onPageChange,
  onDelete,
  onEdit, // ✅ destructure thêm onEdit
}) => {
  return (
    <>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-full text-sm text-gray-700 border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gray-100 text-gray-900 font-semibold select-none">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Updated At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-6">
                  Không có dữ liệu kho hàng.
                </td>
              </tr>
            ) : (
              stocks.map((stock, index) => (
                <tr
                  key={stock._id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } border border-gray-200 rounded-md`}
                >
                  <td className="px-4 py-2">{stock.name}</td>
                  <td className="px-4 py-2">{stock.city}</td>
                  <td className="px-4 py-2">{stock.address}</td>
                  <td className="px-4 py-2">{stock.createdAt}</td>
                  <td className="px-4 py-2">{stock.updatedAt}</td>
                  <td className="px-4 py-2 space-x-3">
                    <button
                      onClick={() => onEdit(stock)} // ✅ Gọi callback onEdit
                      className="text-green-500 hover:scale-125"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(stock._id)}
                      className="text-red-500 hover:scale-125"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-3 py-6 select-none">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-md font-semibold text-sm ${page === currentPage
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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

export default StockTable;
