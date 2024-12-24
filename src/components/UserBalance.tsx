import { useEffect, useState } from "react";
import userProfileImage from "../assets/images/Profile Photo.png"; // Gambar profil default
import bgBalanceImage from "../assets/images/Background Saldo.png";
import { getProfile } from "../services/authService"; // Pastikan ini sesuai dengan path yang benar
import { getBalance } from "../services/transactionService"; // Import fungsi getBalance

export default function UserBalance() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null); // Ganti any dengan tipe yang sesuai
  const [balance, setBalance] = useState<number | null>(null); // State untuk menyimpan saldo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Set loading ke true sebelum memulai pengambilan data
      try {
        const profileData = await getProfile();
        setUserProfile(profileData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading ke false setelah pengambilan data selesai
      }
    };

    const fetchBalance = async () => {
      setLoading(true); // Set loading ke true sebelum memulai pengambilan data
      try {
        const balanceData = await getBalance();
        setBalance(balanceData.balance); // Ambil saldo dari data
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading ke false setelah pengambilan data selesai
      }
    };

    fetchProfile();
    fetchBalance(); // Panggil fungsi untuk mendapatkan saldo
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Tampilkan loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Tampilkan pesan kesalahan
  }

  return (
    <section className="px-5 py-6 container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col w-full md:w-2/5">
          <div>
            <img
              src={userProfile.profile_image || userProfileImage} // Gunakan image dari profil atau default
              alt="user profile image"
              className="size-16 rounded-full overflow-hidden object-cover"
              draggable="false"
            />
          </div>
          <p className="flex flex-col mt-4 text-black/85">
            <span className="text-black/85 text-lg">Selamat datang,</span>
            <span className="text-3xl font-semibold text-black/85">
              {userProfile.first_name} {userProfile.last_name}
            </span>
          </p>
        </div>
        <div className="relative w-full md:w-3/5">
          <img
            src={bgBalanceImage}
            alt="Balance image background"
            className="w-full h-44"
          />
          <div className="absolute top-0 left-0 p-7 flex flex-col gap-5">
            <p className="text-white">Saldo anda</p>
            {isBalanceVisible ? (
              <p className="text-white text-3xl font-semibold">
                Rp {balance?.toLocaleString()}{" "}
                {/* Menampilkan saldo dengan format yang lebih baik */}
              </p>
            ) : (
              <p className="text-white text-3xl font-semibold">Rp •••••••</p>
            )}
            <p
              className="text-white text-xs mt-0.5 cursor-pointer"
              onClick={toggleBalanceVisibility}
            >
              {isBalanceVisible ? "Tutup saldo" : "Lihat saldo"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
