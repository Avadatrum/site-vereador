import { AdminLayout } from "../../components/AdminLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Separator } from "../../components/ui/separator";
import {
    Globe,
    Bell,
    Shield,
    Palette,
    Database
} from "lucide-react";

export default function Configuracoes() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Configurações
                    </h1>
                    <p className="text-muted-foreground">
                        Configure as preferências e ajustes do sistema
                    </p>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Globe className="w-5 h-5 text-primary" />
                                <CardTitle>Configurações do Site</CardTitle>
                            </div>
                            <CardDescription>
                                Ajuste as informações gerais exibidas no site público
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="site-title">Título do Site</Label>
                                <Input id="site-title" defaultValue="Vereador Ítalo Caetano" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="site-description">Descrição</Label>
                                <Input id="site-description" defaultValue="Site oficial do Vereador Ítalo Caetano" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Modo de Manutenção</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Desabilita temporariamente o acesso ao site público
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="w-5 h-5 text-primary" />
                                <CardTitle>Notificações</CardTitle>
                            </div>
                            <CardDescription>
                                Gerencie como você recebe notificações
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Novas Mensagens</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receber notificações de novas mensagens
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Novos Comentários</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Notificar quando houver novos comentários
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Relatórios Semanais</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receber resumo semanal de atividades
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-primary" />
                                <CardTitle>Segurança</CardTitle>
                            </div>
                            <CardDescription>
                                Configurações de segurança e privacidade
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Senha Atual</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">Nova Senha</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                            <Button>Atualizar Senha</Button>
                            <Separator className="my-4" />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Autenticação de Dois Fatores</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Adicione uma camada extra de segurança
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Palette className="w-5 h-5 text-primary" />
                                <CardTitle>Aparência</CardTitle>
                            </div>
                            <CardDescription>
                                Personalize a aparência do painel
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Modo Escuro</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Ativar tema escuro no painel
                                    </p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Database className="w-5 h-5 text-primary" />
                                <CardTitle>Dados e Backup</CardTitle>
                            </div>
                            <CardDescription>
                                Gerencie seus dados e backups
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Backup Automático</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Criar backup diário dos dados
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex gap-2">
                                <Button variant="outline">Exportar Dados</Button>
                                <Button variant="outline">Criar Backup Manual</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
