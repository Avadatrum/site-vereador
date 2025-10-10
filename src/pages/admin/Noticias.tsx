import { useState, useEffect } from 'react';
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
import { Plus, Search, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import NewsForm from '../../components/admin/NewsForm';

interface Noticia {
    id: number;
    titulo: string;
    conteudo: string;
    categoria: string;
    status: 'Rascunho' | 'Publicado';
    data: string;
    visualizacoes: number;
    imagem_url?: string;
    autor: string;
    createdAt: string;
    updatedAt: string;
}

export default function Noticias() {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingNoticia, setEditingNoticia] = useState<Noticia | null>(null);

    // Buscar notícias da API
    const fetchNoticias = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('admin_token');

            const response = await fetch('http://localhost:3001/api/noticias', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar notícias');
            }

            const data = await response.json();

            if (data.success) {
                setNoticias(data.data);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao carregar notícias');
        } finally {
            setLoading(false);
        }
    };

    // Carregar notícias ao montar componente
    useEffect(() => {
        fetchNoticias();
    }, []);

    // Abrir formulário para nova notícia
    const handleNewNoticia = () => {
        setEditingNoticia(null);
        setShowForm(true);
    };

    // Abrir formulário para editar notícia
    const handleEditNoticia = (noticia: Noticia) => {
        setEditingNoticia(noticia);
        setShowForm(true);
    };

    // Fechar formulário
    const handleCloseForm = () => {
        setShowForm(false);
        setEditingNoticia(null);
    };

    // Notícia salva com sucesso
    const handleNoticiaSaved = () => {
        setShowForm(false);
        setEditingNoticia(null);
        fetchNoticias(); // Recarregar lista
        alert(editingNoticia ? 'Notícia atualizada com sucesso!' : 'Notícia criada com sucesso!');
    };

    // Deletar notícia
    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja deletar esta notícia?')) {
            return;
        }

        try {
            const token = localStorage.getItem('admin_token');

            const response = await fetch(`http://localhost:3001/api/noticias/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.success) {
                alert('Notícia deletada com sucesso!');
                fetchNoticias(); // Recarregar lista
            } else {
                alert('Erro ao deletar notícia');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao deletar notícia');
        }
    };

    // Filtrar notícias pela busca
    const filteredNoticias = noticias.filter(noticia =>
        noticia.titulo.toLowerCase().includes(search.toLowerCase()) ||
        noticia.categoria.toLowerCase().includes(search.toLowerCase())
    );

    // Formatar data
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

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
                    <Button className="gap-2" onClick={handleNewNoticia}>
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
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" onClick={fetchNoticias}>
                                Atualizar
                            </Button>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                <span className="ml-2">Carregando notícias...</span>
                            </div>
                        ) : (
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
                                        {filteredNoticias.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                    {noticias.length === 0
                                                        ? 'Nenhuma notícia cadastrada'
                                                        : 'Nenhuma notícia encontrada'
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredNoticias.map((noticia) => (
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
                                                        {formatDate(noticia.createdAt)}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <Eye className="w-4 h-4 text-muted-foreground" />
                                                            <span>{noticia.visualizacoes}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleEditNoticia(noticia)}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleDelete(noticia.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4 text-destructive" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Modal do Formulário */}
                {showForm && (
                    <NewsForm
                        noticia={editingNoticia}
                        onSave={handleNoticiaSaved}
                        onCancel={handleCloseForm}
                        isEditing={!!editingNoticia}
                    />
                )}
            </div>
        </AdminLayout>
    );
}