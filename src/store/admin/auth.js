const URL = import.meta.env.VITE_API_URL;

export const userLogin = (userdata) => {
  return async (dispatch) => {
    try {
      const response = await fetch(URL + 'account/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      });

      const data = await response.json();

      if (!response.ok) {
        // Вернуть ошибку с backend-сообщением
        return Promise.reject(data);
      }
      
      // Сохраняем токен и диспатчим
      localStorage.setItem('journal_token', data.access);
      dispatch({ type: 'SET_USER', payload: data });

      return data; // успешный результат
    } catch (error) {
      console.error('Login error:', error);
      return Promise.reject(error); // пробросить ошибку в компонент
    }
  };
};
