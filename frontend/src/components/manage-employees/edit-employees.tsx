import React, { useState } from 'react';

interface EditEmployeePopupProps {
  employee: Employee;
  onClose: () => void;
  onSave: (employee: Employee) => void;
}
interface Employee {
    id: string;
    name: string;
    department: string;
    phone: string;
    email: string;
    address: string;
    avatar?: string;
  }
  
const EditEmployeePopup: React.FC<EditEmployeePopupProps> = ({ employee, onClose, onSave }) => {
  const [formData, setFormData] = useState<Employee>({...employee});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Sửa nhân viên</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Tên nhân viên"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Số điện thoại"
          />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Email"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Địa chỉ"
          />
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Hủy</button>
          <button onClick={handleSave} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeePopup;
