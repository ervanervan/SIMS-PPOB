import { BanknotesIcon } from "@heroicons/react/24/outline";
import InputField from "./InputField";
import Button from "./Button";
import Popup from "./Popup";
import { useState } from "react";
import { topUpBalance } from "../services/transactionService"; // Import fungsi topUpBalance

export default function FormTopUp() {
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [paymentResult, setPaymentResult] = useState<"sukses" | "gagal" | null>(
    null
  );

  const denominations = [10000, 20000, 50000, 100000, 250000, 500000];
  const MAX_TOPUP_AMOUNT = 1000000;

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null);
    setIsError(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleDenominationClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
    setIsError(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
    if (amount === null || amount < 10000) {
      setIsError(true);
      setErrorMessage("Nominal top up minimal Rp10.000");
      return;
    }

    if (amount > MAX_TOPUP_AMOUNT) {
      setIsError(true);
      setErrorMessage(
        `Nominal top up maksimal Rp${MAX_TOPUP_AMOUNT.toLocaleString("id-ID")}`
      );
      return;
    }

    setShowConfirmPopup(true); // Show confirmation popup
  };

  const handleConfirmPayment = async () => {
    setShowConfirmPopup(false); // Hide confirm popup
    setLoading(true);
    setIsError(false);
    setSuccessMessage("");

    try {
      const amount = customAmount ? parseInt(customAmount, 10) : selectedAmount;
      const result = await topUpBalance(amount!); // Ensure the amount is valid
      setPaymentResult("sukses");
      setSuccessMessage(
        `Top Up berhasil sebesar Rp${result.balance.toLocaleString("id-ID")}`
      );
      // Jangan reset customAmount dan selectedAmount sebelum Popup Hasil Pembayaran muncul
    } catch (error: any) {
      setPaymentResult("gagal");
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
      setShowResultPopup(true); // Show result popup
    }
  };

  const handleCloseResultPopup = () => {
    setCustomAmount(""); // Reset input field
    setSelectedAmount(null); // Reset selected amount
    setShowResultPopup(false); // Close the result popup
  };

  const handleCancelPayment = () => {
    setShowConfirmPopup(false); // Hide confirm popup if cancelled
  };

  const isButtonDisabled = !customAmount && !selectedAmount;

  return (
    <section className="p-5 container mx-auto">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-black/85">Silahkan masukkan</p>
          <p className="text-black/85 font-semibold text-3xl">Nominal Top Up</p>
        </div>
        <form
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          onSubmit={handleSubmit}
        >
          <div className="md:col-span-2 w-full">
            <InputField
              type="text"
              name="customAmount"
              placeholder="Masukkan nominal top up Anda atau pilih nominal top up"
              value={customAmount}
              onChange={handleCustomInputChange}
              leftIcon={<BanknotesIcon className="h-4 w-4" />}
              isError={isError}
              errorMessage={errorMessage}
            />
            <Button
              type="submit"
              className="w-full bg-primary text-white"
              disabled={loading || isButtonDisabled}
            >
              {loading ? "Loading..." : "Top Up"}
            </Button>
            {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )}
          </div>
          <div className="grid grid-cols-3 items-center gap-y-7 gap-x-2">
            {denominations.map((amount) => (
              <div
                key={amount}
                className={`border border-gray-300 text-black/85 px-4 py-3 rounded-md font-medium text-center cursor-pointer ${
                  selectedAmount === amount
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleDenominationClick(amount)}
              >
                Rp{amount.toLocaleString("id-ID")}
              </div>
            ))}
          </div>
        </form>
      </div>

      {/* Pop-up Konfirmasi Pembayaran */}
      {showConfirmPopup && (
        <Popup
          content={
            <p className="flex flex-col items-center justify-center gap-2">
              <span className="text-black/85">
                Anda yakin untuk Top Up sebesar{" "}
              </span>
              <span className="text-black/85 font-bold text-2xl">
                Rp
                {customAmount
                  ? customAmount
                  : selectedAmount?.toLocaleString("id-ID")}
              </span>
            </p>
          }
          onConfirm={handleConfirmPayment}
          onCancel={handleCancelPayment}
          status="confirm"
        />
      )}

      {/* Pop-up Hasil Pembayaran */}
      {showResultPopup && (
        <Popup
          content={
            <p className="flex flex-col text-black/70 items-center justify-center gap-2">
              <span className="text-black/85">Top Up sebesar</span>
              <span className="text-black/85 font-bold text-2xl">
                Rp
                {customAmount
                  ? customAmount
                  : selectedAmount?.toLocaleString("id-ID")}
              </span>

              <span>{paymentResult === "sukses" ? "Berhasil" : "Gagal"}</span>
            </p>
          }
          onConfirm={handleCloseResultPopup}
          confirmText="Kembali ke Beranda"
          status={paymentResult === "sukses" ? "success" : "failed"}
        />
      )}
    </section>
  );
}
