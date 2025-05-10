import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function UserSidebar() {
  const [open, setOpen] = useState(()=>{
    const saved = localStorage.getItem("sidebaropen")
    return saved === null ? true : JSON.parse(saved)
  });

  useEffect(()=>{
    localStorage.setItem("sidebaropen", JSON.stringify(open) )
  })

  const menus = [
    { name: "Dashboard", link: "/", icon: MdDashboard },
    { name: "Create Task", link: "/task", icon: FaTasks },
  ];

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
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="text-white">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`${
                  menu.margin && mt - 5
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28"
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
          {/* Logout  Button */}
          <div className="mt-auto mb-4">
            <button className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-red-600 bg-red-500 rounded-md w-full text-white duration-300">
              <FiLogOut size={20} />
              {open && <span>Logout</span>}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserSidebar;
