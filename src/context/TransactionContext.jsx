import { createContext, useContext, useState, useEffect } from "react";

const TransactionContext = createContext();

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(() => {
        const saved = sessionStorage.getItem("transactions");
        return saved ? JSON.parse(saved) : [];
    });

    // Simpan ke sessionStorage setiap update
    useEffect(() => {
        sessionStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (trx) => {
        setTransactions((prev) => [...prev, trx]);
    };

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction }}>
            {children}
        </TransactionContext.Provider>
    );
};
