import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyPopup from "../../components/register/VerifyPopup";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // ✅ Thêm email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showVerify, setShowVerify] = useState(false); // ✅ Hiển thị popup
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const fakeRegisterApi = (username: string, password: string, email: string) =>
        new Promise<{ success: boolean }>((resolve) => {
          setTimeout(() => {
            if (username && password && email) {
              resolve({ success: true });
            } else {
              resolve({ success: false });
            }
          }, 1000);
        });

      const result = await fakeRegisterApi(username, password, email);

      if (result.success) {
        setShowVerify(true); // ✅ Hiển thị popup
      } else {
        alert("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      alert("Đã xảy ra lỗi khi đăng ký.");
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4">
      <div className="flex max-w-4xl w-full rounded-lg shadow-md overflow-hidden">
        <img
          src="https://storage.googleapis.com/a1aa/image/45d85b4b-49ae-42df-d030-3e84794ff5a7.jpg"
          alt="Warehouse interior"
          className="w-1/2 object-cover"
        />
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="w-1/2 bg-white px-6 py-10 rounded-r-lg shadow-md flex items-center justify-center"
        >
          <div className="w-full">
            <h2 className="mb-4 text-[#0f2f7f] text-lg font-bold text-center">
              TẠO TÀI KHOẢN MỚI
            </h2>

            <label htmlFor="username" className="block mb-1">
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              className="w-full border-b border-b-gray-400 px-2 py-2 text-sm mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border-b border-b-gray-400 px-2 py-2 text-sm mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" className="block mb-1">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              className="w-full border-b border-b-gray-400 px-2 py-2 text-sm mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword" className="block mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full border-b border-b-gray-400 px-2 py-2 text-sm mb-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-900 text-white text-xs font-semibold py-2 rounded"
            >
              ĐĂNG KÝ
            </button>

            <p className="text-xs mt-2">
              Đã có tài khoản?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/")}
              >
                Đăng nhập
              </span>
            </p>
          </div>
        </form>
      </div>

      {/* ✅ Hiển thị popup xác minh */}
      {showVerify && <VerifyPopup email={email} onClose={() => setShowVerify(false)} />}
    </div>
  );
};

export default Register;
