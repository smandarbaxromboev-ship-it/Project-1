import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Navbar from "./Navbar";

const ExploreMap = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedStation, setSelectedStation] = useState(null);
  const [showNearby, setShowNearby] = useState(true);

  const stations = [
    {
      id: 1,
      name: "Markaziy maydon",
      district: "Shahar markazi",
      lat: 41.3111,
      lng: 69.2797,
      bikes: 18,
      scooters: 12,
      battery: 94,
      color: "#22d3ee",
      status: "available",
    },
    {
      id: 2,
      name: "Amir Temur xiyoboni",
      district: "Markaziy hudud",
      lat: 41.3145,
      lng: 69.2831,
      bikes: 12,
      scooters: 8,
      battery: 87,
      color: "#8b5cf6",
      status: "available",
    },
    {
      id: 3,
      name: "Minor",
      district: "Yunusobod",
      lat: 41.3274,
      lng: 69.289,
      bikes: 8,
      scooters: 15,
      battery: 91,
      color: "#22d3ee",
      status: "available",
    },
    {
      id: 4,
      name: "Magic City",
      district: "Chilonzor",
      lat: 41.2954,
      lng: 69.2368,
      bikes: 5,
      scooters: 7,
      battery: 63,
      color: "#f59e0b",
      status: "low",
    },
    {
      id: 5,
      name: "Tashkent City",
      district: "Shahar markazi",
      lat: 41.3103,
      lng: 69.2452,
      bikes: 16,
      scooters: 11,
      battery: 96,
      color: "#22d3ee",
      status: "available",
    },
    {
      id: 6,
      name: "Oybek",
      district: "Mirobod",
      lat: 41.2996,
      lng: 69.2681,
      bikes: 9,
      scooters: 10,
      battery: 78,
      color: "#8b5cf6",
      status: "available",
    },
    {
      id: 7,
      name: "Seoul Street",
      district: "Yakkasaroy",
      lat: 41.2868,
      lng: 69.2581,
      bikes: 13,
      scooters: 5,
      battery: 89,
      color: "#22d3ee",
      status: "available",
    },
    {
      id: 8,
      name: "Botanika bog'i",
      district: "Yashil hudud",
      lat: 41.3505,
      lng: 69.3357,
      bikes: 6,
      scooters: 3,
      battery: 69,
      color: "#f59e0b",
      status: "low",
    },
    {
      id: 9,
      name: "Universitet",
      district: "Mirzo Ulug'bek",
      lat: 41.3417,
      lng: 69.2937,
      bikes: 15,
      scooters: 13,
      battery: 92,
      color: "#22d3ee",
      status: "available",
    },
    {
      id: 10,
      name: "Samarqand Darvoza",
      district: "Shayxontohur",
      lat: 41.3262,
      lng: 69.2188,
      bikes: 7,
      scooters: 8,
      battery: 76,
      color: "#8b5cf6",
      status: "available",
    },
    {
      id: 11,
      name: "Chorsu",
      district: "Eski shahar",
      lat: 41.3269,
      lng: 69.2286,
      bikes: 11,
      scooters: 6,
      battery: 83,
      color: "#22d3ee",
      status: "available",
    },
    {
      id: 12,
      name: "Anhor",
      district: "Anhor bo'yi",
      lat: 41.325,
      lng: 69.2541,
      bikes: 4,
      scooters: 5,
      battery: 57,
      color: "#f59e0b",
      status: "low",
    },
  ];

  const destinations = [
    {
      name: "Markaziy maydon",
      time: "5 min",
      distance: "1.2 km",
      icon: "🏙️",
    },
    {
      name: "Tashkent City",
      time: "8 min",
      distance: "2.1 km",
      icon: "🌆",
    },
    {
      name: "Magic City",
      time: "11 min",
      distance: "3.4 km",
      icon: "🎡",
    },
    {
      name: "Chorsu",
      time: "14 min",
      distance: "4.2 km",
      icon: "🛍️",
    },
  ];

  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      const text =
        `${station.name} ${station.district}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      if (!matchesSearch) {
        return false;
      }

      if (filter === "bikes") {
        return station.bikes > 0;
      }

      if (filter === "scooters") {
        return station.scooters > 0;
      }

      return true;
    });
  }, [search, filter]);

  const totalBikes = stations.reduce(
    (sum, station) => sum + station.bikes,
    0
  );

  const totalScooters = stations.reduce(
    (sum, station) => sum + station.scooters,
    0
  );

  const averageBattery = Math.round(
    stations.reduce((sum, station) => sum + station.battery, 0) /
      stations.length
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-32">
        <section className="px-6 pb-8">
          <div className="max-w-[1500px] mx-auto">
            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 text-xs font-bold uppercase tracking-[0.18em]">
                  <span className="relative flex w-2.5 h-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-50 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                  </span>
                  VoltGrid Network
                </div>

                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mt-6">
                  Find your
                  <span className="block map-gradient-text">
                    next ride.
                  </span>
                </h1>

                <p className="max-w-2xl text-slate-400 text-lg leading-8 mt-6">
                  Shahar bo'ylab mavjud velosiped va samokatlarni toping,
                  stansiyani tanlang va safaringizni rejalashtiring.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full xl:w-auto">
                <div className="map-stat">
                  <span className="text-slate-500 text-xs">
                    Bikes
                  </span>
                  <strong className="text-cyan-400">
                    {totalBikes}
                  </strong>
                </div>

                <div className="map-stat">
                  <span className="text-slate-500 text-xs">
                    Scooters
                  </span>
                  <strong className="text-violet-400">
                    {totalScooters}
                  </strong>
                </div>

                <div className="map-stat">
                  <span className="text-slate-500 text-xs">
                    Stations
                  </span>
                  <strong>
                    {stations.length}
                  </strong>
                </div>

                <div className="map-stat">
                  <span className="text-slate-500 text-xs">
                    Battery
                  </span>
                  <strong className="text-emerald-400">
                    {averageBattery}%
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-[1500px] mx-auto">
            <div className="map-shell">
              <div className="grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)] min-h-[760px]">
                <aside className="border-r border-white/10 bg-slate-950/80 backdrop-blur-xl">
                  <div className="p-5 border-b border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-[0.18em]">
                          Station finder
                        </p>

                        <h2 className="text-xl font-bold mt-1">
                          Transport toping
                        </h2>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                        ⌖
                      </div>
                    </div>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        ⌕
                      </span>

                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Stansiyani qidiring..."
                        className="
                          w-full
                          bg-white/[0.04]
                          border border-white/10
                          rounded-xl
                          py-3.5
                          pl-11
                          pr-4
                          text-sm
                          text-white
                          outline-none
                          placeholder:text-slate-600
                          focus:border-cyan-400/40
                          transition
                        "
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {[
                        ["all", "Barchasi"],
                        ["bikes", "Bikes"],
                        ["scooters", "Scooters"],
                      ].map(([id, label]) => (
                        <button
                          key={id}
                          onClick={() => setFilter(id)}
                          className={`py-2.5 rounded-xl text-xs font-bold transition ${
                            filter === id
                              ? "bg-cyan-400 text-slate-950"
                              : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.07]"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between px-1 mb-3">
                      <span className="text-xs text-slate-500 uppercase tracking-[0.16em]">
                        Yaqin stansiyalar
                      </span>

                      <span className="text-xs text-slate-600">
                        {filteredStations.length}
                      </span>
                    </div>

                    <div className="space-y-2 max-h-[570px] overflow-y-auto pr-1">
                      {filteredStations.map((station, index) => (
                        <motion.button
                          key={station.id}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.25,
                            delay: index * 0.03,
                          }}
                          onClick={() => setSelectedStation(station)}
                          className={`
                            w-full
                            text-left
                            rounded-2xl
                            border
                            p-4
                            transition-all
                            ${
                              selectedStation?.id === station.id
                                ? "border-cyan-400/40 bg-cyan-400/[0.07]"
                                : "border-white/[0.06] bg-white/[0.025] hover:bg-white/[0.05] hover:border-white/10"
                            }
                          `}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    station.status === "low"
                                      ? "bg-amber-400"
                                      : "bg-cyan-400"
                                  }`}
                                ></span>

                                <p className="font-semibold truncate">
                                  {station.name}
                                </p>
                              </div>

                              <p className="text-xs text-slate-500 mt-1 ml-4">
                                {station.district}
                              </p>
                            </div>

                            <span className="text-xs text-slate-500">
                              {station.bikes + station.scooters}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mt-4">
                            <div>
                              <p className="text-[10px] text-slate-600">
                                BIKES
                              </p>
                              <p className="text-sm font-bold text-cyan-400 mt-0.5">
                                {station.bikes}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] text-slate-600">
                                SCOOTERS
                              </p>
                              <p className="text-sm font-bold text-violet-400 mt-0.5">
                                {station.scooters}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] text-slate-600">
                                BATTERY
                              </p>
                              <p className="text-sm font-bold text-emerald-400 mt-0.5">
                                {station.battery}%
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}

                      {filteredStations.length === 0 && (
                        <div className="py-16 text-center">
                          <div className="text-4xl opacity-30">
                            ⌕
                          </div>

                          <p className="text-slate-500 mt-3">
                            Stansiya topilmadi
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </aside>

                <div className="relative min-h-[760px]">
                  <MapContainer
                    center={[41.3111, 69.2797]}
                    zoom={12}
                    zoomControl={false}
                    className="absolute inset-0 h-full w-full"
                  >
                    <TileLayer
                      attribution='&copy; OpenStreetMap contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <ZoomControl position="bottomright" />

                    {filteredStations.map((station) => (
                      <CircleMarker
                        key={station.id}
                        center={[station.lat, station.lng]}
                        radius={
                          selectedStation?.id === station.id
                            ? 13
                            : 9
                        }
                        pathOptions={{
                          color:
                            selectedStation?.id === station.id
                              ? "#ffffff"
                              : station.status === "low"
                              ? "#f59e0b"
                              : "#22d3ee",
                          fillColor:
                            station.status === "low"
                              ? "#f59e0b"
                              : "#22d3ee",
                          fillOpacity: 0.9,
                          weight:
                            selectedStation?.id === station.id
                              ? 4
                              : 2,
                        }}
                        eventHandlers={{
                          click: () => setSelectedStation(station),
                        }}
                      >
                        <Popup>
                          <div className="popup-card">
                            <strong>{station.name}</strong>
                            <span>{station.district}</span>

                            <div className="popup-row">
                              <span>🚲 {station.bikes}</span>
                              <span>🛴 {station.scooters}</span>
                            </div>
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>

                  <div className="absolute top-5 left-5 right-5 z-[500] pointer-events-none">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div className="map-floating-panel pointer-events-auto">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                            🗺️
                          </span>

                          <div>
                            <p className="font-bold">
                              Tashkent Network
                            </p>

                            <p className="text-xs text-slate-500 mt-0.5">
                              VoltGrid transport tarmog'i
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="map-floating-panel pointer-events-auto">
                        <button
                          onClick={() => setShowNearby(!showNearby)}
                          className={`flex items-center gap-3 text-sm font-semibold ${
                            showNearby
                              ? "text-cyan-300"
                              : "text-slate-400"
                          }`}
                        >
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              showNearby
                                ? "bg-cyan-400 animate-pulse"
                                : "bg-slate-600"
                            }`}
                          ></span>

                          Yaqin transportlar
                        </button>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedStation && (
                      <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 25 }}
                        className="absolute left-5 right-5 bottom-5 z-[500] xl:left-auto xl:w-[430px]"
                      >
                        <div className="rounded-3xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl shadow-2xl overflow-hidden">
                          <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                                  <span className="text-xs text-cyan-300 uppercase tracking-[0.16em] font-bold">
                                    Station
                                  </span>
                                </div>

                                <h3 className="text-2xl font-black mt-2">
                                  {selectedStation.name}
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                  {selectedStation.district}
                                </p>
                              </div>

                              <button
                                onClick={() => setSelectedStation(null)}
                                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mt-6">
                              <div className="station-detail">
                                <span>🚲</span>
                                <p>Velosiped</p>
                                <strong>{selectedStation.bikes}</strong>
                              </div>

                              <div className="station-detail">
                                <span>🛴</span>
                                <p>Samokat</p>
                                <strong>{selectedStation.scooters}</strong>
                              </div>

                              <div className="station-detail">
                                <span>⚡</span>
                                <p>Battery</p>
                                <strong>
                                  {selectedStation.battery}%
                                </strong>
                              </div>
                            </div>

                            <div className="mt-5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500">
                                  O'rtacha batareya
                                </span>

                                <span className="text-emerald-400 font-bold">
                                  {selectedStation.battery}%
                                </span>
                              </div>

                              <div className="h-2 rounded-full bg-white/5 mt-2 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                                  style={{
                                    width: `${selectedStation.battery}%`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                              <button
                                onClick={() => navigate("/bikes")}
                                className="flex-1 py-3.5 rounded-xl bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition"
                              >
                                Bikes
                              </button>

                              <button
                                onClick={() => navigate("/scooters")}
                                className="flex-1 py-3.5 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition"
                              >
                                Scooters
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-[1500px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <p className="text-cyan-400 text-sm font-bold uppercase tracking-[0.2em]">
                  Popular destinations
                </p>

                <h2 className="text-4xl md:text-5xl font-black mt-3">
                  Where are you going?
                </h2>

                <p className="text-slate-400 mt-4 max-w-2xl">
                  Mashhur yo'nalishlar uchun yaqin VoltGrid stansiyasini
                  toping va safaringizni oldindan rejalashtiring.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">
              {destinations.map((destination, index) => (
                <motion.div
                  key={destination.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -7 }}
                  className="destination-card"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                      {destination.icon}
                    </div>

                    <span className="text-cyan-400 text-xl">
                      ↗
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mt-7">
                    {destination.name}
                  </h3>

                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <span className="text-slate-400">
                      ⏱ {destination.time}
                    </span>

                    <span className="text-slate-600">
                      •
                    </span>

                    <span className="text-slate-400">
                      {destination.distance}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setSearch(destination.name)
                    }
                    className="mt-6 w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-semibold transition"
                  >
                    Xaritadan topish
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-[1500px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-400/[0.07] via-slate-900 to-indigo-500/[0.07] p-8 md:p-12">
                <div className="max-w-3xl">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-2xl">
                    ⚡
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black mt-7 leading-tight">
                    Your ride should be
                    <span className="block text-cyan-400">
                      close to you.
                    </span>
                  </h2>

                  <p className="text-slate-400 text-lg leading-8 mt-5">
                    VoltGrid xaritasi orqali transportni oldindan toping,
                    kerakli stansiyani tanlang va yo'lga chiqishni
                    tezlashtiring.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mt-8">
                    <button
                      onClick={() => navigate("/bikes")}
                      className="px-6 py-3.5 rounded-xl bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition"
                    >
                      Velosipedlar
                    </button>

                    <button
                      onClick={() => navigate("/pricing")}
                      className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition"
                    >
                      Tariflarni ko'rish
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8">
                <p className="text-slate-500 text-sm uppercase tracking-[0.18em]">
                  Network status
                </p>

                <div className="flex items-center gap-3 mt-5">
                  <span className="relative flex w-3 h-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
                  </span>

                  <span className="text-emerald-400 font-bold">
                    Tizim faol
                  </span>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      Stansiyalar
                    </span>
                    <span className="font-bold">
                      {stations.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      Transportlar
                    </span>
                    <span className="font-bold">
                      {totalBikes + totalScooters}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">
                      O'rtacha battery
                    </span>
                    <span className="font-bold text-emerald-400">
                      {averageBattery}%
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowNearby(!showNearby)}
                  className="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-semibold transition"
                >
                  {showNearby
                    ? "Yaqin transportlar yoqilgan"
                    : "Yaqin transportlarni yoqish"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="max-w-[1500px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
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

              <p className="text-slate-400 text-sm leading-7 mt-5 max-w-sm">
                Zamonaviy elektr transportlar bilan shaharda qulay, tez va
                ekologik harakatlaning.
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
              <h3 className="font-semibold">
                Transportlar
              </h3>

              <div className="space-y-3 text-sm text-slate-400 mt-5">
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
                  onClick={() => navigate("/map")}
                  className="block hover:text-white transition"
                >
                  Explore Map
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">
                Kompaniya
              </h3>

              <div className="space-y-3 text-sm text-slate-400 mt-5">
                <button className="block hover:text-white transition">
                  Biz haqimizda
                </button>

                <button className="block hover:text-white transition">
                  Vakansiyalar
                </button>

                <button className="block hover:text-white transition">
                  Blog
                </button>

                <button className="block hover:text-white transition">
                  Aloqa
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">
                Qo'llab-quvvatlash
              </h3>

              <div className="space-y-3 text-sm text-slate-400 mt-5">
                <button className="block hover:text-white transition">
                  Yordam markazi
                </button>

                <button className="block hover:text-white transition">
                  Xavfsizlik
                </button>

                <button className="block hover:text-white transition">
                  Shartlar
                </button>

                <button className="block hover:text-white transition">
                  Maxfiylik
                </button>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-7 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © 2026 VoltGrid. Barcha huquqlar himoyalangan.
            </p>

            <div className="flex flex-wrap justify-center gap-5 text-sm text-slate-500">
              <button className="hover:text-white transition">
                Shartlar
              </button>

              <button className="hover:text-white transition">
                Maxfiylik
              </button>

              <button className="hover:text-white transition">
                Cookie fayllari
              </button>

              <button className="hover:text-white transition">
                Qulaylik
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExploreMap;