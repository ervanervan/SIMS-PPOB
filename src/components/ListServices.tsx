import imagePBB from "../assets/images/PBB.png";
import imageListrik from "../assets/images/Listrik.png";
import imagePulsa from "../assets/images/Pulsa.png";
import imagePDAM from "../assets/images/PDAM.png";
import imagePGN from "../assets/images/PGN.png";
import imageTV from "../assets/images/Televisi.png";
import imageMusik from "../assets/images/Musik.png";
import imageGame from "../assets/images/Game.png";
import imageMakanan from "../assets/images/Voucher Makanan.png";
import imageKurban from "../assets/images/Kurban.png";
import imageZakat from "../assets/images/Zakat.png";
import imagePaketData from "../assets/images/Paket Data.png";

const services = [
  { name: "PBB", image: imagePBB },
  { name: "Listrik", image: imageListrik },
  { name: "Pulsa", image: imagePulsa },
  { name: "PDAM", image: imagePDAM },
  { name: "PGN", image: imagePGN },
  { name: "Tv Langganan", image: imageTV },
  { name: "Musik", image: imageMusik },
  { name: "Voucher Game", image: imageGame },
  { name: "Voucher Makanan", image: imageMakanan },
  { name: "Kurban", image: imageKurban },
  { name: "Zakat", image: imageZakat },
  { name: "Paket Data", image: imagePaketData },
];

export default function ListServices() {
  return (
    <section className="px-5 py-6 container mx-auto">
      <div className="flex flex-wrap items-center justify-between md:justify-start lg:justify-between md:gap-x-4 gap-y-14 gap-x-5 lg:gap-5">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center size-16">
            <img
              src={service.image}
              alt={service.name}
              className="size-16 object-cover"
            />
            <p className="mt-2 text-center text-sm text-black/85">
              {service.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
