import React, { useState } from "react";
import AddStockForm from "../../components/add-stock/add-stock-form";


interface HousewareFormData {
  name: string;
  address: string;
  city: string;
}

interface Houseware extends HousewareFormData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

const AddStock: React.FC = () => {
  const [formData, setFormData] = useState<HousewareFormData>({ name: "", address: "", city: "" });
  const [housewares, setHousewares] = useState<Houseware[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setHousewares(housewares.map(hw => hw.id === editingId ? { ...hw, ...formData, updatedAt: new Date().toISOString() } : hw));
      setEditingId(null);
    } else {
      setHousewares([
        ...housewares,
        {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);
    }
    setFormData({ name: "", address: "", city: "" });
  };

  return (
    <div className="w-full rounded-md bg-white flex items-center flex-col gap-5 p-5">
      <div className="w-full rounded-md bg-white p-5">
        <AddStockForm
          formData={formData}
          editingId={editingId}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditingId(null);
            setFormData({ name: "", address: "", city: "" });
          }}
        />
      </div>

    </div>
  );
};

export default AddStock;
