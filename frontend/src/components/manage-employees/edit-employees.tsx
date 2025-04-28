import React from 'react';
import { useForm } from 'react-hook-form';
import { IEmployee } from '../../interfaces';

interface EditEmployeePopupProps {
  employee: IEmployee;
  onClose: () => void;
  onSave: (employee: IEmployee) => void;
}

const EditEmployeePopup: React.FC<EditEmployeePopupProps> = ({ employee, onClose, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IEmployee>({
    defaultValues: employee
  });

  const onSubmit = (data: IEmployee) => {
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Sửa nhân viên</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Tên nhân viên</label>
            <input
              {...register('name', { required: 'Tên nhân viên là bắt buộc' })}
              className="w-full border p-2 rounded"
              placeholder="Nhập tên nhân viên"
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Số điện thoại</label>
            <input
              {...register('phone', { required: 'Số điện thoại là bắt buộc' })}
              className="w-full border p-2 rounded"
              placeholder="Nhập số điện thoại"
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register('email', { required: 'Email là bắt buộc' })}
              className="w-full border p-2 rounded"
              placeholder="Nhập email"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Địa chỉ</label>
            <input
              {...register('address', { required: 'Địa chỉ là bắt buộc' })}
              className="w-full border p-2 rounded"
              placeholder="Nhập địa chỉ"
            />
            {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Hủy</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeePopup;
