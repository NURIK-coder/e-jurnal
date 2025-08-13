const InitialState = {
    specialities: [],
    professors: [],
    levels:[],
    subjects: [],
    groups: [],
    departments:[],
    education_years: []
}

export const filtersReducer = (state=InitialState, action)=>{
    switch(action.type){
        case 'SET_SPECIALITIES':
            return{...state, specialities: action.payload}
        case 'SET_PROFFESORS':
            return{...state, professors: action.payload}
        case 'SET_LEVELS':
            return{...state, levels: action.payload}
        case 'SET_SUBJECTS':
            return{...state, subjects: action.payload}
        case 'SET_GROUPS':
            return{...state, groups: action.payload}
        case 'SET_DEPARTMENTS':
            return{...state, departments: action.payload}
        case "SET_EDUCATION_YEAR":
            return {...state, education_years: action.payload}
        default:
            return state
    }
}