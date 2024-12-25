import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate dari React Router
import { getServices } from "../services/productService"; // Pastikan path ini sesuai

// Definisikan tipe untuk layanan
interface Service {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export default function ListServices() {
  const [services, setServices] = useState<Service[]>([]); // Ganti any dengan tipe yang sesuai
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const serviceData = await getServices();
        setServices(serviceData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (serviceCode: string) => {
    // Navigasi ke halaman detail layanan dengan state
    navigate(`/transaction/${serviceCode}`, { state: { services } }); // Mengirimkan data services ke halaman detail
  };

  if (loading) {
    return (
      <section className="px-5 py-6 container mx-auto">
        <div className="flex flex-wrap items-center justify-between md:justify-start lg:justify-between md:gap-x-4 gap-y-14 gap-x-5 lg:gap-5">
          {/* Skeleton untuk setiap layanan */}
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-20 h-28 bg-gray-100 animate-pulse rounded-lg"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full mt-4"></div>
              <div className="w-16 h-4 bg-gray-200 mt-2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return <p>Error: {error}</p>; // Tampilkan pesan kesalahan
  }

  return (
    <section className="px-5 py-6 container mx-auto">
      <div className="flex flex-wrap items-center justify-between md:justify-start lg:justify-between md:gap-x-4 gap-y-14 gap-x-5 lg:gap-5">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center size-16 cursor-pointer" // Tambahkan cursor-pointer
            onClick={() => handleServiceClick(service.service_code)} // Tambahkan event handler
          >
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="size-16 object-cover"
            />
            <p className="mt-2 text-center text-sm text-black/85">
              {service.service_name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
