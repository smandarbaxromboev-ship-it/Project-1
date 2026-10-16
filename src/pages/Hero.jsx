  import React, { useEffect, useState } from "react";
  
  import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useSpring,
  } from "framer-motion";

  const Hero = () => {
    const [vehicles, setVehicles] = useState([]);
    const [filter, setFilter] = useState("all");
    const [showMap, setShowMap] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);

    const { scrollY } = useScroll();

    const smoothScroll = useSpring(scrollY, {
      stiffness: 80,
      damping: 20,
    });

    const heroImageY = useTransform(smoothScroll, [0, 800], [0, 180]);
    const heroGlowY = useTransform(smoothScroll, [0, 800], [0, -120]);
    const heroOpacity = useTransform(smoothScroll, [0, 600], [1, 0.2]);

    useEffect(() => {
      fetch("https://6a7c6eefa008c10e4cbf67e9.mockapi.io/Shop")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setVehicles(data);
          }
        })
        .catch((error) => {
          console.error("API yuklashda xatolik:", error);
        });
    }, []);

    const productCatalog = [
      {
        name: "Volt Urban X1",
        type: "bike",
        image:
          "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Volt Trail Pro",
        type: "bike",
        image:
          "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Volt City One",
        type: "bike",
        image:
          "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Volt Carbon S",
        type: "bike",
        image:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Volt Explorer",
        type: "bike",
        image:
          "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Volt Racer X",
        type: "bike",
        image:
          "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Volt S1 Pro",
        type: "scooter",
        image:
          "https://image.made-in-china.com/365f3j00CVghnEFlADzy/48V-1000W-.webp",
      },
      {
        name: "Volt City S",
        type: "scooter",
        image:
          "https://bugatti-newsroom.imgix.net/870176f0aaa4469c82d7fb886fabe399/2023%20Bugatti%20Electric%20Scooter_Black%202.jpg?auto=format,compress&cs=srgb&sharp=10&w=328&dpr=2.625",
      },
      {
        name: "Volt Speed S2",
        type: "scooter",
        image:
          "https://images.uzum.uz/da7a7l2fa6ro5o4mjvqg/t_product_540_high.jpg",
      },
      {
        name: "Volt Max S",
        type: "scooter",
        image:
          "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=90",
      },
      {
        name: "Volt Air S",
        type: "scooter",
        image:
          "https://e-inthezone.com/cdn/shop/articles/36ee37c42d6a59724eb78743be6a92f4.png?v=1780570616",
      },
      {
        name: "Volt Premium S",
        type: "scooter",
        image:
          "https://carakoom.com/data/wall/787/638921d1.jpg",
      },
    ];

    const displayedVehicles = productCatalog.map((product, index) => {
      const apiVehicle = vehicles[index] || {};

      return {
        id: `volt-${index + 1}`,
        name: product.name,
        type: product.type,
        image: product.image,
        price: apiVehicle.price || `${399 + index * 100}`,
        battery: apiVehicle.battery || `${80 + (index % 5) * 5}`,
        range: apiVehicle.range || `${35 + index * 3} km`,
        weight: apiVehicle.weight || `${14 + (index % 5)} kg`,
      };
    });

    const filteredVehicles = displayedVehicles.filter((vehicle) => {
      if (filter === "all") return true;
      return vehicle.type === filter;
    });

    const scrollToCatalog = () => {
      document.getElementById("catalog")?.scrollIntoView({
        behavior: "smooth",
      });
    };

    const sectionAnimation = {
      hidden: {
        opacity: 0,
        y: 80,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    };

    const cardAnimation = {
      hidden: {
        opacity: 0,
        y: 70,
        scale: 0.92,
      },
      visible: (index) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          delay: index * 0.08,
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        },
      }),
    };

    return (
      <div className="min-h-screen overflow-hidden bg-[#07090b] text-white">
        {/* BACKGROUND ANIMATION */}

        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, -80, 0],
              y: [0, -70, 60, 0],
              scale: [1, 1.15, 0.9, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[-200px] top-[10%] h-[500px] w-[500px] rounded-full bg-lime-400/[0.07] blur-[150px]"
          />

          <motion.div
            animate={{
              x: [0, -120, 80, 0],
              y: [0, 100, -60, 0],
              scale: [1, 0.85, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[-250px] top-[35%] h-[600px] w-[600px] rounded-full bg-lime-300/[0.05] blur-[160px]"
          />

          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-[35%] top-[20%] h-[350px] w-[350px] rounded-full border border-lime-400/[0.04]"
          />
        </div>

        {/* NAVBAR */}

        {/* HERO */}

        <main className="relative z-10 mx-auto max-w-7xl px-5 pt-32 lg:px-8">
          <motion.section
            style={{ opacity: heroOpacity }}
            className="grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-24"
          >
            <div>
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/[0.06] px-4 py-2"
              >
                <motion.span
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="h-2 w-2 rounded-full bg-lime-400"
                />

                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-400">
                  Elektr transport
                </span>
              </motion.div>

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 70,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl"
              >
                  O‘zingga xos
                <br />
                <motion.span
                  initial={{
                    opacity: 0,
                    x: -30,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0, 
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                  }}
                  className="inline-block text-lime-400"
                >
            
                    harakat qil.
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.65,
                }}
                className="mt-8 max-w-xl text-base leading-7 text-white/50 sm:text-lg"
              >
                Shahar, sayohat va kundalik safarlar uchun zamonaviy
                elektrovelosipedlar va elektrosamokatlar.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                }}
                className="mt-10 flex flex-col gap-3 sm:flex-row"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 45px rgba(163,230,53,0.35)",
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={scrollToCatalog}
                  className="rounded-full bg-lime-400 px-8 py-4 font-bold text-black"
                >
                  Katalogni ko‘rish →
                </motion.button>

                <motion.a
                  whileHover={{
                    scale: 1.04,
                    borderColor: "rgba(255,255,255,0.3)",
                  }}
                  href="#about"
                  className="rounded-full border border-white/10 px-8 py-4 text-center font-semibold text-white/70"
                >
                  Batafsil ma’lumot
                </motion.a>
              </motion.div>

              <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.08] pt-8">
                {[
                  ["12+", "model"],
                  ["40+", "km yurish masofasi"],
                  ["2 yil", "kafolat"],
                ].map(([number, text], index) => (
                  <motion.div
                    key={text}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 1 + index * 0.15,
                    }}
                  >
                    <motion.p
                      animate={{
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                      className="text-2xl font-black"
                    >
                      {number}
                    </motion.p>

                    <p className="mt-1 text-xs text-white/40">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* HERO IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                x: 100,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              <motion.div
                style={{ y: heroGlowY }}
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-10 rounded-full bg-lime-400/10 blur-[100px]"
              />

              <motion.div
                style={{ y: heroImageY }}
                whileHover={{
                  scale: 1.02,
                }}
                className="relative overflow-hidden rounded-[40px] border border-white/[0.08] bg-[#0d1115]"
              >
                <motion.img
                  animate={{
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  src={productCatalog[0].image}
                  alt="Volt Urban X1"
                  className="h-[500px] w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-7 pt-32">
                  <div className="flex items-end justify-between">
                    <div>
                      <motion.p
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-400"
                      >
                        Tavsiya etilgan
                      </motion.p>

                      <h2 className="mt-2 text-3xl font-black">
                        Volt Urban X1
                      </h2>
                    </div>

                    <motion.span
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(163,230,53,0.2)",
                      }}
                      className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur"
                    >
                      E-velosiped
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* CATALOG */}

          <motion.section
            id="catalog"
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="scroll-mt-28 py-24"
          >
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <motion.p
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400"
                >
                  Katalog
                </motion.p>

                <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                  Transportingni
                  <br />
                  tanla.
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { id: "all", label: "Barchasi" },
                  { id: "bike", label: "Velosipedlar" },
                  { id: "scooter", label: "Samokatlar" },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{
                      y: -4,
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.94,
                    }}
                    onClick={() => setFilter(item.id)}
                    className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                      filter === item.id
                        ? "bg-lime-400 text-black shadow-[0_0_30px_rgba(163,230,53,0.18)]"
                        : "border border-white/10 bg-white/[0.03] text-white/60 hover:bg-white/[0.07] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              layout
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredVehicles.map((vehicle, index) => (
                  <motion.article
                    layout
                    key={vehicle.id}
                    custom={index}
                    variants={cardAnimation}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      y: 30,
                      transition: {
                        duration: 0.25,
                      },
                    }}
                    whileHover={{
                      y: -12,
                      transition: {
                        duration: 0.25,
                      },
                    }}
                    className="group overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#0c1014]"
                  >
                    <div className="relative h-72 overflow-hidden bg-[#11161b]">
                      <motion.img
                        whileHover={{
                          scale: 1.12,
                          rotate: 1,
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="h-full w-full object-cover"
                      />

                      <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{
                          x: 0,
                          opacity: 1,
                        }}
                        transition={{
                          delay: 0.2,
                        }}
                        className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur"
                      >
                        {vehicle.type === "bike"
                          ? "E-velosiped"
                          : "E-samokat"}
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute right-4 top-4 rounded-full bg-lime-400 px-3 py-1.5 text-xs font-black text-black"
                      >
                        YANGI
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]"
                      >
                        <span className="rounded-full bg-white/90 px-5 py-2 text-sm font-bold text-black">
                          Batafsil
                        </span>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-black">
                            {vehicle.name}
                          </h3>

                          <p className="mt-1 text-sm text-white/40">
                            {vehicle.type === "bike"
                              ? "Elektr velosiped"
                              : "Elektr samokat"}
                          </p>
                        </div>

                        <motion.div
                          whileHover={{
                            scale: 1.08,
                          }}
                          className="text-right"
                        >
                          <p className="text-xl font-black text-lime-400">
                            {vehicle.price}
                          </p>

                          <p className="text-xs text-white/30">UZS</p>
                        </motion.div>
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-2">
                        {[
                          ["Batareya", `${vehicle.battery}%`],
                          ["Masofa", vehicle.range],
                          ["Og‘irlik", vehicle.weight],
                        ].map(([label, value]) => (
                          <motion.div
                            key={label}
                            whileHover={{
                              y: -4,
                              backgroundColor: "rgba(255,255,255,0.07)",
                            }}
                            className="rounded-2xl bg-white/[0.04] p-3"
                          >
                            <p className="text-[10px] uppercase text-white/30">
                              {label}
                            </p>

                            <p className="mt-1 text-sm font-bold">{value}</p>
                          </motion.div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0 0 30px rgba(163,230,53,0.18)",
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="mt-5 w-full rounded-2xl bg-white py-3.5 text-sm font-black text-black transition"
                      >
                        Sotib olish
                      </motion.button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.section>

          {/* ABOUT */}

          <motion.section
            id="about"
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="scroll-mt-28 py-24"
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div
                whileHover={{
                  y: -8,
                  borderColor: "rgba(163,230,53,0.2)",
                }}
                className="rounded-[36px] border border-white/[0.07] bg-[#0c1014] p-8 sm:p-12"
              >
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400">
                  Nega VoltGrid
                </p>

                <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
                  Senga mos
                  <br />
                  transport.
                </h2>

                <p className="mt-7 max-w-lg leading-7 text-white/45">
                  Biz shahar bo‘ylab tez, qulay va chiroyli harakatlanishni
                  istaganlar uchun zamonaviy modellarni taqdim etamiz.
                </p>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  [
                    "⚡",
                    "Elektr quvvati",
                    "Kundalik safarlar uchun ishonchli batareyalar va yaxshi yurish masofasi.",
                  ],
                  [
                    "🛠️",
                    "Servis",
                    "Model tanlash va xariddan keyingi xizmatda yordam beramiz.",
                  ],
                  [
                    "🚚",
                    "Yetkazib berish",
                    "Buyurtmalarni Toshkent va boshqa shaharlarga yetkazib beramiz.",
                  ],
                  [
                    "✓",
                    "Kafolat",
                    "Texnikani xaridorga topshirishdan oldin tekshiramiz.",
                  ],
                ].map(([icon, title, text], index) => (
                  <motion.div
                    key={title}
                    initial={{
                      opacity: 0,
                      y: 50,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      borderColor: "rgba(163,230,53,0.25)",
                    }}
                    className="rounded-[30px] border border-white/[0.07] bg-[#0c1014] p-7"
                  >
                    <motion.div
                      animate={{
                        y: [0, -7, 0],
                        rotate: [0, 3, -3, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: index * 0.2,
                        repeat: Infinity,
                      }}
                      className="text-3xl"
                    >
                      {icon}
                    </motion.div>

                    <h3 className="mt-6 text-xl font-black">{title}</h3>

                    <p className="mt-3 text-sm leading-6 text-white/40">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* MAP */}

          <motion.section
            id="map"
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="scroll-mt-28 py-24"
          >
            <div className="overflow-hidden rounded-[40px] border border-white/[0.07] bg-[#0c1014]">
              <div className="relative overflow-hidden p-8 sm:p-12 lg:p-16">
                <motion.div
                  animate={{
                    x: [0, 200, -100, 0],
                    y: [0, -80, 60, 0],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute right-0 top-0 h-64 w-64 rounded-full bg-lime-400/[0.06] blur-[100px]"
                />

                <div className="relative z-10">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400">
                    O‘zbekiston
                  </p>

                  <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                    Biz butun
                    <br />
                    <span className="text-lime-400">
                      O‘zbekiston bo‘ylab ishlaymiz.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-xl leading-7 text-white/40">
                    Xaritani ochib, asosiy manzilimiz va yetkazib berish
                    hududlarini ko‘ring.
                  </p>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 35px rgba(163,230,53,0.25)",
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={() => setShowMap(!showMap)}
                    className="mt-8 rounded-full bg-lime-400 px-7 py-3.5 font-bold text-black"
                  >
                    {showMap ? "Xaritani yopish ↑" : "Xaritani ochish →"}
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                {showMap && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: 500,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden px-5 pb-5 sm:px-8 sm:pb-8"
                  >
                    <div className="h-[500px] overflow-hidden rounded-[30px] border border-white/[0.08]">
                      <iframe
                        title="O‘zbekiston xaritasi"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=55.9%2C37.1%2C73.2%2C45.7&layer=mapnik&marker=41.2995%2C69.2401"
                        className="h-full w-full border-0"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* REVIEWS */}

          <motion.section
            id="reviews"
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="scroll-mt-28 py-24"
          >
            <div className="mb-10">
              <motion.p
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400"
              >
                Mijozlar fikri
              </motion.p>

              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                Mijozlarimiz
                <br />
                nima deydi.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  name: "Aziz",
                  text: "Juda qulay velosiped. Shahar uchun juda mos.",
                },
                {
                  name: "Muhammad",
                  text: "Samokat narxidan ancha qimmatroq ko‘rinadi. Hammasi yoqdi.",
                },
                {
                  name: "Bekzod",
                  text: "Buyurtmani tez oldim. Model juda qulay va kuchli.",
                },
              ].map((review, index) => (
                <motion.div
                  key={review.name}
                  initial={{
                    opacity: 0,
                    y: 60,
                    rotateX: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.7,
                  }}
                  whileHover={{
                    y: -12,
                    rotateZ: index === 1 ? 0 : index === 0 ? -1 : 1,
                  }}
                  className="rounded-[30px] border border-white/[0.07] bg-[#0c1014] p-7"
                >
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      delay: index * 0.3,
                      repeat: Infinity,
                    }}
                    className="text-lime-400"
                  >
                    ★★★★★
                  </motion.div>

                  <p className="mt-5 leading-7 text-white/55">
                    “{review.text}”
                  </p>

                  <p className="mt-6 font-bold">{review.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* HOW IT WORKS */}

          <motion.section
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="py-24"
          >
            <div className="mb-12">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                Bu qanday ishlaydi
              </p>

              <h2 className="mt-4 text-4xl font-black sm:text-6xl">
                Hammasi oddiy.
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Shunchaki harakat qil.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-white/40">
                Modelni tanlang, buyurtma bering va safaringizni boshlang.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: "01",
                  icon: "🔎",
                  title: "Tanlang",
                  text: "O‘zingizga mos velosiped yoki samokatni toping.",
                },
                {
                  number: "02",
                  icon: "⚡",
                  title: "Taqqoslang",
                  text: "Xususiyatlar, yurish masofasi, batareya va og‘irlikni ko‘ring.",
                },
                {
                  number: "03",
                  icon: "📦",
                  title: "Buyurtma bering",
                  text: "Ariza qoldiring va buyurtma tasdiqlanishini kuting.",
                },
                {
                  number: "04",
                  icon: "🏁",
                  title: "Ketdik",
                  text: "Transportingizni oling va keyingi safaringizni boshlang.",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0c1014] p-7 transition-colors duration-500 hover:border-cyan-400/30"
                >
                  <div className="absolute -right-10 -top-10 text-8xl font-black text-white/[0.025] transition-transform duration-700 group-hover:scale-125">
                    {step.number}
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 8 }}
                        className="text-4xl"
                      >
                        {step.icon}
                      </motion.div>

                      <span className="text-sm font-black text-cyan-400">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-8 text-xl font-black">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/40">
                      {step.text}
                    </p>

                    <div className="mt-7 h-1 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* PERFORMANCE */}

          <motion.section
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="py-24"
          >
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
                  Samaradorlik
                </p>

                <h2 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">
                  Seziladigan
                  <br />
                  zamonaviy
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    texnologiyalar.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl leading-7 text-white/40">
                  Shahar, sayohat va kundalik safarlar uchun zamonaviy elektr
                  transporti.
                </p>

                <div className="mt-10 grid grid-cols-2 gap-4">
                  {[
                    ["45+", "km yurish masofasi"],
                    ["12+", "model"],
                    ["2 yil", "kafolat"],
                    ["24/7", "qo‘llab-quvvatlash"],
                  ].map(([number, label], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition-colors duration-500 hover:border-cyan-400/30"
                    >
                      <motion.p
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                        className="text-3xl font-black text-cyan-400 sm:text-4xl"
                      >
                        {number}
                      </motion.p>

                      <p className="mt-2 text-sm text-white/40">
                        {label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-[40px] border border-white/[0.08] bg-[#0c1014]"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-10 rounded-full bg-cyan-400/20 blur-[100px]"
                />

                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1 }}
                  src="https://www.bon-cadeau.ru/mdata/topimg/size3/1871.jpg"
                  alt="Elektr velosiped"
                  className="relative h-[520px] w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                    VoltGrid
                  </p>

                  <h3 className="mt-2 text-3xl font-black">
                    Harakat uchun yaratilgan.
                  </h3>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* FEATURES */}

          <motion.section
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="py-24"
          >
            <div className="mb-12 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
                Nega VoltGrid
              </p>

              <h2 className="mt-4 text-4xl font-black sm:text-6xl">
                Oddiy transportdan
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  ko‘proq.
                </span>
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                [
                  "⚡",
                  "Kuchli batareya",
                  "Kundalik safarlar uchun katta energiya zaxirasi.",
                ],
                [
                  "🛡️",
                  "Xavfsizlik",
                  "Puxta konstruksiya va ishonchli komponentlar.",
                ],
                [
                  "📱",
                  "Zamonaviy texnologiyalar",
                  "Har bir safarda qulaylik va zamonaviy texnologiyalar.",
                ],
                [
                  "🌎",
                  "Ekologik tozalik",
                  "Zamonaviy shahar uchun elektr transporti.",
                ],
                [
                  "🔧",
                  "Servis",
                  "Texnikaga xizmat ko‘rsatish va sozlashda yordam.",
                ],
                [
                  "🚚",
                  "Yetkazib berish",
                  "Buyurtmalarni Toshkent va boshqa shaharlarga yetkazib beramiz.",
                ],
              ].map(([icon, title, text], index) => (
                <motion.div
                  key={title}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.6,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#0c1014] p-8 transition-colors duration-500 hover:border-indigo-400/30"
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-cyan-400/10" />

                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 8,
                    }}
                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-2xl"
                  >
                    {icon}
                  </motion.div>

                  <h3 className="mt-7 text-xl font-black">{title}</h3>

                  <p className="mt-3 text-sm leading-6 text-white/40">
                    {text}
                  </p>

                  <div className="mt-7 h-px w-0 bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-500 group-hover:w-full" />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* BIG NUMBERS */}

          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="py-24"
          >
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-8 sm:p-12">
              <motion.div
                animate={{
                  x: [-100, 500, -100],
                  y: [0, -40, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-[100px]"
              />

              <div className="relative grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["12+", "model"],
                  ["40+", "km yurish masofasi"],
                  ["2K+", "safar"],
                  ["98%", "mamnun mijoz"],
                ].map(([number, label], index) => (
                  <motion.div
                    key={label}
                    whileHover={{
                      scale: 1.08,
                    }}
                    className="group"
                  >
                    <p
                      className={`text-5xl font-black sm:text-6xl ${
                        index === 1
                          ? "text-cyan-400"
                          : index === 2
                          ? "text-indigo-400"
                          : index === 3
                          ? "text-violet-400"
                          : "text-white"
                      }`}
                    >
                      {number}
                    </p>

                    <p className="mt-3 text-sm text-white/40">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* APP */}

          <motion.section
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="py-24"
          >
            <div className="relative overflow-hidden rounded-[45px] border border-white/10 bg-[#0c1016]">
              <motion.div
                animate={{
                  x: [0, 120, -80, 0],
                  y: [0, -50, 50, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-[-100px] top-[-100px] h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]"
              />

              <div className="relative grid items-center gap-12 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                    Tez orada
                  </p>

                  <h2 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
                    VoltGrid
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                      Ilova.
                    </span>
                  </h2>

                  <p className="mt-6 max-w-xl leading-7 text-white/40">
                    Zaryad, safarlar, marshrutlar va transportingizni bitta
                    ilovada kuzating.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <motion.button
                      whileHover={{
                        y: -5,
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className="rounded-2xl bg-white px-6 py-4 font-bold text-black"
                    >
                      App Store
                    </motion.button>

                    <motion.button
                      whileHover={{
                        y: -5,
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-bold"
                    >
                      Google Play
                    </motion.button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 1, 0, -1, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="relative h-[420px] w-[230px] rounded-[40px] border-[7px] border-slate-700 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                  >
                    <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-800" />

                    <div className="absolute inset-3 overflow-hidden rounded-[32px] bg-gradient-to-b from-indigo-950 via-slate-950 to-black">
                      <div className="p-5 pt-12">
                        <p className="text-xs text-white/40">
                          Xush kelibsiz
                        </p>

                        <h3 className="mt-2 text-xl font-black">
                          VoltGrid
                        </h3>

                        <div className="mt-6 rounded-3xl bg-gradient-to-br from-cyan-400 to-indigo-600 p-5 text-black">
                          <p className="text-xs font-bold">BATAREYA</p>

                          <p className="mt-3 text-4xl font-black">84%</p>

                          <div className="mt-5 h-2 rounded-full bg-black/20">
                            <motion.div
                              animate={{
                                width: ["60%", "84%", "70%", "84%"],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              className="h-full rounded-full bg-black"
                            />
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="rounded-2xl bg-white/5 p-4">
                            <p className="text-[9px] text-white/40">
                              MASOFA
                            </p>

                            <p className="mt-2 text-sm font-black">
                              38 km
                            </p>
                          </div>

                          <div className="rounded-2xl bg-white/5 p-4">
                            <p className="text-[9px] text-white/40">
                              SAFARLAR
                            </p>

                            <p className="mt-2 text-sm font-black">24</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* FAQ */}

          <motion.section
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="py-24"
          >
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
                  Savollar
                </p>

                <h2 className="mt-4 text-4xl font-black sm:text-6xl">
                  Savollaringiz
                  <br />
                  bormi?
                </h2>

                <p className="mt-6 max-w-md leading-7 text-white/40">
                  VoltGrid haqidagi eng ko‘p beriladigan savollarga javoblar.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  [
                    "Mos modelni qanday tanlash mumkin?",
                    "Yurish masofasi, batareya, og‘irlik va transport turini taqqoslang. Shahar uchun shahar modellari mos keladi, uzoqroq marshrutlar uchun esa yurish masofasi katta bo‘lgan texnikani tanlash ma’qul.",
                  ],
                  [
                    "Kafolat bormi?",
                    "Ha. Texnika xaridorga topshirishdan oldin tekshiriladi. Kafolat shartlari aniq modelga qarab farq qiladi.",
                  ],
                  [
                    "Yetkazib berish bormi?",
                    "Ha. Toshkent va O‘zbekistonning boshqa shaharlariga yetkazib berishni tashkil qilishimiz mumkin.",
                  ],
                  [
                    "Xariddan keyin yordam olish mumkinmi?",
                    "Ha. Transportga xizmat ko‘rsatish va sozlash bo‘yicha yordam olishingiz mumkin.",
                  ],
                ].map(([question, answer], index) => (
                  <motion.details
                    key={question}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition-all duration-500 hover:border-cyan-400/30"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold">
                      {question}

                      <span className="ml-4 text-2xl text-cyan-400 transition-transform duration-300 group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <p className="mt-5 leading-7 text-white/40">
                      {answer}
                    </p>
                  </motion.details>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA */}

          <motion.section
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
            }}
            className="py-24"
          >
            <motion.div
              whileHover={{
                scale: 1.01,
              }}
              className="relative overflow-hidden rounded-[40px] border border-lime-400/20 bg-lime-400 p-8 text-black sm:p-12 lg:p-16"
            >
              <motion.div
                animate={{
                  x: [-100, 500, -100],
                  rotate: [0, 20, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-0 top-[-100px] h-80 w-80 rounded-full bg-white/20 blur-[90px]"
              />

              <div className="relative z-10 max-w-2xl">
                <p className="text-sm font-black uppercase tracking-[0.2em]">
                  VOLTGRID
                </p>

                <h2 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
                  Yangi safarga tayyormisiz?
                </h2>

                <p className="mt-5 max-w-xl text-black/60">
                  Velosiped yoki samokatni tanlang va shahar bo‘ylab o‘zingizga
                  xos tarzda harakatlanishni boshlang.
                </p>

                <motion.button
                  whileHover={{
                    scale: 1.07,
                    boxShadow: "0 0 40px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={scrollToCatalog}
                  className="mt-8 rounded-full bg-black px-7 py-4 font-bold text-white"
                >
                  Katalogga o‘tish →
                </motion.button>
              </div>
            </motion.div>
          </motion.section>
        </main>

        {/* EXTRA BIG END SECTIONS */}

        {/* STATS */}

        <section className="relative overflow-hidden border-t border-white/10 py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950" />

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto max-w-7xl px-6"
          >
            <div className="mb-16 text-center">
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                VoltGrid raqamlarda
              </span>

              <h2 className="mt-4 text-4xl font-black text-white md:text-6xl">
                Kelajak uchun
                <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                  {" "}
                  yaratilgan
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {[
                ["12K+", "Mamnun foydalanuvchilar"],
                ["850K+", "Bosib o‘tilgan KM"],
                ["98%", "Mijozlar bahosi"],
                ["24/7", "Qo‘llab-quvvatlash"],
              ].map(([number, label], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 opacity-0 transition-opacity duration-500 hover:opacity-100" />

                  <div className="relative">
                    <div className="mb-3 text-4xl font-black text-white md:text-5xl">
                      {number}
                    </div>

                    <div className="font-medium text-slate-400">{label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* WHY VOLTGRID */}

        <section className="relative overflow-hidden py-32">
          <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px]" />
          <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

          <div className="relative mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 max-w-3xl"
            >
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
                Nega VoltGrid
              </span>

              <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">
                Oddiy safardan ko‘proq.
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">
                  Bu hayot tarzi.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-slate-400">
                Aqlli texnologiyalar, premium dizayn va kuchli elektr
                imkoniyatlari unutilmas tajribada birlashadi.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: "⚡",
                  title: "Darhol quvvat",
                  text: "Kuchli elektr motorlar kerak bo‘lgan paytda silliq tezlanishni ta’minlaydi.",
                },
                {
                  icon: "🔋",
                  title: "Uzoq masofa",
                  text: "Kundalik safarlar uchun mo‘ljallangan yuqori sig‘imli batareyalar bilan uzoqroq yuring.",
                },
                {
                  icon: "🛡️",
                  title: "Xavfsiz yaratilgan",
                  text: "Premium komponentlar va ishonchli tormoz tizimlari har bir safarni xavfsizroq qiladi.",
                },
                {
                  icon: "📱",
                  title: "Aqlli boshqaruv",
                  text: "Transportingizni ulang va muhim funksiyalarni telefoningiz orqali boshqaring.",
                },
                {
                  icon: "🌎",
                  title: "Ekologik",
                  text: "Shahar bo‘ylab harakatlanib, chiqindilar va ortiqcha shovqinni kamaytiring.",
                },
                {
                  icon: "✨",
                  title: "Premium dizayn",
                  text: "Har bir safarda ajoyib ko‘rinish uchun yaratilgan minimal va futuristik dizayn.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl"
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/20" />

                  <div className="relative">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/30 to-cyan-500/20 text-3xl transition-all duration-300 group-hover:rotate-3 group-hover:scale-110">
                      {item.icon}
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="leading-relaxed text-slate-400">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* EXTRA FAQ */}

        <section className="relative border-t border-white/10 py-32">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-violet-400">
                Savollar
              </span>

              <h2 className="mt-4 text-4xl font-black text-white md:text-6xl">
                Savollar?
                <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                  {" "}
                  Javoblarimiz bor.
                </span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: "VoltGrid transportlari qancha masofa yura oladi?",
                  a: "Masofa model, haydash rejimi, yo‘l sharoiti va foydalanuvchi vazniga bog‘liq. Har bir transportning o‘z texnik xususiyatlari mavjud.",
                },
                {
                  q: "Zaryadlash qancha vaqt oladi?",
                  a: "Zaryadlash vaqti batareya va zaryadlovchiga bog‘liq. Ko‘pchilik modellar qulay tungi zaryadlash uchun mo‘ljallangan.",
                },
                {
                  q: "VoltGrid transportlaridan har kuni foydalanish mumkinmi?",
                  a: "Ha. Bizning modellarimiz ishga borish, shahar bo‘ylab safarlar, dam olish kunlari va kundalik transport uchun mo‘ljallangan.",
                },
                {
                  q: "Qo‘llab-quvvatlash xizmati bormi?",
                  a: "Ha. VoltGrid savollar, sozlash va transportdan foydalanish bo‘yicha yordam beradi.",
                },
                {
                  q: "Transportlar mobil ilovaga ulanadimi?",
                  a: "Ayrim modellar kuzatish va transport ma’lumotlari uchun aqlli ulanish funksiyalarini o‘z ichiga olishi mumkin.",
                },
              ].map((item, index) => (
                <motion.details
                  key={item.q}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -40 : 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-6 text-lg font-bold text-white md:px-8">
                    <span>{item.q}</span>

                    <span className="ml-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/5 text-xl text-cyan-400 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="px-6 pb-7 leading-relaxed text-slate-400 md:px-8">
                    {item.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* HUGE CTA */}

        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950/70 via-indigo-950/80 to-cyan-950/60" />

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[120px]"
          />

          <div className="relative mx-auto max-w-6xl px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-[3rem] border border-white/15 bg-white/[0.05] p-10 text-center backdrop-blur-2xl md:p-20"
            >
              <div className="absolute left-1/2 top-0 h-1 w-72 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

              <span className="mb-8 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
                Keyingi safaringizga tayyormisiz?
              </span>

              <h2 className="text-4xl font-black leading-tight text-white md:text-7xl">
                Boshqacha harakatlaning.
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">
                  VoltGrid bilan.
                </span>
              </h2>

              <p className="mx-auto mt-7 max-w-2xl text-lg text-slate-400">
                Keyingi elektr transportingizni toping va shaharni butunlay
                boshqacha tarzda kashf eting.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToCatalog}
                  className="rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 px-8 py-4 font-bold text-white shadow-2xl shadow-indigo-500/30"
                >
                  Transportlarni ko‘rish →
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-bold text-white transition hover:bg-white/10"
                >
                  Biz bilan bog‘laning
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* NEWSLETTER */}

        <section className="relative border-t border-white/10 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-between gap-10 lg:flex-row"
            >
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Aloqada bo‘ling
                </span>

                <h3 className="mt-3 text-3xl font-black text-white md:text-4xl">
                  VoltGrid yangiliklaridan xabardor bo‘ling.
                </h3>

                <p className="mt-3 text-slate-400">
                  Yangi transportlar, maxsus takliflar va elektr transport
                  yangiliklari.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <input
                  type="email"
                  placeholder="Email manzilingizni kiriting"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500 transition focus:border-cyan-400/50 sm:w-80"
                />

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-7 py-4 font-bold text-white"
                >
                  Obuna bo‘lish
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MASSIVE FOOTER */}

        <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617]">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-24">
            <div className="grid grid-cols-1 gap-12 pb-20 md:grid-cols-2 lg:grid-cols-5">
              {/* BRAND */}

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

              {/* PRODUCTS */}

              <div>
                <h4 className="mb-6 font-bold text-white">Transportlar</h4>

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

              {/* COMPANY */}

              <div>
                <h4 className="mb-6 font-bold text-white">Kompaniya</h4>

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

              {/* SUPPORT */}

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

            {/* BOTTOM */}

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
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
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
                  whileTap={{
                    scale: 0.8,
                  }}
                  onClick={() => setSelectedVehicle(null)}
                  className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl backdrop-blur"
                >
                  ×
                </motion.button>

                <div className="relative overflow-hidden">
                  <motion.img
                    initial={{
                      scale: 1.15,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className="h-72 w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1014] via-transparent to-transparent" />
                </div>

                <div className="p-7 sm:p-9">
                  <motion.p
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.2,
                    }}
                    className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400"
                  >
                    {selectedVehicle.type === "bike"
                      ? "E-velosiped"
                      : "E-samokat"}
                  </motion.p>

                  <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <motion.h2
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.25,
                      }}
                      className="text-3xl font-black"
                    >
                      {selectedVehicle.name}
                    </motion.h2>

                    <motion.p
                      initial={{
                        opacity: 0,
                        scale: 0.7,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
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
                      ["Batareya", `${selectedVehicle.battery}%`],
                      ["Masofa", selectedVehicle.range],
                      ["Og‘irlik", selectedVehicle.weight],
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
                        whileHover={{
                          y: -5,
                        }}
                        className="rounded-2xl bg-white/[0.04] p-4"
                      >
                        <p className="text-xs text-white/30">{label}</p>

                        <p className="mt-1 font-bold">{value}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 40px rgba(163,230,53,0.25)",
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
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

  export default Hero;