import {
    LayoutDashboard,
    FileText,
    FolderKanban,
    Mail,
    Settings,
    User
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "../components/ui/sidebar";

const menuItems = [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard, exact: true },
    { title: "Notícias", url: "/admin/noticias", icon: FileText },
    { title: "Projetos", url: "/admin/projetos", icon: FolderKanban },
    { title: "Mensagens", url: "/admin/mensagens", icon: Mail },
    { title: "Perfil", url: "/admin/perfil", icon: User },
    { title: "Configurações", url: "/admin/configuracoes", icon: Settings },
];

export function AdminSidebar() {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    const getNavClass = ({ isActive }: { isActive: boolean }): string =>
        isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50";

    return (
        <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
            <SidebarContent>
                <div className="p-6 border-b border-sidebar-border">
                    {!isCollapsed && (
                        <div>
                            <h1 className="text-xl font-bold text-sidebar-foreground">
                                Painel Admin
                            </h1>
                            <p className="text-sm text-sidebar-foreground/60 mt-1">
                                Vereador Ítalo Caetano
                            </p>
                        </div>
                    )}
                    {isCollapsed && (
                        <div className="flex items-center justify-center">
                            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                                <span className="text-sidebar-primary-foreground font-bold text-sm">IC</span>
                            </div>
                        </div>
                    )}
                </div>

                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
                        Navegação
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            end={item.exact ? true : undefined}
                                            className={({ isActive }) => getNavClass({ isActive })}
                                        >
                                            <item.icon className={isCollapsed ? "mx-auto" : "mr-3 h-5 w-5"} />
                                            {!isCollapsed && <span>{item.title}</span>}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}