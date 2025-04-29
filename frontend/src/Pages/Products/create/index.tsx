/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect, useContext, useRef } from "react";
import ProductsTable from "../../../components/add-product/tableAddProduct";
import { housewareService } from "../../../services";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateProduct, Houseware } from "../../../interfaces";
import { AuthContext } from "../../../contexts/AuthContext";

type Inputs = {
  housewareId: string,
  name: string,
  type: string,
  quantity: number,
  price: number,
  file: File[] | null
}

const CreateProduct: React.FC = () => {
const types = ["Áo", "Áo khoác", "Quần", "Đầm", "Váy", "Chân váy", "Áo sơ mi", 
  "Áo len", "Áo thun", "Áo dài", "Bộ đồ", "Vest", "Áo hoodie", "Áo tanktop", "Áo croptop"];

  
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset
  } = useForm<Inputs>({
    defaultValues: {
      housewareId: '',
      name: '',
      type: '',
      file: null
    }
  });

  const [housewareOptions, setHousewareOptions] = useState<Houseware[]>([]);
  const [products, setProducts] = useState<ICreateProduct[]>([]);
const [showDropdown, setShowDropdown] = useState(false);
const [visibleType, setVisibleType] = useState<string[]>([]);
 const [typePage, setTypePage] = useState(1);
const dropdownRef = useRef<HTMLDivElement>(null);
const typeInput = watch("type");

const typePerPage = 5;
const loadMoreType = () => {
  const nextCities = types.slice(0, (typePage + 1) * typePerPage);
  setVisibleType(nextCities);
  setTypePage(prev => prev + 1);
};
const handleScroll = () => {
  if (!dropdownRef.current) return;
  const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    loadMoreType();
  }
};

  useEffect(() => {
    if (showDropdown) {
      setVisibleType(types.slice(0, typePerPage));
      setTypePage(1);
    }
  }, [showDropdown]);

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
  }, [user]);


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data?.housewareId || !data?.name || !data?.type || !data?.price || !data?.quantity) {
      alert("Chưa điền đủ thông tin");
      return;
    };

    const houseware = housewareOptions.find(h => `${h._id}` === `${data.housewareId}`);

    const newProduct: ICreateProduct = {
      housewareId: data?.housewareId,
      housewareName: houseware?.name,
      userId: user?._id,
      name: data?.name,
      type: data?.type,
      quantity: data?.quantity,
      price: data?.price,
      imagePreview: data?.file?.[0] && URL.createObjectURL(data.file[0]),
      file: data?.file?.[0] || null,
      identification: `${Date.now()}`
    };

    newProduct && setProducts([...products, newProduct]);
    reset();
  };

  const handleUpdateProduct = (updatedProduct: ICreateProduct) => {
    const updatedProductsCreate = products.map(p => {
      const isUpdate = p.identification === updatedProduct.identification;
      if (isUpdate) {
        const houseware = housewareOptions.find(h => `${h._id}` === `${updatedProduct.housewareId}`);
        const files = updatedProduct.file as unknown as File[];
        const imagePreview = files?.[0] && URL.createObjectURL(files[0]);
        return {
          ...updatedProduct,
          housewareName: houseware?.name,
          imagePreview,
          userId: user?._id
        }
      };
      return p;
    });
    console.log('updatedProduct', updatedProduct)
    updatedProductsCreate?.length && setProducts(updatedProductsCreate);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (identification: string) => {
    const updatedProducts = products.filter(product => product.identification !== identification);
    setProducts(updatedProducts);
  };

  const handleClearAllProducts = () => {
    setProducts([]);
  };


  return (
    <div className="w-full rounded-md bg-white flex items-center flex-col gap-5 p-5">
      <div className="w-full rounded-md bg-white p-5 ">
        <form
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <h2 className="text-black text-xl font-semibold mb-6">
            Add New Product
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
            <div>
              <label
                htmlFor="housewareId"
                className="block text-sm font-semibold text-black mb-1"
              >
                Houseware ID
              </label>
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
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-black mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                {...register("name", { required: true })}
              />
            </div>

            <div className="relative">
              <label htmlFor="city" className="block text-sm font-semibold text-black mb-1">City</label>
              <input
                id="type"
                type="text"
                placeholder="Select a type"
                className="w-full rounded-md border px-4 py-2"
                onFocus={() => setShowDropdown(true)}
                value={typeInput}
                readOnly
              />
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  onScroll={handleScroll}
                  className="absolute mt-1 max-h-48 w-full overflow-y-auto rounded-md border bg-white shadow-lg z-10"
                >
                  {visibleType.map((item) => (
                    <div
                      key={item}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setValue("type", item);
                        setShowDropdown(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-semibold text-black mb-1"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                {...register("quantity", { required: true, min: 0 })}
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-black mb-1"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                {...register("price", { required: true, min: 0 })}
              />
            </div>
          </div>

              <div className="mb-4 w-full">
      <label
        htmlFor="productImage"
        className="block text-sm font-semibold text-black mb-2"
      >
        Product Image
      </label>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          id="productImage"
          type="file"
          accept="image/*"
          className="w-full sm:flex-1 rounded-md border border-gray-200 bg-white text-gray-700 
            file:bg-[#0a162c] file:text-white file:px-4 file:py-2 file:rounded-l-md file:border-none 
            file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
          {...register("file")}
        />
      </div>
    </div>


          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#0a162c] text-white font-semibold py-3 rounded-md hover:bg-[#08122a] transition-colors"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Products Table */}
      <ProductsTable
        products={products}
        housewareOptions={housewareOptions}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onClearAll={handleClearAllProducts}
      />
    </div>
  );
};

export default CreateProduct;