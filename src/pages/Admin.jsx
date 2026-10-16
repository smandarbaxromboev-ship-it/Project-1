import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formProduct, setFormProduct] = useState({
    name: '',
    type: 'scooter',
    price: '',
    battery: '100',
    range: '40 km',
    weight: '15 kg',
    image: ''
  });

  const API_URL = 'https://6a7c6eefa008c10e4cbf67e9.mockapi.io/Shop';

  const loadData = () => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setVehicles(data);
        }
      })
      .catch((err) => console.error("Error loading Mock API:", err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const getVehicleImage = (item) => {
    if (item.image && item.image.startsWith('http')) return item.image;
    if (item.type === 'scooter') {
      return 'https://unsplash.com';
    }
    return 'https://unsplash.com';
  };

  const openCreateMode = () => {
    setEditingId(null);
    setFormProduct({
      name: '',
      type: 'scooter',
      price: '',
      battery: '100',
      range: '40 km',
      weight: '15 kg',
      image: ''
    });
    setIsAdminOpen(true);
  };

  const openEditMode = (item, e) => {
    e.stopPropagation();
    setEditingId(item.id);
    setFormProduct({
      name: item.name || '',
      type: item.type || 'scooter',
      price: item.price || '',
      battery: item.battery || '100',
      range: item.range || '40 km',
      weight: item.weight || '15 kg',
      image: item.image || ''
    });
    setIsAdminOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isEdit = editingId !== null;
    const url = isEdit ? `${API_URL}/${editingId}` : API_URL;
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formProduct)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save');
        return res.json();
      })
      .then(() => {
        loadData();
        setIsAdminOpen(false);
      })
      .catch(err => console.error("Error saving to API:", err));
  };

  const handleDeleteProduct = (id, e) => {
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this product from API?")) return;

    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setVehicles(vehicles.filter(item => item.id !== id));
        }
      })
      .catch(err => console.error("Error deleting from API:", err));
  };

  const filteredVehicles = vehicles.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="min-h-screen bg-[#06070a] text-white font-sans antialiased overflow-x-hidden">

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-6xl z-50 rounded-[28px] bg-[#0c0d12]/40 backdrop-blur-2xl border border-white/[0.06] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.1)] transition-all duration-300">
        <div className="mx-auto px-8">
          <div className="flex items-center justify-between h-20">

            <div
              onClick={() => setFilter('all')}
              className="flex-shrink-0 flex items-center space-x-3 group cursor-pointer"
            >
              <div className="relative w-12 h-12 bg-[#161920] rounded-2xl flex items-center justify-center text-white border border-white/[0.08] shadow-inner group-hover:bg-gradient-to-b group-hover:from-lime-400 group-hover:to-emerald-500 transition-all duration-500">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 blur-sm opacity-50 group-hover:opacity-100 transition-opacity"></div>

                <svg
                  xmlns="http://w3.org"
                  viewBox="0 0 100 100"
                  className="h-7 w-7 relative z-10 fill-none stroke-current stroke-[7.5] stroke-linecap-round stroke-linejoin-round"
                >
                  <circle cx="25" cy="65" r="16" />
                  <circle cx="75" cy="65" r="16" />
                  <path d="M25 65l18-32h22M75 65L61 30M43 33l15 32M61 30h11M36 30h12" />
                </svg>
              </div>

              <span className="text-2xl font-black tracking-tight text-white font-sans">
                Volt<span className="text-lime-400">Grid</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => setFilter('scooter')}
                className={`text-sm font-medium transition-colors duration-300 px-5 py-2 rounded-xl hover:bg-white/5 ${
                  filter === 'scooter'
                    ? 'text-lime-400 bg-white/5'
                    : 'text-slate-200'
                }`}
              >
                Scooters
              </button>

              <button
                onClick={() => setFilter('bike')}
                className={`text-sm font-medium transition-colors duration-300 px-5 py-2 rounded-xl hover:bg-white/5 ${
                  filter === 'bike'
                    ? 'text-lime-400 bg-white/5'
                    : 'text-slate-200'
                }`}
              >
                Bikes
              </button>

              <button
                onClick={() => setFilter('all')}
                className={`text-sm font-medium transition-colors duration-300 px-5 py-2 rounded-xl hover:bg-white/5 ${
                  filter === 'all'
                    ? 'text-lime-400 bg-white/5'
                    : 'text-slate-400'
                }`}
              >
                All Fleet
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={openCreateMode}
                className="text-sm font-semibold text-lime-400 hover:text-lime-300 transition-all bg-lime-400/10 border border-lime-400/20 px-5 py-2 rounded-full"
              >
                + Admin Panel
              </button>

              <button
                onClick={() => setFilter('all')}
                className="relative group overflow-hidden inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-lime-400 to-emerald-500"></span>

                <span className="relative z-10 flex items-center gap-1.5 text-black">
                  Start Ride
                </span>
              </button>
            </div>

            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-300"
              >
                <div className="w-5 h-4 relative flex flex-col justify-between items-center">
                  <span
                    className={`w-full h-0.5 bg-current rounded transition-all duration-300 origin-left ${
                      isMobileNavOpen ? 'rotate-45 translate-x-px' : ''
                    }`}
                  ></span>

                  <span
                    className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${
                      isMobileNavOpen ? 'opacity-0' : ''
                    }`}
                  ></span>

                  <span
                    className={`w-full h-0.5 bg-current rounded transition-all duration-300 origin-left ${
                      isMobileNavOpen ? '-rotate-45 translate-x-px' : ''
                    }`}
                  ></span>
                </div>
              </button>
            </div>

          </div>
        </div>

        <div
          className={`${
            isMobileNavOpen
              ? 'max-h-[400px] opacity-100'
              : 'max-h-0 opacity-0 invisible'
          } overflow-hidden md:hidden transition-all duration-300 ease-in-out px-6 pb-6 space-y-2`}
        >
          <div className="pt-2 border-t border-white/10 space-y-1">
            <button
              onClick={() => {
                setFilter('scooter');
                setIsMobileNavOpen(false);
              }}
              className="w-full text-left block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-white/5"
            >
              Scooters
            </button>

            <button
              onClick={() => {
                setFilter('bike');
                setIsMobileNavOpen(false);
              }}
              className="w-full text-left block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-white/5"
            >
              Bikes
            </button>

            <button
              onClick={() => {
                setFilter('all');
                setIsMobileNavOpen(false);
              }}
              className="w-full text-left block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-white/5"
            >
              All Fleet
            </button>

            <button
              onClick={() => {
                openCreateMode();
                setIsMobileNavOpen(false);
              }}
              className="w-full text-left block px-4 py-3 rounded-xl text-base font-medium text-lime-400 hover:bg-white/5"
            >
              + Admin Panel
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto pt-32 pb-12 px-8">
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-24 border border-white/[0.04] rounded-3xl bg-[#0f111a]/50">
            <p className="text-slate-400 font-mono text-sm">
              No items found in your API database.
            </p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto rounded-3xl border border-white/[0.06] bg-[#0f111a] shadow-lg">
            <table className="w-full min-w-[900px] text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    ID
                  </th>

                  <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Name
                  </th>

                  <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Type
                  </th>

                  <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Price
                  </th>

                  <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Battery
                  </th>

                  <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Range
                  </th>

                  <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Weight
                  </th>

                  <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredVehicles.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-all duration-200"
                  >
                    <td className="px-5 py-5 text-sm text-slate-500 font-mono">
                      #{item.id}
                    </td>

                    <td className="px-5 py-5">
                      <span className="text-sm font-bold text-white">
                        {item.name}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <span
                        className={`text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                          item.type === 'scooter'
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                            : 'bg-lime-500/10 text-lime-400 border-lime-500/20'
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-lg font-black text-lime-400">
                      {item.price &&
                      item.price.toString().startsWith('$')
                        ? item.price
                        : `$${item.price}`}
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-400">
                      {item.battery || '100'}%
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-400">
                      {item.range || '40 km'}
                    </td>

                    <td className="px-5 py-5 text-sm text-slate-400">
                      {item.weight || '15 kg'}
                    </td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => openEditMode(item, e)}
                          className="text-[11px] font-mono font-semibold text-slate-400 hover:text-lime-400 transition-colors px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                        >
                          ⚙ Edit
                        </button>

                        <button
                          onClick={(e) => handleDeleteProduct(item.id, e)}
                          className="text-[11px] font-mono font-semibold text-rose-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isAdminOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <form
            onSubmit={handleFormSubmit}
            className="w-full max-w-lg rounded-3xl bg-[#0f111a] border border-white/[0.08] p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Edit Vehicle Node' : 'Add New Vehicle Node'}
              </h2>

              <button
                type="button"
                onClick={() => setIsAdminOpen(false)}
                className="text-slate-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                required
                type="text"
                placeholder="e.g. Xiaomi Scooter Pro 4"
                value={formProduct.name}
                onChange={e =>
                  setFormProduct({
                    ...formProduct,
                    name: e.target.value
                  })
                }
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-400"
              />

              <select
                value={formProduct.type}
                onChange={e =>
                  setFormProduct({
                    ...formProduct,
                    type: e.target.value
                  })
                }
                className="w-full bg-[#161920] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white focus:outline-none"
              >
                <option value="scooter">Scooter</option>
                <option value="bike">Bike</option>
              </select>

              <input
                required
                type="text"
                placeholder="e.g. 899"
                value={formProduct.price}
                onChange={e =>
                  setFormProduct({
                    ...formProduct,
                    price: e.target.value
                  })
                }
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-400"
              />

              <input
                type="text"
                placeholder="e.g. 45 km"
                value={formProduct.range}
                onChange={e =>
                  setFormProduct({
                    ...formProduct,
                    range: e.target.value
                  })
                }
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-400"
              />

                   <input
                type="text"
                placeholder="e.g. 60%"
                value={formProduct.battery}
                onChange={e =>
                  setFormProduct({
                    ...formProduct,
                    battery: e.target.value
                  })
                }
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-400"
              />

              <input
                type="text"
                placeholder="e.g. 14 kg"
                value={formProduct.weight}
                onChange={e =>
                  setFormProduct({
                    ...formProduct,
                    weight: e.target.value
                  })
                }
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-400"
              />

              <input
                type="text"
                placeholder="unsplash.com..."
                value={formProduct.image}
                onChange={e =>
                  setFormProduct({
                    ...formProduct,
                    image: e.target.value
                  })
                }
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-lime-400"
              />

              <button
                type="submit"
                className="w-full bg-lime-400 text-black font-bold rounded-xl px-4 py-3"
              >
                {editingId ? 'Save Changes' : 'Commit & Push to API'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};



export default Admin;

