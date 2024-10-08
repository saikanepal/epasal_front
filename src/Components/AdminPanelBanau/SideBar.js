import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { MdOutlineDashboard, MdStore, MdEdit } from "react-icons/md";
import { FaUserAlt, FaClipboardList, FaBox } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSiderBar } from "./SiderBarContext";
import banau from '../../Assets/banau.png';
import { IoAnalytics } from "react-icons/io5";
const SideBar = ({ setDashboardState }) => {
  const navigate = useNavigate();
  const { open, setOpen } = useSiderBar();

  const handleLogout = () => {
    try {
      navigate("/");
    } catch (error) {
      /* Handle logout error */
    }
  };

  const menus = [
    { name: "General", link: "/adminpanelbanau", icon: MdEdit },
    { name: "Home", link: "/adminpanelbanau", icon: MdOutlineDashboard },
    { name: "Stores", link: "/adminpanelbanau", icon: MdOutlineDashboard },
    { name: "Logs", link: "/adminpanelbanau", icon: MdOutlineDashboard },
    { name: "Employee", link: "/adminpanelbanau", icon: FaUserAlt },
    { name: "Analytics", link: "/adminpanelbanau", icon: IoAnalytics },
    // { name: "Order", link: "/adminpanel", icon: FaClipboardList },
    // { name: "Product", link: "/adminpanel", icon: FaBox },
    // { name: "Edit Store", link: "/adminpanel", icon: MdEdit },
  ];

  return (
    <section className="flex gap-6 relative">
      <div
        className={` 
          min-h-screen
          h-full
          w-[250px] 
          bg-white
          fixed
          lg:relative
          top-0 
          left-0 
          z-50 
          transition-all
          duration-500 
          shadow-lg
        `}
      >
        <div className=" flex fixed font-Roboto flex-col justify-between h-full">
          <div>
            <div className="py-2 flex justify-center flex-row">
              <h1 className="text-3xl font-bold text-black bg-black h-6 w-6  px-1 py-1 mr-4 mt-9 rounded-3xl decoration-underline decoration-blue-500">
              </h1>
              <img src={banau} className="h-10 mt-7 filter invert" alt="Logo" />
            </div>
            <div className="mt-[100px] flex flex-col justify-center gap-4 text-gray-700">
              {menus.map((menu, i) => (
                <Link
                  key={i}
                  onClick={() => {
                    setDashboardState(menu.name)
                  }}
                  className={`flex w-40 items-center ml-12 text-lg gap-4 font-medium p-3 hover:bg-orange-100 rounded-md transition-colors duration-200 ${menu.margin ? "mt-5" : ""}`}
                >
                  {React.createElement(menu.icon, { size: 20 })}
                  <span className="pl-2">{menu.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="mb-[260px]">
            <div className="flex mb-10   justify-center items-center">
              <hr className="border-gray-400 px-8 w-[175px]  ml-9" />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex ml-12 items-center text-lg gap-4 font-medium p-3 hover:bg-orange-100 rounded-md transition-colors duration-200"
            >
              <FiSettings size={20} />
              <span className="pl-2">Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex ml-12 items-center text-lg gap-4 font-medium p-3 hover:bg-orange-100 rounded-md transition-colors duration-200"
            >
              <FiLogOut size={20} />
              <span className="pl-2">Log out</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
