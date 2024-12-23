import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import logo from "../assets/images/Logo.png";
import illustration from "../assets/images/Illustrasi Login.png";
import {
  UserIcon,
  AtSymbolIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: { error: false, message: "" },
    firstName: { error: false, message: "" },
    lastName: { error: false, message: "" },
    password: { error: false, message: "" },
    confirmPassword: { error: false, message: "" },
  });

  const [notification, setNotification] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateForm = () => {
    const errors = {
      email: { error: !formData.email, message: "Email tidak boleh kosong" },
      firstName: {
        error: !formData.firstName,
        message: "Nama depan tidak boleh kosong",
      },
      lastName: {
        error: !formData.lastName,
        message: "Nama belakang tidak boleh kosong",
      },
      password: {
        error: !formData.password,
        message: "Password tidak boleh kosong",
      },
      confirmPassword: {
        error:
          !formData.confirmPassword ||
          formData.password !== formData.confirmPassword,
        message:
          formData.password !== formData.confirmPassword
            ? "Password tidak cocok"
            : "Konfirmasi password tidak boleh kosong",
      },
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error.error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: { error: false, message: "" } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API response
      const isSuccess = Math.random() > 0.5;

      if (isSuccess) {
        setNotification({
          type: "success",
          message: "Registrasi berhasil! Selamat datang.",
        });
      } else {
        setNotification({
          type: "error",
          message: "Registrasi gagal. Silakan coba lagi.",
        });
      }
    }
  };

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center w-full lg:w-[45%] px-6 py-8">
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="Logo" className="size-8" />
          <span className="text-2xl font-semibold text-black/85">
            SIMS PPOB
          </span>
        </div>
        <h2 className="text-3xl font-semibold text-center mb-12 w-full md:w-1/2 text-black/85">
          Lengkapi data untuk membuat akun
        </h2>
        {notification.type && (
          <div
            className={`text-center py-2 px-4 rounded-md mb-4 ${
              notification.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {notification.message}
          </div>
        )}
        <form className="w-full max-w-md text-sm" onSubmit={handleSubmit}>
          <InputField
            type="email"
            name="email"
            placeholder="Masukan email anda"
            leftIcon={<AtSymbolIcon className="h-4 w-4" />}
            value={formData.email}
            onChange={handleChange}
            className={formErrors.email.error ? "border-red-500" : ""}
            isError={formErrors.email.error}
            errorMessage={formErrors.email.message}
          />
          <InputField
            type="text"
            name="firstName"
            placeholder="Nama depan"
            leftIcon={<UserIcon className="h-4 w-4" />}
            value={formData.firstName}
            onChange={handleChange}
            className={formErrors.firstName.error ? "border-red-500" : ""}
            isError={formErrors.firstName.error}
            errorMessage={formErrors.firstName.message}
          />
          <InputField
            type="text"
            name="lastName"
            placeholder="Nama belakang"
            leftIcon={<UserIcon className="h-4 w-4" />}
            value={formData.lastName}
            onChange={handleChange}
            className={formErrors.lastName.error ? "border-red-500" : ""}
            isError={formErrors.lastName.error}
            errorMessage={formErrors.lastName.message}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Buat password"
            leftIcon={<LockClosedIcon className="h-4 w-4" />}
            isPassword
            value={formData.password}
            onChange={handleChange}
            className={formErrors.password.error ? "border-red-500" : ""}
            isError={formErrors.password.error}
            errorMessage={formErrors.password.message}
          />
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi password"
            leftIcon={<LockClosedIcon className="h-4 w-4" />}
            isPassword
            value={formData.confirmPassword}
            onChange={handleChange}
            className={formErrors.confirmPassword.error ? "border-red-500" : ""}
            isError={formErrors.confirmPassword.error}
            errorMessage={formErrors.confirmPassword.message}
          />
          <Button
            type="submit"
            className="w-full bg-primary text-white py-3 mt-4"
          >
            Registrasi
          </Button>
          <p className="text-center mt-5">
            Sudah punya akun? Login{" "}
            <Link to="/login" className="text-primary font-semibold">
              disini
            </Link>
          </p>
        </form>
      </div>
      {/* Right Section */}
      <div className="hidden lg:block lg:w-[55%] h-full">
        <img
          src={illustration}
          alt="Illustration"
          className="w-full object-cover"
        />
      </div>
    </section>
  );
};

export default RegisterPage;
