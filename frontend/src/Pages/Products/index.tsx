/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react';
import FilterForm from '../../components/listProduct/filter';
import ProductTable from '../../components/listProduct/table-in-stock';
import { toast } from 'react-toastify';
import EditProductPopup from '../../components/listProduct/edit-popup-product';
import { housewareService, productService } from '../../services';
import { Houseware, IUpadateProduct, Product, ProductSearchPayload } from '../../interfaces';
import { AuthContext } from '../../contexts/AuthContext';

const ProductList: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [filters, setFilters] = useState<ProductSearchPayload>({
    name: '',
    type: '',
    createdAt: undefined,
    status: 'active'
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [housewareOptions, setHousewareOptions] = useState<Houseware[]>([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [editProduct, setEditProduct] = useState<IUpadateProduct>();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, userId: user?._id }));
  };

  const getList = async () => {
    try {
      const response = await productService.getList({
        ...filters,
        ...(user?.role !== 'admin' && {userId: user?._id})
      });
      setProducts(response || []);
    } catch (error) {
      setProducts([]);
      toast.error(`${error}`);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setShowConfirmPopup(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      const response = await productService.delete(productToDelete);
      if (response) {
        toast.success("Deleted successfully!");
        const updatedProduct = products.filter(p => `${p._id}` !== `${productToDelete}`);
        setProducts(updatedProduct);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
    setProductToDelete(null);
    setShowConfirmPopup(false);
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setShowConfirmPopup(false);
  };

  const handleEditClick = (product: IUpadateProduct) => {
    setEditProduct(product);
  };

  const handleSaveEdit = async (updatedData: IUpadateProduct) => {
    if (!editProduct) return;
    try {
      const payload = {
        _id: editProduct._id,
        ...updatedData,
      };
      const response = await productService.update(payload);
      if (response) {
        toast.success('Updated successfully!');
      } else {
        toast.error('Update failed!');
      }
      getList();
    } catch (error) {
      toast.error(`${error}`);
    }
    setEditProduct(undefined);
  };

  const handleCancelEdit = () => {
    setEditProduct(undefined);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const loadHousewareOptions = async () => {
      try {
        const activeHousewares = await housewareService.getListHouseware({
          status: 'active',
          ...(user?.role !== 'admin' && {userId: user?._id}) 
        });
        activeHousewares?.length && setHousewareOptions(activeHousewares);
      } catch (error) {
        console.error("Failed to fetch houseware options:", error);
      }
    };

    user && loadHousewareOptions();
    user && getList();
  }, [filters, user]);

  useEffect(() => {
    setFilters({
      name: '',
      type: '',
      createdAt: undefined,
      status: 'active'
    });
  },[]);


  return (
    <div className="bg-gray-100 font-sans min-h-screen p-4">
      <div className="max-w-full sm:max-w-[1200px] mx-auto bg-white shadow rounded overflow-hidden">
        {/* Tiêu đề */}
        <div className="bg-black text-white text-center font-semibold text-base sm:text-lg py-4 px-4">
          DANH SÁCH HÀNG HÓA
        </div>
  
        {/* Form lọc */}
        <div className="px-4 sm:px-8 pt-6 pb-8">
          <FilterForm
            filters={filters}
            onChange={handleFilterChange}
            onSubmit={handleSubmit}
          />
        </div>
  
        {/* Bảng sản phẩm */}
        <div className="px-4 sm:px-8 pt-6 pb-10 overflow-x-auto">
          <ProductTable
            products={paginatedProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
            housewareOptions={housewareOptions}
          />
        </div>
      </div>
  
      {/* Popup xác nhận xóa */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full sm:w-96 max-w-lg p-6">
            <div className="text-center text-xl font-semibold mb-4">
              Xác nhận xóa
            </div>
            <div className="text-gray-700 text-sm mb-6">
              Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này không thể hoàn tác.
            </div>
            <div className="flex justify-around">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md w-full sm:w-auto text-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full sm:w-auto text-sm"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
  
      {/* Popup chỉnh sửa sản phẩm */}
      {editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full sm:w-96 max-w-lg p-6">
            <div className="text-center text-xl font-semibold mb-4">
              Chỉnh sửa sản phẩm
            </div>
            <EditProductPopup
              initialData={{
                name: editProduct?.name ?? '',
                type: editProduct?.type ?? '',
                quantity: editProduct?.quantity ?? 0,
                price: editProduct?.price ?? 0,
                housewareId: editProduct?.housewareId ?? ''
              }}
              housewareOptions={housewareOptions}
              onSubmit={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
  
};

export default ProductList;
