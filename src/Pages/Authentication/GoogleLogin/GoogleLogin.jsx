import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";

const GoogleLogin = ({ isRegister }) => {
  const { googleLogin } = useAuth();
  const handleGoogleLogIn = () => {
    googleLogin()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p className="text-[#71717A] text-center mb-3">Or</p>

      <button
        type="button"
        onClick={handleGoogleLogIn}
        className="btn bg-[#E9ECF1] rounded-md w-full"
      >
        <FcGoogle size={20} />
        {isRegister ? "Register" : "Login"} with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
