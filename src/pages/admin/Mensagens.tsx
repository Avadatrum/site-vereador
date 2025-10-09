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
import { Search, Eye, Trash2, Mail } from "lucide-react";

export default function Mensagens() {
    const mensagens = [
        {
            id: 1,
            remetente: "João Silva",
            email: "joao.silva@email.com",
            assunto: "Solicitação de melhoria na rua",
            data: "2025-10-07",
            lida: false,
        },
        {
            id: 2,
            remetente: "Maria Santos",
            email: "maria.santos@email.com",
            assunto: "Agradecimento pelo novo posto de saúde",
            data: "2025-10-06",
            lida: true,
        },
        {
            id: 3,
            remetente: "Pedro Oliveira",
            email: "pedro.oliveira@email.com",
            assunto: "Dúvida sobre projeto da praça",
            data: "2025-10-05",
            lida: true,
        },
        {
            id: 4,
            remetente: "Ana Costa",
            email: "ana.costa@email.com",
            assunto: "Sugestão para iluminação pública",
            data: "2025-10-04",
            lida: false,
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Mensagens
                        </h1>
                        <p className="text-muted-foreground">
                            Visualize e gerencie as mensagens recebidas
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-base px-4 py-2">
                            {mensagens.filter(m => !m.lida).length} não lidas
                        </Badge>
                    </div>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar mensagens..."
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
                                        <TableHead>Remetente</TableHead>
                                        <TableHead>E-mail</TableHead>
                                        <TableHead>Assunto</TableHead>
                                        <TableHead>Data</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mensagens.map((mensagem) => (
                                        <TableRow key={mensagem.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    {!mensagem.lida && (
                                                        <Mail className="w-4 h-4 text-primary" />
                                                    )}
                                                    {mensagem.remetente}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {mensagem.email}
                                            </TableCell>
                                            <TableCell>
                                                {mensagem.assunto}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(mensagem.data).toLocaleDateString('pt-BR')}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={mensagem.lida ? "secondary" : "default"}
                                                >
                                                    {mensagem.lida ? "Lida" : "Não lida"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button size="sm" variant="ghost">
                                                        <Eye className="w-4 h-4" />
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
