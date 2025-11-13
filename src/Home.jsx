import Layout from "../src/components/organisms/Layout.jsx";
import {
    HiOutlineArrowUp,
    HiOutlineArrowDown,
    HiOutlineScale,
    HiOutlinePlus
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useTransaction } from "../src/context/TransactionContext.jsx";

// Format angka ke Rupiah
const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
};

export default function Home() {
    // Ambil transaksi dari Context
    const { transactions } = useTransaction();

    // Hitung total
    const totalPemasukan = transactions
        .filter((t) => t.type === "Pemasukan")
        .reduce((a, b) => a + b.amount, 0);

    const totalPengeluaran = transactions
        .filter((t) => t.type === "Pengeluaran")
        .reduce((a, b) => a + b.amount, 0);

    const saldo = totalPemasukan - totalPengeluaran;

    // Badge berdasarkan tipe
    const getBadgeClass = (type) =>
        type === "Pemasukan"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700";

    const kpiCardClass =
        "bg-white p-6 rounded-2xl shadow-xl shadow-pink-100/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer";

    return (
        <Layout>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Dashboard Keuangan</h2>
                <Link
                    to="/create"
                    className="flex items-center gap-2 px-5 py-2.5 font-semibold text-pink-700 rounded-xl
                     bg-gradient-to-r from-pink-100 to-pink-200 
                     transition-all duration-300
                     hover:shadow-lg hover:shadow-pink-200/60 hover:-translate-y-0.5
                     active:scale-[.98]"
                >
                    <HiOutlinePlus size={18} />
                    Tambah Transaksi
                </Link>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={kpiCardClass}>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <HiOutlineArrowUp className="text-green-600" size={22} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Pemasukan</p>
                            <p className="text-2xl font-bold text-gray-800">{formatRupiah(totalPemasukan)}</p>
                        </div>
                    </div>
                </div>

                <div className={kpiCardClass}>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-full">
                            <HiOutlineArrowDown className="text-red-600" size={22} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Pengeluaran</p>
                            <p className="text-2xl font-bold text-gray-800">{formatRupiah(totalPengeluaran)}</p>
                        </div>
                    </div>
                </div>

                <div className={kpiCardClass}>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-pink-100 rounded-full">
                            <HiOutlineScale className="text-pink-600" size={22} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Saldo Saat Ini</p>
                            <p className="text-2xl font-bold text-pink-700">{formatRupiah(saldo)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabel Transaksi */}
            <div className="mt-8 bg-white p-6 sm:p-8 rounded-2xl shadow-xl shadow-pink-100/50">
                <h3 className="text-xl font-semibold mb-5 text-gray-800">Transaksi Terakhir</h3>
                {transactions.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">Belum ada transaksi</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Tanggal</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Keterangan</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Tipe</th>
                                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {transactions.map((trx) => (
                                    <tr key={trx.id} className="hover:bg-pink-50 transition-colors">
                                        <td className="py-4 px-4 text-sm text-gray-600">{trx.date}</td>
                                        <td className="py-4 px-4 text-sm font-medium text-gray-800">{trx.desc}</td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getBadgeClass(trx.type)}`}
                                            >
                                                {trx.type}
                                            </span>
                                        </td>
                                        <td
                                            className={`py-4 px-4 text-sm font-medium ${trx.type === "Pemasukan"
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`}
                                        >
                                            {trx.type === "Pengeluaran" ? "-" : ""}
                                            {formatRupiah(trx.amount)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    );
}
