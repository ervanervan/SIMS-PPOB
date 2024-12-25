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
import {
  AuthenticatedRoute,
  UnauthenticatedRoute,
} from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UnauthenticatedRoute element={<LoginPage />} />,
  },
  {
    path: "/login",
    element: <UnauthenticatedRoute element={<LoginPage />} />,
  },
  {
    path: "/register",
    element: <UnauthenticatedRoute element={<RegisterPage />} />,
  },
  {
    path: "/",
    element: <AuthenticatedRoute element={<App />} />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <AccountPage />,
      },
      {
        path: "profile/update",
        element: <AccountEditPage />,
      },
      {
        path: "transaction/:serviceCode",
        element: <ServicePage />,
      },
      {
        path: "transaction/history",
        element: <TransactionPage />,
      },
      {
        path: "topup",
        element: <TopupPage />,
      },
    ],
  },
]);
