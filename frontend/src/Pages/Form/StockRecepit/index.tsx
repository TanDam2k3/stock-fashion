import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthContext";

type Inputs = {
  stockId: string;
  housewareId: string;
  quantity: number;
};

const ImportStock: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<Inputs>();
  const { user } = useContext(AuthContext);

  const [stocks, setStocks] = useState<any[]>([]);
  const [housewares, setHousewares] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showFullImage, setShowFullImage] = useState<boolean>(false);

  // Lấy dữ liệu mẫu cho stocks và housewares
  useEffect(() => {
    setStocks([
      { _id: "stock1", name: "Warehouse A" },
      { _id: "stock2", name: "Warehouse B" },
      { _id: "stock3", name: "Warehouse C" },
    ]);

    setHousewares([
      {
        _id: "houseware1",
        name: "Chair",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHl26di3vjeFb0yJuSQDL07pp59vvTX9Xc-w&s",
      },
      {
        _id: "houseware2",
        name: "Table",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrs0z28TzfJIReTwwvfDhaOl74Y60pmAFvWQ&s",
      },
      {
        _id: "houseware3",
        name: "Lamp",
        image: "https://toquoc.mediacdn.vn/2019/4/26/photo-6-15562650321071954349801.jpg",
      },
    ]);
  }, []);

  const selectedHousewareId = watch("housewareId");
  useEffect(() => {
    if (selectedHousewareId) {
      const selected = housewares.find((item) => item._id === selectedHousewareId);
      if (selected?.image) {
        setImagePreview(selected.image);
      }
    }
  }, [selectedHousewareId, housewares]);


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // Handle form submission
  };

  return (
    <div className="w-full rounded-md bg-white flex flex-col p-5 ">
      <form
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
      >
        <h2 className="text-black text-xl font-semibold mb-6">
          Import Houseware
        </h2>

        {/* 2 Cột */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="flex flex-col gap-6 md:col-span-2">
            <div>
              <label htmlFor="stockId" className="block text-sm font-semibold text-black mb-1">
                Select Stock
              </label>
              <select
                id="stockId"
                className="w-full rounded-md border px-4 py-2"
                {...register("stockId", { required: true })}
              >
                <option value="">Select stock</option>
                {stocks.map((stock) => (
                  <option key={stock._id} value={stock._id}>
                    {stock.name}
                  </option>
                ))}
              </select>
            </div>

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

            <button type="submit" className="bg-[#0a162c] text-white py-3 rounded-md">
              Import
            </button>
          </div>

          {/* Right: Image */}
          <div className="flex flex-col items-center justify-center relative">
            {imagePreview ? (
              <>
                  <h1 className="font-semibold">Image</h1>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-full border cursor-pointer"
                  onClick={() => setShowFullImage(true)}
                />
                {/* Full screen image modal */}
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
              <div className="w-40 h-40 flex items-center justify-center border rounded-full text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImportStock;
