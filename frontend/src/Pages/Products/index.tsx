/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from 'react';
import FilterForm from '../../components/listProduct/filter';
import ProductTable from '../../components/listProduct/table-in-stock';
import ConfirmDeletePopup from '../../components/popup/confirm-deleted-popup';
import { toast } from 'react-toastify';
import EditProductPopup from '../../components/listProduct/edit-popup-product';
import { productService } from '../../services';
import { Product, ProductSearchPayload } from '../../interfaces';

const ProductList: React.FC = () => {
  const [filters, setFilters] = useState<ProductSearchPayload>({
    name: '',
    type: '',
    createdAt: undefined,
    status: 'active'
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [editProduct, setEditProduct] = useState<any>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

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

  // Khi bấm nút Edit
  const handleEditClick = (product: any) => {
    setEditProduct(product);
    console.log("product", product)

    setEditName(product.name || '');
    setEditPrice(product.price.toString());
  };

  const handleSaveEdit = async () => {
    if (!editProduct) return;
    try {
      const payload = {
        _id: editProduct._id,
        name: editName,
        price: Number(editPrice),
      };
      const response = await productService.update(payload);
      console.log('Update response:', response); // In ra phản hồi để kiểm tra
      if (response) {
        toast.success('Updated successfully!');
      } else {
        toast.error('Update failed!');
      }
    } catch (error) {
      toast.error(`${error}`);
    }
    setEditProduct(null);
  };


  const handleCancelEdit = () => {
    setEditProduct(null);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await productService.getList(filters);
        console.log('response', response)
        response?.length && setProducts(response);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    }
    getList();
  }, [filters]);

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
        <EditProductPopup // 👈 Sử dụng EditProductPopup
          formData={{ name: editName, price: Number(editPrice) }}
          onChange={(e) => {
            if (e.target.name === 'name') {
              setEditName(e.target.value);
            } else if (e.target.name === 'price') {
              setEditPrice(e.target.value);
            }
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveEdit();
          }}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default ProductList;
