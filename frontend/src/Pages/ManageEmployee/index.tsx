/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDeletePopup from '../../components/popup/confirm-deleted-popup';
import EmployeeFilter from '../../components/manage-employees/filter';
import EditEmployeePopup from '../../components/manage-employees/edit-employees';
import { userService } from '../../services';
import { IEmployee } from '../../interfaces';
import { toast } from 'react-toastify';

const EmployeeTable: React.FC = () => {
  const navigate = useNavigate();
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
  const [editingEmployee, setEditingEmployee] = useState<IEmployee | null>(null);
  const [listUser, setListUser] = useState<IEmployee[]>([]);

  const handleCreate = () => {
    navigate('/employees/create');
  };

  const handleDelete = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setShowConfirmPopup(true);
  };

  const handleEdit = (employee: IEmployee) => {
    setEditingEmployee(employee);
    setShowEditPopup(true);
  };

  const handleUpdateEmployee = async (data: IEmployee) => {
    setShowEditPopup(false);
    try {
      const updateEmployee = await userService.update(data);
      console.log('updateEmployee', updateEmployee)
      if (updateEmployee.message === 'Updated success') {
        toast.success('Updated success');
        getList();
      } else {
        toast.error('Update fail');
      }
    } catch (e) {
      toast.error(`${e}`);
    }
  }

  const confirmDelete = async () => {
    if (selectedEmployeeId) {
      const deleteUser = await userService.delete(selectedEmployeeId);
      if (deleteUser.message === 'Deleted success') {
        toast.success('Deleted success');
        getList();
      } else {
        toast.error(deleteUser?.message || 'Deleted fail');
      }
      setShowConfirmPopup(false);
      setSelectedEmployeeId(null);
    }
  };

  const getList = async () => {
    const response = await userService.getList({
      name: searchTerm,
      status: 'active'
    });
    response?.users?.length && setListUser(response.users);
  }

  useEffect(() => {
    getList();
  }, [searchTerm]);

  return (
    <div className="bg-white text-gray-900 font-sans p-6 rounded-lg shadow-md min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Danh sách nhân viên</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 sm:py-2 sm:px-4 md:py-2 md:px-6 rounded-md transition-colors flex items-center text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          <svg className="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Thêm nhân viên
        </button>
      </div>
  
      <EmployeeFilter
        searchTerm={searchTerm}
        departments={['Phát triển phần mềm', 'Marketing', 'Nhân sự']}
        onSearchChange={setSearchTerm}
      />
  
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Ảnh</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Họ tên</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Username</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Điện thoại</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Địa chỉ</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-auto">Thao tác</th>
            </tr>
          </thead>
  
          <tbody className="bg-white divide-y divide-gray-200">
            {listUser?.length > 0 && listUser.map((employee, index) => (
              <tr
                key={employee._id}
                className={`transition-colors hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
              >
                <td className="px-4 py-4 whitespace-nowrap">
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
                <td className="px-4 py-4 whitespace-nowrap truncate">
                  <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{employee.username}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{employee.phone}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    <a href={`mailto:${employee.email}`} className="text-blue-500 hover:underline">
                      {employee.email}
                    </a>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-normal break-words">
                  <div className="text-sm text-gray-500">{employee.address}</div>
                </td>
  
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(employee)}
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
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
      {showEditPopup && editingEmployee && (
        <EditEmployeePopup
          employee={editingEmployee}
          onClose={() => setShowEditPopup(false)}
          onSave={handleUpdateEmployee}
        />
      )}
    </div>
  );
  
};

export default EmployeeTable;
