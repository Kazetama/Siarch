import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../src/components/organisms/Layout.jsx";
import { useTransaction } from "./context/TransactionContext.jsx";
import { HiOutlineCheckCircle, HiOutlineExclamationCircle } from "react-icons/hi";

export default function Create() {
    const { addTransaction } = useTransaction();
    const [form, setForm] = useState({
        date: new Date().toISOString().split('T')[0], 
        desc: "",
        type: "Pemasukan",
        amount: "",
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (error) setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.date || !form.desc || !form.amount) {
            setError("Semua field wajib diisi!");
            return;
        }

        const newTransaction = {
            id: Date.now(),
            ...form,
            amount: parseInt(form.amount),
        };

        addTransaction(newTransaction);
        navigate("/home"); 
    };

    const inputGroupClass = "space-y-2";
    const labelClass = "block text-sm font-medium text-gray-700";
    const inputFieldClass = `w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-xl
                           transition-all duration-300
                           focus:outline-none focus:border-pink-300 
                           focus:ring-2 focus:ring-pink-200`;

    return (
        <Layout>
            <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-pink-100/50">

                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                    Tambah Transaksi Baru
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div className={inputGroupClass}>
                            <label htmlFor="date" className={labelClass}>Tanggal</label>
                            <input
                                id="date"
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                className={inputFieldClass}
                            />
                        </div>

                        <div className={inputGroupClass}>
                            <label htmlFor="type" className={labelClass}>Tipe Transaksi</label>
                            <select
                                id="type"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className={inputFieldClass}
                            >
                                <option value="Pemasukan">Pemasukan</option>
                                <option value="Pengeluaran">Pengeluaran</option>
                            </select>
                        </div>

                        <div className={`${inputGroupClass} md:col-span-2`}>
                            <label htmlFor="desc" className={labelClass}>Keterangan</label>
                            <input
                                id="desc"
                                type="text"
                                name="desc"
                                placeholder="Contoh: Penjualan Proyek A"
                                value={form.desc}
                                onChange={handleChange}
                                className={inputFieldClass}
                            />
                        </div>

                        <div className={`${inputGroupClass} md:col-span-2`}>
                            <label htmlFor="amount" className={labelClass}>Jumlah (Rp)</label>
                            <input
                                id="amount"
                                type="number"
                                name="amount"
                                placeholder="Contoh: 1500000"
                                value={form.amount}
                                onChange={handleChange}
                                className={inputFieldClass}
                            />
                        </div>

                    </div> 

                    {error && (
                        <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                            <HiOutlineExclamationCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3.5 font-semibold text-pink-700 rounded-xl
                       bg-gradient-to-r from-pink-100 to-pink-200 
                       transition-all duration-300
                       hover:shadow-lg hover:shadow-pink-200/60 hover:-translate-y-0.5
                       active:scale-[.98] active:translate-y-0"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <HiOutlineCheckCircle size={20} />
                            Simpan Transaksi
                        </span>
                    </button>

                </form>
            </div>
        </Layout>
    );
}