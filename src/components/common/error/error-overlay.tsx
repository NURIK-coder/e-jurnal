import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiErrorAlt } from "react-icons/bi";
import { MdNetworkCheck } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { setGlobalError } from "../../../store/slices/errorHandleSlice";
import styles from "./error-overlay.module.scss";

interface Props {
  errorCode?: number;
  errorMessage?: string;
  type?: "network" | "server";
}

/**
 *
 * ErrorOverlay component, for show logs and errors
 * @description This component is responsible for rendering the ErrorOverlay
 * @returns {JSX.Element}
 *
 */

const ErrorOverlay: FC<Props> = () => {
  const { error, code, type } = useAppSelector((state) => state.error);
  const dispatch = useDispatch();
  const closeError = () => {
    dispatch(
      setGlobalError({
        error: null,
        code: null,
        type: null,
      })
    );
  };

  if (error || code || type) {
    return (
      <div className={styles.errorOverlay}>
        <div className={styles.errorContent}>
          <i className={styles.icon}>
            {type === "network" ? <MdNetworkCheck /> : <BiErrorAlt />}
          </i>
          <span className={styles.errorClose} onClick={closeError}>
            <AiOutlineClose />
          </span>
          {code ? <h1>{code}</h1> : null}
          <h2>
            {error ||
              "Nomalum hatolik" ||
              (type === "network"
                ? "Tarmoqda hatolik"
                : type === "server"
                ? "Serverda hatolik"
                : "Nomalum hatolik")}
          </h2>
          <b className={styles.reload} onClick={() => window.location.reload()}>
            Saytni yangilab yuboring
          </b>
        </div>
      </div>
    );
  }

  return null;
};

export default ErrorOverlay;
