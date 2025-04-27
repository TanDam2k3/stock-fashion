import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEmployee: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    phone: '',
    email: '',
    address: '',
    avatar: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dữ liệu nhân viên:', formData);
    alert('Tạo nhân viên thành công!');
    navigate('/employees');
  };

  return (
    <div className="bg-white text-gray-900 font-sans p-6 rounded-lg shadow-md min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Thêm nhân viên mới</h1>
      <p className="text-gray-600 mb-6">Điền thông tin nhân viên mới vào form dưới đây</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Phần form thông tin bên trái */}
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Họ và tên */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                placeholder="Nhập họ và tên"
              />
            </div>

            {/* Bộ phận */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Bộ phận <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">-- Chọn bộ phận --</option>
                <option value="Phát triển phần mềm">Phát triển phần mềm</option>
                <option value="Marketing">Marketing</option>
                <option value="Nhân sự">Nhân sự</option>
              </select>
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                placeholder="Nhập số điện thoại"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                placeholder="Nhập email"
              />
            </div>

            {/* Địa chỉ */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                placeholder="Nhập địa chỉ"
              />
            </div>
          </form>
        </div>

        {/* Phần ảnh đại diện bên phải */}
        <div className="md:w-1/3">
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Ảnh đại diện</h2>
            
            <div className="flex flex-col items-center">
              <label className="w-full h-60 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer mb-4">
                {formData.avatar ? (
                  <img 
                    src={formData.avatar} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <div className="text-3xl text-gray-400 mb-2">+</div>
                    <p className="text-sm text-gray-500 text-center">
                      Nhấn để tải lên hoặc kéo thả<br />
                      PNG, JPG (Max. 5MB)
                    </p>
                  </>
                )}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Nút submit */}
      <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={() => navigate('/employees')}
          className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Lưu thông tin
        </button>
      </div>
    </div>
  );
};

export default CreateEmployee;