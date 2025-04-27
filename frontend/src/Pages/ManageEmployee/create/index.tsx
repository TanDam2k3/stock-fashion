import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  phone: string;
  email: string;
  address: string;
  avatar: string;
  username: string;
  password: string;
  confirmPassword: string;
  stockManage: string;  
};

const CreateEmployee: React.FC = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      avatar: '',
      username: '',
      password: '',
      confirmPassword: '',
    }
  });

  const [avatar, password] = watch(['avatar', 'password']);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log('Dữ liệu nhân viên:', data);
      alert('Tạo nhân viên thành công!');
      navigate('/employees');
    } catch (error) {
      console.error(error);
      alert('Đã có lỗi xảy ra khi tạo nhân viên.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("avatar", reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white text-gray-900 font-sans p-6 rounded-lg shadow-md min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Thêm nhân viên mới</h1>
      <p className="text-gray-600 mb-6">Điền thông tin nhân viên mới vào form dưới đây</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-8">
        {/* Phần form thông tin bên trái */}
        <div className="md:w-2/3 space-y-6">
  {/* Họ và tên & Tên đăng nhập */}
  <div className="flex flex-col md:flex-row gap-4">
    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Họ và tên <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        {...register("name", { required: "Họ và tên không được bỏ trống" })}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        placeholder="Nhập họ và tên"
      />
      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
    </div>

    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Tên đăng nhập <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        {...register("username", { 
          required: "Tên đăng nhập không được bỏ trống",
          minLength: {
            value: 6,
            message: "Tên đăng nhập phải có ít nhất 6 ký tự"
          }
        })}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        placeholder="Nhập tên đăng nhập"
      />
      {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
    </div>
  </div>

  {/* Mật khẩu & Nhập lại mật khẩu */}
  <div className="flex flex-col md:flex-row gap-4">
    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Mật khẩu <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        {...register("password", { 
          required: "Mật khẩu không được bỏ trống",
          minLength: {
            value: 8,
            message: "Mật khẩu phải có ít nhất 8 ký tự"
          }
        })}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        placeholder="Nhập mật khẩu"
      />
      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
    </div>

    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Nhập lại mật khẩu <span className="text-red-500">*</span>
      </label>
      <input
        type="password"
        {...register("confirmPassword", { 
          required: "Vui lòng nhập lại mật khẩu",
          validate: value => 
            value === password || "Mật khẩu không khớp"
        })}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        placeholder="Nhập lại mật khẩu"
      />
      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
    </div>
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      Kho hàng <span className="text-red-500">*</span>
    </label>
    <select
      {...register("stockManage", { required: "Vui lòng chọn kho hàng" })}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${errors.stockManage ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
    >
      <option value="">-- Chọn kho hàng --</option>
      <option value="Kho A">Kho A</option>
      <option value="Kho B">Kho B</option>
      <option value="Kho C">Kho C</option>
      {/* Add more warehouse options as needed */}
    </select>
    {errors.stockManage && <p className="text-red-500 text-sm mt-1">{errors.stockManage.message}</p>}
  </div>

     {/* Số điện thoại & Email */}
  <div className="flex flex-col md:flex-row gap-4">
    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Số điện thoại <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        {...register("phone", { required: "Số điện thoại không được bỏ trống" })}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        placeholder="Nhập số điện thoại"
      />
      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
    </div>

    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        {...register("email", { required: "Email không được bỏ trống" })}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        placeholder="Nhập email"
      />
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
    </div>
  </div>


          {/* Địa chỉ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("address", { required: "Địa chỉ không được bỏ trống" })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              placeholder="Nhập địa chỉ"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>
        </div>

        {/* Phần ảnh đại diện bên phải */}
        <div className="md:w-1/3">
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Ảnh đại diện</h2>

            <div className="flex flex-col items-center">
              <label className="w-full h-60 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer mb-4">
                {avatar ? (
                  <img
                    src={avatar}
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
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}
            </div>
          </div>
        </div>
      </form>

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
          form="hook-form"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className={`px-5 py-2 text-sm font-medium text-white rounded-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSubmitting ? "Đang lưu..." : "Lưu thông tin"}
        </button>
      </div>
    </div>
  );
};

export default CreateEmployee;