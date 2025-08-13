import { SlideBarContext } from "./partials/SlideBarV2";
import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import Header from "./partials/Header";
import SlideBarV2 from "./partials/SlideBarV2";
import SlidebarItems from "./partials/SlideBarItem";
import { LayoutDashboard, NotebookText, Users, Settings, LifeBuoy, ChevronDown, BookType, BookOpenText  } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { currentUser } from "../store/currUser";
import { store } from "../store/store";


export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const [pageHistory, setPageHistory] = useState([]);
  const [showMenegerPages, setShowMenegerPages] = useState(false)
  const user = useSelector(u=>u.userInfo.user)
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("pageHistory") || "[]");
    setPageHistory(history);
  }, [location.pathname]);
  useEffect(()=>{
    store.dispatch(currentUser())
    
  }, [])


  const currentPage = localStorage.getItem("currPage") || "";

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1025);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);


  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("pageHistory") || "[]");
    if (history.length === 0) {
      // Задаем дефолтную страницу
      const defaultPage = { page_code: "dashboard", path: "/dashboard" };
      localStorage.setItem("pageHistory", JSON.stringify([defaultPage]));
      localStorage.setItem("currPage", defaultPage.page_code);
      localStorage.setItem("currPath", defaultPage.path);
      navigate("/dashboard", { replace: true });
    }
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem('journal_token')
    if(!token){
      navigate('/admin/login')
    }
  }, [])

  return (
    <SlideBarContext.Provider value={{ expanded, setExpanded }}>
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <SlideBarV2
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        >
          <SlidebarItems icon={<LayoutDashboard size={20} className='dark:text-white' />} text={t('dashboard')} page_code={'dashboard'} path={'/dashboard'} setSidebarOpen={setSidebarOpen}/>
        
          <SlidebarItems 
              icon={<NotebookText size={20} className='dark:text-white' />} 
              text={t('jurnal_list')} page_code={'jurnal_list'} 
              path={'/jurnal/list'} setSidebarOpen={setSidebarOpen}/
          > 

          

          <SlidebarItems icon={<Users size={20} className='dark:text-white' />} text={t('teachers_list')} page_code={'teachers_list'} path={'/teachers/list'} setSidebarOpen={setSidebarOpen}/>
          {user.active_role === "superadmin" || user.active_role === "manager" ? (
            <div>
              <SlidebarItems icon={<BookType size={20} className='dark:text-white' />} text={t('jurnal_subjects')} page_code={'jurnal_subjects'} path={'/subject/list/'} setSidebarOpen={setSidebarOpen}/>
              <SlidebarItems icon={<BookOpenText size={20} className='dark:text-white' />} text={t('subjects')} page_code={'subjects'} path={'/subjects/list/'} setSidebarOpen={setSidebarOpen}/>
            </div>
          ):null}
          
          <hr className="my-3 border-gray-200 dark:border-gray-700" />
          <SlidebarItems icon={<Settings size={20} className='dark:text-white' />} text={t('settings')} setSidebarOpen={setSidebarOpen}/>
          <SlidebarItems icon={<LifeBuoy size={20} className='dark:text-white' />} text={t('help')} setSidebarOpen={setSidebarOpen}/>

        </SlideBarV2>

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex flex-col">
            

            <div className="m-5 text-sm text-gray-600 dark:text-gray-400 flex flex-wrap   items-center gap-1">
              <span>/</span>
              {pageHistory.map((h, i) => (
                <span key={i} className="flex items-center gap-1">
                  <Link
                    onClick={() => {
                      const newHistory = pageHistory.slice(0, i + 1);
                      localStorage.setItem("pageHistory", JSON.stringify(newHistory));
                    }}
                    to={h.path}
                    className="hover:underline text-gray-700 dark:text-gray-300"
                  >
                    {t(h.page_code)}
                  </Link>
                  {i < pageHistory.length - 1 && <span>/</span>}
                </span>
              ))}
            </div>
          </div>

          <main className=" p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SlideBarContext.Provider>
  );
}
