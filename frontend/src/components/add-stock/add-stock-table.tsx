import React from "react";

interface Houseware {
  id: string;
  name: string;
  address: string;
  city: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  housewares: Houseware[];
  onEdit: (houseware: Houseware) => void;
  onDelete: (id: string) => void;
}

const AddStockTable: React.FC<Props> = ({ housewares, onEdit, onDelete }) => {
  return housewares.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Created At</th>
            <th className="px-4 py-2">Updated At</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {housewares.map((h) => (
            <tr key={h.id}>
              <td className="px-4 py-2">{h.name}</td>
              <td className="px-4 py-2">{h.city}</td>
              <td className="px-4 py-2">{h.address}</td>
              <td className="px-4 py-2">{h.createdAt ? new Date(h.createdAt).toLocaleString() : "N/A"}</td>
              <td className="px-4 py-2">{h.updatedAt ? new Date(h.updatedAt).toLocaleString() : "N/A"}</td>
              <td className="px-4 py-2 space-x-2">
                <button onClick={() => onEdit(h)} className="text-blue-500">Edit</button>
                <button onClick={() => onDelete(h.id)} className="text-red-500">Delete</button>
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
  );
};

export default AddStockTable;
