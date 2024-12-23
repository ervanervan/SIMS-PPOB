import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Menyimpan status menu mobile

  return (
    <section className="border-b">
      <div className="container mx-auto">
        <div className="p-5 flex justify-between items-center">
          <Link to={"/"} className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="size-6" />
            <span className="text-lg font-semibold text-black/85">
              SIMS PPOB
            </span>
          </Link>

          {/* Tombol menu mobile */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6 text-black/85" /> // Ikon close
              ) : (
                <Bars3Icon className="h-6 w-6 text-black/85" /> // Ikon menu
              )}
            </button>
          </div>

          {/* Menu bar untuk medium screen */}
          <nav className="hidden md:flex space-x-16">
            <Link
              to="/topup"
              className="font-medium text-black/85 hover:text-black/70"
            >
              Top Up
            </Link>
            <Link
              to="/transaction"
              className="font-medium text-black/85 hover:text-black/70"
            >
              Transaction
            </Link>
            <Link
              to="/account"
              className="font-medium text-black/85 hover:text-black/70"
            >
              Akun
            </Link>
          </nav>
        </div>
      </div>

      {/* Menu dropdown untuk mobile */}
      {menuOpen && (
        <div className="md:hidden p-4 space-y-4 bg-white shadow-md">
          <Link
            to="/topup"
            className="block text-black/85 hover:text-black/70"
            onClick={() => setMenuOpen(false)} // Tutup menu saat item diklik
          >
            Top Up
          </Link>
          <Link
            to="/transaction"
            className="block text-black/85 hover:text-black/70"
            onClick={() => setMenuOpen(false)} // Tutup menu saat item diklik
          >
            Transaction
          </Link>
          <Link
            to="/account"
            className="block text-black/85 hover:text-black/70"
            onClick={() => setMenuOpen(false)} // Tutup menu saat item diklik
          >
            Akun
          </Link>
        </div>
      )}
    </section>
  );
};

export default Navbar;
