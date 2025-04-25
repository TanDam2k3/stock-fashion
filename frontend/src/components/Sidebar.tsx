import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaBoxes,
  FaUserFriends,
  FaCogs,
  FaChartLine,
} from "react-icons/fa";
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
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
    className={`p-4 hover:bg-primary-th1/40 transition-colors duration-300 ease-in-out cursor-pointer flex items-center ${
      isOpen ? "justify-between" : "justify-center"
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
      className={`fixed top-0 font-medium left-0 h-full bg-custom-sidebar text-white transform transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
         
<div className="flex justify-end p-4">
  <button onClick={toggleSidebar} className="text-2xl text-white">
    {isOpen ? <IoArrowBackOutline /> : <IoArrowForwardOutline />}
  </button>
</div>
<div className="flex justify-center items-center">
<img  src={logo} alt="Logo" className="w-[150px] h-[150px]" />
</div>




      <nav className="mt-2">
        <ul>
        {menuItem(<FaHome />, "Tổng quan", "/")}
        {menuItem(<IoIosAddCircle />, "Thêm", undefined, () =>
  toggleDropdown("add"), true, "add"
)}

          {openDropdown === "add" && isOpen && (
            <ul className="ml-8">
              {dropdownItem("add-stock", "Thêm kho hàng")}
              {dropdownItem("add-product", "Thêm sản phẩm")}
            </ul>
          )}
          {menuItem(<FaBoxes />, "Kho hàng", "stocks")}
   
          {menuItem(<GiClothes />, "Sản phẩm", "products")}
          



        

          {/* Phiếu báo cáo */}
          {menuItem(<FaChartLine />, "Lịch sử giao dịch", undefined, () =>
  toggleDropdown("report"), true, "report"
)}
          {openDropdown === "report" && isOpen && (
            <ul className="ml-8">
              {dropdownItem("/report/import", "Nhập kho")}
              {dropdownItem("/report/export", "Xuất kho")}
            </ul>
          )}

          {menuItem(<FaCogs />, "Setting", "/settings")}
          {menuItem(<FaUserFriends />, "Nhân sự", "/hr")}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
