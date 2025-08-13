import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { jurnalSubjects, jurnalSubjectTopics } from "../../store/journal/jurnalActions";
import { t } from "i18next";

export default function SubjectTopicsDetail() {
    const journal_subject_detail = useSelector(t => t.jurnalInfo.journal_subject_detail);
    const journal_subject_topics = useSelector(t => t.jurnalInfo.journal_subject_topics?.results);
    const journal_subject_topics_count = useSelector(t => t.jurnalInfo.journal_subject_topics);

    const { id } = useParams();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const topicsPerPage = journal_subject_topics?.length || 1;
    const totalPages = Math.ceil(journal_subject_topics_count?.count / topicsPerPage);

    useEffect(() => {
        setLoading(true);
        dispatch(jurnalSubjects(id));
        dispatch(jurnalSubjectTopics(id, page)).finally(() => setLoading(false));
    }, [dispatch, id, page]);

    return (
        <div className="p-4 rounded-xl bg-white shadow-md">
            <h1 className="text-xl font-bold mb-4">{t("topicsList")}</h1>

            {loading ? (
                <div className="flex flex-col gap-2 justify-center items-center  space-x-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    </div>
                                                
                    <p className="text-gray-300">{t('loading')}...</p>
                </div>
            ) : (!journal_subject_topics) ? (
                <div>
                    <p className="text-gray-300">{t('noTopics')}</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border-b text-left">{t("№")}</th>
                                <th className="px-4 py-2 border-b text-left">{t("topicName")}</th>
                                <th className="px-4 py-2 border-b text-left">{t("date")}</th>
                                <th className="px-4 py-2 border-b text-left">{t("description")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {journal_subject_topics?.map((topic, index) => (
                                <tr
                                    key={topic.id}
                                    className={`${(index + 1) % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                >
                                    <td className="px-4 py-2 border-b">{(page - 1) * topicsPerPage + index + 1}</td>
                                    <td className="px-4 py-2 border-b">{topic.name}</td>
                                    <td className="px-4 py-2 border-b">
                                        {new Date(topic.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 border-b">{topic.description || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Пагинация */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(prev => prev - 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        {t("prev")}
                    </button>
                    <span>{page} / {totalPages}</span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(prev => prev + 1)}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        {t("next")}
                    </button>
                </div>
            )}
        </div>
    );
}
