/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react';
import FilterForm from '../../components/listProduct/filter';
import ProductTable from '../../components/listProduct/table-in-stock';
import ConfirmDeletePopup from '../../components/popup/confirm-deleted-popup';
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
    userId: user?._id,
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
        userId: user?._id
      });
      setProducts(response || []);
            if (filters.type && response?.length === 0) {
      }
    } catch (error) {
      setProducts([]);
    } finally {
   
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
          userId: user?._id
        });
        activeHousewares?.length && setHousewareOptions(activeHousewares);
      } catch (error) {
        console.error("Failed to fetch houseware options:", error);
      }
    };

    user && loadHousewareOptions();
    user && getList();
  }, [filters, user]);


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
            onEdit={handleEditClick}
            housewareOptions={housewareOptions}
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
            name: editProduct?.name ? editProduct.name : '',
            type: editProduct?.type ? editProduct?.type : '',
            quantity: editProduct?.quantity ? editProduct.quantity : 0,
            price: editProduct?.price ? editProduct.price : 0,
            housewareId: editProduct?.housewareId ? editProduct.housewareId : ''
          }}
          housewareOptions={housewareOptions}
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
