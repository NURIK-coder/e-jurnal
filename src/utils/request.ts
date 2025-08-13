import { toast } from "react-toastify";
import { refreshToken } from "./refreshToken";
const { VITE_APP_BASE_URL } = import.meta.env;
// const data = await thunkAPI.dispatch(httpRequest({})); example to use

type T = {
  url: string;
  method?: string;
  body?: object;
  token?: boolean;
  noJson?: boolean;
  isLogin?: boolean;
  haveImg?: boolean;
};

export const httpRequest = ({
  url,
  method,
  body,
  token = true,
  noJson,
  isLogin,
  haveImg,
}: T) => {
  return async (dispatch: any) => {
    const baseURL = VITE_APP_BASE_URL;
    const headers = {
      Authorization: sessionStorage.getItem("accessToken")
        ? `Bearer ${sessionStorage.getItem("accessToken")}`
        : "",
      "Content-Type": "application/json",
    };

    try {
      const res = await fetch(`${baseURL}/${url}`, {
        method: method || "GET",
        headers: haveImg
          ? {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            }
          : token
          ? headers
          : {
              "Content-Type": "application/json",
            },
        body: (haveImg ? body : JSON.stringify(body))! as BodyInit | string,
      });
      if (res.status === 500) {
        toast.error("Server Error");
      }
      if (res.status === 401 && !isLogin) refreshToken();
      if (res.status === 400) toast.error(res.statusText);
      if (noJson) return res;
      else return await res.json();
    } catch (error) {
      // dispatch(openSnackbar({ status: "error", message: "Errorlar" }));
    }
  };
};
