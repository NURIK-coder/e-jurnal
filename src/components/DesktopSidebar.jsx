import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";

const menuItemsConfig = (t) => [
  { to: "/admin/dashboard", label: t("dashboard"), icon: "🧭", key: "dashboard" },
  { to: "/jurnal/list", label: t("jurnal_list"), icon: "📃", key: "jurnal_list" },
  { to: "/teachers/list", label: t("teachers_list"), icon: "👨‍🏫", key: "teachers_list" },
];

export default function DesktopSidebar({ theme, pathname }) {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation()
  const menuItems = menuItemsConfig(t);

  return (
    <motion.div
      animate={{ width: isOpen ? 240 : 72 }}
      className={`${theme.container} hidden md:flex h-screen shadow-md transition-all overflow-hidden flex-col justify-between dark:border-r dark:border-gray-700`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mx-auto py-4 w-full px-3">
        {isOpen && (
          <div className="flex gap-2 items-center">
            <img src={logo} className="w-[40px]" alt="logo" />
            <span className={`${theme.text} font-semibold`}>{t("jurnal")}</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-xl cursor-pointer ${isOpen ? 'mx-auto' : ''} hover:text-blue-500 ${theme.text}`}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Menu */}
      <ul className="flex-1 px-2 pt-6 space-y-2">
        {menuItems.map(({ to, label, icon, key }) => (
          <li key={to}>
            <Link
              to={to}
              onClick={() => localStorage.setItem("currPage", key)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all 
                ${
                  pathname === to
                    ? `dark:bg-[gray] ${theme.text} font-semibold`
                    : `hover:${theme.card} ${theme.text}`
                }`}
            >
              <span>{icon}</span>
              {isOpen && <span>{label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Bottom */}
      <div className="px-2 pb-6">
        <Link
          to="/admin/login"
          onClick={() => localStorage.removeItem("token")}
          className={`mt-3 flex items-center gap-2 text-sm transition duration-200 justify-center w-full px-4 py-2 rounded-lg 
            dark:bg-[gray] dark:hover:bg-[red]
            bg-slate-200 hover:bg-[red] 
            ${theme.text} hover:text-white`}
        >
          {isOpen ? "Logout" : "🚪"}
        </Link>
      </div>
    </motion.div>
  );
}
