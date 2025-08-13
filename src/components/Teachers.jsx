import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { teacherList } from "../store/teachers/teacherActions";
import { useTranslation } from "react-i18next";
import { Pagination } from "./pogintion";
import { COLORS } from "../../colors";
import { Link } from "react-router-dom";

export default function Teachers() {
    const teacherInfo = useSelector((state) => state.teacherInfo.teachers);
    const teachers = teacherInfo?.results || [];
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [theme, setTheme] = useState(COLORS.lightMode);

    // Добавляем отслеживание ширины экрана
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1025);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const isDark = localStorage.getItem("theme") === "dark";
        setTheme(isDark ? COLORS.darkMode : COLORS.lightMode);
    }, []);

    const totalPages = Math.ceil((teacherInfo?.count || 1) / 10);

    useEffect(() => {
        const fetchTeachers = async () => {
            setLoading(true);
            try {
                await dispatch(teacherList(page, name));
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchTeachers();
    }, [page, name, dispatch]);

    useEffect(()=>{
        localStorage.setItem("currPage", "teachers_list");
        localStorage.setItem("currPath", "/teachers/list");
    }, [])
    

    return (
        <div className={`bg-slate-100 dark:bg-slate-800 rounded-xl  min-h-screen p-4 `}>
            <div
                className={`flex flex-col md:flex-row md:items-center justify-between bg-white dark:bg-slate-700 shadow-md shadow-black/10 rounded-t-xl p-4 my-3 gap-3`}
            >
                <h1 className={`font-semibold text-2xl dark:text-gray-100`}>
                    {t("filtres")}
                </h1>
                <input
                    type="text"
                    className={`w-full md:w-auto border border-[#E2E8F0] dark:border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 dark:bg-[#1E293B] dark:text-gray-300 dark:placeholder-[#64748B] `}
                    placeholder="Ismi bo'yicha qidirish"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            {/* Если не мобильный — таблица */}
            {!isMobile && (
                <div className="overflow-x-auto mt-3 max-h-[600px]">
                    <table className="min-w-full divide-y divide-gray-200 shadow-xl rounded-b-xl dark:divide-gray-600">
                        <thead className="bg-gray-200 dark:bg-gray-700 ">
                            <tr>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("full_name")}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("fan_guruh")}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("created_at")}
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t("possibilities")}
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            className={`bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600 max-h-[500px]`}
                        >
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-10 text-center">
                                        <div className="flex justify-center space-x-2">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                teachers.map((teacher, ind) => (
                                    <tr
                                        key={teacher.id}
                                        className={`dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors `}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {teacher.employee_id_number || "--"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={
                                                        teacher.image ||
                                                        "https://img.freepik.com/premium-psd/contact-icon-illustration-isolated_23-2151903357.jpg"
                                                    }
                                                    className="w-10 h-10 rounded-full shadow-xl"
                                                    alt=""
                                                />
                                                {teacher.full_name || "--"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {teacher.fan_guruh || "--"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(
                                                teacher.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <Link
                                                onClick={() => {
                                                    
                                                    const path = `/teacher/${ind + 1}/detail`;

                                                    // 1. Считываем историю
                                                    let history = JSON.parse(localStorage.getItem("pageHistory") || "[]");
                                                    
                                                    history.push({ page_code: "teacherDetail", path: path });

                                                    // 3. Убираем дубликаты по path
                                                    history = history.filter(
                                                        (item, index, self) =>
                                                        index === self.findIndex((h) => h.path === item.path)
                                                    );

                                                    // 4. Сохраняем историю и текущую страницу
                                                    localStorage.setItem("pageHistory", JSON.stringify(history));
                                                    localStorage.setItem("currPage", "teacherDetail");
                                                    localStorage.setItem("currPath", path);
                                                
                                                    // 2. Добавляем новый пункт
                                                    
                                                    
                                                    
                                                }}
                                                to={`/teacher/${ind + 1}/detail`}
                                                className={` py-2 px-3 rounded-full bg-gray-100 dark:bg-slate-700 dark:text-gray-200 hover:bg-slate-400 cursor-pointer shadow-md hover:-translate-y-1 transition duration-300`}
                                            >
                                                {t("see_more")}
                                            </Link>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Если мобильный — карточки */}
            {isMobile && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    {loading ? (
                        <div className="flex justify-center py-10 col-span-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce mx-1"></div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce mx-1 [animation-delay:-0.3s]"></div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce mx-1 [animation-delay:-0.15s]"></div>
                        </div>
                    ) : (
                        teachers.map((teacher, ind) => (
                            <div
                                key={teacher.id}
                                className={`${theme.container} ${theme.shadow} rounded-xl p-4 flex flex-col gap-3`}
                            >
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={
                                            teacher.image ||
                                            "https://img.freepik.com/premium-psd/contact-icon-illustration-isolated_23-2151903357.jpg"
                                        }
                                        className="w-16 h-16 rounded-full object-cover shadow-md"
                                        alt={teacher.full_name}
                                    />
                                    <div className="flex flex-col overflow-hidden">
                                        <p
                                            className={`font-semibold text-lg ${theme.text} truncate`}
                                            title={teacher.full_name}
                                        >
                                            {teacher.full_name || "--"}
                                        </p>
                                        <p className="text-gray-500 text-sm truncate">
                                            {teacher.fan_guruh || t("no_group")}
                                        </p>
                                        <p className="text-gray-400 text-xs">
                                            {new Date(
                                                teacher.created_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 flex justify-end">
                                    <Link
                                        onClick={() =>
                                            localStorage.setItem(
                                                "currPage",
                                                "teacherDetail"
                                            )
                                        }
                                        to={`/teacher/${ind + 1}/detail`}
                                        className={`py-2 px-4 rounded-full ${theme.card} ${theme.text} hover:bg-slate-400 cursor-pointer shadow-md transition duration-300`}
                                    >
                                        {t("see_more")}
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {teachers.length === 0 && !loading && (
                <div className="text-center py-5 w-full px-10">
                    <p className="text-center text-gray-500 py-4">
                        {t("no_teachers_found")}
                    </p>
                </div>
            )}

            <Pagination
                totalPages={totalPages}
                currentPage={page}
                setCurrentPage={setPage}
            />
        </div>
    );
}
