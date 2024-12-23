import { useState } from "react";
import userProfileImage from "../assets/images/Profile Photo.png";
import bgBalanceImage from "../assets/images/Background Saldo.png";

export default function UserBalance() {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  return (
    <section className="px-5 py-6 container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col w-full md:w-2/5">
          <div>
            <img
              src={userProfileImage}
              alt="user profile image"
              className="size-16 rounded-full overflow-hidden object-cover"
              draggable="false"
            />
          </div>
          <p className="flex flex-col mt-4 text-black/85">
            <span>Selamat datang,</span>{" "}
            <span className="text-3xl font-semibold">Kristanto Ari</span>
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
              <p className="text-white text-3xl font-semibold">Rp 100.000</p>
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
