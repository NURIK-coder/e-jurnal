import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { store } from "../store/store";

import logo from '../assets/logo.png'
import { useTranslation } from "react-i18next";




export default function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         navigate("/login");
    //     }
    //     store.dispatch(GetCurrentUser());
    // }, []);

    function changeLanguage(e) {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    }

    function chTheme() {
        const newTheme = !isClicked;
        setIsClicked(newTheme);
        if (newTheme) {
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
            window.location.reload()
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
            window.location.reload()
        }

    }

    useEffect(() => {
        localStorage.setItem("currPage", "dashboard");
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsClicked(true);
            document.body.classList.add("dark");
        } else {
            setIsClicked(false);
            document.body.classList.remove("dark");
        }

        const savedLang = localStorage.getItem("language");
        if (savedLang && i18n.language !== savedLang) {
            i18n.changeLanguage(savedLang);
        }
    }, []);

    return (
        <>
            
           <div className=" w-full h-16  flex items-center justify-between bg-white dark:bg-[#273947] shadow-b-md dark:border-b dark:border-gray-600 ">
                <div className="w-full  flex items-center justify-between  px-4 py-2 ">
                    <div className="flex gap-5 items-center">
                        
                        <p className="text-bold text-xl dark:text-white text-black">{t(`${localStorage.getItem('currPage')}`)}</p>
                    </div>
                    

                    
                    <div className="flex gap-4">
                        <div className="block ml-4">
                            <div className="w-16  h-8 rounded-full bg-slate-400 shadow-lg shadow-black/20 relative">
                                <motion.div
                                onClick={chTheme}
                                animate={isClicked ? { x: 32 } : { x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-8 h-8 rounded-full bg-[url('./assets/light.png')] dark:bg-[url('./assets/dark.png')] bg-white bg-center bg-cover shadow cursor-pointer absolute top-0 left-0"
                                />
                            </div>
                        </div>

                        <div className="ml-2 flex items-center gap-1 sm:gap-2 px-1  dark:shadow-gray-500 bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner text-xs sm:text-sm">
                            
                            {["en", "ru", "uz"].map((lang) => (
                                <label
                                    key={lang}
                                    className={`px-2 py-1 rounded-full  cursor-pointer transition-all duration-300 text-[12px]
                                        ${i18n.language === lang
                                        ? "bg-slate-400 text-black shadow"
                                        : "text-gray-600 dark:text-gray-300"
                                        }`}
                                >
                                <input
                                    type="radio"
                                    name="language"
                                    value={lang}
                                    checked={i18n.language === lang}
                                    onChange={changeLanguage}
                                    className="hidden"
                                />
                                {lang === "en" ? "EN" : lang === "ru" ? "RU" : "UZ"}
                                </label>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>

                


        </>
    );
}
