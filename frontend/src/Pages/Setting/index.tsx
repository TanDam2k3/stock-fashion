import React, { useContext, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

type FormValues = {
  username: string;
  displayname: string;
  password?: string;
  retypePassword?: string;
  email: string;
  phone?: string;
  address?: string;
};

const Settings = () => {
    const { user } = useContext(AuthContext);
    console.log("user",user)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      displayname: "",
      email: "",
      phone: "",
      address: "",
    },
  });
  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        displayname: user.name || "",
        password:  "",
        retypePassword:  "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      setAvatar(user.avatar || "https://via.placeholder.com/80");
    }
  }, [user, reset]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = React.useState<string | null>(
    "https://storage.googleapis.com/a1aa/image/af42f901-0589-43cf-80a0-b4a1ad71c358.jpg"
  );

  const passwordValue = watch("password");

  const onSubmit = (data: FormValues) => {
    // Validate password match manually (vì cần so sánh 2 field)
    if (data.password && data.password !== data.retypePassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({
      ...data,
      avatar,
    });

    // Reset form nếu cần
    // reset();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match("image.*")) {
        alert("Please select an image file");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-sm max-w-full p-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-slate-900">Settings</h2>
          </div>

          {/* Avatar section */}
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
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="text-xs bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 hover:bg-slate-50"
                >
                  Change Avatar
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-xs text-slate-500 mt-1">
                  JPG, GIF or PNG. Max size 2MB
                </p>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="username">
                Username
              </label>
              <input
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 3, message: "Must be at least 3 characters" },
                })}
                className={`w-full pl-3 pr-3 py-2.5 text-sm rounded border ${
                  errors.username ? "border-red-500" : "border-slate-200"
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
                {...register("displayname", { required: "Display name is required" })}
                className={`w-full pl-3 pr-3 py-2.5 text-sm rounded border ${
                  errors.displayname ? "border-red-500" : "border-slate-200"
                } focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                placeholder="Enter display name"
              />
              {errors.displayname && (
                <p className="mt-1 text-xs text-red-500">{errors.displayname.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                className={`w-full pl-3 pr-3 py-2.5 text-sm rounded border ${
                  errors.password ? "border-red-500" : "border-slate-200"
                } focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                placeholder="Enter new password"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
              {passwordValue && !errors.password && (
                <p className="mt-1 text-xs text-green-500">
                  Password strength:{" "}
                  {passwordValue.length < 6
                    ? "Weak"
                    : passwordValue.length < 10
                    ? "Medium"
                    : "Strong"}
                </p>
              )}
            </div>

            {/* Retype Password */}
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
                className={`w-full pl-3 pr-3 py-2.5 text-sm rounded border ${
                  errors.email ? "border-red-500" : "border-slate-200"
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
                className={`w-full pl-3 pr-3 py-2.5 text-sm rounded border ${
                  errors.phone ? "border-red-500" : "border-slate-200"
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
