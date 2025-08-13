import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { jurnalSubjectsList } from "../../store/journal/jurnalActions"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import JurnalSubjectCreateModal from "./jurnalSubjectCreateModal"
import { fetchAllFilters } from "../../store/filtres/filtresActions"
const URL = import.meta.env.VITE_API_URL;
export default function JurnalSubjectList(){
    const subjects = useSelector(sub=>sub.jurnalInfo.journal_subject_list.results)
    const subjects_pagination = useSelector(sub=>sub.jurnalInfo.journal_subject_list)
    const totalPages = Math.ceil(subjects_pagination?.count / subjects?.length)
    const filter = useSelector(s=>s.filtresInfo)
    console.log(filter);
    
    const page = 1 

    const dispatch = useDispatch()
    const {t}= useTranslation()
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [error, setError] = useState('')
    useEffect(()=>{
        setLoading(true)        
        dispatch(jurnalSubjectsList(page))
        setLoading(false)
    }, [])
    useEffect(()=>{
        dispatch(fetchAllFilters())
    }, [])

    async function handleCreate(data){
        try{
            const response = await fetch(URL + 'journal/journalsubject/create/', {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('journal_token')
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()
            if(!response.ok){
                setError(result)
            }
            dispatch(jurnalSubjectsList())
        } catch (error){
            setError(error.message)
        }
    }

    return(
        <div className=" rounded-xl dark:bg-slate-700 bg-white shadow-md border dark:border-gray-600">
            <div className="bg-white dark:bg-slate-700  rounded-t-xl p-3 m-2 shadow-md border dark:border-gray-500 flex justify-between">
                <h1 className="font-bold text-xl">{t('filtres')}</h1>
                <button onClick={()=>setIsModalOpen(true)} className="p-2 rounded-md bg-green-400 hover:bg-green-500 ">+ {t('add_jurnal_subject')}</button>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
                <table className="rounded-lg overflow-hidden border-separate border-spacing-0 w-full text-center">
                    <thead className="dark:bg-slate-500 bg-gray-200 w-full">
                        <tr>
                            <th className="text-sm font-thin  dark:text-gray-100 px-4 py-1">ID</th>
                            <th className="text-sm font-thin  dark:text-gray-100 px-4 py-1">{t('name')}</th>
                            <th className="text-sm font-thin  dark:text-gray-100 px-4 py-1">{t('created_at')}</th>
                            <th className="text-sm font-thin  dark:text-gray-100 px-4 py-1">{t('created_by')}</th>
                            <th className="text-sm font-thin  dark:text-gray-100 px-4 py-1">{t('level')}</th>
                            <th className="text-sm font-thin  dark:text-gray-100 px-4 py-1">{t('speciality')}</th>
                            <th className="text-sm font-thin  dark:text-gray-100 px-4 py-1">{t('pass_score')}</th>
                            <th className="text-sm font-thin  dark:text-gray-100 px-4 py-1">{t('imkoniyatlar')}</th>
                            
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800">

                        {loading ? (
                                <tr>
                                    <td colSpan={6} className="py-10 text-center">
                                        <div className="flex flex-col gap-2 justify-center items-center  space-x-2">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                            </div>
                                                
                                            <p className="text-gray-300">{t('loading')}...</p>
                                        </div>
                                    </td>
                                </tr>
                        ): (
                            subjects?.map((subject, index) => (
                                <tr className={`${(index+1) % 2 == 0 ? 'bg-gray-300' : 'bg-white'} bg-white dark:bg-slate-800`}>
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{subject.subject}</td>
                                    <td className="px-4 py-3">{dayjs(subject.created_at).format('YYYY-MM-DD hh:mm')}</td>
                                    <td className="px-4 py-3">{subject.created_by}</td>
                                    <td className="px-4 py-3">{subject.level}</td>
                                    <td className="px-4 py-3">{subject.speciality}</td>
                                    <td className="px-4 py-3">{subject.pass_topics_number}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-center items-center gap-3 w-full">
                                            <Link 
                                                onClick={() => {
                                                    const path = `/jurnal/subject/detail/${subject.id}`;
                                                    let history = JSON.parse(localStorage.getItem("pageHistory") || "[]");
                                                                            
                                                    history.push({ page_code: "jurnal_subject_detail", path: path });

                                                    // 3. Убираем дубликаты по path
                                                    history = history.filter(
                                                    (item, index, self) =>
                                                    index === self.findIndex((h) => h.path === item.path)
                                                    );

                                                    // 4. Сохраняем историю и текущую страницу
                                                    localStorage.setItem("pageHistory", JSON.stringify(history));
                                                    localStorage.setItem("currPage", "jurnal_subject_detail");
                                                    localStorage.setItem("currPath", path);
                                                            
                                                }}
                                                to={`/jurnal/subject/detail/${subject.id}`}
                                                className="p-2 rounded-md bg-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:bg-slate-500 transition-all cursor-pointer shadow-md"
                                            >
                                                {t('see_more')}
                                            </Link>
                                            <button 
                                                className="p-2 rounded-md bg-gray-300 hover:bg-yellow-500 hover:text-white dark:hover:bg-yellow-500 dark:bg-slate-500 transition-all cursor-pointer shadow-md"
                                            >
                                                {t('edit')}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <JurnalSubjectCreateModal
                isOpen={isModalOpen}
                onClose={()=>setIsModalOpen(false)}
                onSubmit={handleCreate}
                error={error}
                filter={filter}
                clearError={()=>setError('')}
            />
        </div>  
    )
}