import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import InputField from "./InputField";
import Button from "./Button";
import { createTransaction } from "../services/transactionService";
import Popup from "./Popup";

interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export default function ServiceDetail() {
  const { serviceCode } = useParams<{ serviceCode: string }>();
  const location = useLocation();
  const { services } = location.state as { services: Service[] };
  const [service, setService] = useState<Service | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [paymentResult, setPaymentResult] = useState<string | null>(null);

  useEffect(() => {
    const foundService = services.find((s) => s.service_code === serviceCode);
    setService(foundService || null);

    if (foundService) {
      setAmount(
        foundService.service_tariff
          ? foundService.service_tariff.toString()
          : ""
      );
    } else {
      setAmount("");
    }
  }, [serviceCode, services]);

  const handlePayment = () => {
    setShowConfirmPopup(true);
  };

  const confirmPayment = async () => {
    if (!service) return;

    setLoading(true);

    try {
      await createTransaction(service.service_code);
      setPaymentResult("sukses");
    } catch (err: any) {
      setPaymentResult("gagal");
    } finally {
      setLoading(false);
      setShowConfirmPopup(false);
      setShowResultPopup(true);
    }
  };

  const cancelPayment = () => {
    setShowConfirmPopup(false);
  };

  const closeResultPopup = () => {
    setShowResultPopup(false);
  };

  if (!service) {
    return <p>Layanan tidak ditemukan.</p>;
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
            value={amount}
            readOnly
            disabled
          />
          <Button
            className="w-full bg-primary text-white"
            onClick={handlePayment}
            disabled={loading}
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
          status="confirm"
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
          status={paymentResult === "sukses" ? "success" : "failed"}
        />
      )}
    </section>
  );
}
