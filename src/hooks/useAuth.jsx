import React, { use } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";

const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;
