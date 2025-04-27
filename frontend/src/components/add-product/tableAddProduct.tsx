import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { productService } from "../../services";
import { Houseware, ICreateProduct } from "../../interfaces";
import { SubmitHandler, useForm } from "react-hook-form";

interface ProductsTableProps {
  products: ICreateProduct[];
  onUpdateProduct: (updatedProduct: ICreateProduct) => void;
  onDeleteProduct: (productId: string) => void;
  onClearAll: () => void;
  housewareOptions: Houseware[];
}

type Inputs = {
  housewareId: string,
  name: string,
  type: string,
  quantity: number,
  price: number,
  file: File[] | null
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onUpdateProduct,
  onDeleteProduct,
  onClearAll,
  housewareOptions,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      housewareId: '',
      type: '',
      quantity: 0,
      price: 0,
      file: null,
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ICreateProduct | null>(null);
  const watchedFile = watch('file');


  const handleUpdateClick = (product: ICreateProduct) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (identification: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDeleteProduct(identification);
    }
  };
  const handleCreateAllProducts = async () => {
    if (products.length === 0) {
      alert("No products to create!");
      return;
    }
    const confirm = window.confirm("Are you sure you want to create all products to DB and clear the table?");
    if (!confirm) return;
    let successCount = 0;

    await products.reduce(async (lp, product) => {
      await lp;
      try {
        let file = null;

        if (product.file) {
          file = await productService.uploadImage(product.file);
        }
        console.log('file', file)
        await productService.create({
          housewareId: product.housewareId,
          name: product.name,
          type: product.type,
          quantity: product.quantity,
          status: 'Active',
          price: product.price,
          fileId: file?.file?._id || null
        });

        successCount++;
      } catch (error) {
        console.error(`Failed to create product "${product.name}":`, error);
      }
    }, Promise.resolve());

    toast.success(`Created ${successCount} / ${products.length} products to DB.`);
    onClearAll();
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data) return;
    if (currentProduct) {
      const updated = { ...currentProduct, ...data } as ICreateProduct;
      onUpdateProduct(updated);
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    if (currentProduct) {
      reset({
        name: currentProduct.name,
        housewareId: currentProduct.housewareId,
        type: currentProduct.type,
        quantity: currentProduct.quantity,
        price: currentProduct.price,
        file: currentProduct.file ? [currentProduct.file] : null
      });
    }
  }, [currentProduct, reset]);

  return (
    <div className="w-full rounded-md bg-white p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-black text-xl font-semibold">Products List</h2>
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            <button
              onClick={handleCreateAllProducts}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm"
            >
              Create All to DB
            </button>
          </div>
        </div>

      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Houseware Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Houseware_ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products?.length > 0 && products.map((product) => (
              <tr key={product.identification}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.imagePreview ? (
                    <img src={product.imagePreview} alt="Product" className="h-10 w-10 rounded-md object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                      <i className="far fa-image text-gray-400"></i>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product?.housewareName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.housewareId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product?.price ? product.price : 0}</td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleUpdateClick(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => product?.identification && handleDeleteClick(product.identification)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Product Modal */}
      {isModalOpen && currentProduct && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Update Product</h3>
                  <div className="grid grid-cols-1 gap-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={currentProduct.name}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("name", { required: true })}
                      />
                    </div>
                    <div>
                      <label htmlFor="housewareId" className="block text-sm font-medium text-gray-700">Houseware</label>
                      <select
                        id="housewareId"
                        className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                        {...register("housewareId", { required: true })}
                      >
                        <option value="" disabled>
                          Select houseware
                        </option>
                        {housewareOptions.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                      <select
                        id="type"
                        className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                        {...register("type", { required: true })}
                      >
                        <option value="" disabled>
                          Select type
                        </option>
                        <option>Áo</option>
                        <option>Áo khoác</option>
                        <option>Quần</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                      <input
                        type="number"
                        id="quantity"
                        value={currentProduct.quantity}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("quantity", { required: true, min: 1 })}
                      />
                    </div>
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="number"
                        id="price"
                        step="0.01"
                        value={currentProduct.price}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("price", { required: true, min: 1 })}
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        id="productImage"
                        type="file"
                        accept="image/*"
                        className="flex-1 rounded-md border border-gray-200 bg-white text-gray-700 file:bg-[#0a162c] file:text-white file:px-4 file:py-2 file:rounded-l-md file:border-none file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                        {...register("file")}
                      />
                      {watchedFile && watchedFile.length > 0 ? (
                        <img
                          src={URL.createObjectURL(watchedFile[0])}
                          alt="Preview"
                          className="w-14 h-14 rounded-md object-cover"
                        />
                      ) : currentProduct.imagePreview ? (
                        <img
                          src={currentProduct.imagePreview}
                          alt="Current Preview"
                          className="w-14 h-14 rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-2xl cursor-pointer">
                          <i className="far fa-image" aria-hidden="true"></i>
                          <span className="sr-only">Product image icon</span>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;