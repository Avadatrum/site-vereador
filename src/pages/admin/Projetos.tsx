import { AdminLayout } from "../../components/AdminLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Progress } from "../../components/ui/progress";

export default function Projetos() {
    const projetos = [
        {
            id: 1,
            nome: "Reforma da Praça Central",
            status: "Em andamento",
            progresso: 65,
            dataInicio: "2025-08-15",
            prioridade: "Alta",
        },
        {
            id: 2,
            nome: "Iluminação LED nas ruas",
            status: "Planejamento",
            progresso: 20,
            dataInicio: "2025-10-01",
            prioridade: "Média",
        },
        {
            id: 3,
            nome: "Centro Esportivo Municipal",
            status: "Em andamento",
            progresso: 45,
            dataInicio: "2025-07-10",
            prioridade: "Alta",
        },
        {
            id: 4,
            nome: "Revitalização da Biblioteca",
            status: "Concluído",
            progresso: 100,
            dataInicio: "2025-05-01",
            prioridade: "Média",
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Concluído":
                return "default";
            case "Em andamento":
                return "default";
            case "Planejamento":
                return "secondary";
            default:
                return "outline";
        }
    };

    const getPrioridadeColor = (prioridade: string) => {
        switch (prioridade) {
            case "Alta":
                return "destructive";
            case "Média":
                return "default";
            case "Baixa":
                return "secondary";
            default:
                return "outline";
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Projetos
                        </h1>
                        <p className="text-muted-foreground">
                            Gerencie os projetos e propostas em andamento
                        </p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Novo Projeto
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar projetos..."
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="outline">
                                Filtros
                            </Button>
                        </div>

                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nome do Projeto</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Progresso</TableHead>
                                        <TableHead>Data de Início</TableHead>
                                        <TableHead>Prioridade</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {projetos.map((projeto) => (
                                        <TableRow key={projeto.id}>
                                            <TableCell className="font-medium">
                                                {projeto.nome}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusColor(projeto.status)}>
                                                    {projeto.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={projeto.progresso} className="w-24" />
                                                    <span className="text-sm text-muted-foreground">
                                                        {projeto.progresso}%
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(projeto.dataInicio).toLocaleDateString('pt-BR')}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getPrioridadeColor(projeto.prioridade)}>
                                                    {projeto.prioridade}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button size="sm" variant="ghost">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="sm" variant="ghost">
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
