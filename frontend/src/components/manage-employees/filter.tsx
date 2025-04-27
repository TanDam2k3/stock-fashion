import React from 'react';
import { CiSearch } from "react-icons/ci";

interface EmployeeFilterProps {
  searchTerm: string;
  departmentFilter: string;
  departments: string[];
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
}

const EmployeeFilter: React.FC<EmployeeFilterProps> = ({
  searchTerm,
  departmentFilter,
  departments,
  onSearchChange,
  onDepartmentChange,
}) => {
  return (
    <div className="flex justify-between md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
        <div className=" flex items-center gap-2">
        <input
        type="text"
        placeholder="Tìm kiếm theo tên..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
        <CiSearch />
        </div>
        <div className="">
        <select
        value={departmentFilter}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Tất cả bộ phận</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
        </div>
     
    </div>
  );
};

export default EmployeeFilter;
