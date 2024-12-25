import { useEffect, useState } from "react";
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline";
import imageProfile from "../assets/images/Profile Photo.png"; // Gambar profil default
import InputField from "./InputField";
import Button from "./Button";
import { PencilIcon } from "@heroicons/react/24/solid";
import { getProfile } from "../services/authService"; // Pastikan ini sesuai dengan path yang benar
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function ProfileCard() {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [userProfile, setUserProfile] = useState<any>(null); // Ganti any dengan tipe yang sesuai
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUserProfile(profileData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/profile/update"); // Arahkan ke halaman update profile
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Hapus token dari localStorage
    navigate("/login"); // Arahkan ke halaman login
  };

  if (loading) {
    return (
      <div className="p-5 container mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center mt-3">
            <div className="relative size-36 animate-pulse">
              <div className="w-36 h-36 bg-gray-300 rounded-full" />{" "}
              {/* Skeleton untuk gambar profil */}
              <div className="absolute bottom-0 right-0 border border-gray-300 p-2 rounded-full bg-white">
                <div className="w-6 h-6 bg-gray-300 rounded-full" />{" "}
                {/* Skeleton untuk ikon edit */}
              </div>
            </div>
            <div className="mt-6 w-1/2 h-6 bg-gray-300 rounded animate-pulse"></div>{" "}
            {/* Skeleton untuk nama */}
          </div>
          <div className="mt-10">
            <div className="mb-5 text-sm font-semibold text-black/85">
              <div className="w-20 h-5 bg-gray-300 animate-pulse"></div>{" "}
              {/* Skeleton untuk label email */}
            </div>
            <div className="w-full h-10 bg-gray-300 rounded animate-pulse"></div>{" "}
            {/* Skeleton untuk input email */}
            <div className="mb-5 text-sm font-semibold text-black/85 mt-4">
              <div className="w-20 h-5 bg-gray-300 animate-pulse"></div>{" "}
              {/* Skeleton untuk label nama depan */}
            </div>
            <div className="w-full h-10 bg-gray-300 rounded animate-pulse"></div>{" "}
            {/* Skeleton untuk input nama depan */}
            <div className="mb-5 text-sm font-semibold text-black/85 mt-4">
              <div className="w-20 h-5 bg-gray-300 animate-pulse"></div>{" "}
              {/* Skeleton untuk label nama belakang */}
            </div>
            <div className="w-full h-10 bg-gray-300 rounded animate-pulse"></div>{" "}
            {/* Skeleton untuk input nama belakang */}
          </div>
          <div className="flex flex-col gap-3 mt-5 mb-10">
            <div className="w-full h-12 bg-gray-300 rounded mt-4 animate-pulse"></div>{" "}
            {/* Skeleton untuk tombol Logout */}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>; // Tampilkan pesan kesalahan
  }

  return (
    <section className="p-5 container mx-auto">
      <form className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center mt-3">
          <div className="relative size-36">
            <img
              src={userProfile.profile_image || imageProfile} // Gunakan image dari profil atau default
              alt="profile image"
              className="size-36 object-cover rounded-full border border-gray-300"
            />
            <div className="absolute bottom-0 right-0 border border-gray-300 p-2 rounded-full bg-white">
              <PencilIcon className="size-4" />
            </div>
          </div>
          <p className="mt-5 text-black/85 font-semibold text-3xl">
            {userProfile.first_name} {userProfile.last_name}
          </p>
        </div>
        <div className="mt-5">
          <div className="mb-2 text-sm font-semibold text-black/85">
            <label htmlFor="">Email</label>
          </div>
          <InputField
            type="email"
            name="email"
            placeholder="Masukan email anda"
            leftIcon={<AtSymbolIcon className="h-4 w-4" />}
            value={userProfile.email} // Tampilkan email dari profil
            readOnly // Buat field ini hanya bisa dibaca
            disabled={true} // Tambahkan properti disabled
          />
          <div className="mb-2 text-sm font-semibold text-black/85">
            <label htmlFor="">Nama Depan</label>
          </div>
          <InputField
            type="text"
            name="firstName"
            placeholder="Nama depan"
            leftIcon={<UserIcon className="h-4 w-4" />}
            value={userProfile.first_name} // Tampilkan nama depan dari profil
            readOnly // Buat field ini hanya bisa dibaca
            disabled={true}
          />
          <div className="mb-2 text-sm font-semibold text-black/85">
            <label htmlFor="">Nama Belakang</label>
          </div>
          <InputField
            type="text"
            name="lastName"
            placeholder="Nama belakang"
            leftIcon={<UserIcon className="h-4 w-4" />}
            value={userProfile.last_name} // Tampilkan nama belakang dari profil
            readOnly // Buat field ini hanya bisa dibaca
            disabled={true}
          />
        </div>
        <div className="flex flex-col gap-3 mb-10">
          <Button
            type="button" // Ubah type menjadi button
            className="w-full bg-primary text-white py-3 mt-4"
            onClick={handleEditProfile} // Tambahkan event handler untuk tombol Edit Profile
          >
            Edit Profile
          </Button>
          <Button
            type="button" // Ubah type menjadi button
            className="w-full text-primary border border-primary bg-white py-3 mt-4"
            onClick={handleLogout} // Tambahkan event handler untuk tombol Logout
          >
            Logout
          </Button>
        </div>
      </form>
    </section>
  );
}
