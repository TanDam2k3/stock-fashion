import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate(); // Khai báo useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Giả lập gọi API
      const fakeLoginApi = (username: string, password: string) =>
        new Promise<{ success: boolean }>((resolve) => {
          setTimeout(() => {
            if (username === "admin" && password === "adminadmin") {
              resolve({ success: true });
            } else {
              resolve({ success: false });
            }
          }, 1000); // Giả lập độ trễ 1s
        });
  
      const result = await fakeLoginApi(username, password);
  
      if (result.success) {
        navigate("/app"); // Điều hướng nếu thành công
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không chính xác.");
      }
    } catch (error) {
      alert("Đã xảy ra lỗi khi đăng nhập.");
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
          onSubmit={handleSubmit}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password" className="block font-normal text-black mb-1">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              className="w-full border-0 border-b border-b-gray-400 focus:border-b-blue-700 focus:ring-0 px-2 py-2 text-sm mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              <span className="text-blue-500 cursor-pointer">Sign up now.</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
