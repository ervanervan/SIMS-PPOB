import React from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import imageConfirm from "../assets/images/Logo.png"; // Import gambar confirm
import Button from "./Button";

interface PopupProps {
  content: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  status?: "confirm" | "success" | "failed"; // Tambahkan prop status
}

const Popup: React.FC<PopupProps> = ({
  content,
  onConfirm,
  onCancel,
  confirmText = "Ya, lanjutkan bayar",
  cancelText = "Batalkan",
  status,
}) => {
  let iconElement;

  // Tentukan ikon/gambar berdasarkan status
  if (status === "confirm") {
    iconElement = (
      <img src={imageConfirm} alt="Confirm" className="w-16 h-16" />
    );
  } else if (status === "success") {
    iconElement = (
      <div className="w-16 h-16 p-2.5 bg-green-400 flex items-center justify-center rounded-full">
        <CheckIcon className="w-10 h-10 text-white" />
      </div>
    );
  } else if (status === "failed") {
    iconElement = (
      <div className="w-16 h-16 p-2.5 bg-red-400 flex items-center justify-center rounded-full">
        <XMarkIcon className="w-10 h-10 text-white" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-5">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-96 h-fit">
        <div className="flex flex-col items-center justify-center">
          {iconElement}
        </div>
        <div className="mt-6 text-center">{content}</div>
        <div className="flex flex-col justify-between mt-6">
          {onConfirm && (
            <Button
              className="bg-white text-primary font-semibold"
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          )}
          {onCancel && (
            <Button
              className="bg-white text-black/50 font-semibold"
              onClick={onCancel}
            >
              {cancelText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
