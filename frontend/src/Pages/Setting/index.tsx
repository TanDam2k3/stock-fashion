import React, { useState, useRef, ChangeEvent } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    username: "",
    displayname: "",
    password: "",
    retypePassword: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    displayname: "",
    password: "",
    retypePassword: "",
    email: "",
    phone: "",
    address: "",
  });
  const [avatar, setAvatar] = useState<string | null>(
    "https://storage.googleapis.com/a1aa/image/af42f901-0589-43cf-80a0-b4a1ad71c358.jpg"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    }

    // Display name validation
    if (!formData.displayname.trim()) {
      newErrors.displayname = "Display name is required";
      valid = false;
    }

    // Password validation
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
        valid = false;
      } else if (!formData.retypePassword) {
        newErrors.retypePassword = "Please retype your password";
        valid = false;
      } else if (formData.password !== formData.retypePassword) {
        newErrors.retypePassword = "Passwords do not match";
        valid = false;
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Phone validation
    if (formData.phone && !/^[\d\s\-()+]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({
        ...formData,
        avatar,
      });
      // Submit form data to your backend here
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        <form onSubmit={handleSubmit} autoComplete="off" className="w-full">
          {/* Avatar section - top right */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-bold text-slate-900">Settings</h2>
          </div>
          <div className="flex flex-col items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
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
          <div>
              <div className="">
              <label
                  className="block text-sm font-medium text-slate-700 mb-1"
                  htmlFor="role"
                >
                  Role
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <i className="fas fa-user text-sm"></i>
                  </span>
                  <input
                    className={`w-1/6 pl-9 pr-3 py-2.5 text-sm rounded border `}
                    id="role"
                    name="role"
                   disabled
                  />
                </div>
              </div>
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">{errors.username}</p>
                )}
              </div>
            {/* Username and Display Name row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 mb-1"
                  htmlFor="username"
                >
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <i className="fas fa-user text-sm"></i>
                  </span>
                  <input
                    className={`w-full pl-9 pr-3 py-2.5 text-sm rounded border ${
                      errors.username ? "border-red-500" : "border-slate-200"
                    } placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                    id="username"
                    name="username"
                    placeholder="Enter username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500">{errors.username}</p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-slate-700 mb-1"
                  htmlFor="displayname"
                >
                  Display Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <i className="fas fa-pencil-alt text-sm"></i>
                  </span>
                  <input
                    className={`w-full pl-9 pr-3 py-2.5 text-sm rounded border ${
                      errors.displayname ? "border-red-500" : "border-slate-200"
                    } placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                    id="displayname"
                    name="displayname"
                    placeholder="Enter display name"
                    type="text"
                    value={formData.displayname}
                    onChange={handleChange}
                  />
                </div>
                {errors.displayname && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.displayname}
                  </p>
                )}
              </div>
            </div>

            {/* Password and Re-type Password row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <i className="fas fa-lock text-sm"></i>
                  </span>
                  <input
                    className={`w-full pl-9 pr-3 py-2.5 text-sm rounded border ${
                      errors.password ? "border-red-500" : "border-slate-200"
                    } placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                    id="password"
                    name="password"
                    placeholder="Enter new password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
                {formData.password && !errors.password && (
                  <p className="mt-1 text-xs text-green-500">
                    Password strength:{" "}
                    {formData.password.length < 6
                      ? "Weak"
                      : formData.password.length < 10
                      ? "Medium"
                      : "Strong"}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-slate-700 mb-1"
                  htmlFor="retypePassword"
                >
                  Re-type Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <i className="fas fa-lock text-sm"></i>
                  </span>
                  <input
                    className={`w-full pl-9 pr-3 py-2.5 text-sm rounded border ${
                      errors.retypePassword ? "border-red-500" : "border-slate-200"
                    } placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                    id="retypePassword"
                    name="retypePassword"
                    placeholder="Re-enter password"
                    type="password"
                    value={formData.retypePassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.retypePassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.retypePassword}
                  </p>
                )}
              </div>
            </div>

            {/* Email and Phone row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-medium text-slate-700 mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <i className="fas fa-envelope text-sm"></i>
                  </span>
                  <input
                    className={`w-full pl-9 pr-3 py-2.5 text-sm rounded border ${
                      errors.email ? "border-red-500" : "border-slate-200"
                    } placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-slate-700 mb-1"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <i className="fas fa-phone text-sm"></i>
                  </span>
                  <input
                    className={`w-full pl-9 pr-3 py-2.5 text-sm rounded border ${
                      errors.phone ? "border-red-500" : "border-slate-200"
                    } placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Address (full width) */}
            <div>
              <label
                className="block text-sm font-medium text-slate-700 mb-1"
                htmlFor="address"
              >
                Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                  <i className="fas fa-map-marker-alt text-sm"></i>
                </span>
                <input
                  className={`w-full pl-9 pr-3 py-2.5 text-sm rounded border ${
                    errors.address ? "border-red-500" : "border-slate-200"
                  } placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400`}
                  id="address"
                  name="address"
                  placeholder="Enter address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">{errors.address}</p>
              )}
            </div>
          </div>

          {/* Submit button */}
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