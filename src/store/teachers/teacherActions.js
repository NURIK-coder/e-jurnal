const URL = import.meta.env.VITE_API_URL;

export const teacherList = (page=1, name='') => {
  return async (dispatch) => {
    try {
      const response = await fetch(URL + `base/professor/list/?page=${page}&search=${name}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('journal_token')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return Promise.reject(data);
      }
      
      
      dispatch({ type: 'SET_TEACHERS', payload: data });

      return data; 
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(error); // пробросить ошибку в компонент
    }
  };
};

export const teacherDetail = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(URL + `base/professor/detail/${id}/`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('journal_token')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return Promise.reject(data);
      }
      
      
      dispatch({ type: 'SET_TEACHER', payload: data });

      return data; 
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(error); // пробросить ошибку в компонент
    }
  };
};
