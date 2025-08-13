import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { store } from "../store/store";
import { teacherDetail } from "../store/teachers/teacherActions";
import { jurnalList } from "../store/journal/jurnalActions";

export default function TeacherDetail() {
  const { id } = useParams();
  const teacher = useSelector((state) => state.teacherInfo.teacher);
  const jurnals = useSelector((j) => j.jurnalInfo.jurnals.results || []);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1025);
  
  const { t } = useTranslation();

  const page = 1;

  useEffect(() => {
    store.dispatch(teacherDetail(id));
    store.dispatch(jurnalList(page, String(id)));
  }, [id]);

  return (
    <div className="w-full px-4 ">
      <div className={`
          bg-white dark:bg-[#1E2A38]
          rounded-lg shadow-md p-4 md:p-6 
          flex 
          ${isMobile ? 'flex-row flex-wrap' : 'flex-row'} 
          justify-center gap-5
          text-gray-800 dark:text-gray-100 
          w-full
        `}
        >

        {/* Левая часть (карточка преподавателя) */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="shadow-md p-3 rounded-lg hover:shadow-xl transition-shadow bg-gray-50 dark:bg-[#273947]">
            <div className="flex flex-col gap-4">
              <div className="max-w-80 h-40 mx-auto rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={teacher.image || 'https://img.freepik.com/premium-psd/contact-icon-illustration-isolated_23-2151903357.jpg'}
                  className="object-center max-w-60 w-full  h-60  "
                  alt=""
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-bold text-lg">{teacher.full_name || '--'}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{teacher.specialty || '--'}</p>
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-end">
                  <button className="p-2 rounded-full bg-black text-white w-10 h-10 shadow-md hover:-translate-y-2 transition">
                    <img
                      src="https://img.icons8.com/?size=100&id=78382&format=png&color=ffffff"
                      alt=""
                    />
                  </button>
                  <button className="p-2 rounded-full bg-black text-white w-10 h-10 shadow-md hover:-translate-y-2 transition">
                    <img
                      src="https://img.icons8.com/?size=100&id=60021&format=png&color=ffffff"
                      alt=""
                    />
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 my-4">
                <button className="flex-1 py-2 px-4 bg-black text-white rounded-md hover:bg-white hover:text-black hover:shadow-md transition-colors text-sm">
                  {t("book_a_class")}
                </button>
                <button className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-blue-500 hover:text-white hover:shadow-md transition-colors text-sm">
                  {t("share")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Правая часть — таблица журналов */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h3 className="text-lg font-semibold">{t("jurnal_list")}</h3>

          <div className="overflow-x-auto ">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-[#273947] text-gray-700 dark:text-gray-200 text-sm">
                  <th className="p-3">{t("subject")}</th>
                  <th className="p-3">{t("jurnal_type")}</th>
                  <th className="p-3">{t("jurnal_status")}</th>
                  <th className="p-3">{t("min_marks")}</th>
                  <th className="p-3">{t("groups")}</th>
                </tr>
              </thead>
              <tbody>
                {jurnals.length > 0 ? (
                  jurnals.map((j, index) => (
                    <tr
                      key={j.id}
                      className={`text-sm ${
                        index % 2 === 0
                          ? "bg-gray-50 dark:bg-[#1f2d3a]"
                          : "bg-white dark:bg-[#223445]"
                      }`}
                    >
                      <td className="p-3">{j.subject?.name}</td>
                      <td className="p-3 capitalize">{j.journal_type}</td>
                      <td className="p-3">{j.journal_status}</td>
                      <td className="p-3">{j.min_required_marks}</td>
                      <td className="p-3">
                        {j.group.map((g) => g.name).join(" | ")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500 dark:text-gray-400">
                      {t("no_journals")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
