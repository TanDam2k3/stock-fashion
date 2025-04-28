import React from "react";
import { ITransaction } from "../../interfaces";

interface ProductDetailPopupProps {
  transaction: ITransaction;
  onClose: () => void;
}

const ProductDetailPopup: React.FC<ProductDetailPopupProps> = ({
  transaction,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-60 z-50 transition-all ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] transform transition-transform duration-300 scale-95 hover:scale-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          Chi tiết phiếu xuất kho
        </h3>

        <div className="flex items-center justify-between gap-4">
          <div className="w-2/3">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mã phiếu</label>
              <input
                type="text"
                value={transaction._id}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Ngày xuất kho</label>
              <input
                type="text"
                value={`${transaction?.createdAt ? new Date(transaction.createdAt).getDate() : ''}`}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tên sản phẩm</label>
              <input
                type="text"
                value={transaction?.productName || ''}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Số lượng</label>
              <input
                type="number"
                value={transaction?.quantity || 0}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Tên người thực hiện</label>
              <input
                type="text"
                value={transaction?.userName || ''}
                readOnly
                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-4 w-1/3">
            <div className="w-full h-56 flex justify-center items-center bg-gray-100 rounded-md">
              <img
                src={transaction?.imageUrl || ''}
                alt={transaction?.productName || ''}
                className="object-contain max-h-full max-w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-gray-300 text-gray-800 rounded-md text-sm font-semibold transition hover:bg-gray-200"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-black text-white rounded-md text-sm font-semibold transition hover:bg-black/70"
          >
            In phiếu xuất kho
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPopup;
