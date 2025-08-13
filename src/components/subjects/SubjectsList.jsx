import { use, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { jurnalSubjectsList, jurnalSubjectsList2 } from "../../store/journal/jurnalActions"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"
import { fetchAllFilters } from "../../store/filtres/filtresActions"
import SubjectCreateModal from "./SubjectCreateModal"
import { Pagination } from "../pogintion"
const URL = import.meta.env.VITE_API_URL;
export default function SubjectList(){


    const subjects = useSelector(sub=>sub.jurnalInfo.journal_subjects.results)
    const subjects_pagination = useSelector(sub=>sub.jurnalInfo.journal_subjects)
    const totalPages = Math.ceil(subjects_pagination?.count / subjects?.length)

    const departments = useSelector(f=>f.filtresInfo.departments.results)
    
    
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()
    const {t}= useTranslation()
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('')

    useEffect(()=>{
        setLoading(true)        
        dispatch(jurnalSubjectsList2(currentPage))
        setLoading(false)
    }, [])

    useEffect(()=>{
        dispatch(fetchAllFilters())
    }, [])
    async function handleCreate(data){
        try{
            const resonse = await fetch(URL + 'journal/subject/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('journal_token')
                },
                body: JSON.stringify(data)
            })
            const result = await resonse.json()
            if(!resonse.ok){
                setError(result)
            }
            alert('Fan muaffaqoyatli yaratildi! ')
            window.location.reload()
        } catch(error){
            setError(error.message) 
        }
        
    }
    return(
        <div className="p-2 unded-xl dark:bg-slate-800 rounded-xl bg-white shadow-md border dark:border-gray-600 min-h-screen">
            <div className="dark:bg-slate-600 bg-gray-200 p-4 mb-5 rounded-t-xl dark:text-white flex items-center justify-between ">
                <h1 className="font-bold text-xl">{t('filtres')}</h1>
                <input type="text" />
                <button
                    onClick={()=>setIsModalOpen(true)} 
                    className="p-2 rounded bg-green-500 hover:bg-green-700 transition-all cursor-pointer ">+ {t('add_subject')}</button>
            </div>
            <div className="max-h-[600px] overflow-y-auto shadow-md rounded-xl border dark:border-none">
                <table className="rounded-lg overflow-hidden border-separate border-spacing-0 w-full text-center">
                    <thead className="dark:bg-slate-600 bg-gray-200 w-full ">
                        <tr>
                            <th className="font-semibold  dark:text-gray-100 px-4 py-3">ID</th>
                            <th className="font-semibold  dark:text-gray-100 px-4 py-3">{t('name')}</th>
                            <th className="font-semibold  dark:text-gray-100 px-4 py-3">{t('created_at')}</th>
                            <th className="font-semibold  dark:text-gray-100 px-4 py-3">{t('created_by')}</th>
                            <th className="font-semibold  dark:text-gray-100 px-4 py-3">{t('education_type')}</th>
                            <th className="font-semibold  dark:text-gray-100 px-4 py-3">{t('speciality')}</th>
                            
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-700 divide-y divide-gray-200 dark:divide-gray-600 ">

                        {loading || subjects?.length === 0 ? (
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
                        ):(
                            subjects?.map((subject, index) => (
                                <tr className={`${(index + 1) % 2 == 0 ? 'bg-gray-300' : 'bg-white'} bg-white  dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-gray-200 transition-all`}>
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{subject.name}</td>
                                    <td className="px-4 py-3">{dayjs(subject.created_at).format('YYYY-MM-DD hh:mm')}</td>
                                    <td className="px-4 py-3">{subject.created_by}</td>
                                    <td className="px-4 py-3">{subject.educationType?.name}</td>
                                    <td className="px-4 py-3">{subject.department}</td>
                                    
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                
            </div>
            <Pagination 
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                />
            <SubjectCreateModal
                isOpen={isModalOpen}
                onClose={()=>setIsModalOpen(false)}
                onSubmit={handleCreate}
                error={error}
                departments={departments}
            />
            
        </div>  
    )
}