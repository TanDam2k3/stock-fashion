import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBoxes,
  FaUserFriends,
  FaCogs,
  FaChartLine,
  FaFileExport,
} from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import {
  MdArrowForwardIos,
  MdKeyboardArrowDown,
} from "react-icons/md";
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";
import logo from "../../src/assets/logodha.svg"
import { AuthContext } from "../contexts/AuthContext";
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { logout } = useContext(AuthContext);

  const toggleDropdown = (key: string) => {
    setOpenDropdown(prev => (prev === key ? null : key));
  };

  const menuItem = (
    icon: React.ReactNode,
    label: string,
    to?: string,
    onClick?: () => void,
    hasDropdown?: boolean,
    dropdownKey?: string
  ) => (
    <li
      className={`p-4 hover:bg-primary-th1/40 transition-colors duration-300 ease-in-out cursor-pointer flex items-center ${isOpen ? "justify-between" : "justify-center"
        }`}

      onClick={onClick}
    >
      {to ? (
        <Link to={to} className="flex items-center gap-2">
          {icon}
          {isOpen && <span>{label}</span>}
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          {icon}
          {isOpen && <span>{label}</span>}
        </div>
      )}

      {/* Icon bên phải */}
      {isOpen &&
        hasDropdown &&
        (openDropdown === dropdownKey ? (
          <MdKeyboardArrowDown size={25} />
        ) : (
          <MdArrowForwardIos />
        ))}
    </li>
  );



  const dropdownItem = (to: string, label: string) => (
    <li className="p-2 hover:bg-primary-th1/40 transition-colors duration-300 ease-in-out">
      <Link to={to} className="flex items-center gap-2">
        <MdArrowForwardIos /> {label}
      </Link>
    </li>
  );

  return (
    <div
      className={`fixed top-0 font-medium left-0 h-full bg-custom-sidebar text-white transform transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-16"
        }`}
      style={{
        overflowY: 'hidden',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        scrollBehavior: 'smooth',
        transition: 'overflow-y 0.5s ease-in-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.overflowY = 'auto';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.overflowY = 'hidden';
      }}
    >

      <style>{`
    .sidebar-container::-webkit-scrollbar {
      display: none;
    }
  `}</style>


      <div className="flex justify-end p-4">
        <button onClick={toggleSidebar} className="text-2xl text-white">
          {isOpen ? <IoArrowBackOutline /> : <IoArrowForwardOutline />}
        </button>
      </div>
      <div className="flex justify-center items-center">
        <img src={logo} alt="Logo" className="w-[150px] h-[150px]" />
      </div>

      <nav className="mt-2">
        <ul>
          {menuItem(<FaHome />, "Tổng quan", "/")}
          {menuItem(<IoIosAddCircle />, "Thêm", undefined, () =>
            toggleDropdown("add"), true, "add"
          )}

          {openDropdown === "add" && isOpen && (
            <ul className="ml-8">
              {dropdownItem("stocks/create", "Thêm kho hàng")}
              {dropdownItem("products/create", "Thêm sản phẩm")}
            </ul>
          )}
          {menuItem(<FaBoxes />, "Kho hàng", "stocks")}

          {menuItem(<GiClothes />, "Sản phẩm", "products")}
          {menuItem(<FaFileExport />, "Nhập kho", "import")}
          {menuItem(<FaFileExport />, "Xuất kho", "export")}

          {/* Phiếu báo cáo */}
          {menuItem(<FaChartLine />, "Lịch sử giao dịch", undefined, () =>
            toggleDropdown("report"), true, "report"
          )}
          {openDropdown === "report" && isOpen && (
            <ul className="ml-8">
              {dropdownItem("report/import", "Nhập kho")}
              {dropdownItem("report/export", "Xuất kho")}
            </ul>
          )}

          {user && user.role !== 'admin' && (
            <>
              {menuItem(<FaCogs />, "Setting", "settings")}

            </>
          )}

          {user && user.role === 'admin' && (
            <>
              {menuItem(<FaUserFriends />, "Nhân sự", undefined, () =>
                toggleDropdown("employee"), true, "employee"
              )}
              {openDropdown === "employee" && isOpen && (
                <ul className="ml-8">
                  {dropdownItem("employees/create", "Tạo mới nhân sự")}
                  {dropdownItem("employees", "Quản lý nhân sự")}
                </ul>
              )}
            </>
          )}

          {menuItem(<TbLogout2 />, "Log out", "login", logout)}

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
