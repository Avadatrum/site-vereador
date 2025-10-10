import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

interface AdminLayoutProps {
    children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50">
                <AdminSidebar />

                <main className="flex-1 flex flex-col">
                    <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 flex items-center px-6">
                        <SidebarTrigger className="mr-4" />
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Painel Administrativo
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <User className="w-4 h-4" />
                                    <span>Administrador</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200 hover:border-red-300"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sair
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="flex-1 p-6">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}