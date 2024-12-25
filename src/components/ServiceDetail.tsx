import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import InputField from "./InputField";
import Button from "./Button";
import { createTransaction } from "../services/transactionService";
import Popup from "./Popup"; // Import komponen Popup

interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export default function ServiceDetail() {
  const { serviceCode } = useParams<{ serviceCode: string }>(); // Ambil serviceCode dari URL
  const location = useLocation(); // Ambil location untuk mendapatkan state
  const { services } = location.state as { services: Service[] }; // Ambil services dari state
  const [service, setService] = useState<Service | null>(null); // State untuk menyimpan detail layanan
  const [amount, setAmount] = useState<string>(""); // State untuk menyimpan jumlah yang ingin dibayarkan
  const [loading, setLoading] = useState(false); // State untuk loading
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // State untuk menampilkan pop-up konfirmasi
  const [showResultPopup, setShowResultPopup] = useState(false); // State untuk menampilkan pop-up hasil
  const [paymentResult, setPaymentResult] = useState<string | null>(null); // State untuk menyimpan hasil pembayaran

  useEffect(() => {
    // Temukan layanan yang sesuai dengan serviceCode
    const foundService = services.find((s) => s.service_code === serviceCode);
    setService(foundService || null); // Set service jika ditemukan

    // Jika layanan ditemukan, set amount dengan service_tariff
    if (foundService) {
      setAmount(
        foundService.service_tariff
          ? foundService.service_tariff.toString()
          : ""
      ); // Set amount dengan service_tariff jika ada
    } else {
      setAmount(""); // Reset amount jika layanan tidak ditemukan
    }
  }, [serviceCode, services]);

  const handlePayment = () => {
    setShowConfirmPopup(true); // Tampilkan pop-up konfirmasi
  };

  const confirmPayment = async () => {
    if (!service) return;

    setLoading(true);

    try {
      await createTransaction(service.service_code); // Panggil fungsi createTransaction
      setPaymentResult("sukses"); // Set hasil pembayaran
    } catch (err: any) {
      setPaymentResult("gagal"); // Set hasil pembayaran
    } finally {
      setLoading(false);
      setShowConfirmPopup(false); // Sembunyikan pop-up konfirmasi
      setShowResultPopup(true); // Tampilkan pop-up hasil
    }
  };

  const cancelPayment = () => {
    setShowConfirmPopup(false); // Sembunyikan pop-up konfirmasi
  };

  const closeResultPopup = () => {
    setShowResultPopup(false); // Sembunyikan pop-up hasil
  };

  if (!service) {
    return <p>Layanan tidak ditemukan.</p>; // Tampilkan pesan jika layanan tidak ditemukan
  }

  return (
    <section className="container mx-auto p-5">
      <div className="flex flex-col gap-5">
        <div>
          <p>Pembayaran</p>
          <div className="flex items-center gap-3 mt-3">
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="size-10 object-cover"
            />
            <p className="text-black/85 font-semibold">
              {service.service_name}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <InputField
            type="text"
            name="customAmount"
            placeholder="Nominal yang harus dibayarkan"
            leftIcon={<BanknotesIcon className="h-4 w-4" />}
            value={amount} // Tampilkan nilai dari total_amount setelah transaksi
            readOnly // Set input field menjadi read-only
            disabled // Disable input field
          />
          <Button
            className="w-full bg-primary text-white"
            onClick={handlePayment}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Bayar"}
          </Button>
        </div>
      </div>

      {/* Pop-up Konfirmasi Pembayaran */}
      {showConfirmPopup && (
        <Popup
          content={
            <p className="flex flex-col items-center justify-center gap-2">
              <span className="text-black/85">
                Beli {service.service_name} senilai{" "}
              </span>
              <span className="text-black/85 font-bold text-2xl">
                Rp{amount} ?
              </span>
            </p>
          }
          onConfirm={confirmPayment}
          onCancel={cancelPayment}
          status="confirm" // Set status ke confirm
        />
      )}

      {showResultPopup && (
        <Popup
          content={
            <p className="flex flex-col text-black/70 items-center justify-center gap-2">
              <span className="text-black/85">
                Pembayaran {service.service_name} sebesar
              </span>
              <span className="text-black/85 font-bold text-2xl">
                Rp{amount}
              </span>
              <span>{paymentResult === "sukses" ? "Berhasil" : "Gagal"}</span>
            </p>
          }
          onConfirm={closeResultPopup}
          confirmText="Kembali ke Beranda"
          status={paymentResult === "sukses" ? "success" : "failed"} // Gunakan status sesuai hasil
        />
      )}
    </section>
  );
}
