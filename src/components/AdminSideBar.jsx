import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../colors";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";


export default function AdminSidebar() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [theme, setTheme] = useState(COLORS.lightMode);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setTheme(isDark ? COLORS.darkMode : COLORS.lightMode);
  }, []);

  return (
    <>
      <DesktopSidebar theme={theme} pathname={pathname} t={t} />
      <MobileSidebar theme={theme} pathname={pathname} t={t} />
    </>
  );
}
