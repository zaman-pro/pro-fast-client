import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation } from "react-router";
import avatar from "../../../assets/image-upload-icon.png";
import useAuth from "../../../hooks/useAuth";
import GoogleLogin from "../GoogleLogin/GoogleLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card w-full max-w-sm">
      <h1 className="text-[42px] font-extrabold mb-1">Create an Account</h1>

      <p>Register with Profast</p>

      <div className="my-5">
        <img src={avatar} alt="" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold">Name</label>
          <input
            {...register("name")}
            type="text"
            className="input border-[#CBD5E1] w-full rounded-md"
            placeholder="Name"
          />
        </div>
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

        <button type="submit" className="btn bg-[#CAEB66] rounded-md">
          Register
        </button>

        <p className="text-sm text-[#71717A]">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/login"
            className="text-[#8FA748] font-semibold"
          >
            Login
          </Link>
        </p>

        <GoogleLogin isRegister={true} />
      </form>
    </div>
  );
};

export default Register;
