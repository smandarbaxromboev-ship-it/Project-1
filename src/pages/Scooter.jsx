import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Scooters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [scooters, setScooters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Scooters", path: "/scooters" },
    { name: "Bikes", path: "/bikes" },
    { name: "Pricing", path: "/pricing" },
    { name: "Explore Map", path: "/explore-map" },
  ];

  const goTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  useEffect(() => {
    fetch("https://6a7c6eefa008c10e4cbf67e9.mockapi.io/Shop")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }

        return response.json();
      })
      .then((data) => {
        setScooters(data.slice(0, 27));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setLoading(false);
      });
  }, []);

  const filteredScooters = scooters.filter((scooter) =>
    scooter.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-xl">Загрузка скутеров...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}

      <Navbar />

      {/* SCOOTERS */}

      <div className="px-6 py-10 pt-32">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold mb-3">
            Scooters
          </h1>

          <p className="text-slate-400 mb-6">
            Выберите подходящий скутер
          </p>

          {/* SEARCH */}

          <div className="mb-10 max-w-xl">
            <div className="relative">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search scooter..."
                className="
                  w-full
                  rounded-2xl
                  border border-white/10
                  bg-slate-900
                  py-4 pl-12 pr-4
                  text-white
                  outline-none
                  placeholder:text-slate-500
                  transition
                  focus:border-cyan-400/50
                  focus:ring-2
                  focus:ring-cyan-400/10
                "
              />

            </div>
          </div>

          {/* SCOOTER CARDS */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredScooters.map((scooter) => (

              <div
                key={scooter.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition duration-300"
              >

                <div className="h-90 bg-slate-800 flex items-center justify-center">

                  <img
                    src={scooter.image}
                    alt={scooter.name}
                    className="w-full h-full object-cover"
                  />

                </div>

                <div className="p-5">

                  <h2 className="text-xl font-semibold mb-4">
                    {scooter.name}
                  </h2>

                  <div className="space-y-2 text-sm text-slate-400">

                    <p>
                      🔋 Battery:{" "}
                      <span className="text-white">
                        {scooter.battery}
                      </span>
                    </p>

                    <p>
                      🛣️ Range:{" "}
                      <span className="text-white">
                        {scooter.range}
                      </span>
                    </p>

                    <p>
                      💰 Price:{" "}
                      <span className="text-cyan-400 font-semibold">
                        {scooter.price}
                      </span>
                    </p>

                  </div>

                  <button
                    onClick={() => setSelectedVehicle(scooter)}
                    className="w-full mt-5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl transition"
                  >
                    Подробнее
                  </button>

                </div>

              </div>

            ))}

          </div>

          {filteredScooters.length === 0 && (
            <div className="text-center py-20">

              <div className="text-5xl mb-4">
                🔍
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                Ничего не найдено
              </h2>

              <p className="text-slate-400">
                Попробуйте изменить название скутера
              </p>

            </div>
          )}

        </div>

      </div>

      {/* FOOTER */}

      <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617]">

        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-24">

          <div className="grid grid-cols-1 gap-12 pb-20 md:grid-cols-2 lg:grid-cols-5">

            <div className="lg:col-span-2">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/30">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="h-7 w-7 fill-none stroke-white"
                    strokeWidth="7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="25" cy="65" r="17.5" />
                    <circle cx="75" cy="65" r="17.5" />
                    <path d="M25 65l17.5-30h22.5M75 65L60 30M42.5 35l15 30M60 30h12.5M37.5 30h10" />
                  </svg>

                </div>

                <span className="text-3xl font-black text-white">
                  Volt<span className="text-cyan-400">Grid</span>
                </span>

              </div>

              <p className="max-w-md leading-relaxed text-slate-400">
                Elektr transportining yangi avlodi. Shahar uchun yaratilgan,
                sarguzashtlar uchun mo‘ljallangan va innovatsiyalar bilan
                ta’minlangan.
              </p>

              <div className="mt-8 flex gap-3">

                {["𝕏", "◎", "f", "in"].map((social) => (

                  <motion.button
                    key={social}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-11 w-11 rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
                  >
                    {social}
                  </motion.button>

                ))}

              </div>

            </div>

            <div>

              <h4 className="mb-6 font-bold text-white">
                Transportlar
              </h4>

              <div className="space-y-4">

                {[
                  "Elektr velosipedlar",
                  "Elektr samokatlar",
                  "Shahar modellari",
                  "Yuqori unumdorlik",
                  "Aksessuarlar",
                ].map((item) => (

                  <a
                    key={item}
                    href="#"
                    className="block text-slate-400 transition hover:text-cyan-400"
                  >
                    {item}
                  </a>

                ))}

              </div>

            </div>

            <div>

              <h4 className="mb-6 font-bold text-white">
                Kompaniya
              </h4>

              <div className="space-y-4">

                {[
                  "Biz haqimizda",
                  "Bizning tariximiz",
                  "Karyera",
                  "Aloqa",
                  "Manzillar",
                ].map((item) => (

                  <a
                    key={item}
                    href="#"
                    className="block text-slate-400 transition hover:text-cyan-400"
                  >
                    {item}
                  </a>

                ))}

              </div>

            </div>

            <div>

              <h4 className="mb-6 font-bold text-white">
                Qo‘llab-quvvatlash
              </h4>

              <div className="space-y-4">

                {[
                  "Yordam markazi",
                  "Savollar",
                  "Yetkazib berish",
                  "Kafolat",
                  "Maxfiylik",
                ].map((item) => (

                  <a
                    key={item}
                    href="#"
                    className="block text-slate-400 transition hover:text-cyan-400"
                  >
                    {item}
                  </a>

                ))}

              </div>

            </div>

          </div>

          <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 md:flex-row">

            <p className="text-sm text-slate-500">
              © 2026 VoltGrid. Barcha huquqlar himoyalangan.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">

              <a href="#" className="transition hover:text-white">
                Shartlar
              </a>

              <a href="#" className="transition hover:text-white">
                Maxfiylik
              </a>

              <a href="#" className="transition hover:text-white">
                Cookie fayllari
              </a>

              <a href="#" className="transition hover:text-white">
                Maxsus imkoniyatlar
              </a>

            </div>

          </div>

        </div>

      </footer>

      {/* PRODUCT MODAL */}

      <AnimatePresence>

        {selectedVehicle && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-md"
            onClick={() => setSelectedVehicle(null)}
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 100,
                scale: 0.8,
                rotateX: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                y: 70,
                scale: 0.8,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-[32px] border border-white/10 bg-[#0c1014]"
            >

              <motion.button
                whileHover={{
                  rotate: 90,
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setSelectedVehicle(null)}
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl backdrop-blur"
              >
                ×
              </motion.button>

              <div className="relative w-full max-h-[500px] sm:max-h-[600px] bg-slate-800 flex items-center justify-center p-6 overflow-hidden">

                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="max-w-full max-h-[400px] sm:max-h-[480px] w-auto h-auto object-contain relative z-10"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1014] via-transparent to-transparent z-20 pointer-events-none" />

              </div>

              <div className="p-7 sm:p-9">

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400"
                >
                  E-samokat
                </motion.p>

                <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-3xl font-black"
                  >
                    {selectedVehicle.name}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.35,
                      type: "spring",
                    }}
                    className="text-2xl font-black text-lime-400"
                  >
                    {selectedVehicle.price} UZS
                  </motion.p>

                </div>

                <div className="mt-7 grid grid-cols-3 gap-3">

                  {[
                    [
                      "Batareya",
                      selectedVehicle.battery
                        ? `${selectedVehicle.battery}%`
                        : "N/A",
                    ],
                    [
                      "Masofa",
                      selectedVehicle.range || "N/A",
                    ],
                    [
                      "Og‘irlik",
                      selectedVehicle.weight || "N/A",
                    ],
                  ].map(([label, value], index) => (

                    <motion.div
                      key={label}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.4 + index * 0.1,
                      }}
                      whileHover={{ y: -5 }}
                      className="rounded-2xl bg-white/[0.04] p-4"
                    >

                      <p className="text-xs text-white/30">
                        {label}
                      </p>

                      <p className="mt-1 font-bold">
                        {value}
                      </p>

                    </motion.div>

                  ))}

                </div>

                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 40px rgba(163,230,53,0.25)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    alert(
                      `Rahmat! Siz ${selectedVehicle.name} ni tanladingiz. Tez orada siz bilan bog‘lanamiz.`
                    );

                    setSelectedVehicle(null);
                  }}
                  className="mt-7 w-full rounded-2xl bg-lime-400 py-4 font-black text-black"
                >
                  {selectedVehicle.name} ga buyurtma berish
                </motion.button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default Scooters;