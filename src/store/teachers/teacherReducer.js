const InitialState = {
    teachers: [],
    teacher: {}
}

export const teacherReducer = (state=InitialState, action)=>{
    switch(action.type){
        case 'SET_TEACHERS':
            return{...state, teachers: action.payload}
        case 'SET_TEACHER':
            return{...state, teacher: action.payload}
        default:
            return state
    }
}