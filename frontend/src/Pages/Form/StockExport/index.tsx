/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { exportProductService, housewareService, productService } from "../../../services";
import { AuthContext } from "../../../contexts/AuthContext";
import { Houseware, Product } from "../../../interfaces";
import { toast } from "react-toastify";

type Inputs = {
  productId: string;
  housewareId: string;
  quantity: number;
};

const ExportStock: React.FC = () => {
  const { register, handleSubmit, control, reset } = useForm<Inputs>();
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [housewares, setHousewares] = useState<Houseware[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showFullImage, setShowFullImage] = useState<boolean>(false);

  const onChangeHouseware = useWatch({ control, name: 'housewareId' });
  const onChangeProduct = useWatch({ control, name: 'productId' });


  const getListHouseware = async () => {
    try {
      const houseware = await housewareService.getListHouseware({ 
        status: 'active', 
        ...(user?.role !== 'admin' && {userId: user?._id}) 
      });
      setHousewares(houseware);
    } catch (error) {
      console.error('Error fetching houseware list:', error);
    }
  };



  const getList = async () => {
    try {
      const response = await productService.getList({ 
        housewareId: onChangeHouseware, 
        ...(user?.role !== 'admin' && {userId: user?._id})  
      });
      response?.length && setProducts(response);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  }

  useEffect(() => {
    getListHouseware();
  }, []);

  useEffect(() => {
    getList();
  }, [onChangeHouseware]);


  useEffect(() => {
    if (onChangeProduct) {
      const product = products.find(p => `${p._id}` === `${onChangeProduct}`);
      product?.imageUrl && setImagePreview(product.imageUrl);
    }
  }, [onChangeProduct]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const dataCreate = {
        ...data,
        userId: user?._id,
        type: 'export'
      };
      const exportStock = await exportProductService.create(dataCreate);
      if (exportStock.message === 'Stock export success') {
        toast.success(exportStock.message);
        reset();
        setShowFullImage(false);
        setImagePreview("");
      } else {
        toast.error(exportStock.message);
      }
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  return (
    <div className="w-full rounded-md bg-white flex flex-col p-5 min-h-full">
    <form
      className="w-full"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      noValidate
    >
      <h2 className="text-black text-xl font-semibold mb-6">
        Export product
      </h2>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Form + Image (mobile) */}
        <div className="flex flex-col gap-6 justify-center order-1 md:order-1">
          <div>
            <label htmlFor="housewareId" className="block text-sm font-semibold text-black mb-1">
              Select Houseware
            </label>
            <select
              id="housewareId"
              className="w-full rounded-md border px-4 py-2"
              {...register("housewareId", { required: true })}
            >
              <option value="">Select houseware</option>
              {housewares.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label htmlFor="productId" className="block text-sm font-semibold text-black mb-1">
              Select Product
            </label>
            <select
              id="productId"
              className="w-full rounded-md border px-4 py-2"
              {...register("productId", { required: true })}
            >
              <option value="">Select Product</option>
              {products.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
  
          <div>
            <label htmlFor="quantity" className="block text-sm font-semibold text-black mb-1">
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              placeholder="Enter quantity"
              className="w-full rounded-md border px-4 py-2"
              {...register("quantity", { required: true, min: 1 })}
            />
          </div>
  
          {/* Image (chỉ hiện trong mobile) */}
          <div className="block md:hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-64 object-cover rounded-md cursor-pointer"
                onClick={() => setShowFullImage(true)}
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center border text-gray-400 mx-auto">
                No Image
              </div>
            )}
          </div>
  
          <button type="submit" className="bg-[#0a162c] text-white py-3 rounded-md">
            Export
          </button>
        </div>
  
        {/* Right Column: Image for desktop */}
        <div className="hidden md:flex items-center justify-center relative order-2">
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-96 object-cover cursor-pointer rounded-md"
                onClick={() => setShowFullImage(true)}
              />
              {showFullImage && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                  onClick={() => setShowFullImage(false)}
                >
                  <img
                    src={imagePreview}
                    alt="Full Preview"
                    className="max-w-[90%] max-h-[90%] object-contain rounded-md"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="w-40 h-40 flex items-center justify-center border text-gray-400">
              No Image
            </div>
          )}
        </div>
      </div>
    </form>
  </div>
  
  );
};

export default ExportStock;
