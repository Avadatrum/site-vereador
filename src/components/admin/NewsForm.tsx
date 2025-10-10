// src/components/admin/NewsForm.tsx
import { useState, useEffect, useRef } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Loader2, X, Bold, Italic, Underline, List, ListOrdered, Quote, Link, Upload, Image, XCircle } from "lucide-react";

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
    const [uploadLoading, setUploadLoading] = useState(false);
    const [error, setError] = useState('');
    const [uploadError, setUploadError] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

            if (noticia.imagem_url) {
                setImagePreview(noticia.imagem_url);
            }
        }
    }, [isEditing, noticia]);

    // Função para upload de imagem
    const handleImageUpload = async (file: File) => {
        setUploadLoading(true);
        setUploadError('');

        try {
            const token = localStorage.getItem('admin_token');
            const formData = new FormData();
            formData.append('imagem', file);

            const response = await fetch('http://localhost:3001/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setFormData(prev => ({
                    ...prev,
                    imagem_url: data.imageUrl
                }));
                setImagePreview(data.imageUrl);
                setUploadError('');
            } else {
                setUploadError(data.message || 'Erro ao fazer upload da imagem');
            }
        } catch (error) {
            console.error('Erro no upload:', error);
            setUploadError('Erro ao fazer upload da imagem');
        } finally {
            setUploadLoading(false);
        }
    };

    // Quando selecionar arquivo
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
            setUploadError('Por favor, selecione apenas arquivos de imagem');
            return;
        }

        // Validar tamanho (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('A imagem deve ter no máximo 5MB');
            return;
        }

        // Criar preview local
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Fazer upload
        handleImageUpload(file);
    };

    // Remover imagem
    const handleRemoveImage = () => {
        setFormData(prev => ({
            ...prev,
            imagem_url: ''
        }));
        setImagePreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Arrastar e soltar
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    // Funções de formatação Markdown (mantidas do código anterior)
    const applyFormat = (format: string) => {
        if (!textareaRef.current) return;

        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.conteudo.substring(start, end);

        let newText = '';
        let newCursorPos = start;

        switch (format) {
            case 'bold':
                newText = formData.conteudo.substring(0, start) +
                    `**${selectedText}**` +
                    formData.conteudo.substring(end);
                newCursorPos = start + 2 + selectedText.length + 2;
                break;
            case 'italic':
                newText = formData.conteudo.substring(0, start) +
                    `*${selectedText}*` +
                    formData.conteudo.substring(end);
                newCursorPos = start + 1 + selectedText.length + 1;
                break;
            case 'underline':
                newText = formData.conteudo.substring(0, start) +
                    `<u>${selectedText}</u>` +
                    formData.conteudo.substring(end);
                newCursorPos = start + 3 + selectedText.length + 4;
                break;
            case 'h1':
                newText = formData.conteudo.substring(0, start) +
                    `\n# ${selectedText || 'Título'}\n` +
                    formData.conteudo.substring(end);
                newCursorPos = start + (selectedText ? 3 : 4);
                break;
            case 'h2':
                newText = formData.conteudo.substring(0, start) +
                    `\n## ${selectedText || 'Subtítulo'}\n` +
                    formData.conteudo.substring(end);
                newCursorPos = start + (selectedText ? 4 : 5);
                break;
            case 'bullet':
                newText = formData.conteudo.substring(0, start) +
                    `\n- ${selectedText || 'Item da lista'}\n` +
                    formData.conteudo.substring(end);
                newCursorPos = start + (selectedText ? 3 : 4);
                break;
            case 'number':
                newText = formData.conteudo.substring(0, start) +
                    `\n1. ${selectedText || 'Item numerado'}\n` +
                    formData.conteudo.substring(end);
                newCursorPos = start + (selectedText ? 4 : 5);
                break;
            case 'quote':
                newText = formData.conteudo.substring(0, start) +
                    `\n> ${selectedText || 'Citação'}\n` +
                    formData.conteudo.substring(end);
                newCursorPos = start + (selectedText ? 3 : 4);
                break;
            case 'link':
                const url = prompt('Digite a URL:');
                if (url) {
                    newText = formData.conteudo.substring(0, start) +
                        `[${selectedText || 'link'}](${url})` +
                        formData.conteudo.substring(end);
                    newCursorPos = start + (selectedText ? selectedText.length + 3 + url.length + 2 : 8 + url.length);
                } else {
                    return;
                }
                break;
            default:
                return;
        }

        setFormData(prev => ({
            ...prev,
            conteudo: newText
        }));

        // Foca e posiciona o cursor
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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

                        {/* UPLOAD DE IMAGEM - NOVO! */}
                        <div>
                            <Label>Imagem de Destaque</Label>

                            {/* Área de Upload */}
                            <div
                                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />

                                {uploadLoading ? (
                                    <div className="flex flex-col items-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
                                        <p className="text-sm text-muted-foreground">Fazendo upload...</p>
                                    </div>
                                ) : imagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="max-h-48 mx-auto rounded-lg"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute -top-2 -right-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveImage();
                                            }}
                                        >
                                            <XCircle className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                                        <p className="text-sm font-medium">Clique ou arraste uma imagem</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            PNG, JPG, GIF até 5MB
                                        </p>
                                    </div>
                                )}
                            </div>

                            {uploadError && (
                                <p className="text-sm text-destructive mt-2">{uploadError}</p>
                            )}

                            {formData.imagem_url && !uploadLoading && (
                                <p className="text-sm text-green-600 mt-2">
                                    ✅ Imagem carregada com sucesso!
                                </p>
                            )}
                        </div>

                        {/* Conteúdo - EDITOR CUSTOMIZADO */}
                        <div>
                            <Label htmlFor="conteudo">Conteúdo *</Label>

                            {/* Barra de Ferramentas */}
                            <div className="flex flex-wrap gap-1 mb-2 p-2 border rounded-t-md bg-muted/50">
                                <Button type="button" variant="ghost" size="sm" onClick={() => applyFormat('bold')}>
                                    <Bold className="w-4 h-4" />
                                </Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => applyFormat('italic')}>
                                    <Italic className="w-4 h-4" />
                                </Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => applyFormat('underline')}>
                                    <Underline className="w-4 h-4" />
                                </Button>
                                <div className="w-px bg-border mx-1"></div>
                                <Button type="button" variant="ghost" size="sm" onClick={() => applyFormat('h1')}>
                                    T1
                                </Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => applyFormat('h2')}>
                                    T2
                                </Button>
                                <div className="w-px bg-border mx-1"></div>
                                <Button type="button" variant="ghost" size="sm" onClick={() => applyFormat('bullet')}>
                                    <List className="w-4 h-4" />
                                </Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => applyFormat('number')}>
                                    <ListOrdered className="w-4 h-4" />
                                </Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => applyFormat('quote')}>
                                    <Quote className="w-4 h-4" />
                                </Button>
                                <Button type="button" variant="ghost" size="sm" onClick={() => applyFormat('link')}>
                                    <Link className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Área de Texto */}
                            <Textarea
                                ref={textareaRef}
                                id="conteudo"
                                value={formData.conteudo}
                                onChange={handleInputChange}
                                placeholder="Digite o conteúdo da notícia... Use os botões acima para formatar."
                                rows={12}
                                className="rounded-t-none font-mono text-sm"
                                required
                            />

                            <p className="text-sm text-muted-foreground mt-2">
                                Dica: Selecione o texto e clique nos botões para formatar
                            </p>
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
                                disabled={loading || uploadLoading}
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
                                disabled={loading || uploadLoading}
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