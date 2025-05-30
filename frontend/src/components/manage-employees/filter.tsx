import React from 'react';

interface EmployeeFilterProps {
  searchTerm: string;
  departments: string[];
  onSearchChange: (value: string) => void;
}

const EmployeeFilter: React.FC<EmployeeFilterProps> = ({
  searchTerm,
  onSearchChange,
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
      />        </div>
        <div className="">
        </div>
     
    </div>
  );
};

export default EmployeeFilter;
