import { useEffect, useState } from "react";
import { getTransactionHistory } from "../services/transactionService";
import TransactionItem from "./TransactionItem";
import Button from "./Button";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<any[]>([]); // State untuk menyimpan riwayat transaksi
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error
  const [offset, setOffset] = useState(0); // State untuk offset
  const [hasMore, setHasMore] = useState(true); // State untuk mengecek apakah masih ada data
  const limit = 3; // Limit untuk jumlah transaksi yang ditampilkan

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTransactionHistory(limit, offset); // Ambil riwayat transaksi dengan limit dan offset

        // Jika jumlah data yang diterima kurang dari limit, set hasMore ke false
        if (data.records.length < limit) {
          setHasMore(false);
        }

        // Jika offset adalah 0, reset transactions, jika tidak, tambahkan data baru
        setTransactions((prev) =>
          offset === 0 ? data.records : [...prev, ...data.records]
        );
      } catch (err: any) {
        setError(err.message); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, [offset]); // Fetch data ketika offset berubah

  const handleShowMore = () => {
    if (hasMore) {
      setOffset((prevOffset) => prevOffset + limit); // Tambah offset untuk memuat lebih banyak transaksi
    }
  };

  if (loading) {
    return (
      <div className="p-5 container mx-auto">
        <div className="h-6 w-32 bg-gray-300 rounded mb-5 animate-pulse"></div>
        <div className="border flex items-start justify-between border-gray-300 px-6 py-4 rounded-xl animate-pulse">
          <div className="flex flex-col gap-2">
            <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>{" "}
            {/* Placeholder for totalAmount */}
            <div className="flex items-center gap-2">
              <div className="h-3 w-32 bg-gray-300 rounded animate-pulse"></div>{" "}
              {/* Placeholder for formatted date */}
              <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>{" "}
              {/* Placeholder for formatted time */}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-40 bg-gray-300 rounded animate-pulse"></div>{" "}
            {/* Placeholder for description */}
            <div className="h-4 w-40 bg-gray-300 rounded animate-pulse"></div>{" "}
            {/* Placeholder for invoice number */}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>; // Tampilkan pesan kesalahan
  }

  return (
    <section className="p-5 container mx-auto">
      <div className="flex flex-col">
        <div>
          <h2 className="text-lg font-semibold text-black/85">
            Semua Transaksi
          </h2>
        </div>
        <div className="flex flex-col mt-5 w-full gap-3">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem
                key={transaction.invoice_number}
                invoiceNumber={transaction.invoice_number}
                transactionType={transaction.transaction_type}
                description={transaction.description}
                totalAmount={transaction.total_amount}
                createdOn={transaction.created_on}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada transaksi untuk ditampilkan.
            </p>
          )}
        </div>
        {hasMore ? (
          <div className="flex items-center justify-center">
            <Button
              className="mt-4 w-fit text-red-500 rounded"
              onClick={handleShowMore}
            >
              Show More
            </Button>
          </div>
        ) : (
          <p className="mt-4 text-center text-gray-500">
            Semua data transaksi telah ditampilkan.
          </p>
        )}
      </div>
    </section>
  );
};

export default TransactionHistory;
