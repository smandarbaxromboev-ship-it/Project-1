import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Pricing = () => {
  const navigate = useNavigate();

  const [billing, setBilling] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(0);

  const plans = [
    {
      name: "Pay As You Go",
      description: "Vaqti-vaqti bilan yuradiganlar uchun",
      monthly: "0",
      yearly: "0",
      period: "daqiqa uchun",
      accent: "from-slate-600 to-slate-800",
      border: "border-white/10",
      icon: "⚡",
      popular: false,
      features: [
        "Oylik to'lov yo'q",
        "Faqat safar uchun to'lov",
        "Barcha mavjud velosipedlar",
        "Barcha mavjud samokatlar",
        "Ilova orqali yordam",
      ],
      button: "Safarni boshlash",
    },
    {
      name: "City",
      description: "Shahar bo'ylab har kuni yuradiganlar uchun",
      monthly: "19.99",
      yearly: "15.99",
      period: "oyiga",
      accent: "from-indigo-600 to-violet-700",
      border: "border-indigo-400/40",
      icon: "🚲",
      popular: true,
      features: [
        "Har oy 300 daqiqa",
        "Limitdan keyin 20% chegirma",
        "Velosipedlarga ustuvor kirish",
        "Xaritadan cheksiz foydalanish",
        "Ustuvor yordam xizmati",
        "Qulfni ochish uchun to'lov yo'q",
      ],
      button: "City tarifini tanlash",
    },
    {
      name: "Pro",
      description: "Deyarli har kuni yuradiganlar uchun",
      monthly: "34.99",
      yearly: "27.99",
      period: "oyiga",
      accent: "from-cyan-500 to-blue-600",
      border: "border-cyan-400/40",
      icon: "🏙️",
      popular: false,
      features: [
        "Har oy 600 daqiqa",
        "Limitdan keyin 30% chegirma",
        "Transportga ustuvor kirish",
        "Bepul qulf ochish",
        "Safarlar bo'yicha kengaytirilgan tarix",
        "24/7 ustuvor yordam",
      ],
      button: "Pro tarifini tanlash",
    },
    {
      name: "Unlimited",
      description: "Eng faol foydalanuvchilar uchun maksimal erkinlik",
      monthly: "49.99",
      yearly: "39.99",
      period: "oyiga",
      accent: "from-fuchsia-600 to-purple-700",
      border: "border-fuchsia-400/40",
      icon: "✦",
      popular: false,
      features: [
        "Cheksiz safarlar",
        "Har bir safarning dastlabki 45 daqiqasi",
        "Bepul qulf ochish",
        "Ustuvor kirish",
        "Premium yordam",
        "Maxsus takliflar",
      ],
      button: "Unlimited tarifini tanlash",
    },
  ];

  const comparison = [
    ["Qulfni ochish", "$1.00", "Bepul", "Bepul", "Bepul"],
    ["1 daqiqa narxi", "$0.20", "$0.16", "$0.14", "$0.00*"],
    ["Bepul daqiqalar", "0", "300", "600", "Cheksiz"],
    ["Chegirma", "0%", "20%", "30%", "100%*"],
    ["Ustuvor kirish", "—", "✓", "✓", "✓"],
    ["24/7 yordam", "—", "✓", "✓", "✓"],
    ["Premium takliflar", "—", "—", "✓", "✓"],
    ["Kengaytirilgan statistika", "—", "✓", "✓", "✓"],
  ];

  const faqs = [
    {
      question: "Obunani istalgan vaqtda bekor qilish mumkinmi?",
      answer:
        "Ha. Obunani istalgan vaqtda bekor qilishingiz mumkin. Bekor qilingandan keyin ham to'langan muddat tugaguniga qadar barcha imkoniyatlardan foydalanishingiz mumkin.",
    },
    {
      question: "Barcha bepul daqiqalarim tugasa nima bo'ladi?",
      answer:
        "Bepul daqiqalar tugagandan so'ng safarlar tanlangan tarifning maxsus narxi bo'yicha davom etadi. Yashirin to'lovlar mavjud emas.",
    },
    {
      question: "Boshqa tarifga o'tish mumkinmi?",
      answer:
        "Ha. Istalgan vaqtda boshqa tarifga o'tishingiz mumkin. Yangi tarif tanlanganidan keyin uning shartlari amal qiladi.",
    },
    {
      question: "Tariflar velosiped va samokat uchun ham ishlaydimi?",
      answer:
        "Ha. VoltGrid'ning barcha asosiy tariflari mavjud velosipedlar va samokatlarda ishlaydi.",
    },
    {
      question: "Yillik to'lovda chegirma bormi?",
      answer:
        "Ha. Yillik tarifni tanlasangiz, oylik to'lovga nisbatan kamroq to'laysiz.",
    },
    {
      question: "Qulfni ochish uchun to'lov bormi?",
      answer:
        "Pay As You Go tarifida standart qulf ochish to'lovi mavjud. City, Pro va Unlimited tariflarida qulfni ochish bepul.",
    },
  ];

  const advantages = [
    {
      icon: "⚡",
      title: "Oddiy narxlar",
      text: "Murakkab shartlar yo'q. Nima uchun to'layotganingizni har doim bilasiz.",
    },
    {
      icon: "🚲",
      title: "Bitta obuna",
      text: "Bitta tarif orqali velosiped va samokatlardan foydalaning.",
    },
    {
      icon: "📍",
      title: "Istalgan joyda",
      text: "VoltGrid mavjud bo'lgan hududlarda obunangizdan foydalaning.",
    },
    {
      icon: "🔒",
      title: "Yashirin to'lovlar yo'q",
      text: "Safarni boshlashdan oldin narxni aniq ko'rasiz.",
    },
  ];

  const yearlySavings = [
    {
      title: "City",
      save: "$48",
      text: "yiliga tejash",
    },
    {
      title: "Pro",
      save: "$84",
      text: "yiliga tejash",
    },
    {
      title: "Unlimited",
      save: "$120",
      text: "yiliga tejash",
    },
  ];

  const currentPrice = (plan) =>
    billing === "monthly" ? plan.monthly : plan.yearly;

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />

      <main>
        <section className="relative pt-40 pb-24 px-6">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px]" />
            <div className="absolute top-40 left-0 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px]" />
            <div className="absolute top-56 right-0 w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 text-sm font-medium mb-7">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Har bir foydalanuvchi uchun mos tariflar
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                Ko'proq yuring.
                <span className="block bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Kamroq to'lang.
                </span>
              </h1>

              <p className="mt-7 text-lg md:text-xl text-slate-400 leading-8 max-w-3xl mx-auto">
                Hayot tarzingizga mos tarifni tanlang. VoltGrid velosipedlari
                va samokatlarida tezroq, qulayroq va foydaliroq harakatlaning.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex justify-center mt-10"
            >
              <div className="p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl inline-flex">
                <button
                  onClick={() => setBilling("monthly")}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    billing === "monthly"
                      ? "bg-white text-slate-950 shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Oylik
                </button>

                <button
                  onClick={() => setBilling("yearly")}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                    billing === "yearly"
                      ? "bg-white text-slate-950 shadow-lg"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Yillik
                  <span className="px-2 py-1 rounded-full bg-cyan-400/15 text-cyan-300 text-[10px]">
                    20% TEJANG
                  </span>
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-14">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.12 * index,
                  }}
                  whileHover={{ y: -10 }}
                  className={`relative group rounded-3xl border ${plan.border} bg-slate-900/70 backdrop-blur-xl overflow-hidden shadow-2xl`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0">
                      <div className="text-center py-2.5 text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500">
                        Eng mashhur
                      </div>
                    </div>
                  )}

                  <div
                    className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${plan.accent} opacity-20 blur-3xl`}
                  />

                  <div className={`relative p-7 ${plan.popular ? "pt-16" : ""}`}>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
                        {plan.icon}
                      </div>

                      {billing === "yearly" && plan.monthly !== "0" && (
                        <span className="text-xs font-semibold text-cyan-300 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1.5 rounded-full">
                          20% tejash
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold mt-7">
                      {plan.name}
                    </h2>

                    <p className="text-slate-400 text-sm leading-6 mt-2 min-h-[48px]">
                      {plan.description}
                    </p>

                    <div className="mt-8">
                      {plan.monthly === "0" ? (
                        <div className="flex items-end gap-2">
                          <span className="text-5xl font-black">$0</span>
                          <span className="text-slate-400 pb-2">
                            / {plan.period}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-end gap-2">
                          <span className="text-5xl font-black">
                            ${currentPrice(plan)}
                          </span>
                          <span className="text-slate-400 pb-2">
                            / {plan.period}
                          </span>
                        </div>
                      )}

                      {billing === "yearly" && plan.monthly !== "0" && (
                        <p className="text-xs text-slate-500 mt-2">
                          Yiliga bir marta to'lanadi
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => navigate("/")}
                      className={`w-full mt-8 py-3.5 rounded-xl font-bold transition-all ${
                        plan.popular
                          ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                          : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {plan.button}
                    </button>

                    <div className="mt-8 pt-7 border-t border-white/10">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
                        Tarifga kiradi
                      </p>

                      <div className="space-y-3.5 mt-5">
                        {plan.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center text-xs">
                              ✓
                            </span>

                            <span className="text-sm text-slate-300 leading-5">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center text-xs text-slate-500 mt-7"
            >
              * Unlimited tarifidagi uzoq safarlar adolatli foydalanish
              qoidalariga muvofiq amalga oshiriladi.
            </motion.p>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.2em]">
                Nega VoltGrid?
              </p>

              <h2 className="text-4xl md:text-5xl font-black mt-3">
                Oddiy va qulay narxlar
              </h2>

              <p className="text-slate-400 max-w-2xl mx-auto mt-5 leading-7">
                Tariflarni maksimal darajada sodda qildik, shunda narx haqida
                kamroq o'ylab, yo'lda ko'proq vaqt o'tkazishingiz mumkin.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
              {advantages.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 hover:bg-white/[0.05] transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/15 to-indigo-500/10 border border-white/10 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>

                  <h3 className="text-xl font-bold mt-6">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 leading-6 text-sm mt-3">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-600/10 via-slate-900 to-cyan-500/10 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12 lg:p-16">
                  <span className="inline-flex px-3 py-1.5 rounded-full bg-violet-400/10 border border-violet-400/20 text-violet-300 text-xs font-bold uppercase tracking-wider">
                    Yillik obuna
                  </span>

                  <h2 className="text-4xl md:text-5xl font-black mt-6 leading-tight">
                    Yil bo'yi yuring.
                    <span className="block text-cyan-400">
                      Yil bo'yi tejang.
                    </span>
                  </h2>

                  <p className="text-slate-400 leading-7 mt-5 max-w-xl">
                    Yillik obunani tanlang va oylik to'lovdan arzonroq narxda
                    foydalaning. Qancha ko'p yursangiz, shuncha ko'p tejaysiz.
                  </p>

                  <button
                    onClick={() => setBilling("yearly")}
                    className="mt-8 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-100 transition-all"
                  >
                    Yillik tarifga o'tish
                  </button>
                </div>

                <div className="p-8 md:p-12 lg:p-16 bg-black/10">
                  <div className="grid gap-4">
                    {yearlySavings.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-lg font-bold">
                            {item.title}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            {item.text}
                          </p>
                        </div>

                        <div className="text-2xl font-black text-cyan-400">
                          {item.save}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.2em]">
                Tariflarni taqqoslash
              </p>

              <h2 className="text-4xl md:text-5xl font-black mt-3">
                Barcha imkoniyatlar bir joyda
              </h2>

              <p className="text-slate-400 mt-5">
                Tarifni tanlashdan oldin barcha imkoniyatlarni solishtiring.
              </p>
            </motion.div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-xl">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-6 text-sm font-semibold text-slate-400">
                      Imkoniyat
                    </th>

                    <th className="p-6 text-left text-sm font-bold">
                      Pay As You Go
                    </th>

                    <th className="p-6 text-left text-sm font-bold">
                      City
                    </th>

                    <th className="p-6 text-left text-sm font-bold">
                      Pro
                    </th>

                    <th className="p-6 text-left text-sm font-bold">
                      Unlimited
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {comparison.map((row, index) => (
                    <tr
                      key={row[0]}
                      className={
                        index !== comparison.length - 1
                          ? "border-b border-white/5"
                          : ""
                      }
                    >
                      <td className="p-6 text-sm text-slate-300 font-medium">
                        {row[0]}
                      </td>

                      <td className="p-6 text-sm text-slate-400">
                        {row[1]}
                      </td>

                      <td className="p-6 text-sm text-slate-300">
                        {row[2]}
                      </td>

                      <td className="p-6 text-sm text-cyan-300">
                        {row[3]}
                      </td>

                      <td className="p-6 text-sm text-violet-300 font-semibold">
                        {row[4]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-indigo-500/10 p-8 md:p-10"
              >
                <span className="text-cyan-400 text-4xl">
                  “
                </span>

                <p className="text-2xl md:text-3xl font-semibold leading-relaxed mt-4 max-w-3xl">
                  Eng yaxshi tarif — narxi haqida umuman o'ylamasdan
                  foydalanishingiz mumkin bo'lgan tarif.
                </p>

                <p className="text-slate-400 mt-6">
                  Oddiy tariflar. Tezkor safarlar. Hech qanday kutilmagan
                  to'lovlar yo'q.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              >
                <div className="text-4xl font-black">
                  24/7
                </div>

                <p className="text-xl font-bold mt-3">
                  Foydalanuvchilar uchun yordam
                </p>

                <p className="text-slate-400 text-sm leading-6 mt-3">
                  Yordam kerak bo'lganda VoltGrid jamoasi doimo yoningizda.
                </p>

                <div className="mt-7 h-px bg-white/10" />

                <p className="text-cyan-400 text-sm font-semibold mt-6">
                  Har bir safarda siz bilan.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.2em]">
                Ko'p so'raladigan savollar
              </p>

              <h2 className="text-4xl md:text-5xl font-black mt-3">
                Savollaringizga javoblar
              </h2>
            </motion.div>

            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === index ? -1 : index)
                    }
                    className="w-full px-6 py-5 flex items-center justify-between gap-5 text-left"
                  >
                    <span className="font-semibold text-lg">
                      {faq.question}
                    </span>

                    <span
                      className={`w-9 h-9 flex-shrink-0 rounded-xl border border-white/10 flex items-center justify-center text-cyan-400 transition-transform ${
                        openFaq === index ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-slate-400 leading-7 border-t border-white/5 pt-5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-28">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-indigo-600/20 via-slate-900 to-cyan-500/20 p-8 md:p-14">
              <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />

              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                <div>
                  <p className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.2em]">
                    Safarga tayyormisiz?
                  </p>

                  <h2 className="text-4xl md:text-5xl font-black mt-3 max-w-2xl">
                    Tarifingizni tanlang va harakatni boshlang.
                  </h2>

                  <p className="text-slate-400 mt-5 max-w-2xl leading-7">
                    VoltGrid imkoniyatlarini kashf qiling va o'zingizga mos
                    transportni tanlang.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate("/bikes")}
                    className="px-7 py-4 rounded-xl bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 transition-all"
                  >
                    Velosipedlarni ko'rish
                  </button>

                  <button
                    onClick={() => navigate("/scooters")}
                    className="px-7 py-4 rounded-xl border border-white/10 bg-white/5 font-bold hover:bg-white/10 transition-all"
                  >
                    Samokatlarni ko'rish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t border-white/10 bg-slate-950">
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

                <button className="block hover:text-white transition">
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
              <h3 className="font-semibold mb-5">
                Qo'llab-quvvatlash
              </h3>

              <div className="space-y-3 text-sm text-slate-400">
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

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
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

export default Pricing;