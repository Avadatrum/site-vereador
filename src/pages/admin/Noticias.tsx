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
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";

export default function Noticias() {
    const noticias = [
        {
            id: 1,
            titulo: "Projeto de lei aprovado na câmara",
            categoria: "Política",
            status: "Publicado",
            data: "2025-10-05",
            visualizacoes: 234,
        },
        {
            id: 2,
            titulo: "Inauguração do novo posto de saúde",
            categoria: "Saúde",
            status: "Publicado",
            data: "2025-10-03",
            visualizacoes: 189,
        },
        {
            id: 3,
            titulo: "Reforma da Praça Central em andamento",
            categoria: "Infraestrutura",
            status: "Rascunho",
            data: "2025-10-02",
            visualizacoes: 0,
        },
        {
            id: 4,
            titulo: "Programa de educação recebe novos investimentos",
            categoria: "Educação",
            status: "Publicado",
            data: "2025-09-30",
            visualizacoes: 312,
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Notícias
                        </h1>
                        <p className="text-muted-foreground">
                            Gerencie as notícias e publicações do site
                        </p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Nova Notícia
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar notícias..."
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
                                        <TableHead>Título</TableHead>
                                        <TableHead>Categoria</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Data</TableHead>
                                        <TableHead>Visualizações</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {noticias.map((noticia) => (
                                        <TableRow key={noticia.id}>
                                            <TableCell className="font-medium">
                                                {noticia.titulo}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {noticia.categoria}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={noticia.status === "Publicado" ? "default" : "secondary"}
                                                >
                                                    {noticia.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(noticia.data).toLocaleDateString('pt-BR')}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Eye className="w-4 h-4 text-muted-foreground" />
                                                    <span>{noticia.visualizacoes}</span>
                                                </div>
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
