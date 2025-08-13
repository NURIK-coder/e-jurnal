import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SlideBarContext } from "./SlideBarV2";

export default function SlidebarItems({ icon, text, alert, page_code, path, setSidebarOpen }) {
  const { expanded } = useContext(SlideBarContext);
  const location = useLocation();
  const active = location.pathname === path;
  const navigate = useNavigate()

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? `
              bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800
              dark:from-[#334155] dark:to-[#1E2A38] 
              dark:text-white dark:font-semibold
            `
            : `
              hover:bg-indigo-50 text-gray-600
              dark:text-gray-300 dark:hover:bg-[#273947]
            `
        }
      `}
    >
      {icon}
      <span
        onClick={() => {
          const newHistory = [{ page_code, path }];
          localStorage.setItem("pageHistory", JSON.stringify(newHistory));
          localStorage.setItem("currPage", page_code);
          localStorage.setItem("currPath", path);
          navigate(path);
          setSidebarOpen(false);
        }}
        className={`
          overflow-hidden transition-all
          ${expanded ? "w-52 ml-3" : "w-0"}
        `}
      >
        {text}
      </span>

      {alert && (
        <div
          className={`
            absolute right-2 w-2 h-2 rounded bg-indigo-400
            ${expanded ? "" : "top-2"}
          `}
        ></div>
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 z-50
            dark:bg-[#334155] dark:text-gray-100
            invisible opacity-0 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
