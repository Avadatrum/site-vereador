import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2, X } from "lucide-react";

interface NewsFormProps {
    noticia?: any;
    onSave: () => void;
    onCancel: () => void;
    isEditing?: boolean;
}

const NewsForm: React.FC<NewsFormProps> = ({
    noticia,
    onSave,
    onCancel,
    isEditing = false
}) => {
    const [formData, setFormData] = useState({
        titulo: '',
        conteudo: '',
        categoria: 'Geral',
        status: 'Rascunho' as 'Rascunho' | 'Publicado',
        imagem_url: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Preencher form se estiver editando
    useEffect(() => {
        if (isEditing && noticia) {
            setFormData({
                titulo: noticia.titulo || '',
                conteudo: noticia.conteudo || '',
                categoria: noticia.categoria || 'Geral',
                status: noticia.status || 'Rascunho',
                imagem_url: noticia.imagem_url || ''
            });
        }
    }, [isEditing, noticia]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('admin_token');
            const url = isEditing
                ? `http://localhost:3001/api/noticias/${noticia.id}`
                : 'http://localhost:3001/api/noticias';

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                onSave();
            } else {
                setError(data.message || 'Erro ao salvar notícia');
            }
        } catch (error) {
            console.error('Erro:', error);
            setError('Erro ao salvar notícia');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>
                        {isEditing ? 'Editar Notícia' : 'Nova Notícia'}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={onCancel}>
                        <X className="w-4 h-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Título */}
                        <div>
                            <Label htmlFor="titulo">Título *</Label>
                            <Input
                                id="titulo"
                                value={formData.titulo}
                                onChange={handleInputChange}
                                placeholder="Digite o título da notícia"
                                required
                            />
                        </div>

                        {/* Conteúdo */}
                        <div>
                            <Label htmlFor="conteudo">Conteúdo *</Label>
                            <Textarea
                                id="conteudo"
                                value={formData.conteudo}
                                onChange={handleTextareaChange}
                                placeholder="Digite o conteúdo da notícia"
                                rows={6}
                                required
                            />
                        </div>

                        {/* Categoria e Status */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="categoria">Categoria</Label>
                                <Select
                                    value={formData.categoria}
                                    onValueChange={(value) => handleSelectChange('categoria', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione a categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Geral">Geral</SelectItem>
                                        <SelectItem value="Política">Política</SelectItem>
                                        <SelectItem value="Saúde">Saúde</SelectItem>
                                        <SelectItem value="Educação">Educação</SelectItem>
                                        <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                                        <SelectItem value="Meio Ambiente">Meio Ambiente</SelectItem>
                                        <SelectItem value="Cultura">Cultura</SelectItem>
                                        <SelectItem value="Turismo">Turismo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value: 'Rascunho' | 'Publicado') => handleSelectChange('status', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Rascunho">Rascunho</SelectItem>
                                        <SelectItem value="Publicado">Publicado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Imagem URL */}
                        <div>
                            <Label htmlFor="imagem_url">URL da Imagem (opcional)</Label>
                            <Input
                                id="imagem_url"
                                value={formData.imagem_url}
                                onChange={handleInputChange}
                                placeholder="https://exemplo.com/imagem.jpg"
                            />
                        </div>

                        {/* Mensagem de Erro */}
                        {error && (
                            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        {/* Botões */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="flex-1"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Salvando...
                                    </>
                                ) : (
                                    'Salvar Notícia'
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                disabled={loading}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default NewsForm;