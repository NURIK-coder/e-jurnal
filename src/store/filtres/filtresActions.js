const URL = import.meta.env.VITE_API_URL;

export const fetchAllFilters = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("journal_token");

    try {
      const [
        specialities,
        professors,
        levels,
        subjects,
        departments,
        education_years
      ] = await Promise.all([
        fetchData({ url: `${URL}base/speciality/list/`, token }),
        fetchData({ url: `${URL}base/professor/list/`, token }),
        fetchData({ url: `${URL}base/level/list/`, token }),
        fetchData({ url: `${URL}base/subject/list/`, token }),
        fetchData({ url: `${URL}base/department/list/`, token }),
        fetchData({ url: `${URL}journal/education-year/list/`, token }),
      ]);

      dispatch({ type: "SET_SPECIALITIES", payload: specialities });
      dispatch({ type: "SET_PROFFESORS", payload: professors });
      dispatch({ type: "SET_LEVELS", payload: levels });
      dispatch({ type: "SET_SUBJECTS", payload: subjects });
      dispatch({ type: "SET_DEPARTMENTS", payload: departments });
      dispatch({ type: "SET_EDUCATION_YEAR", payload: education_years });

    } catch (error) {
      console.error("Ошибка при загрузке фильтров:", error);
      return Promise.reject(error);
    }
  };
};


export async function fetchData({ url, method = "GET", token = null }) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Сервер вернул не JSON");
    }
  } catch (err) {
    console.error("API error:", err);
    throw err; // пробросить дальше, чтобы catch в thunk поймал
  }
}
