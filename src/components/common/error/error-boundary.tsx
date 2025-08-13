import { useDispatch } from "react-redux";
import { setGlobalError } from "../../../store/slices/errorHandleSlice";

/**
 * ErrorBoundary component, for handling all errors
 * @returns {null}
 * @constructor
 * @return {JSX.Element}
 *
 * */

const ErrorBoundary = (): null => {
  const dispatch = useDispatch();

  // check all errors
  window.addEventListener("offline", () => {
    dispatch(
      setGlobalError({
        error: "Tarmoqda hatolik",
        type: "network",
      })
    );
  });

  window.addEventListener("online", () => {
    dispatch(
      setGlobalError({
        error: null,
      })
    );
  });

  window.addEventListener("error", (event) => {
    dispatch(
      setGlobalError({
        error: event.error.message,
      })
    );
  });

  window.addEventListener("unhandledrejection", (event) => {
    dispatch(
      setGlobalError({
        error: event.reason.message,
      })
    );
  });

  window.addEventListener("rejectionhandled", () => {
    dispatch(
      setGlobalError({
        error: null,
      })
    );
  });

  if (process.env.NODE_ENV === "production") {
    console.clear();
    console.log(
      "%c🚀 Welcome to the console! Чего вам не хватает в консоли?",
      "background: #1e1e1e; color: #fff; padding: 10px; font-size: 20px; font-weight: bold; border-radius: 10px;"
    );
  }

  return null;
};

export default ErrorBoundary;
