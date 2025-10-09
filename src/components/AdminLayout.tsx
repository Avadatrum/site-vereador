import type { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
    children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
                <AdminSidebar />

                <main className="flex-1 flex flex-col">
                    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 flex items-center px-6">
                        <SidebarTrigger className="mr-4" />
                        <div className="flex items-center justify-between w-full">
                            <h2 className="text-lg font-semibold text-foreground">
                                Painel Administrativo
                            </h2>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">
                                    Bem-vindo, Admin
                                </span>
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