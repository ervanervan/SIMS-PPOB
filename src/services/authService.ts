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

interface ApiResponse {
  status: number;
  message: string;
  data: {
    token: string;
  } | null; // Ganti `null` dengan tipe data yang sesuai jika ada
}

export const registerUser = async (
  userData: RegisterUser
): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${API_BASE_URL}/registration`,
      userData
    );

    // Memeriksa status dari respons
    if (response.data.status === 0) {
      return response.data; // Registrasi berhasil
    } else {
      throw new Error(response.data.message); // Menangani kesalahan berdasarkan status
    }
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      throw new Error(errorMessage);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

interface LoginUser {
  email: string;
  password: string;
}

export const loginUser = async (userData: LoginUser): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>(
      `${API_BASE_URL}/login`,
      userData
    );

    // Memeriksa status dari respons
    if (response.data.status === 0) {
      return response.data; // Login berhasil
    } else {
      throw new Error(response.data.message); // Menangani kesalahan berdasarkan status
    }
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || "Login failed";
      throw new Error(errorMessage);
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

    // Memeriksa status dari respons
    if (response.data.status === 0) {
      return response.data.data; // Mengembalikan data profil pengguna
    } else if (response.data.status === 108) {
      throw new Error("Token tidak valid atau kadaluwarsa"); // Menangani status 401
    } else {
      throw new Error(response.data.message); // Tangani status error lainnya
    }
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
  email: string;
  first_name: string;
  last_name: string;
  profile_image?: string; // Gambar profil bersifat opsional
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

    // Memeriksa status dari respons
    if (response.data.status === 0) {
      return response.data; // Mengembalikan data respons jika berhasil
    } else {
      throw new Error(response.data.message); // Menangani kesalahan berdasarkan status
    }
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      // Menangani kesalahan dari Axios
      if (error.response?.data?.status === 108) {
        throw new Error("Token tidak valid atau kadaluwarsa"); // Menangani status 401
      }
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

    // Memeriksa status dari respons
    if (response.data.status === 0) {
      return response.data; // Mengembalikan data respons jika berhasil
    } else {
      throw new Error(response.data.message); // Menangani kesalahan berdasarkan status
    }
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.status === 102) {
        throw new Error("Format Image tidak sesuai"); // Menangani status 400
      } else if (error.response?.data?.status === 108) {
        throw new Error("Token tidak valid atau kadaluwarsa"); // Menangani status 401
      }
      throw new Error(
        error.response?.data?.message || "Failed to update profile image"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
