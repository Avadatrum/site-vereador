import { AdminLayout } from "../../components/AdminLayout";
import { StatCard } from "../../components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
    Users,
    FileText,
    TrendingUp,
    MessageSquare,
    Calendar,
    Eye
} from "lucide-react";

export default function Dashboard() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Visão geral das atividades e estatísticas do site
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Visitantes (mês)"
                        value="12,453"
                        icon={Users}
                        trend={{ value: 12.5, isPositive: true }}
                        variant="primary"
                    />
                    <StatCard
                        title="Notícias Publicadas"
                        value="48"
                        icon={FileText}
                        trend={{ value: 8.2, isPositive: true }}
                        variant="success"
                    />
                    <StatCard
                        title="Projetos Ativos"
                        value="15"
                        icon={TrendingUp}
                        trend={{ value: 3.1, isPositive: true }}
                        variant="default"
                    />
                    <StatCard
                        title="Mensagens Recebidas"
                        value="234"
                        icon={MessageSquare}
                        trend={{ value: 5.4, isPositive: false }}
                        variant="default"
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="transition-all duration-300 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-primary" />
                                Páginas Mais Visitadas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { page: "Página Inicial", views: 4521, percentage: 35 },
                                    { page: "Projetos", views: 3245, percentage: 25 },
                                    { page: "Notícias", views: 2876, percentage: 22 },
                                    { page: "Contato", views: 1543, percentage: 12 },
                                    { page: "Sobre", views: 768, percentage: 6 },
                                ].map((item) => (
                                    <div key={item.page} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-foreground">{item.page}</span>
                                            <span className="text-muted-foreground">{item.views.toLocaleString()}</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-all duration-300 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-success" />
                                Atividades Recentes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    {
                                        action: "Nova notícia publicada",
                                        item: "Projeto de lei aprovado na câmara",
                                        time: "2 horas atrás",
                                        type: "success"
                                    },
                                    {
                                        action: "Projeto atualizado",
                                        item: "Reforma da Praça Central",
                                        time: "5 horas atrás",
                                        type: "primary"
                                    },
                                    {
                                        action: "Nova mensagem recebida",
                                        item: "De João Silva",
                                        time: "8 horas atrás",
                                        type: "default"
                                    },
                                    {
                                        action: "Notícia editada",
                                        item: "Inauguração do novo posto de saúde",
                                        time: "1 dia atrás",
                                        type: "default"
                                    },
                                    {
                                        action: "Novo projeto criado",
                                        item: "Iluminação LED nas ruas",
                                        time: "2 dias atrás",
                                        type: "primary"
                                    },
                                ].map((activity, index) => (
                                    <div key={index} className="flex gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                                        <div className={`
                      w-2 h-2 rounded-full mt-2 flex-shrink-0
                      ${activity.type === 'success' ? 'bg-success' : ''}
                      ${activity.type === 'primary' ? 'bg-primary' : ''}
                      ${activity.type === 'default' ? 'bg-muted-foreground' : ''}
                    `} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground">
                                                {activity.action}
                                            </p>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {activity.item}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
