import axios from "axios";

// Base URL untuk API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fungsi untuk mendapatkan saldo
export const getBalance = async () => {
  try {
    const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await axios.get(`${API_BASE_URL}/balance`, {
      headers: {
        "Content-Type": "application/json", // Set Content-Type
        Authorization: `Bearer ${token}`, // Sertakan Bearer Token di header
      },
    });

    if (response.data.status !== 0) {
      throw new Error(response.data.message); // Tangani status error dari server
    }
    return response.data.data; // Mengembalikan data saldo
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch balance"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fungsi untuk melakukan top-up saldo
export const topUpBalance = async (amount: number) => {
  if (amount <= 0) {
    throw new Error("Jumlah top-up harus lebih besar dari 0.");
  }

  try {
    const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await axios.post(
      `${API_BASE_URL}/topup`,
      {
        top_up_amount: amount, // Parameter yang dikirim dalam body
      },
      {
        headers: {
          "Content-Type": "application/json", // Set Content-Type
          Authorization: `Bearer ${token}`, // Sertakan Bearer Token di header
        },
      }
    );

    if (response.data.status !== 0) {
      throw new Error(response.data.message); // Tangani status error dari server
    }
    return response.data.data; // Mengembalikan data saldo setelah top-up
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to top up balance"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fungsi untuk melakukan transaksi
export const createTransaction = async (serviceCode: string) => {
  try {
    const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    const response = await axios.post(
      `${API_BASE_URL}/transaction`,
      {
        service_code: serviceCode, // Parameter yang dikirim dalam body
      },
      {
        headers: {
          "Content-Type": "application/json", // Set Content-Type
          Authorization: `Bearer ${token}`, // Sertakan Bearer Token di header
        },
      }
    );

    // Cek status dari respons
    if (response.data.status !== 0) {
      throw new Error(response.data.message); // Tangani status error dari server
    }

    return response.data.data; // Mengembalikan data transaksi yang berhasil
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to create transaction"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fungsi untuk mengambil riwayat transaksi
export const getTransactionHistory = async (
  limit?: number,
  offset: number = 0
) => {
  try {
    const token = localStorage.getItem("authToken"); // Ambil token dari localStorage
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    // Siapkan parameter query
    const params: { limit?: number; offset: number } = { offset };
    if (limit !== undefined) {
      params.limit = limit; // Tambahkan limit jika ada
    }

    const response = await axios.get(`${API_BASE_URL}/transaction/history`, {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan Bearer Token di header
      },
      params, // Sertakan parameter query
    });

    // Cek status dari respons
    if (response.data.status !== 0) {
      throw new Error(response.data.message); // Tangani status error dari server
    }

    return response.data.data; // Mengembalikan data riwayat transaksi yang berhasil
  } catch (error) {
    // Menangani kesalahan
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to get transaction history"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
