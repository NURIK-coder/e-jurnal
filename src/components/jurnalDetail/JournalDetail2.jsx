import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { jurnalDetail, jurnalMarksList, jurnalTopicList } from "../../store/journal/jurnalActions"
import { useParams } from "react-router-dom"
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export default function JurnalDetail2(){
    const jurnal = useSelector(j=>j.jurnalInfo.jurnal);

    const page = 1

    const journal_topics = useSelector(t=>t.jurnalInfo.journal_topic_list.results)
    const journal_topic_pogination = useSelector(t=>t.jurnalInfo.journal_topic_list)
    const total_page_topics = Math.ceil(journal_topic_pogination?.count / journal_topics?.length)
    console.log(total_page_topics);
    

    const journal_mark_list = useSelector(m=>m.jurnalInfo.journal_mark_list.results)
    const journal_mark_list_pogination = useSelector(m=>m.jurnalInfo.journal_mark_list)
    const journal_mark_list_total_page= Math.ceil(journal_mark_list_pogination?.count / journal_mark_list?.length)


    const {id} = useParams()
    const dispatch = useDispatch()
    const {t} = useTranslation()

    
    useEffect(()=>{
        dispatch(jurnalDetail(id));
        dispatch(jurnalTopicList(id))
        dispatch(jurnalMarksList(id))
    }, [])
    console.log(jurnal);

    const journal_type = jurnal.journal_type === "independent_study" 
        ? t('laboratory_jurnal') 
        : jurnal.journal_type === "lecture" 
        ? t('lecture_jurnal') 
        : jurnal.journal_type === "practice"
        ? t('practical_jurnal')
        : '--'
    const journal_type_style = jurnal.journal_type === "independent_study" 
        ? 'inline-block px-3 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-400/20 text-blue-700 dark:text-blue-300 shadow-md'
        : jurnal.journal_type === "lecture" 
        ? 'inline-block px-3 py-1 text-xs rounded-full bg-orange-100 dark:bg-orange-400/20 text-orange-700 dark:text-orange-300 shadow-md' 
        : jurnal.journal_type === "practice" 
        ? 'inline-block px-3 py-1 text-xs rounded-full bg-green-100 dark:bg-green-400/20 text-green-700 dark:text-green-300 shadow-md'
        : ''

    
    if(!jurnal){
        return (
            <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            </div>
        )
    }
    
    return(
        <div className="bg-white dark:bg-[#1E2A38] transition-all p-5 rounded-xl ">
            
            
            <div className="flex gap-5 items-start">
                <div>
                    <h1 className="text-2xl font-semibold m-2 dark:text-white">{t('journal_detail')}</h1>
                    <div className="bg-gray-50 dark:bg-slate-700 shadow-xl p-3 rounded-xl flex items-center flex-col gap-3 justify-center max-w-[500px] border dark:border-gray-600 h-full">
                        <div className="flex justify-between items-center w-full ">
                            <h2 className="text-2xl font-semibold dark:text-white "> #{jurnal.id || '--'}</h2>
                            <p className={`${journal_type_style}`}>{journal_type || '--'}</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-600 rounded-md shadow p-4 w-full border dark:border-gray-600 hover:-translate-y-1 transition-all">
                            <h4 className="font-semibold">{t('created_by')}: {jurnal?.created_by?.username || '--'}</h4>
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-600 rounded-md shadow p-4 w-full border dark:border-gray-600 hover:-translate-y-1 transition-all">
                            <h4 className="font-semibold ">{t('groups')}: {jurnal?.group?.map((j, i)=>j.name) || '--'}</h4>
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-600 rounded-md shadow p-4 w-full border dark:border-gray-600 hover:-translate-y-1 transition-all">
                            <h4 className="font-semibold ">{t('professor')}: {jurnal?.professor?.full_name || '--'}</h4>
                        </div>
                        <div className="bg-gray-100 dark:bg-slate-600 rounded-md shadow p-4 w-full border dark:border-gray-600 hover:-translate-y-1 transition-all">
                            <h4 className="font-semibold ">{t('jurnal_state')}: {jurnal?.professor?.full_name || '--'}</h4>
                        </div>
                    </div>
                </div>
                
                <div className="h-full w-full max-w-[700px]">
                    <h2 className="text-2xl font-semibold dark:text-white m-2">{t('topics')}</h2>
                    <div className="bg-gray-50 dark:bg-slate-700 shadow-xl border dark:border-gray-600 p-3 rounded-xl flex items-center flex-col gap-3 justify-center w-full overflow-y-auto">
                        <div className="max-h-80 overflow-y-auto w-full">
                            <table className="w-full ">
                                <thead className="bg-gray-200 dark:bg-slate-600 ">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">ID</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">{t('hour_limit')}</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">{t('topics')}</th>
                                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">{t('created_at')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        {journal_topics?.map((topic, index)=>(
                                            <tr className={`${(index + 1) % 2 == 0 ? 'bg-gray-200 dark:bg-slate-700': 'bg-white dark:bg-slate-800'} hover:bg-gray-300 hover:dark:bg-slate-600`}>
                                                <td className="py-4 px-3">{index + 1}</td>
                                                <td className="py-4 px-3 text-center">{topic?.topic.lesson_hour} soat</td>
                                                <td className="py-4 px-3 text-sm ">{topic?.topic.name}</td>
                                                <td className="py-4 px-3 text-sm ">{dayjs(topic.date).format('YYYY-MM-DD HH:mm')}</td>
                                            </tr>
                                        ))}
                                        
                                        
                                    
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            

        </div>
    )
}