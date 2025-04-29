/* eslint-disable @typescript-eslint/no-unused-expressions */



import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import CryptoJS from 'crypto-js';
import { ENCRYPT_KEY } from "../../config";
import { productService, userService } from "../../services";
import { IUserUpdate } from "../../interfaces";
import { toast } from "react-toastify";


type FormValues = {
  username?: string;
  name?: string;
  password?: string;
  retypePassword?: string;
  email?: string;
  phone?: string;
  address?: string;
  file?: File[] | null;
};

const Settings = () => {
  const { user, setUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<FormValues>({
    defaultValues: {
      ...user
    }
  });


  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const onChangeAvatar = useWatch({ control, name: 'file' });


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.password && data.password !== data.retypePassword) {
      alert("Passwords do not match");
      return;
    }
    let file = null;

    if (data?.file) {
      file = await productService.uploadImage(data.file?.[0]);
    }

    const encrypted = data?.password && CryptoJS.AES.encrypt(data?.password, ENCRYPT_KEY).toString();
    const payload = {
      _id: user?._id,
      ...data,
      ...(data?.password && { password: encrypted }),
      ...(data?.file && { avatarId: file?.file?._id }),
    } as unknown as IUserUpdate;

    const updatedUser = await userService.updateUser(payload);
    if (updatedUser.message === 'Updated success') {
      toast.success('Updated success');
      const userUpdated = user?._id && await userService.findDetail(user?._id);
      setUser(userUpdated);
    } else {
      toast.error(updatedUser.message);
    }
  };

  useEffect(() => {
    if (user) {
      console.log('user', user)
      reset(user);
      setAvatar(user.avatar);
    }
  }, [user, reset]);

  useEffect(() => {
    const handleAvatarChange = () => {
      if (!onChangeAvatar || !onChangeAvatar?.[0]) return;
      const file = onChangeAvatar?.[0] ? onChangeAvatar[0] : null;
      if (file) {
        if (!file.type.match("image.*")) {
          alert("Please select an image file");
          return;
        }
        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
      }
    };
    onChangeAvatar && handleAvatarChange();
  }, [onChangeAvatar]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-sm max-w-full p-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-slate-900">Settings</h2>
          </div>

          <div className="flex flex-col items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden">
                <img
                  alt="User avatar"
                  className="w-full h-full object-cover"
                  src={avatar || "https://via.placeholder.com/80"}
                />
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  className="text-xs bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 hover:bg-slate-50"
                  {...register("file")}
                />
                <p className="text-xs text-slate-500 mt-1">
                  JPG, GIF or PNG. Max size 2MB
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="username">
                Username
              </label>
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 3, message: "Must be at least 3 characters" },
                })}
                className={`w-full pl-3 pr-3 py-2.5 text-sm rounded border ${errors.username ? "border-red-500" : "border-slate-200"
                  } focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
              )}
            </div>

            {/* Display Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="displayname">
                Display Name
              </label>
              <input
                {...register("name", { required: "Display name is required" })}
                className={`w-full pl-3 pr-3 py-2.5 text-sm rounded border ${errors.name ? "border-red-500" : "border-slate-200"
                  } focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                placeholder="Enter display name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                className={`w-full pl-3 pr-3 py-2.5 text-sm rounded border ${errors.password ? "border-red-500" : "border-slate-200"
                  } focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="retypePassword">
                Re-type Password
              </label>
              <input
                type="password"
                {...register("retypePassword")}
                className={`w-full pl-3 pr-3 py-2.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                placeholder="Re-enter password"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full pl-3 pr-3 py-2.5 text-sm rounded border ${errors.email ? "border-red-500" : "border-slate-200"
                  } focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone", {
                  pattern: { value: /^[\d\s\-()+]+$/, message: "Invalid phone number" },
                })}
                className={`w-full pl-3 pr-3 py-2.5 text-sm rounded border ${errors.phone ? "border-red-500" : "border-slate-200"
                  } focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="address">
                Address
              </label>
              <input
                {...register("address")}
                className="w-full pl-3 pr-3 py-2.5 text-sm rounded border border-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400"
                placeholder="Enter address"
              />
            </div>
          </div>

          <button
            className="mt-8 w-full bg-slate-900 text-white text-sm font-semibold rounded py-2.5 hover:bg-slate-800 transition"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
