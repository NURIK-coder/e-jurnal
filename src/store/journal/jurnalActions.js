const URL = import.meta.env.VITE_API_URL;

export const jurnalList = (page=1, professor_id='', kurs_id='', sub_id='', jurnal_type='') => {
  return async (dispatch) => {
    try {
      const response = await fetch(URL + `journal/list/?page=${page}&professor=${professor_id}&level=${kurs_id}&subject=${sub_id}&journal_type=${jurnal_type}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('journal_token')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return Promise.reject(data);
      }
      
      
      dispatch({ type: 'SET_JURNALS', payload: data });

      return data; 
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(error); // пробросить ошибку в компонент
    }
  };
};


export const jurnalDetail = (id='') => {
  return async (dispatch) => {
    try {
      const response = await fetch(URL + `journal/detail/${id}/`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('journal_token')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return Promise.reject(data);
      }
      
      
      dispatch({ type: 'SET_JURNAL', payload: data });

      return data; 
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(error); // пробросить ошибку в компонент
    }
  };
};


export const jurnalTopicList = (journal_id='', page=1) => {
  return async (dispatch) =>{
    try{
      const response = await fetch(URL + `journal/topic/journal/list/?journal_id=${journal_id}&page=${page}`, {
        method:'GET',
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('journal_token')}`,

        }
      })

      const data = await response.json()
      if (!response.ok){
        return Promise.reject(data)
      }
      dispatch({type: 'SET_TOPIC_JOURNAL_LIST', payload: data})
    }
    catch(error){
      return Promise.reject(error)
    }
  }
}


export const jurnalMarksList = (journal_id='', page=1) => {
  return async (dispatch) =>{
    try{
      const response = await fetch(URL + `journal/${journal_id}/student/list/?journal_id=${journal_id}&page=${page}`, {
        method:'GET',
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('journal_token')}`,

        }
      })

      const data = await response.json()
      if (!response.ok){
        return Promise.reject(data)
      }
      dispatch({type: 'SET_MARKS_JOURNAL_LIST', payload: data})
    }
    catch(error){
      return Promise.reject(error)
    }
  }
}


export const jurnalSubjectsList = (page=1) => {
  return async (dispatch) =>{
    try{
      const response = await fetch(URL + `journal/journalsubject/list/?page=${page}`, {
        method:'GET',
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('journal_token')}`,

        }
      })

      const data = await response.json()
      if (!response.ok){
        return Promise.reject(data)
      }
      dispatch({type: 'SET_JOURNAL_SUBJECT_LIST', payload: data})
    }
    catch(error){
      return Promise.reject(error)
    }
  }
}

export const jurnalSubjectsList2 = (page=1) => {
  return async (dispatch) =>{
    try{
      const response = await fetch(URL + `journal/subject/list/?page=${page}`, {
        method:'GET',
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('journal_token')}`,

        }
      })

      const data = await response.json()
      if (!response.ok){
        return Promise.reject(data)
      }
      dispatch({type: 'SET_JOURNAL_SUBJECTS', payload: data})
    }
    catch(error){
      return Promise.reject(error)
    }
  }
}

export const jurnalSubjects= (id='') => {
  return async (dispatch) =>{
    try{
      const response = await fetch(URL + `journal/journalsubject/detail/${id}/`, {
        method:'GET',
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('journal_token')}`,

        }
      })

      const data = await response.json()
      if (!response.ok){
        return Promise.reject(data)
      }
      dispatch({type: 'SET_JOURNAL_SUBJECTS', payload: data})
    }
    catch(error){
      return Promise.reject(error)
    }
  }
}

export const jurnalSubjectTopics= (id='', page=1) => {
  return async (dispatch) =>{
    try{
      const response = await fetch(URL + `journal/topic/list/?subject_id=${id}&page=${page}`, {
        method:'GET',
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('journal_token')}`,

        }
      })

      const data = await response.json()
      if (!response.ok){
        return Promise.reject(data)
      }
      dispatch({type: 'SET_JOURNAL_SUBJECT_TOPICS', payload: data})
    }
    catch(error){
      return Promise.reject(error)
    }
  }
}