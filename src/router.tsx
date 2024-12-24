// router.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import TransactionPage from "./pages/TransactionPage";
import TopupPage from "./pages/TopupPage";
import AccountEditPage from "./pages/AccountEditPage";
import ServicePage from "./pages/ServicePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: <AccountPage />,
      },
      {
        path: "/profile/update",
        element: <AccountEditPage />,
      },
      {
        path: "/transaction/:serviceCode",
        element: <ServicePage />,
      },
      {
        path: "/transaction/history",
        element: <TransactionPage />,
      },
      {
        path: "/topup",
        element: <TopupPage />,
      },
    ],
  },
]);
