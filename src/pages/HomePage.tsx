import Banner from "../components/Banner";
import ListServices from "../components/ListServices";
import UserBalance from "../components/UserBalance";

const HomePage = () => {
  return (
    <>
      <UserBalance />
      <ListServices />
      <Banner />
    </>
  );
};

export default HomePage;
