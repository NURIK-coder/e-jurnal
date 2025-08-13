const { VITE_APP_BASE_URL } = import.meta.env;

export const refreshToken = async () => {
  const baseURL = VITE_APP_BASE_URL;

  if (sessionStorage.getItem("refreshToken")) {
    const res = await fetch(`${baseURL}/account/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: sessionStorage.getItem("refreshToken"),
      }),
    });

    const resData = await res.json();

    if (res.status === 401) {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      // window.location.reload();
    } else {
      sessionStorage.setItem("accessToken", resData.access);
    }
  } else {
    // window.location.reload();
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
  }
};
