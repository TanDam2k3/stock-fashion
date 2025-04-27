import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDeletePopup from '../../components/popup/confirm-deleted-popup';
import EmployeeFilter from '../../components/manage-employees/filter';

interface Employee {
  id: string;
  name: string;
  department: string;
  phone: string;
  email: string;
  address: string;
  avatar?: string;
}

const EmployeeTable: React.FC = () => {
  const navigate = useNavigate();
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');


  const employees: Employee[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      department: 'Phát triển phần mềm',
      phone: '0123456789',
      email: 'nguyenvana@example.com',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '2',
      name: 'Trần Thị B',
      department: 'Marketing',
      phone: '0987654321',
      email: 'tranthib@example.com',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: '3',
      name: 'Lê Văn C',
      department: 'Nhân sự',
      phone: '0369852147',
      email: 'levanc@example.com',
      address: '789 Đường DEF, Quận 3, TP.HCM',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ];

  const handleCreate = () => {
    navigate('/employees/create');
  };

  const handleDelete = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setShowConfirmPopup(true);
  };

  const confirmDelete = () => {
    if (selectedEmployeeId) {
      console.log('Xóa nhân viên có ID:', selectedEmployeeId);
      alert(`Đã xóa nhân viên có ID: ${selectedEmployeeId}`);
      setShowConfirmPopup(false);
      setSelectedEmployeeId(null);
    }
  };

  // Filter employees based on searchTerm and departmentFilter
  const filteredEmployees = employees.filter((employee) => {
    const nameMatch = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
    const departmentMatch = departmentFilter ? employee.department === departmentFilter : true;
    return nameMatch && departmentMatch;
  });

  // Departments you want to allow in the filter
  const departments = ['Phát triển phần mềm', 'Marketing', 'Nhân sự'];

  return (
    <div className="bg-white text-gray-900 font-sans p-6 rounded-lg shadow-md min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Danh sách nhân viên</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Thêm nhân viên
        </button>
      </div>

      <EmployeeFilter
        searchTerm={searchTerm}
        departmentFilter={departmentFilter}
        departments={departments}
        onSearchChange={setSearchTerm}
        onDepartmentChange={setDepartmentFilter}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ảnh</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bộ phận</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điện thoại</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa chỉ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee, index) => (
              <tr
                key={employee.id}
                className={`transition-colors hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
              >
                {/* Các cột thông tin nhân viên */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={employee.avatar || 'https://i.pravatar.cc/150?img=0'}
                        alt={employee.name}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{employee.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{employee.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    <a href={`mailto:${employee.email}`} className="text-blue-500 hover:underline">
                      {employee.email}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{employee.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    {/* Nút Update */}
                    <button className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Sửa
                    </button>

                    {/* Nút Delete */}
                    <button
                      onClick={() => handleDelete(employee.id)}
                      className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showConfirmPopup && (
        <ConfirmDeletePopup onConfirm={confirmDelete} onCancel={() => setShowConfirmPopup(false)} />
      )}
    </div>
  );
};

export default EmployeeTable;
