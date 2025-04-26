import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createStock } from "../../../api/api-stock";

type Inputs = {
  name: string,
  address: string,
  city: string
}

const CreateStock: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.name || !data.city || !data.address) {
      alert("Chưa điền đủ thông tin");
      return;
    }

    try {
      const result = await createStock(data);
      if (result) {
        toast.success('Created successfully!');
        reset();
      } else {
        toast.warning('Created failed!')
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div className="w-full rounded-md bg-white flex items-center flex-col gap-5 p-5">
      <div className="w-full rounded-md bg-white p-5">
        <form
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          noValidate
        >
          <h2 className="text-black text-xl font-semibold mb-6">
            Add New Houseware
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-black mb-1">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter houseware name"
                className="w-full rounded-md border px-4 py-2"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-black mb-1">City</label>
              <select
                id="city"
                className="w-full rounded-md border px-4 py-2"
                {...register("city", { required: true })}
              >
                <option value="">Select a city</option>
                <option value="Hanoi">Hà Nội</option>
                <option value="HCM">TP. Hồ Chí Minh</option>
                <option value="DaNang">Đà Nẵng</option>
                <option value="CanTho">Cần Thơ</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-semibold text-black mb-2">Address</label>
            <textarea
              id="address"
              placeholder="Enter houseware address"
              rows={3}
              className="w-full rounded-md border px-4 py-2"
              {...register("address", { required: true })}
            />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-[#0a162c] text-white py-3 rounded-md">
              Add Houseware
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default CreateStock;
