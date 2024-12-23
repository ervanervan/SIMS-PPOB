import { BanknotesIcon } from "@heroicons/react/24/outline";
import InputField from "./InputField";
import Button from "./Button";
import { useState } from "react";

export default function FormTopUp() {
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const denominations = [10000, 20000, 50000, 100000, 250000, 500000];

  // Handle Custom Input Change
  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(null); // Reset selected preset amount
    setIsError(false);
    setErrorMessage("");
  };

  // Handle Denomination Click
  const handleDenominationClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString()); // Update input field with selected denomination
    setIsError(false);
    setErrorMessage("");
  };

  // Handle Top Up Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const amount = parseInt(customAmount, 10);
    if (!amount || amount < 10000) {
      setIsError(true);
      setErrorMessage("Nominal top up minimal Rp10.000");
      return;
    }

    alert(`Top up berhasil sebesar Rp${amount.toLocaleString("id-ID")}`);
  };

  return (
    <section className="p-5 container mx-auto">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-black/85">Silahkan masukkan</p>
          <p className="text-black/85 font-semibold text-3xl">Nominal Top Up</p>
        </div>
        <form
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
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
            <Button type="submit" className="w-full bg-primary text-white">
              Top Up
            </Button>
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
    </section>
  );
}
