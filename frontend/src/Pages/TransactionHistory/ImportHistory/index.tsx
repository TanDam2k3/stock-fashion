
import React, { useContext, useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import ProductDetailPopup from '../../../components/transaction-history/edit-popup';
import { ITransaction } from '../../../interfaces';
import { importProductService } from '../../../services';
import { AuthContext } from '../../../contexts/AuthContext';

type FilterType = {
  type: string;
  status: string;
  fromDate: Date | null;
  toDate: Date | null;
};

const ImportHistory: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [transactionImport, setTransactionImport] = useState<ITransaction[]>([]);
  const [filter, setFilter] = useState<FilterType>({
    type: 'import',
    status: 'success',
    fromDate: null,
    toDate: null
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectTransaction, setSelectTransaction] = useState<ITransaction | null>(null);

  const handleViewDetail = (product: ITransaction) => {
    setSelectTransaction(product);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectTransaction(null);
  };

  const getTransaction = async () => {
    const transaction = await importProductService.getList({
      ...filter,
      ...(user?.role !== 'admin' && {userId: user?._id}) 
    });

    setTransactionImport(transaction);
  }

  useEffect(() => {
    getTransaction();
  }, [filter, user]);

  return (
    <div className="w-full rounded-md flex flex-col p-5 min-h-full">
      <div className="min-w-[1200px] mx-auto">
      <div className="bg-white rounded-md px-2">
          <h1 className='text-xl font-semibold'>IMPORT HISTORY</h1>
          <form className="bg-white rounded-md p-4 sm:p-6 mb-6 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6">
            <div>
              <label htmlFor="from-date" className="block text-sm font-medium text-gray-700 mb-1">
                Từ ngày
              </label>
              <div className="relative">
                <input
                  id="from-date"
                  type="date"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm text-gray-700"
                  onChange={(value) =>
                    setFilter({ ...filter, fromDate: new Date(value.target.value) })
                  }
                />
                <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
              </div>
            </div>
  
            <div>
              <label htmlFor="to-date" className="block text-sm font-medium text-gray-700 mb-1">
                Đến ngày
              </label>
              <div className="relative">
                <input
                  id="to-date"
                  type="date"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 text-sm text-gray-700"
                  onChange={(value) =>
                    setFilter({ ...filter, toDate: new Date(value.target.value) })
                  }
                />
                <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"></i>
              </div>
            </div>
          </form>
        </div>
  
        {/* Section Export Table */}
        <section className="bg-white rounded-md p-4 mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-gray-800">Thông tin phiếu xuất kho</h2>
          </div>
  
          {/* Table View for Desktop */}
          <div className="w-full overflow-x-auto hidden sm:block">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-blue-100 text-blue-800 font-semibold">
                  <th className="py-2 px-3 border border-blue-200">Mã phiếu</th>
                  <th className="py-2 px-3 border border-blue-200">Tên kho hàng</th>
                  <th className="py-2 px-3 border border-blue-200">Tên sản phẩm</th>
                  <th className="py-2 px-3 border border-blue-200">Số lượng</th>
                  <th className="py-2 px-3 border border-blue-200">Người thực hiện</th>
                  <th className="py-2 px-3 border border-blue-200">View</th>
                </tr>
              </thead>
              <tbody>
                {transactionImport?.length > 0 ? (
                  transactionImport.map((transaction) => (
                    <tr key={transaction._id} className="text-center text-gray-800">
                      <td className="border border-gray-200 p-2">{transaction._id}</td>
                      <td className="border border-gray-200 p-2">{transaction.housewareName}</td>
                      <td className="border border-gray-200 p-2">{transaction.productName}</td>
                      <td className="border border-gray-200 p-2">{transaction.quantity}</td>
                      <td className="border border-gray-200 p-2">{transaction.userName}</td>
                      <td className="border border-gray-200 p-2">
                        <button
                          type="button"
                          onClick={() => handleViewDetail(transaction)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-400">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
  
          {/* Card View for Mobile */}
          <div className="block sm:hidden space-y-4">
            {transactionImport?.length > 0 ? (
              transactionImport.map((transaction) => (
                <div
                  key={transaction._id}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
                >
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Mã phiếu:</strong> {transaction._id}</p>
                    <p><strong>Tên kho hàng:</strong> {transaction.housewareName}</p>
                    <p><strong>Tên sản phẩm:</strong> {transaction.productName}</p>
                    <p><strong>Số lượng:</strong> {transaction.quantity}</p>
                    <p><strong>Người thực hiện:</strong> {transaction.userName}</p>
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={() => handleViewDetail(transaction)}
                        className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                      >
                        <FaEye /> Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400">
                Không có dữ liệu
              </div>
            )}
          </div>
        </section>
      </div>
  
      {/* Popup Detail */}
      {isPopupOpen && selectTransaction && (
        <ProductDetailPopup transaction={selectTransaction} onClose={handleClosePopup} />
      )}
    </div>
  );
  
};

export default ImportHistory;
