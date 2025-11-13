import { Link, useLocation } from "react-router-dom";
import { HiOutlineHome, HiOutlinePencilAlt, HiOutlineLogout } from "react-icons/hi";

export default function Sidebar() {
    const location = useLocation();

    const mainMenuItems = [
        { name: "Dashboard", path: "/home", icon: <HiOutlineHome size={20} />, activePaths: ["/home", "/create"] },
        { name: "Input Data", path: "/input", icon: <HiOutlinePencilAlt size={20} />, activePaths: ["/input"] },
    ];

    const logoutItem = {
        name: "Logout",
        path: "/",
        icon: <HiOutlineLogout size={20} />,
        activePaths: ["/"], // untuk konsistensi
    };

    const getLinkClasses = (item) => {
        const isActive = item.activePaths?.includes(location.pathname) || location.pathname === item.path;

        let classes = "flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200";

        if (isActive) {
            classes += " bg-pink-100 text-pink-700 font-semibold";
        } else {
            classes += " text-gray-600 hover:bg-pink-50 hover:text-pink-600";
        }
        return classes;
    };

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen px-4 py-5 bg-white border-r border-gray-100 fixed left-0 top-0">
            <div className="px-4 pb-4 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-800">
                    SI<span className="text-pink-600">arch</span> system
                </h1>
            </div>

            <nav className="flex-1 mt-6">
                <ul className="space-y-2">
                    {mainMenuItems.map((item) => (
                        <li key={item.path}>
                            <Link to={item.path} className={getLinkClasses(item)}>
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="pt-4 border-t border-gray-100">
                <ul>
                    <li>
                        <Link to={logoutItem.path} className={getLinkClasses(logoutItem)}>
                            <span className="mr-3">{logoutItem.icon}</span>
                            {logoutItem.name}
                        </Link>
                    </li>
                </ul>

                <footer className="p-4 mt-4 text-sm text-center text-gray-400">
                    <p>© 2025 Kazeetama</p>
                </footer>
            </div>
        </aside>
    );
}
