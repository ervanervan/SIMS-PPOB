import { AtSymbolIcon, UserIcon } from "@heroicons/react/24/outline";
import imageProfile from "../assets/images/Profile Photo.png";
import InputField from "./InputField";
import Button from "./Button";
import { PencilIcon } from "@heroicons/react/24/solid";

export default function ProfileCard() {
  return (
    <section className="p-5 container mx-auto">
      <form className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center justify-center mt-3">
          <div className="relative size-36">
            <img
              src={imageProfile}
              alt="profile image"
              className="size-36 object-cover"
            />
            <div className="absolute bottom-0 right-0 border border-gray-300 p-2 rounded-full bg-white">
              <PencilIcon className="size-4" />
            </div>
          </div>
          <p className="mt-5 text-black/85 font-semibold text-3xl">
            Kristanto Ari
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
          />
          <div className="mb-2 text-sm font-semibold text-black/85">
            <label htmlFor="">Nama Depan</label>
          </div>

          <InputField
            type="text"
            name="firstName"
            placeholder="Nama depan"
            leftIcon={<UserIcon className="h-4 w-4" />}
          />
          <div className="mb-2 text-sm font-semibold text-black/85">
            <label htmlFor="">Nama Belakang</label>
          </div>

          <InputField
            type="text"
            name="lastName"
            placeholder="Nama belakang"
            leftIcon={<UserIcon className="h-4 w-4" />}
          />
        </div>
        <div className="flex flex-col gap-3 mb-10">
          <Button
            type="submit"
            className="w-full bg-primary text-white py-3 mt-4"
          >
            Edit Profile
          </Button>

          <Button className="w-full text-primary border border-primary bg-white py-3 mt-4">
            Logout
          </Button>
        </div>
      </form>
    </section>
  );
}
