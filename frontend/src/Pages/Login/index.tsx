import axios from "axios";
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import SuccessPopup from '../../components/popup/SuccessPopup';
import { API_END_POINT, ENCRYPT_KEY } from "../../config";
import { AuthContext } from "../../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../../interfaces";

type Inputs = {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [remember, setRemember] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();



  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(data?.password, ENCRYPT_KEY).toString();

      const payload = {
        username: data.username,
        password: encrypted,
      };

      const response = await axios.post(`${API_END_POINT}/api/auth/login`, payload);
      const token = response?.data?.token;
      if (token) {
        Cookies.set('token', token, {
          expires: remember ? 7 : undefined,
          sameSite: 'Strict'
        });
        setToken(token);
        const decoded = jwtDecode<IUser>(token);
        setUser(decoded);

        setShowPopup(true);
      } else {
        alert('Đăng nhập thất bại. Không nhận được token.');
      }
    } catch (e) {
      console.log(e);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="flex max-w-4xl w-full rounded-lg shadow-md overflow-hidden" style={{ borderRadius: "0.75rem" }}>
        <img
          src="https://storage.googleapis.com/a1aa/image/45d85b4b-49ae-42df-d030-3e84794ff5a7.jpg"
          alt="Warehouse interior"
          className="w-1/2 object-cover"
          width={600}
          height={400}
        />
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 bg-white px-6 py-10 rounded-r-lg shadow-md flex items-center justify-center"
          style={{ borderTopRightRadius: "0.75rem", borderBottomRightRadius: "0.75rem" }}
        >
          <div className="w-full">
            <h2
              className="mb-4 font-heading text-[#0f2f7f] text-lg font-bold text-center"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              ĐĂNG NHẬP VÀO TÀI KHOẢN
            </h2>

            <label htmlFor="username" className="block font-normal mb-1">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              className="w-full border-0 border-b border-b-gray-400 focus:ring-0 px-2 py-2 text-sm mb-4"
              {...register("username")}
            />

            <label htmlFor="password" className="block font-normal text-black mb-1">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              className="w-full border-0 border-b border-b-gray-400 focus:border-b-blue-700 focus:ring-0 px-2 py-2 text-sm mb-4"
              {...register("password")}
            />

            <div className="flex items-center justify-between text-xs mb-4 text-gray-600">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Ghi nhớ tôi</span>
              </label>
              <a href="#" className="text-blue-700 hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white text-xs font-semibold py-2 rounded"
            >
              ĐĂNG NHẬP
            </button>
            <span className="text-xs">
              Don’t have an account?{" "}
              <span onClick={() => navigate("/register")} className="text-blue-500 cursor-pointer">Sign up now.</span>
            </span>
          </div>
        </form>
      </div>

      <SuccessPopup
        message="Đăng nhập thành công!"
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        redirectPath="/"
      />
    </div>
  );
};

export default Login;