import Sidebar from "../molecules/Sidebar.jsx";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 bg-gray-50 p-8">
                {children}
            </main>
        </div>
    );
}
