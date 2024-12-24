import axios from "axios";
import api from "./api";

// Base URL untuk API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RegisterUser {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export const registerUser = async (userData: RegisterUser) => {
  try {
    const response = await api.post(`${API_BASE_URL}/registration`, userData);
    return response.data; // Mengembalikan data respons jika berhasil
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

interface LoginUser {
  email: string;
  password: string;
}

export const loginUser = async (userData: LoginUser) => {
  try {
    const response = await api.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string; // Tambahkan field profile_image
}

export const getProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await api.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan Bearer Token di header
      },
    });

    if (response.data.status !== 0) {
      throw new Error(response.data.message); // Tangani status error dari server
    }

    return response.data.data; // Mengembalikan data profil pengguna
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

interface UpdateProfile {
  first_name: string;
  last_name: string;
}

export const updateProfile = async (profileData: UpdateProfile) => {
  try {
    const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await api.put(
      `${API_BASE_URL}/profile/update`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan Bearer Token di header
        },
      }
    );

    return response.data; // Mengembalikan data respons jika berhasil
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update profile"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const updateProfileImage = async (imageFile: File) => {
  try {
    const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const formData = new FormData();
    formData.append("file", imageFile); // Tambahkan file gambar ke FormData dengan key "file"

    const response = await api.put(`${API_BASE_URL}/profile/image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan Bearer Token di header
        "Content-Type": "multipart/form-data", // Set Content-Type untuk FormData
      },
    });

    return response.data; // Mengembalikan data respons jika berhasil
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to update profile image"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
