import React, { useState, useEffect } from 'react';
import FilterForm from '../../components/listProduct/filter';
import ProductTable from '../../components/listProduct/table-in-stock';
import ConfirmDeletePopup from '../../components/popup/confirm-deleted-popup';
import { getListProducts, deleteProduct, updateProduct } from '../../api/api-product';
import { toast } from 'react-toastify';
import EditProductPopup from '../../components/listProduct/edit-popup-product';

const ProductList: React.FC = () => {
  const [filters, setFilters] = useState({
    name: '',
    type: '',
    createdAt: '',
    city: ''
  });

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // Danh sách sản phẩm đã lọc
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [editProduct, setEditProduct] = useState<any>(null); 




  const fetchProducts = async (filters = {}) => {
    try {
      const response = await getListProducts(filters); // Truyền filters vào API
      const activeProducts = response.filter((product: any) => product.status === 'active');
      setProducts(activeProducts);
      setFilteredProducts(activeProducts); // Ban đầu, tất cả sản phẩm sẽ được lọc
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts(filters); // Gửi filters đi và lấy lại danh sách sản phẩm đã lọc
  };

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setShowConfirmPopup(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      const response = await deleteProduct(productToDelete);
      if (response) {
        toast.success('Deleted successfully!');
        fetchProducts(); // Lấy lại danh sách sau khi xóa
      }
    } catch (error) {
      toast.warning('Delete failed!');
    }
    setProductToDelete(null);
    setShowConfirmPopup(false);
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
    setShowConfirmPopup(false);
  };

  const handleEditClick = (product: any) => {
    setEditProduct(product);
  };

  const handleSaveEdit = async (updatedData: any) => {
    if (!editProduct) return;
    try {
      const payload = {
        _id: editProduct._id,
        ...updatedData,
      };
      const response = await updateProduct(payload);
      if (response) {
        toast.success('Updated successfully!');
        fetchProducts(); // Lấy lại danh sách sau khi sửa
      } else {
        toast.error('Update failed!');
      }
    } catch (error) {
      toast.error('Update failed!');
    }
    setEditProduct(null);
  };

  const handleCancelEdit = () => {
    setEditProduct(null);
  };

  // Logic phân trang
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-gray-100 font-sans">
      <div className="max-w-full min-h-screen p-4 bg-gray-100">
        <div className="max-w-[1200px] mx-auto bg-white shadow-sm rounded-sm">
          <div className="bg-black text-white font-semibold text-lg px-6 py-3 select-none">
            DANH SÁCH HÀNG HÓA
          </div>

          <FilterForm filters={filters} onChange={handleFilterChange} onSubmit={handleSubmit} />
          <ProductTable
            products={paginatedProducts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick} // 👈 Thêm onEdit
          />
        </div>
      </div>

      {showConfirmPopup && (
        <ConfirmDeletePopup
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          title="Confirm Deletion"
          description="Are you sure you want to delete this product? This action cannot be undone."
        />
      )}

      {editProduct && (
        <EditProductPopup
          initialData={{
            name: editProduct.name,
            type: editProduct.type,
            quantity: editProduct.quantity,
            price: editProduct.price,
          }}
          onSubmit={(data) => {
            handleSaveEdit(data);
          }}
          onCancel={handleCancelEdit}
        />
      )}

    </div>
  );
};

export default ProductList;
