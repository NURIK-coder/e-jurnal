const InitialState = {
    jurnals: [],
    jurnal: {},
    journal_topic_list: [],
    journal_mark_list:[],
    journal_subject_list:[],
    journal_subject_detail:{},
    journal_subject_topics:[],
    journal_subjects:[],
    journal_subject: {}
}

export const jurnalReducer = (state=InitialState, action)=>{
    switch(action.type){
        case 'SET_JURNALS':
            return{...state, jurnals: action.payload}
        case 'SET_JURNAL':
            return{...state, jurnal: action.payload}
        case "SET_TOPIC_JOURNAL_LIST":
            return {...state, journal_topic_list: action.payload}
        case "SET_MARKS_JOURNAL_LIST":
            return {...state, journal_mark_list: action.payload}
        case "SET_JOURNAL_SUBJECT_LIST": 
            return {...state, journal_subject_list: action.payload}
        case "SET_JOURNAL_SUBJECT_DETAIL": 
            return {...state, journal_subject_detail: action.payload}
        case "SET_JOURNAL_SUBJECTS": 
            return {...state, journal_subjects: action.payload}
        case "SET_JOURNAL_SUBJECT": 
            return {...state, journal_subject: action.payload}
        case "SET_JOURNAL_SUBJECT_TOPICS": 
            return {...state, journal_subject_topics: action.payload}
        default:
            return state
    }
}