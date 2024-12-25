import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import logo from "../assets/images/Logo.png";
import illustration from "../assets/images/Illustrasi Login.png";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { loginUser } from "../services/authService";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: { error: false, message: "" },
    password: { error: false, message: "" },
  });

  const [notification, setNotification] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const validateForm = () => {
    const errors = {
      email: {
        error: !/\S+@\S+\.\S+/.test(formData.email),
        message: "Format email tidak valid",
      },
      password: {
        error: formData.password.length < 8,
        message: "Password minimal 8 karakter",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await loginUser(formData);

        const token = response.data.token;
        localStorage.setItem("authToken", token);

        setNotification({
          type: "success",
          message: "Login berhasil! Selamat datang.",
        });

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } catch (error: any) {
        setNotification({
          type: "error",
          message: error.message || "Terjadi kesalahan.",
        });
      }
    }
  };

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center w-full h-screen lg:w-[45%] px-6 py-8">
        <div className="flex items-center gap-2 mb-8">
          <img src={logo} alt="Logo" className="size-8" />
          <span className="text-2xl font-semibold text-black/85">
            SIMS PPOB
          </span>
        </div>
        <h2 className="text-3xl font-semibold text-center mb-12 w-full md:w-2/3 text-black/85">
          Masuk atau buat akun untuk memulai
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
            type="password"
            name="password"
            placeholder="Masukan password"
            leftIcon={<LockClosedIcon className="h-4 w-4" />}
            isPassword
            value={formData.password}
            onChange={handleChange}
            className={formErrors.password.error ? "border-red-500" : ""}
            isError={formErrors.password.error}
            errorMessage={formErrors.password.message}
          />
          <Button
            type="submit"
            className="w-full bg-primary text-white py-3 mt-4"
          >
            Masuk
          </Button>
          <p className="text-center mt-5">
            Belum punya akun? Registrasi{" "}
            <Link to="/register" className="text-primary font-semibold">
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

export default LoginPage;
