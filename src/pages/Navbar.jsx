import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const navItems = [
    { name: "Scooters", path: "/scooters" },
    { name: "Bikes", path: "/bikes" },
    { name: "Pricing", path: "/pricing" },
    { name: "Explore Map", path: "/map" },
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem("voltgrid_user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const goTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    const newUser = {
      name,
      email,
      avatar,
    };

    localStorage.setItem("voltgrid_user", JSON.stringify(newUser));

    setUser(newUser);
    setShowAuth(false);
    setShowProfile(false);

    setName("");
    setEmail("");
    setPassword("");
    setAvatar("");
  };

  const handleLogout = () => {
    localStorage.removeItem("voltgrid_user");

    setUser(null);
    setShowProfile(false);
  };

  return (
    <>
      <nav
        className="
          fixed top-4 left-1/2 -translate-x-1/2
          w-[calc(100%-2rem)] max-w-7xl z-50
          rounded-2xl border border-white/20
          bg-slate-900/60 backdrop-blur-xl
          shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
          transition-all duration-500
          hover:border-white/30
          hover:shadow-[0_12px_45px_0_rgba(99,102,241,0.18)]
        "
      >
        <div className="mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => goTo("/")}
              className="flex-shrink-0 flex items-center space-x-3 group cursor-pointer"
            >
              <div
                className="
                  relative w-11 h-11
                  bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400
                  rounded-xl flex items-center justify-center text-white
                  shadow-lg shadow-indigo-500/30
                  transition-all duration-500
                  group-hover:scale-110
                  group-hover:rotate-6
                  group-hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]
                  animate-[logoFloat_4s_ease-in-out_infinite]
                "
              >
                <div
                  className="
                    absolute inset-0 rounded-xl
                    bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400
                    blur-sm opacity-50
                    group-hover:opacity-100
                    group-hover:blur-md
                    transition-all duration-500
                  "
                ></div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="
                    h-7 w-7 relative z-10
                    fill-none stroke-white
                    stroke-[7.5]
                    stroke-linecap-round
                    stroke-linejoin-round
                    transition-transform duration-500
                    group-hover:scale-110
                  "
                >
                  <circle cx="25" cy="65" r="17.5" />
                  <circle cx="75" cy="65" r="17.5" />
                  <path d="M25 65l17.5-30h22.5M75 65L60 30M42.5 35l15 30M60 30h12.5M37.5 30h10" />
                </svg>
              </div>

              <span
                className="
                  text-2xl font-black tracking-tight text-white font-sans
                  transition-all duration-300
                  group-hover:tracking-wide
                "
              >
                Volt
                <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  Grid
                </span>
              </span>
            </button>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => {
                const active = location.pathname === item.path;

                return (
                  <button
                    key={item.name}
                    onClick={() => goTo(item.path)}
                    style={{
                      animationDelay: `${index * 100 + 250}ms`,
                    }}
                    className={`
                      relative px-4 py-2 rounded-xl
                      text-sm font-medium
                      transition-all duration-300
                      hover:-translate-y-0.5
                      animate-[navItem_0.7s_cubic-bezier(0.16,1,0.3,1)_both]
                      group
                      ${
                        active
                          ? "text-white bg-white/10"
                          : "text-slate-200 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {item.name}

                    <span
                      className={`
                        absolute bottom-1 left-4 h-0.5
                        bg-gradient-to-r from-cyan-400 to-indigo-400
                        transition-all duration-300
                        shadow-[0_0_8px_rgba(34,211,238,0.7)]
                        ${
                          active
                            ? "w-[calc(100%-2rem)]"
                            : "w-0 group-hover:w-[calc(100%-2rem)]"
                        }
                      `}
                    ></span>

                    <span
                      className="
                        absolute inset-0 rounded-xl
                        bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-indigo-400/0
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity duration-300
                      "
                    ></span>
                  </button>
                );
              })}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfile(!showProfile)}
                    className="
                      flex items-center gap-3
                      px-3 py-2
                      rounded-xl
                      text-white
                      hover:bg-white/10
                      transition-all duration-300
                    "
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-white/20"
                      />
                    ) : (
                      <div
                        className="
                          w-10 h-10 rounded-full
                          bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400
                          flex items-center justify-center
                          text-white font-bold
                        "
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <span className="font-semibold">
                      {user.name}
                    </span>

                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showProfile ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showProfile && (
                    <div
                      className="
                        absolute right-0 top-14
                        w-64
                        rounded-2xl
                        border border-white/20
                        bg-slate-900/95
                        backdrop-blur-xl
                        shadow-2xl
                        p-4
                      "
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className="
                              w-12 h-12 rounded-full
                              bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400
                              flex items-center justify-center
                              text-white font-bold
                            "
                          >
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="text-white font-bold truncate">
                            {user.name}
                          </p>

                          <p className="text-slate-400 text-sm truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="
                          w-full
                          py-2.5
                          rounded-xl
                          bg-red-500/10
                          text-red-400
                          hover:bg-red-500/20
                          transition-all duration-300
                          font-semibold
                        "
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="
                    text-sm font-semibold text-slate-300
                    hover:text-white
                    transition-all duration-300
                    px-3 py-2
                    hover:-translate-y-0.5
                  "
                >
                  Sign In
                </button>
              )}

              <button
                onClick={() => goTo("/")}
                className="
                  relative group overflow-hidden
                  inline-flex items-center justify-center
                  px-6 py-3
                  text-sm font-bold text-white
                  rounded-xl shadow-lg
                  transition-all duration-500
                  hover:-translate-y-1
                  hover:scale-[1.03]
                  hover:shadow-[0_10px_35px_rgba(99,102,241,0.45)]
                  active:scale-95
                "
              >
                <span
                  className="
                    absolute inset-0
                    bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500
                    transition-all duration-500
                    group-hover:scale-110
                  "
                ></span>

                <span
                  className="
                    absolute inset-0
                    bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600
                    opacity-0
                    group-hover:opacity-100
                    transition-all duration-700
                  "
                ></span>

                <span
                  className="
                    absolute top-0 -left-[100%]
                    w-[60%] h-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                    skew-x-[-20deg]
                    group-hover:left-[140%]
                    transition-all duration-700
                  "
                ></span>

                <span className="relative z-10 flex items-center gap-1.5">
                  Start Ride

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="
                      h-4 w-4
                      transition-all duration-300
                      group-hover:translate-x-1
                      group-hover:scale-110
                    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="
                  relative
                  inline-flex items-center justify-center
                  p-2.5 rounded-xl
                  text-slate-300
                  hover:text-white
                  hover:bg-white/10
                  focus:outline-none
                  transition-all duration-300
                  hover:scale-110
                  active:scale-90
                "
              >
                <svg
                  className={`
                    h-6 w-6
                    transition-all duration-500
                    ${
                      isOpen
                        ? "rotate-90 opacity-0 scale-50 absolute"
                        : "rotate-0 opacity-100 scale-100"
                    }
                  `}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className={`
                    h-6 w-6
                    transition-all duration-500
                    ${
                      isOpen
                        ? "rotate-0 opacity-100 scale-100"
                        : "-rotate-90 opacity-0 scale-50 absolute"
                    }
                  `}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`
            md:hidden
            overflow-hidden
            px-6
            transition-all duration-500
            ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              isOpen
                ? "max-h-[600px] opacity-100 translate-y-0 pb-6"
                : "max-h-0 opacity-0 -translate-y-3 pb-0"
            }
          `}
        >
          <div className="pt-3 border-t border-white/10 space-y-1">
            {navItems.map((item, index) => {
              const active = location.pathname === item.path;

              return (
                <button
                  key={item.name}
                  onClick={() => goTo(item.path)}
                  style={{
                    transitionDelay: isOpen ? `${index * 70}ms` : "0ms",
                  }}
                  className={`
                    w-full text-left
                    block px-4 py-3 rounded-xl
                    text-base font-medium
                    hover:bg-white/5
                    hover:text-white
                    hover:translate-x-2
                    transition-all duration-300
                    ${
                      active
                        ? "text-white bg-white/10"
                        : "text-slate-200"
                    }
                    ${
                      isOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-5"
                    }
                  `}
                >
                  <span className="flex items-center justify-between">
                    {item.name}
                    <span className="text-cyan-400">→</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 mt-2 border-t border-white/10 flex flex-col space-y-3">
            {user ? (
              <>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="
                    w-full
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    text-white
                    hover:bg-white/5
                    transition-all duration-300
                  "
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="
                        w-10 h-10 rounded-full
                        bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400
                        flex items-center justify-center
                        text-white font-bold
                      "
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="font-semibold">
                    {user.name}
                  </span>
                </button>

                {showProfile && (
                  <div className="px-4">
                    <div className="rounded-xl bg-white/5 p-3 mb-2">
                      <p className="text-white font-semibold">
                        {user.name}
                      </p>

                      <p className="text-slate-400 text-sm truncate">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="
                        w-full
                        py-3
                        rounded-xl
                        bg-red-500/10
                        text-red-400
                        hover:bg-red-500/20
                        transition-all duration-300
                        font-semibold
                      "
                    >
                      Log out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="
                  w-full text-center py-3
                  font-semibold text-slate-300
                  hover:text-white
                  hover:bg-white/5
                  rounded-xl
                  transition-all duration-300
                "
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => goTo("/")}
              className="
                relative overflow-hidden
                w-full text-center py-3
                font-bold text-white
                bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500
                rounded-xl shadow-lg
                transition-all duration-300
                hover:scale-[1.02]
                active:scale-95
              "
            >
              <span className="relative z-10">
                Start Ride →
              </span>
            </button>
          </div>
        </div>

        <style>{`
          @keyframes navDrop {
            0% {
              opacity: 0;
              transform: translate(-50%, -35px) scale(0.96);
              filter: blur(8px);
            }

            60% {
              opacity: 1;
              transform: translate(-50%, 4px) scale(1.01);
              filter: blur(0);
            }

            100% {
              opacity: 1;
              transform: translate(-50%, 0) scale(1);
              filter: blur(0);
            }
          }

          @keyframes navItem {
            0% {
              opacity: 0;
              transform: translateY(-15px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes logoFloat {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-3px);
            }
          }
        `}</style>
      </nav>

      {showAuth && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/70
            backdrop-blur-md
            p-4
          "
          onClick={() => setShowAuth(false)}
        >
          <div
            className="
              w-full max-w-md
              rounded-3xl
              border border-white/20
              bg-slate-900
              shadow-[0_20px_80px_rgba(0,0,0,0.6)]
              p-7
              relative
            "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAuth(false)}
              className="
                absolute top-4 right-4
                w-9 h-9
                rounded-full
                bg-white/5
                text-slate-300
                hover:text-white
                hover:bg-white/10
                transition-all duration-300
              "
            >
              ×
            </button>

            <div className="text-center mb-7">
              <div
                className="
                  mx-auto mb-4
                  w-14 h-14
                  rounded-2xl
                  bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400
                  flex items-center justify-center
                  shadow-lg shadow-indigo-500/30
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white">
                Create Account
              </h2>

              <p className="text-slate-400 mt-2">
                Create your VoltGrid account
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    text-white
                    placeholder-slate-500
                    outline-none
                    focus:border-cyan-400/50
                    focus:bg-white/10
                    transition-all duration-300
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    text-white
                    placeholder-slate-500
                    outline-none
                    focus:border-cyan-400/50
                    focus:bg-white/10
                    transition-all duration-300
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    text-white
                    placeholder-slate-500
                    outline-none
                    focus:border-cyan-400/50
                    focus:bg-white/10
                    transition-all duration-300
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Profile Photo
                </label>

                <label
                  className="
                    flex items-center justify-center
                    w-full
                    px-4 py-3
                    rounded-xl
                    border border-dashed border-white/20
                    bg-white/5
                    text-slate-400
                    hover:text-white
                    hover:bg-white/10
                    cursor-pointer
                    transition-all duration-300
                  "
                >
                  {avatar ? "Photo selected ✓" : "Choose profile photo"}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>

                {avatar && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={avatar}
                      alt="Preview"
                      className="
                        w-20 h-20
                        rounded-full
                        object-cover
                        border-2 border-cyan-400/50
                      "
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="
                  w-full
                  py-3.5
                  mt-2
                  rounded-xl
                  font-bold
                  text-white
                  bg-gradient-to-r
                  from-violet-600
                  via-indigo-500
                  to-cyan-500
                  shadow-lg
                  shadow-indigo-500/20
                  transition-all duration-300
                  hover:scale-[1.02]
                  hover:shadow-indigo-500/40
                  active:scale-95
                "
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;