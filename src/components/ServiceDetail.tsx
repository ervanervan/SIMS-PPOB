import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom"; // Import useLocation
import { BanknotesIcon } from "@heroicons/react/24/outline";
import InputField from "./InputField";
import Button from "./Button";
import { createTransaction } from "../services/transactionService"; // Import fungsi createTransaction

interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number; // Ganti total_amount dengan service_tariff
}

export default function ServiceDetail() {
  const { serviceCode } = useParams<{ serviceCode: string }>(); // Ambil serviceCode dari URL
  const location = useLocation(); // Ambil location untuk mendapatkan state
  const { services } = location.state as { services: Service[] }; // Ambil services dari state
  const [service, setService] = useState<Service | null>(null); // State untuk menyimpan detail layanan
  const [amount, setAmount] = useState<string>(""); // State untuk menyimpan jumlah yang ingin dibayarkan
  const [loading, setLoading] = useState(false); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State untuk pesan sukses

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

  const handlePayment = async () => {
    if (!service) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await createTransaction(service.service_code); // Panggil fungsi createTransaction
      setSuccessMessage(
        `Transaksi berhasil! Invoice Number: ${result.invoice_number}`
      );

      // Ambil total_amount dari respons dan set ke amount
      setAmount(result.total_amount ? result.total_amount.toString() : ""); // Set amount dengan total_amount dari respons
    } catch (err: any) {
      setError(err.message); // Set error message
    } finally {
      setLoading(false);
    }
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
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Tampilkan pesan error */}
          {successMessage && (
            <p className="text-green-500">{successMessage}</p>
          )}{" "}
          {/* Tampilkan pesan sukses */}
        </div>
      </div>
    </section>
  );
}
