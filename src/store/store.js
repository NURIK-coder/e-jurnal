import { combineReducers , createStore, applyMiddleware} from 'redux'
import { thunk } from 'redux-thunk'
import { userReduser } from './admin/adminUserReduser'
import { jurnalReducer } from './journal/journalReduser'
import { teacherReducer } from './teachers/teacherReducer'
import { filtersReducer } from './filtres/filtresReducer'



const rootReduser = combineReducers(
    {
        userInfo: userReduser,
        jurnalInfo: jurnalReducer,
        teacherInfo: teacherReducer,
        filtresInfo: filtersReducer
    }
)

export const store = createStore(rootReduser, applyMiddleware(thunk))