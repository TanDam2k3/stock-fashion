import React, { useRef, useState } from "react";

interface Props {
  email: string;
  onClose: () => void;
}

const VerifyPopup: React.FC<Props> = ({ email, onClose }) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // chỉ nhận 1 số

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join("");
    if (enteredCode === "123456") {
      alert("Xác minh thành công!");
      onClose();
    } else {
      alert("Mã không đúng. Vui lòng thử lại.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-xl px-8 py-10 w-[400px] max-w-[90%] text-center">
        <h2 className="text-xl font-bold text-[#0f2f7f] mb-4">XÁC MINH EMAIL</h2>
        <p className="text-sm text-gray-600 mb-6">
          Mã xác minh đã được gửi tới <strong>{email}</strong>
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputRefs.current[i] = el)}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-blue-700 text-white py-2 rounded text-sm font-semibold"
        >
          Xác minh
        </button>

        <button
          onClick={onClose}
          className="mt-3 text-sm text-gray-500 hover:underline"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default VerifyPopup;
