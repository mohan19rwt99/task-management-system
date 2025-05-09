import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserAstronaut } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { logoutUser } from "../redux/AuthSlice";
import { useDispatch } from "react-redux";
import { post } from "../services/ApiEndpoint";


function Sidebar() {
  const menus = [
    { name: "dashoard", link: "/admin", icon: MdOutlineDashboard },
    { name: "Admin Users", link: "/admin/users", icon: FaUserAstronaut },
    { name: "dashoard", link: "/admin", icon: MdOutlineDashboard },
  ];

  const [open, setOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved === null ? true : JSON.parse(saved);
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(open));
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout= async ()=>{
        try {
            await post('/api/auth/logout');
            dispatch(logoutUser());
            localStorage.removeItem('user')
            navigate('/login')
        } catch (error) {
            console.log("error", error)
        }
  }



  return (
    <>
      <section className="flex gap-6">
        <div
          className={`bg-[#0e0e0e] min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4 flex flex-col justify-between`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-poinet"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                {!open && (
                  <span className="absolute left-16 z-10 bg-white text-gray-900 font-semibold text-sm px-2 py-1 rounded-md shadow-lg whitespace-nowrap hidden group-hover:inline">
                    {menu.name}
                  </span>
                )}
              </Link>
            ))}
          </div>
          {/* Logout Button */}
          <div className="mt-auto mb-4">
            <button
            
              onClick={handleLogout}
              className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-red-600 bg-red-500 rounded-md w-full text-white duration-300"
            >
              <FiLogOut size={20} />
              {open && <span
              >Logout</span>}
            </button>
          </div>
        </div>
        
      </section>
    </>
  );
}

export default Sidebar;
