// import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { API_END_POINT, TOKEN } from "../../config";
import { createStock } from "../../api/api-stock";
import { toast } from "react-toastify";

interface HousewareFormData {
  name: string;
  address: string;
  city: string;
}

interface Props {
  formData: HousewareFormData;
  editingId: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}
type Inputs = {
  name: string,
  address: string,
  city: string
}

const AddStockForm: React.FC<Props> = ({ editingId, onCancel }) => {
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!data.name || !data.city || !data.address) {
      alert("Chưa điền đủ thông tin");
      return;
    }

    try {
      const result = await createStock(data);
      if (result) {
        toast.success('Created successfully!')
      } else {
        toast.warning('Created failed!')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)} autoComplete="off" noValidate>
      <h2 className="text-black text-xl font-semibold mb-6">
        {editingId ? "Update Houseware" : "Add New Houseware"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-black mb-1">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter houseware name"
            className="w-full rounded-md border px-4 py-2"
            required
            {...register("name")}
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-semibold text-black mb-1">City</label>
          <select
            id="city"
            className="w-full rounded-md border px-4 py-2"
            required
            {...register("city")}

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
          required
          {...register("address")}
        />
      </div>

      <div className="flex gap-3">
        <button type="submit" className="flex-1 bg-[#0a162c] text-white py-3 rounded-md">
          {editingId ? "Update Houseware" : "Add Houseware"}
        </button>
        {editingId && (
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-500 text-white py-3 rounded-md">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddStockForm;
