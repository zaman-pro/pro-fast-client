import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { user, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(`${location.state ? location.state : "/"}`);
    }
  }, [user, navigate, location.state]);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    const toastId = "loginToast";
    toast.dismiss();

    signIn(data.email, data.password)
      .then(() => {
        toast.success("Logged in successfully", { id: toastId });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login failed. Please try again.", { id: toastId });
      });
    console.log(data);
  };

  return (
    <div className="card w-full max-w-sm">
      <h1 className="text-5xl font-extrabold mb-1">Welcome Back</h1>
      <p className="mb-5">Login with Profast</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold">Email</label>
          <input
            {...register("email")}
            type="email"
            className="input border-[#CBD5E1] w-full rounded-md"
            placeholder="Email"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-semibold">Password</label>
          <div className="relative">
            <input
              {...register("password", { required: true, minLength: 6 })}
              type={showPassword ? "text" : "password"}
              className="input border-[#CBD5E1] w-full pr-10 rounded-md"
              placeholder="Password"
            />

            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password should be 6 characters or longer
              </p>
            )}

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <Link
          to="/forgotPassword"
          state={location.state}
          className="link link-hover text-sm text-[#71717A] underline"
        >
          Forgot password?
        </Link>

        <button type="submit" className="btn bg-[#CAEB66] rounded-md">
          Login
        </button>

        <p className="text-sm text-[#71717A]">
          Don't have an account?{" "}
          <Link
            state={location.state}
            to="/register"
            className="text-[#8FA748] font-semibold"
          >
            Register
          </Link>
        </p>

        <GoogleLogin />
      </form>
    </div>
  );
};

export default Login;
