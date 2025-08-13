import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useTranslation } from "react-i18next";
const menuItemsConfig = (t) => [
  { to: "/admin/dashboard", label: t("dashboard"), icon: "🧭", key: "dashboard" },
  { to: "/jurnal/list", label: t("jurnal_list"), icon: "📃", key: "jurnal_list" },
  { to: "/teachers/list", label: t("teachers_list"), icon: "👨‍🏫", key: "teachers_list" },
];

export default function MobileSidebar({ theme, pathname }) {
  const { t } = useTranslation()
  const menuItems = menuItemsConfig(t);
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <div className="p-3">
        <button
          onClick={() => setOpen(true)}
          className={`p-2 rounded-md ${theme.card} ${theme.text}`}
        >
          ☰
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          ></div>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className={`
              fixed top-0 left-0 w-64 h-full z-50
              ${theme.container}
              shadow-lg flex flex-col
            `}
          >
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-2">
                <img src={logo} className="w-[40px]" alt="logo" />
                <span className={`${theme.text} font-semibold`}>{t("jurnal")}</span>
              </div>
              <button
                className={`${theme.text} text-xl`}
                onClick={() => setOpen(false)}
              >
                ✖
              </button>
            </div>

            <ul className="flex-1 px-2 pt-6 space-y-2">
              {menuItems.map(({ to, label, icon, key }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => {
                      localStorage.setItem("currPage", key);
                      setOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all 
                      ${
                        pathname === to
                          ? `dark:bg-[gray] hover:${theme.card} dark:hover:bg-slate-800 ${theme.text} font-semibold`
                          : `hover:${theme.card} ${theme.text}`
                      }`}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </div>
  );
}