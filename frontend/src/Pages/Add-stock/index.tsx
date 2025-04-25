import React, { useState } from "react";
import AddStockForm from "../../components/add-stock/add-stock-form";
import AddStockTable from "../../components/add-stock/add-stock-table";
import AddStockActions from "../../components/add-stock/add-stock-actions";

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

  const handleEdit = (hw: Houseware) => {
    setEditingId(hw.id);
    setFormData({ name: hw.name, address: hw.address, city: hw.city });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    setHousewares(housewares.filter(hw => hw.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setFormData({ name: "", address: "", city: "" });
    }
  };

  const handleClearAll = () => {
    setHousewares([]);
    setEditingId(null);
    setFormData({ name: "", address: "", city: "" });
  };

  const handleSaveAll = () => {
    if (housewares.length === 0) return;
    if (confirm("Save all to localStorage?")) {
      const existing = JSON.parse(localStorage.getItem("savedHousewares") || "[]");
      localStorage.setItem("savedHousewares", JSON.stringify([...existing, ...housewares]));
      handleClearAll();
      alert("Saved!");
    }
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

      <div className="w-full rounded-md bg-white p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black text-xl font-semibold">Housewares List</h2>
          <AddStockActions
            onClearAll={handleClearAll}
            onSaveAll={handleSaveAll}
            disabled={housewares.length === 0}
          />
        </div>
        <AddStockTable housewares={housewares} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AddStock;
