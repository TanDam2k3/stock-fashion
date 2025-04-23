import React, { useState, ChangeEvent, FormEvent } from "react";
// import ProductsTable from "../../components/add-product/table/tableAddProduct";

interface HousewareFormData {
  name: string;
  status: "Active" | "Inactive";
  address: string;
}

interface Houseware extends HousewareFormData {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

const AddStock: React.FC = () => {
  const [formData, setFormData] = useState<HousewareFormData>({
    name: "",
    status: "Active",
    address: "",
  });

  const [housewares, setHousewares] = useState<Houseware[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing houseware
      setHousewares(housewares.map(houseware => 
        houseware.id === editingId ? {
          ...houseware,
          name: formData.name,
          status: formData.status,
          address: formData.address,
          updatedAt: new Date().toISOString()
        } : houseware
      ));
      setEditingId(null);
    } else {
      // Add new houseware
      const newHouseware: Houseware = {
        id: Date.now().toString(),
        name: formData.name,
        status: formData.status,
        address: formData.address,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setHousewares([...housewares, newHouseware]);
    }
    
    // Reset form
    setFormData({
      name: "",
      status: "Active",
      address: "",
    });
  };

  const handleUpdateHouseware = (updatedHouseware: Houseware) => {
    setEditingId(updatedHouseware.id);
    setFormData({
      name: updatedHouseware.name,
      status: updatedHouseware.status,
      address: updatedHouseware.address,
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHouseware = (housewareId: string) => {
    setHousewares(housewares.filter(houseware => houseware.id !== housewareId));
    if (editingId === housewareId) {
      setEditingId(null);
      setFormData({
        name: "",
        status: "Active",
        address: "",
      });
    }
  };

  const handleClearAllHousewares = () => {
    setHousewares([]);
    // Also reset editing if in progress
    if (editingId) {
      setEditingId(null);
      setFormData({
        name: "",
        status: "Active",
        address: "",
      });
    }
  };

  const handleSaveAllToLocalStorage = () => {
    if (housewares.length === 0) {
      alert("No housewares to save!");
      return;
    }

    if (window.confirm(`Are you sure you want to save all ${housewares.length} housewares to localStorage and clear the table?`)) {
      try {
        // Get existing housewares from localStorage or initialize empty array
        const existingHousewares = JSON.parse(localStorage.getItem('savedHousewares') || '[]');
        
        // Create new array with existing and current housewares
        const updatedHousewares = [...existingHousewares, ...housewares];
        
        // Save to localStorage
        localStorage.setItem('savedHousewares', JSON.stringify(updatedHousewares));
        
        // Clear the table
        handleClearAllHousewares();
        
        alert(`Successfully saved ${housewares.length} housewares to localStorage!`);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        alert("Failed to save housewares to localStorage. Please try again.");
      }
    }
  };

  return (
    <div className="w-full rounded-md bg-white flex items-center flex-col gap-5 p-5"> 
      <div className="w-full rounded-md bg-white p-5 ">
        <form
          className="w-full"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          <h2 className="text-black text-xl font-semibold mb-6">
            {editingId ? "Update Houseware" : "Add New Houseware"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-black mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter houseware name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                required
              />
            </div>
            
            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-black mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          {/* Address */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-black mb-2"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter houseware address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a162c] focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-[#0a162c] text-white font-semibold py-3 rounded-md hover:bg-[#08122a] transition-colors"
            >
              {editingId ? "Update Houseware" : "Add Houseware"}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData({
                    name: "",
                    status: "Active",
                    address: "",
                  });
                }}
                className="flex-1 bg-gray-500 text-white font-semibold py-3 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Housewares Table */}
      <div className="w-full rounded-md bg-white p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-black text-xl font-semibold">Housewares List</h2>
          <div className="flex gap-2">
            <button
              onClick={handleClearAllHousewares}
              disabled={housewares.length === 0}
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Clear All
            </button>
            <button
              onClick={handleSaveAllToLocalStorage}
              disabled={housewares.length === 0}
              className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Save All
            </button>
          </div>
        </div>
        
        {housewares.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Address</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created At</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Updated At</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {housewares.map((houseware) => (
                  <tr key={houseware.id}>
                    <td className="px-4 py-2 text-sm text-gray-700">{houseware.name}</td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        houseware.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {houseware.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">{houseware.address}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {houseware.createdAt ? new Date(houseware.createdAt).toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {houseware.updatedAt ? new Date(houseware.updatedAt).toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 space-x-2">
                      <button
                        onClick={() => handleUpdateHouseware(houseware)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteHouseware(houseware.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No housewares added yet. Please add some housewares using the form above.
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStock;