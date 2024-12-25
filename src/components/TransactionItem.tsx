import React from "react";

interface TransactionItemProps {
  invoiceNumber: string;
  transactionType: string;
  description: string;
  totalAmount: number;
  createdOn: string;
}

// Fungsi untuk memformat tanggal
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", options); // Format tanggal dalam bahasa Indonesia
};

// Fungsi untuk memformat waktu
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}.${minutes} WIB`; // Format waktu
};

const TransactionItem: React.FC<TransactionItemProps> = ({
  invoiceNumber,
  transactionType,
  description,
  totalAmount,
  createdOn,
}) => {
  const isTopUp = transactionType === "TOPUP";

  return (
    <div className="border flex items-start justify-between border-gray-300 p-4 md:px-6 md:py-4 rounded-xl">
      <div className="flex flex-col gap-2">
        <h3
          className={`text-xl font-semibold ${
            isTopUp ? "text-green-500" : "text-red-500"
          }`}
        >
          {isTopUp ? `+ Rp.${totalAmount}` : `- Rp.${totalAmount}`}
        </h3>
        <p className="flex items-center gap-2">
          <span className="text-sm text-black/50">{formatDate(createdOn)}</span>
          <span className="text-sm text-black/50">{formatTime(createdOn)}</span>
        </p>
      </div>
      <div>
        <p className="text-sm text-black/85">{description}</p>
        <p className="text-sm text-black/50">Invoice: {invoiceNumber}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
