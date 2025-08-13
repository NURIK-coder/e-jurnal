const URL = import.meta.env.VITE_API_URL;


export const currentUser = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(URL + 'account/profile/', {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('journal_token')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return Promise.reject(data);
      }
      
      
      dispatch({ type: 'SET_USER', payload: data });

      return data; 
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(error); // пробросить ошибку в компонент
    }
  };
};