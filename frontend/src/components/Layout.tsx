import { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingPage from "./PagesState/LoadingPage";
// import useWindowDimensions from "../hook/useWindowDimension";
import Sidebar from "./Sidebar";

const Layout = () => {
  // const { width } = useWindowDimensions();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex w-screen h-screen bg-primary-gray-th1 overflow-hidden">
      {/* Sidebar luôn chiếm 1 phần bên trái */}
      <div
        className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"
          } bg-primary-gray-th2`}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Phần còn lại dành cho nội dung */}
      <div className="flex-1 h-auto bg-primary-gray-th1 p-4 overflow-x-hidden overflow-y-auto text-primary-black">
      <Suspense fallback={<LoadingPage />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
