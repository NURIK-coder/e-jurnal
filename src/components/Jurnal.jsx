import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { jurnalList } from "../store/journal/jurnalActions";
import { COLORS } from "../../colors";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import rightArrow from '../assets/right_arrow.png';
import leftArrow from '../assets/left_arrow.png';
import { Pagination } from "./pogintion";
import {Select, Spin} from 'antd'
import { store } from "../store/store";
import { teacherList } from "../store/teachers/teacherActions";
import { fetchAllFilters, fetchData } from "../store/filtres/filtresActions";

export default function JurnalList() {
  const jurnalState = useSelector(j => j.jurnalInfo.jurnals || {});
  const jurnals = jurnalState.results || [];
  const count = jurnalState.count || 0;
  const URL = import.meta.env.VITE_API_URL;


  const { Option } = Select;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [theme, setTheme] = useState(COLORS.lightMode);
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1025);
  const limit = 10;
  const totalPages = Math.ceil(count / limit);
  const [ professor_id, setProfessor_id] = useState('')
  const [loading, setLoading] = useState();

  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");
  const [selectedType, setSelectedType] = useState("");


  const levels = useSelector(l=>l.filtresInfo.levels.results)
  const [subjects, setSubjects] = useState([]);
  const [professors, setProfessors] = useState([]);
  
  const filtres = useSelector(l=>l.filtresInfo)
  

  const selectorBg = theme === 'dark' ? '#1E2A38' : 'white';
  const textColor = theme === 'dark' ? '#CBD5E1' : '#1E293B';


  const fetchSubjects = async (search = "") => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}base/subject/list/?search=${search}`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('journal_token')}`
        }
      });
      const data = await res.json();
      console.log(data);
      
      setSubjects(data.results || []);
    } catch (err) {
      console.error("Ошибка загрузки предметов:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchProfessors = async (search = "") => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}base/professor/list/?search=${search}`, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('journal_token')}`
        }
      });
      const data = await res.json();
      console.log(data);
      
      setProfessors(data.results || []);
    } catch (err) {
      console.error("Ошибка загрузки учителя:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects(); 
    fetchProfessors()// начальная загрузка
  }, []);
  
  
  // Следим за размером экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1025);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setTheme(isDark ? COLORS.darkMode : COLORS.lightMode);

    // обновляем класс dark
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('journal_token');
    if (!token) {
      navigate("/admin/login");
      return;
    }
  }, [navigate]);
  useEffect(()=>{
    store.dispatch(fetchAllFilters())
  }, [])

  useEffect(() => {
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dispatch(jurnalList(page, selectedProfessor, String(selectedLevel), selectedSubject, selectedType ));

        if (res?.payload?.detail === "Given token not valid for any token type") {
          navigate("/admin/login");
          return;
        }

        const isDark = localStorage.getItem("theme") === "dark";
        setTheme(isDark ? COLORS.darkMode : COLORS.lightMode);
      } catch (error) {
        console.error("Ошибка при загрузке журналов:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchData();
  }, [dispatch, navigate, page, professor_id, selectedLevel, selectedSubject, selectedProfessor, selectedType]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className={`min-h-screen dark:bg-[#1E2A38] rounded-xl dark:text-gray-100  p-5`}>
      <div className="flex items-center justify-between flex-wrap bg-white dark:bg-slate-700 p-4 rounded-t-xl shadow-md my-3 gap-4">
        <h1 className="text-gray-900 dark:text-white font-bold text-2xl">{t('filtres')}</h1>
        <div className="flex items-center flex-wrap gap-3">
            {/* Поиск по названию */}
            <select
              className="w-full md:w-auto border border-[#E2E8F0] dark:border-gray-500 rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 dark:bg-[#1E293B] dark:text-gray-300"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Barcha turlar</option>
              <option value="independent_study">{t('laboratory_jurnal')}</option>
              <option value="practical">{t('practical_jurnal')}</option>
              <option value="lecture">{t('lecture_jurnal')}</option>

            </select>

            {/* Селект для специальности */}
            <select
              className="w-full md:w-auto border border-[#E2E8F0] dark:border-gray-500 rounded-lg px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-700 dark:bg-[#1E293B] dark:text-gray-300"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">Barcha kurslar</option>
              {levels?.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            

          <Select
            showSearch
            showArrow
            allowClear
            filterOption={false}
            placeholder="Fan bo‘yicha filter"
            value={selectedSubject || undefined}
            onChange={(value) => setSelectedSubject(value)}
            onSearch={(value) => {
              setSearchTerm(value);      // Обновляем текст поиска
              fetchSubjects(value);      // Загружаем результаты с API
            }}
            searchValue={searchTerm}     // Управляем вводом явно
            notFoundContent={loading ? <Spin size="small" /> : "Topilmadi"}
            className="w-full md:w-[250px]"
            style={{
              backgroundColor: selectorBg,
              color: textColor,
              borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
            }}
            dropdownStyle={{
              backgroundColor: selectorBg,
              color: textColor,
            }}
            optionLabelProp="label"
          >
            {subjects?.map((subject) => (
              <Option key={subject.id} value={subject.id} label={subject.name}>
                {subject.name}
              </Option>
            ))}
          </Select>

          <Select
            showSearch
            showArrow
            allowClear
            filterOption={false}
            placeholder="Ustoz bo'yicha filter"
            value={selectedProfessor || undefined}
            onChange={(value) => setSelectedProfessor(value)}
            onSearch={(value) => {
              setSearchTerm1(value);      // Обновляем текст поиска
              fetchProfessors(value);      // Загружаем результаты с API
            }}
            searchValue={searchTerm1}     // Управляем вводом явно
            notFoundContent={loading ? <Spin size="small" /> : "Topilmadi"}
            className="w-full md:w-[250px]"
            style={{
              backgroundColor: selectorBg,
              color: textColor,
              borderColor: theme === "dark" ? "#334155" : "#E2E8F0",
            }}
            dropdownStyle={{
              backgroundColor: selectorBg,
              color: textColor,
            }}
            optionLabelProp="label"
          >
            {professors?.map((p) => (
              <Option key={p.id} value={p.id} label={p.full_name}>
                {p.full_name}
              </Option>
            ))}
          </Select>
      </div>
      </div>


      {/* Если экран маленький — карточки */}
      {isMobile ? (
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4 p-4`}>
          {jurnals.map((jurnal) => (
            <div
              key={jurnal.id}
              className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex gap-3 justify-around items-center"
            >
              {/* Фото и преподаватель */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src={
                    jurnal.professor?.image ||
                    "https://img.freepik.com/premium-psd/contact-icon-illustration-isolated_23-2151903357.jpg"
                  }
                  className="w-20 h-20 rounded-lg object-cover border dark:border-gray-500"
                  alt="professor"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {jurnal.professor?.full_name || "-"}
                </span>
              </div>

              {/* Основная информация */}
              <div className="mt-4 space-y-1 text-center ">
                <h2 className="font-semibold text-base">{jurnal.subject?.name}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {jurnal.group?.map((g) => g.name).join(", ")}
                </p>
                <p className="text-xs text-gray-400">
                  {dayjs(jurnal.created_at).format("YYYY-MM-DD")}
                </p>
                <div className="mt-4 text-center">
                  {jurnal.journal_type === "lecture" ? (
                    <p className="inline-block px-3 py-1 text-xs rounded-full bg-orange-100 dark:bg-orange-400/20 text-orange-700 dark:text-orange-300">
                      {t("lecture_jurnal")}
                    </p>
                  ) : jurnal.journal_type === "practical" ? (
                    <p className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 dark:bg-green-400/20 text-green-700 dark:text-green-300">
                      {t("practical_jurnal")}
                    </p>
                  ) : (
                    <p className="inline-block px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-400/20 text-blue-700 dark:text-blue-300">
                      {t("laboratory_jurnal")}
                    </p>
                  )}
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  <button 
                  onClick={()=>navigate(`/journal/${jurnal.id}/detail`)}
                  className="max-w-[150px] p-3 bg-blue-600 text-white  rounded-lg text-sm transition">
                    {t("korish")}
                  </button>
                  <button className="max-w-[150px] p-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200  rounded-lg text-sm transition">
                    {t("edit")}
                  </button>
                </div>
              </div>

              {/* Тип журнала */}
              

              {/* Кнопки */}
              
            </div>
          ))}
        </div>
      ) : (
        // Если экран большой — таблица
        <table className="min-w-full rounded-xl overflow-hidden shadow-md dark:shadow-gray-700 mt-5 ">
          <thead
            className={`text-center text-sm font-semibold dark:bg-slate-800 border-t dark:border-gray-500 bg-gray-200  dark:text-gray-100`}
            style={{ display: "table", width: "100%", tableLayout: "fixed" }}
          >
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3">{t("fan_guruh")}</th>
              <th className="px-4 py-3">{t("specialities")}</th>
              <th className="px-4 py-3">{t("created_at")}</th>
              <th className="px-4 py-3">{t("professor")}</th>
              <th className="px-4 py-3 text-center">{t("jurnal_type")}</th>
              <th className="px-4 py-3 text-center">{t("imkoniyatlar")}</th>
            </tr>
          </thead>
          <tbody>
          {jurnals.length === 0 ? (
            <h1 className="p-4 text-center w-full">
              {t('no_journals')}
            </h1>) : 
          loading ? (
            <tr style={{ display: "table", tableLayout: "fixed", width: "100%" }}>
              <td colSpan={6} className="py-10 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{t("loading")}...</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  </div>
                </div>
              </td>
            </tr>
          ):(
            jurnals?.map((jurnal, index) => (
              <tr
                key={jurnal.id}
                style={{ display: "table", tableLayout: "fixed", width: "100%" }}
                className={`hover:bg-gray-200 dark:hover:bg-[#1e2e3e] transition`}
              >
                <td className="px-4 py-3 ">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-center">{jurnal.subject?.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {jurnal.group?.map((g) => g.name).join(", ")}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {jurnal?.speciality.name}
                </td>
                <td className="px-4 py-3 text-center">
                  {dayjs(jurnal.created_at).format("YYYY-MM-DD")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2 w-full h-full">
                    
                    <p className="text-sm text-center font-semibold leading-tight w-[100px]">
                      {jurnal.professor?.full_name || "-"}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 text-center font-semibold">
                  <div className="flex items-center justify-center gap-2 w-full h-full">
                    {jurnal.journal_type === 'lecture'
                      ? (<p className="bg-orange-300 dark:bg-orange-500 p-2 shadow rounded-xl w-50 text-sm">{t('lecture_jurnal')}</p>)
                      : jurnal.journal_type === 'practical'
                        ? (<p className="bg-green-300 dark:bg-green-500 p-2 shadow rounded-xl w-50 text-sm">{t('practical_jurnal')}</p>)
                        : (<p className="bg-blue-300 dark:bg-blue-500 p-2 shadow rounded-xl w-50 text-sm">{t('laboratory_jurnal')}</p>)}
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-sm text-white">
                  <div className="flex gap-2 justify-center w-full h-full items-center">
                    <Link className="cursor-pointer w-30 p-2 transition transform hover:-translate-y-1 duration-200 
                            shadow-lg hover:shadow-black/40 
                            bg-blue-700 text-white rounded-md 
                            hover:bg-blue-800 
                            dark:bg-slate-800 dark:text-white dark:hover:bg-blue-500 text-center"
                          
                          onClick={() => {
                            const path = `/journal/${jurnal.id}/detail`;
                            let history = JSON.parse(localStorage.getItem("pageHistory") || "[]");
                                                    
                            history.push({ page_code: "journal_detail", path: path });

                            // 3. Убираем дубликаты по path
                            history = history.filter(
                            (item, index, self) =>
                              index === self.findIndex((h) => h.path === item.path)
                            );

                            // 4. Сохраняем историю и текущую страницу
                            localStorage.setItem("pageHistory", JSON.stringify(history));
                            localStorage.setItem("currPage", "journal_detail");
                            localStorage.setItem("currPath", path);
                                      
                          }}
                          to={`/journal/${jurnal.id}/detail`}>
                      {t('korish')}
                    </Link>
                    <button className="cursor-pointer w-30 p-2 transition transform hover:-translate-y-1 duration-200 
                            shadow-lg hover:shadow-black/40 
                            bg-purple-500 text-white rounded-md 
                            hover:bg-purple-600 
                            dark:bg-slate-800 dark:text-white dark:hover:bg-yellow-600">
                      {t('edit')}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      )}

      {/* Пагинация (одинакова для обоих видов) */}
      <Pagination 
      totalPages={totalPages}
      currentPage={page}
      setCurrentPage={setPage}/>
    </div>
  );
}
