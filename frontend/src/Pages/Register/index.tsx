import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';
import CryptoJS from 'crypto-js';
import SuccessPopup from '../../components/popup/SuccessPopup';
import { API_END_POINT, ENCRYPT_KEY } from "../../config";

type Inputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const comparePassword = data?.confirmPassword === data?.password;
      if (!comparePassword) {
        alert('Mật khẩu không khớp');
        return;
      }

      const encrypted = CryptoJS.AES.encrypt(data?.password, ENCRYPT_KEY).toString();

      const payload = {
        username: data.username,
        password: encrypted,
        email: data.email
      };

      const response = await axios.post(`${API_END_POINT}/api/auth/register`, payload);

      if (response.data === true) {
        setShowPopup(true);
      } else {
        alert('Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (e) {
      console.log(e);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row max-w-4xl w-full rounded-lg shadow-md overflow-hidden">
        {/* Image */}
        <img
          src="https://storage.googleapis.com/a1aa/image/45d85b4b-49ae-42df-d030-3e84794ff5a7.jpg"
          alt="Warehouse interior"
          className="w-full lg:w-1/2 object-cover h-64 lg:h-auto"
        />

        {/* Form */}
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-1/2 bg-white px-6 py-10 rounded-r-lg shadow-md flex flex-col items-center justify-center"
        >
          <div className="w-full">
            <h2 className="mb-4 text-[#0f2f7f] text-xl font-bold text-center">
              TẠO TÀI KHOẢN MỚI
            </h2>

            <label htmlFor="username" className="block mb-1 text-sm">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              className="w-full border-b border-b-gray-400 px-2 py-2 text-sm mb-4"
              {...register("username")}
            />

            <label htmlFor="email" className="block mb-1 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border-b border-b-gray-400 px-2 py-2 text-sm mb-4"
              {...register("email")}
            />

            <label htmlFor="password" className="block mb-1 text-sm">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              className="w-full border-b border-b-gray-400 px-2 py-2 text-sm mb-4"
              {...register("password")}
            />

            <label htmlFor="confirmPassword" className="block mb-1 text-sm">
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full border-b border-b-gray-400 px-2 py-2 text-sm mb-4"
              {...register("confirmPassword")}
            />

            <button
              type="submit"
              className="w-full bg-blue-900 text-white text-xs font-semibold py-2 rounded mt-4"
            >
              ĐĂNG KÝ
            </button>

            <p className="text-xs mt-2">
              Đã có tài khoản?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </span>
            </p>
          </div>
        </form>
      </div>

      {/* Success Popup */}
      <SuccessPopup
        message="Đăng ký thành công!"
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        redirectPath="/login"
      />
    </div>
  );
};

export default Register;