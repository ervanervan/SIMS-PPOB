import { useEffect, useState } from "react";
import { getBanners } from "../services/bannerService"; // Pastikan path ini sesuai

export default function Banner() {
  const [banners, setBanners] = useState<any[]>([]); // Ganti any dengan tipe yang sesuai
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const bannerData = await getBanners();
        setBanners(bannerData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return <p>Loading banners...</p>; // Tampilkan loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Tampilkan pesan kesalahan
  }

  return (
    <section className="mt-12">
      <div className="container mx-auto p-5">
        <h2 className="text-black/85 font-semibold">Temukan promo menarik</h2>
      </div>
      <div className="flex gap-6 px-5 lg:px-14 overflow-x-auto scrollbar-none mb-10">
        {banners.map((banner, index) => (
          <div key={index} className="flex-shrink-0">
            <img
              src={banner.banner_image} // Ambil gambar dari data banner
              alt={banner.banner_name} // Gunakan nama banner sebagai alt
              className="w-72 h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
