import { useEffect, useState } from "react";
import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline";
import imageProfile from "../assets/images/Profile Photo.png"; // Gambar profil default
import InputField from "./InputField";
import Button from "./Button";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  getProfile,
  updateProfile,
  updateProfileImage,
} from "../services/authService"; // Pastikan ini sesuai dengan path yang benar
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function ProfileEditCard() {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [userProfile, setUserProfile] = useState<any>(null); // Ganti any dengan tipe yang sesuai
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null); // State untuk menyimpan file gambar

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUserProfile(profileData);
        setFirstName(profileData.first_name); // Set initial value for first name
        setLastName(profileData.last_name); // Set initial value for last name
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    try {
      await updateProfile({ first_name: firstName, last_name: lastName });
      setError(null); // Reset error jika berhasil
      navigate("/profile"); // Arahkan kembali ke halaman profil setelah berhasil
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.split("/")[1]; // Mendapatkan tipe file
      if (fileType !== "jpeg" && fileType !== "png") {
        setError("Hanya file JPEG dan PNG yang diperbolehkan.");
        return;
      }
      setImageFile(file); // Simpan file gambar ke state
      setError(null); // Reset error jika file valid
    }
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      try {
        await updateProfileImage(imageFile); // Panggil fungsi untuk mengupdate gambar profil
        setError(null); // Reset error jika berhasil
        navigate("/profile"); // Arahkan kembali ke halaman profil setelah berhasil
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Tampilkan loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Tampilkan pesan kesalahan
  }

  return (
    <section className="p-5 container mx-auto">
      <form className="max-w-2xl mx-auto" onSubmit={handleEditProfile}>
        <div className="flex flex-col items-center justify-center mt-3">
          <div className="relative size-36">
            <img
              src={userProfile.profile_image || imageProfile} // Gunakan image dari profil atau default
              alt="profile image"
              className="size-36 object-cover rounded-full border border-gray-300"
            />
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              style={{ display: "none" }} // Sembunyikan input file
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="absolute bottom-0 right-0 border border-gray-300 p-2 rounded-full bg-white cursor-pointer"
              onClick={handleImageUpload} // Panggil fungsi upload saat label diklik
            >
              <PencilIcon className="size-4" />
            </label>
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
          />
          <div className="mb-2 text-sm font-semibold text-black/85">
            <label htmlFor="">Nama Depan</label>
          </div>
          <InputField
            type="text"
            name="firstName"
            placeholder="Nama depan"
            leftIcon={<UserIcon className="h-4 w-4" />}
            value={firstName} // Gunakan state untuk nama depan
            onChange={(e) => setFirstName(e.target.value)} // Update state saat input berubah
          />
          <div className="mb-2 text-sm font-semibold text-black/85">
            <label htmlFor="">Nama Belakang</label>
          </div>
          <InputField
            type="text"
            name="lastName"
            placeholder="Nama belakang"
            leftIcon={<UserIcon className="h-4 w-4" />}
            value={lastName} // Gunakan state untuk nama belakang
            onChange={(e) => setLastName(e.target.value)} // Update state saat input berubah
          />
        </div>
        <div className="flex flex-col gap-3 mb-10">
          <Button
            type="submit" // Ubah type menjadi submit untuk mengirim formulir
            className="w-full bg-primary text-white py-3 mt-4"
          >
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </section>
  );
}