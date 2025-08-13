import React from "react";
import { Navigate } from "react-router-dom";

const SecurityPage: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  console.log(sessionStorage.getItem("accessToken"), "userrokelog");

  if (!sessionStorage.getItem("accessToken")) return <Navigate to={"/"} />;
  return children;
};

export default SecurityPage;
