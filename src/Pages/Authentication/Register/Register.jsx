import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useLocation } from "react-router";
import avatar from "../../../assets/image-upload-icon.png";
import useAuth from "../../../hooks/useAuth";
import GoogleLogin from "../GoogleLogin/GoogleLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(avatar);
  const [profilePic, setProfilePic] = useState("");

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`;
      const res = await axios.post(imageUploadUrl, formData);
      const url = res.data.data.url;

      setProfilePic(url);
      setAvatarPreview(url);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  const onSubmit = (data) => {
    console.log({
      ...data,
      profilePic,
    });

    createUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        // Here you would typically upload the image to your server
        // and update the user profile with the image URL
        const profileInfo = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(profileInfo)
          .then(() => {
            console.log("profile name and pic updated");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card w-full max-w-sm">
      <h1 className="text-[42px] font-extrabold mb-1">Create an Account</h1>

      <p>Register with Profast</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        {/* image upload */}
        <div>
          <div className="mt-5 mb-2 cursor-pointer">
            <label htmlFor="avatar-upload">
              <img
                src={avatarPreview}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover cursor-pointer"
              />
              {/* <p className="text-center text-sm mt-1 text-blue-500">
                Click to upload photo
              </p> */}
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="input border-[#CBD5E1] w-full rounded-md"
            placeholder="Name"
          />
        </div>

        {/* email */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input border-[#CBD5E1] w-full rounded-md"
            placeholder="Email"
          />
        </div>

        {/* password */}
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

            {/* show password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* submit button */}
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

        {/* google login */}
        <GoogleLogin isRegister={true} />
      </form>
    </div>
  );
};

export default Register;
