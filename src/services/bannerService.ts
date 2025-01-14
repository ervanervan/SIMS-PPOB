import axios from "axios";

// Base URL untuk API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fungsi untuk mendapatkan daftar banner
export const getBanners = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_BASE_URL}/banner`, {
      headers: {
        "Content-Type": "application/json", // Set Content-Type
        Authorization: `Bearer ${token}`, // Sertakan Bearer Token di header
      },
    });

    // Memeriksa status dari respons
    if (response.data.status !== 0) {
      throw new Error(response.data.message); // Tangani status error dari server
    }

    return response.data.data; // Mengembalikan data banner
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.status === 108) {
        throw new Error("Token tidak valid atau kadaluwarsa"); // Menangani status 401
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch banners"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
