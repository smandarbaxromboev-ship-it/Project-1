import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Bikes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [bikes, setBikes] = useState([]);
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
        const bikeData = data.filter(
          (vehicle) => Number(vehicle.id) >= 29
        );

        setBikes(bikeData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        setLoading(false);
      });
  }, []);

  const filteredBikes = bikes.filter((bike) =>
    bike.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-xl">Загрузка Велосипедов...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="px-6 py-10 pt-32">
        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-3">
              Bikes
            </h1>

            <p className="text-slate-400 mb-6">
              Выберите подходящий велосипед
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
                  placeholder="Search bike..."
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
          </motion.div>

          {filteredBikes.length === 0 ? (
            <div className="text-center py-32">

              <div className="text-5xl mb-4">
                🔍
              </div>

              <p className="text-slate-400 text-lg">
                Велосипеды не найдены
              </p>

            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {filteredBikes.map((bike, index) => (

                <motion.div
                  key={bike.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.03,
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                  className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-cyan-400/30 transition-all"
                >

                  <div className="h-90 bg-slate-800 flex items-center justify-center overflow-hidden">

                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  <div className="p-5">

                    <h2 className="text-xl font-semibold mb-4">
                      {bike.name}
                    </h2>

                    <div className="space-y-2 text-sm text-slate-400">

                      <p>
                        🔋 Battery:{" "}
                        <span className="text-white">
                          {bike.battery}
                        </span>
                      </p>

                      <p>
                        🛣️ Range:{" "}
                        <span className="text-white">
                          {bike.range}
                        </span>
                      </p>

                      <p>
                        💰 Price:{" "}
                        <span className="text-cyan-400 font-semibold">
                          {bike.price}
                        </span>
                      </p>

                    </div>

                    <button
                      onClick={() => setSelectedVehicle(bike)}
                      className="w-full mt-5 bg-white/5 hover:bg-cyan-400 hover:text-black border border-white/10 hover:border-cyan-400 py-3 rounded-xl font-semibold transition-all"
                    >
                      Подробнее
                    </button>

                  </div>

                </motion.div>

              ))}

            </div>
          )}

        </div>
      </div>

      <footer className="mt-20 border-t border-white/10 bg-slate-950">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center">

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 2L5 13H11L10.5 22L19 10.5H13L13.5 2Z"
                      fill="black"
                    />
                  </svg>

                </div>

                <span className="text-xl font-bold">
                  VoltGrid
                </span>

              </div>

              <p className="text-slate-400 text-sm leading-6 max-w-sm">
                Zamonaviy elektr transportlar bilan shaharda
                qulay, tez va ekologik harakatlaning.
              </p>

              <div className="flex gap-3 mt-6">

                {["𝕏", "◎", "f", "in"].map((social) => (

                  <button
                    key={social}
                    className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-400 hover:text-black transition"
                  >
                    {social}
                  </button>

                ))}

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-5">
                Transportlar
              </h3>

              <div className="space-y-3 text-sm text-slate-400">

                <button
                  onClick={() => navigate("/scooters")}
                  className="block hover:text-white transition"
                >
                  Scooters
                </button>

                <button
                  onClick={() => navigate("/bikes")}
                  className="block hover:text-white transition"
                >
                  Bikes
                </button>

                <button
                  onClick={() => navigate("/pricing")}
                  className="block hover:text-white transition"
                >
                  Pricing
                </button>

                <button
                  onClick={() => navigate("/explore-map")}
                  className="block hover:text-white transition"
                >
                  Explore Map
                </button>

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-5">
                Kompaniya
              </h3>

              <div className="space-y-3 text-sm text-slate-400">

                <button className="block hover:text-white transition">
                  About Us
                </button>

                <button className="block hover:text-white transition">
                  Careers
                </button>

                <button className="block hover:text-white transition">
                  Blog
                </button>

                <button className="block hover:text-white transition">
                  Contact
                </button>

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-5">
                Qo‘llab-quvvatlash
              </h3>

              <div className="space-y-3 text-sm text-slate-400">

                <button className="block hover:text-white transition">
                  Help Center
                </button>

                <button className="block hover:text-white transition">
                  Safety
                </button>

                <button className="block hover:text-white transition">
                  Terms
                </button>

                <button className="block hover:text-white transition">
                  Privacy
                </button>

              </div>

            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-slate-500">
              © 2026 VoltGrid. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-5 text-sm text-slate-500">

              <button className="hover:text-white transition">
                Terms
              </button>

              <button className="hover:text-white transition">
                Privacy
              </button>

              <button className="hover:text-white transition">
                Cookies
              </button>

              <button className="hover:text-white transition">
                Accessibility
              </button>

            </div>

          </div>

        </div>

      </footer>

      <AnimatePresence>

        {selectedVehicle && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVehicle(null)}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              transition={{
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >

              <div className="h-80 bg-slate-800 flex items-center justify-center p-4">

                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-full h-full object-contain"
                />

              </div>

              <div className="p-7">

                <div className="flex items-start justify-between gap-5 mb-6">

                  <div>

                    <h2 className="text-3xl font-bold">
                      {selectedVehicle.name}
                    </h2>

                    <p className="text-cyan-400 text-xl font-semibold mt-2">
                      {selectedVehicle.price}
                    </p>

                  </div>

                  <button
                    onClick={() => setSelectedVehicle(null)}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-white/10 transition"
                  >
                    ✕
                  </button>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                    <p className="text-sm text-slate-400">
                      Battery
                    </p>

                    <p className="text-lg font-semibold mt-1">
                      {selectedVehicle.battery}
                    </p>

                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4">

                    <p className="text-sm text-slate-400">
                      Range
                    </p>

                    <p className="text-lg font-semibold mt-1">
                      {selectedVehicle.range}
                    </p>

                  </div>

                </div>

                <button className="w-full py-4 rounded-2xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition shadow-lg shadow-cyan-400/20">
                  Start Ride
                </button>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
};

export default Bikes;