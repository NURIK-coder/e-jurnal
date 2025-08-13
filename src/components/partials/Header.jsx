import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../../components_new/ThemeToggle";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { SlideBarContext } from "./SlideBarV2";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../store/currUser";

export default function Header({
  sidebarOpen,
  setSidebarOpen,
}) {
  const { t } = useTranslation();
  const location = useLocation();
  const { expanded, setExpanded } = useContext(SlideBarContext);
  const user = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(currentUser());
  }, [])

  const [pageHistory, setPageHistory] = useState([]);
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("pageHistory") || "[]");
    setPageHistory(history);
  }, [location.pathname]);


  const currentPage = localStorage.getItem("currPage") || "";

  return (
    <header
      className={`
        sticky top-0 z-30 flex items-center
        h-16 px-4 py-2 sm:px-6 lg:px-8
        bg-[#F9FAFB] dark:bg-[#1E2A38] backdrop-blur
        border-b border-gray-200 dark:border-gray-700/50
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "lg:ml-64" : ""}
      `}
    >
      <div className="flex items-center flex-1">
        <div className="flex items-center gap-3">
          {/* Кнопка открытия сайдбара на мобилке */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg cursor-pointer transition"
          >
            {/* Гамбургер */}
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          {/* Кнопка сворачивания (только для больших экранов) */}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="hidden lg:block p-1.5 rounded-lg cursor-pointer transition"
          >
            {expanded ? (
              <ChevronFirst className="dark:text-white" />
            ) : (
              <ChevronLast className="dark:text-white" />
            )}
          </button>

          <h1 className="lg:block text-xl font-semibold text-gray-800 dark:text-gray-100">
            {t(currentPage)}
          </h1>

          
        </div>
      </div>

      {/* Правая часть */}
      <div className="flex items-center gap-3">
        {/* <button
          className={`
            w-9 h-9 flex items-center justify-center rounded-full
            hover:bg-gray-200 dark:hover:bg-gray-700 transition
            ${searchModalOpen ? "bg-gray-200 dark:bg-gray-700" : ""}
          `}
          onClick={(e) => {
            e.stopPropagation();
            setSearchModalOpen(true);
          }}
        >
          <span className="sr-only">Search</span>
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.65" y1="16.65" x2="21" y2="21" />
          </svg>
        </button> */}

        <ThemeToggle />

        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700/60" />

        <div className="relative">
          <button className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-900">
            <img
              src={user.image || 'https://img.freepik.com/premium-psd/contact-icon-illustration-isolated_23-2151903357.jpg'}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>

  );
}
