import banner1 from "../assets/images/Banner 1.png";
import banner2 from "../assets/images/Banner 2.png";
import banner3 from "../assets/images/Banner 3.png";
import banner4 from "../assets/images/Banner 4.png";
import banner5 from "../assets/images/Banner 5.png";

const banners = [banner1, banner2, banner3, banner4, banner5];

export default function Banner() {
  return (
    <section className="mt-12">
      <div className="container mx-auto p-5">
        <h2 className="text-black/85 font-semibold">Temukan promo menarik</h2>
      </div>
      <div className="flex gap-6 px-5 lg:px-14 overflow-x-auto scrollbar-none mb-10">
        {banners.map((banner, index) => (
          <div key={index} className="flex-shrink-0">
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-72 h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
