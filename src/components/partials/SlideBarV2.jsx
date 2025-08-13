import { ChevronFirst, ChevronLast, LogOut, MoreVertical, UserCircle } from "lucide-react";
import logo from '../../assets/logo.png';
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../store/currUser";
import { Link, useNavigate } from "react-router-dom";

export const SlideBarContext = createContext()

export default function SlideBarV2({children, isMobile, sidebarOpen, setSidebarOpen }){ 
    const {expanded, setExpanded} = useContext(SlideBarContext);
    const {t} = useTranslation();
    const user = useSelector(u => u.userInfo.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        function handleClickOutside(e) {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen(false);
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() =>{
        const token = localStorage.getItem("journal_token");
        if (!token || !user) {
            navigate("/admin/login");
        }
    }, [user])
    useEffect(() => {
        dispatch(currentUser());
    }, []);
    

    return (
        <>
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`
            h-screen z-50 
            ${isMobile
            ? `fixed top-0 left-0 w-64 transform transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`
            : `relative transition-all duration-200
                ${expanded ? "w-64" : "w-20"}`
            }
        `}
      >
        <nav
          className="
            h-full flex flex-col border-r shadow-sm
            bg-white text-gray-800
            dark:bg-[#1E2A38] dark:text-gray-100
            dark:border-gray-700
          "
        >
          {/* Логотип */}
          <div className="p-4 pb-2 flex gap-5 items-center">
            <img
              src={logo}
              className={`overflow-hidden transition-all ${
                expanded ? "w-20" : "w-10 mx-auto"
              }`}
              alt=""
            />
            {expanded && (
              <span className="text-xl font-semibold">{t("jurnal")}</span>
            )}
          </div>

          {/* Меню */}
          <ul className="flex-1 px-4 space-y-1">{children}</ul>

          {/* Нижняя часть */}
          <div className="border-t dark:border-gray-700 flex p-3">
            <img
              src="https://img.freepik.com/premium-psd/contact-icon-illustration-isolated_23-2151903357.jpg"
              className="w-10 h-10 mx-auto rounded-full"
              alt=""
            />
            <div
              className={`
                flex justify-between items-center 
                overflow-visible transition-all 
                ${expanded ? "w-52 ml-3 " : "hidden"}
              `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{user.username}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {user.active_role}
                </span>
              </div>
              <div className="relative inline-block text-left" ref={menuRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>

                {open && (
                  <div
                    className="
                      absolute right-0 mb-2 bottom-full w-40 rounded-md shadow-lg 
                      bg-white dark:bg-[#273947]
                      ring-1 ring-gray-200 dark:ring-gray-600
                      z-50 transition-all duration-300 ease-in-out
                    "
                  >
                    <div className="py-1">
                      <Link
                       to={'/profile'}
                       onClick={() => {
                          const newHistory = [{ page_code: 'profile', path: '/profile' }];
                          localStorage.setItem("pageHistory", JSON.stringify(newHistory));
                          localStorage.setItem("currPage", 'profile');
                          localStorage.setItem("currPath", '/profile');
                        }}
                       className="cursor-pointer flex gap-2 items-center block w-full px-4 py-2 text-left text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <UserCircle size={20} />
                        {t("profile")}
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("journal_token");
                          navigate("/admin/login");
                        }}
                        className="cursor-pointer flex gap-2 items-center font-bold block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut size={20} />
                        {t("exit")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
    )
}
