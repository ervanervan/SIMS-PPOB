import TransactionHistory from "../components/TransactionHistory";
import UserBalance from "../components/UserBalance";

const TransactionPage = () => {
  return (
    <>
      <UserBalance />
      <TransactionHistory />
    </>
  );
};

export default TransactionPage;
