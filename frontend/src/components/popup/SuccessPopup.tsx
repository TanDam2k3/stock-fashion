import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/loadingGenerate.gif'

interface SuccessPopupProps {
    message: string;
    isOpen: boolean;
    onClose: () => void;
    redirectPath: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, isOpen, onClose, redirectPath }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
                navigate(redirectPath);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose, navigate, redirectPath]);

    const handleOkClick = () => {
        onClose();
        navigate(redirectPath);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/50">
            <div className="">
             <img src={loginImage} alt="" />
            </div>

            <div className="bg-green-500 text-white rounded-lg shadow-md p-4 flex items-center gap-3 max-w-sm animate-fadeIn">
         
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                <div className="flex-1">
                    <span className="text-sm font-medium">{message}</span>
                </div>
                <button
                    onClick={handleOkClick}
                    className="bg-white text-green-500 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 focus:outline-none"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default SuccessPopup;