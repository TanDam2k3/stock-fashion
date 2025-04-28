
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import ProductDetailPopup from '../../../components/transaction-history/edit-popup';
import { ITransaction } from '../../../interfaces';
import { exportProductService } from '../../../services';
import { AuthContext } from '../../../contexts/AuthContext';

type FilterType = {
  type: string;
  status: string;
  fromDate: Date | null;
  toDate: Date | null;
};

const ExportHistory: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [transactionExport, setTransactionExport] = useState<ITransaction[]>([]);
  const [filter, setFilter] = useState<FilterType>({
    type: 'export',
    status: 'success',
    fromDate: null,
    toDate: null
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectTransaction, setSelectTransaction] = useState<ITransaction | null>(null);


  const { register } = useForm<ITransaction>();


  const handleViewDetail = (transaction: ITransaction) => {
    setSelectTransaction(transaction);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectTransaction(null);
  };

  const getTransaction = async () => {
    const transaction = await exportProductService.getList({
      ...filter,
      userId: user?._id
    });
    setTransactionExport(transaction);
  }

  useEffect(() => {
    getTransaction();
  }, [filter, user]);

  return (
    <div className="w-full rounded-md flex flex-col p-5 min-h-full">
      <div className="min-w-[1200px] mx-auto">
      <div className="bg-white rounded-md px-2">
          <h1 className='text-xl font-semibold'>EXPORT HISTORY</h1>
          <form className="bg-white rounded-md p-4 sm:p-6 mb-6 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6">
            <div>
              <label htmlFor="from-date" className="block text-xs font-semibold text-[#1E1E1E] mb-1">
                Từ ngày
              </label>
              <div className="relative">
                <input
                  id="from-date"
                  type="date"
                  className="w-full border border-[#E5E7EB] rounded-md bg-white text-xs sm:text-sm text-[#6B7280] py-2 px-3 pl-9"
                  onChange={(value) => setFilter({ ...filter, fromDate: new Date(value.target.value) })}
                />
                <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm pointer-events-none"></i>
              </div>
            </div>

            <div>
              <label htmlFor="to-date" className="block text-xs font-semibold text-[#1E1E1E] mb-1">
                Đến ngày
              </label>
              <div className="relative">
                <input
                  id="to-date"
                  type="date"
                  className="w-full border border-[#E5E7EB] rounded-md bg-white text-xs sm:text-sm text-[#6B7280] py-2 px-3 pl-9"
                  onChange={(value) => setFilter({ ...filter, toDate: new Date(value.target.value) })}
                />
                <i className="fas fa-calendar-alt absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm pointer-events-none"></i>
              </div>
            </div>
          </form>
        </div>

        <section className="bg-white rounded-md p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#1E1E1E] font-semibold text-sm sm:text-base">
              Thông tin phiếu xuất kho
            </h2>
          </div>

          <table className="w-full border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#C6D5F7] text-[#0B2E65] font-semibold text-center">
                <th className="py-2 px-3 border border-[#AFC3F7]">Mã phiếu</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Tên kho hàng</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Tên sản phẩm</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Số lượng</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">Người thực hiện</th>
                <th className="py-2 px-3 border border-[#AFC3F7]">View</th>
              </tr>
            </thead>
            <tbody>
              {transactionExport?.length > 0 && transactionExport.map((transaction) => (
                <tr key={transaction._id} className="text-center text-[#1E1E1E]">
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      {...register('_id')}
                      readOnly
                      className="w-full border rounded px-2 py-1 bg-[#F9FAFB] cursor-not-allowed text-center"
                      value={transaction._id}
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      {...register('housewareName')}
                      readOnly
                      className="w-full border rounded px-2 py-1 bg-[#F9FAFB] cursor-not-allowed text-center"
                      value={transaction?.housewareName || ''}
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      {...register('productName')}
                      readOnly
                      className="w-full border rounded px-2 py-1 bg-[#F9FAFB] cursor-not-allowed text-center"
                      value={transaction?.productName || ''}
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      type="number"
                      {...register('quantity', { valueAsNumber: true })}
                      readOnly
                      className="w-full border rounded px-2 py-1 bg-[#F9FAFB] cursor-not-allowed text-center"
                      value={transaction?.quantity || 0}
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <input
                      {...register('userName')}
                      readOnly
                      className="w-full border rounded px-2 py-1 bg-[#F9FAFB] cursor-not-allowed text-center"
                      value={transaction?.userName || ''}
                    />
                  </td>
                  <td className="border border-[#E5E7EB] p-1">
                    <button
                      type="button"
                      onClick={() => handleViewDetail(transaction)}
                      className="flex justify-center items-center w-full text-blue-500 hover:text-blue-700"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {/* Show Product Detail Popup */}
      {isPopupOpen && selectTransaction && (
        <ProductDetailPopup transaction={selectTransaction} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default ExportHistory;
