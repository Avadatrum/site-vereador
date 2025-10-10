// src/pages/NoticiaDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Eye, ArrowLeft, User, Share2, X } from 'lucide-react';
import { noticiasService, type Noticia } from '../services/noticiasService';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function NoticiaDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [noticia, setNoticia] = useState<Noticia | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const navigationItems = [
        { label: 'Início', href: '/' },
        { label: 'Sobre', href: '/#about' },
        { label: 'Propostas', href: '/#proposals' },
        { label: 'Notícias', href: '/#news' },
        { label: 'Contato', href: '/#contact' },
    ];

    useEffect(() => {
        const fetchNoticia = async () => {
            if (!id) return;

            try {
                setLoading(true);
                setError('');

                const noticiaData = await noticiasService.getNoticiaById(parseInt(id));

                if (!noticiaData) {
                    setError('Notícia não encontrada');
                    return;
                }

                setNoticia(noticiaData);
            } catch (err) {
                console.error('Erro ao carregar notícia:', err);
                setError('Erro ao carregar notícia. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchNoticia();
    }, [id]);

    // Função para renderizar Markdown como HTML
    const renderMarkdown = (content: string) => {
        if (!content) return { __html: '' };

        let html = content
            // Negrito
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
            // Itálico
            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
            // Sublinhado
            .replace(/<u>(.*?)<\/u>/g, '<u class="underline">$1</u>')
            // Títulos
            .replace(/# (.*?)(\n|$)/g, '<h1 class="text-3xl font-bold mt-6 mb-4 text-foreground">$1</h1>')
            .replace(/## (.*?)(\n|$)/g, '<h2 class="text-2xl font-bold mt-5 mb-3 text-foreground">$1</h2>')
            .replace(/### (.*?)(\n|$)/g, '<h3 class="text-xl font-bold mt-4 mb-2 text-foreground">$1</h3>')
            // Listas não ordenadas
            .replace(/- (.*?)(?=\n-|\n\n|$)/g, '<li class="ml-6 list-disc">$1</li>')
            // Listas ordenadas
            .replace(/\d\. (.*?)(?=\n\d\.|\n\n|$)/g, '<li class="ml-6 list-decimal">$1</li>')
            // Agrupar listas
            .replace(/(<li class="ml-6 list-disc">.*?<\/li>)+/g, '<ul class="my-4 space-y-2">$&</ul>')
            .replace(/(<li class="ml-6 list-decimal">.*?<\/li>)+/g, '<ol class="my-4 space-y-2">$&</ol>')
            // Citações
            .replace(/> (.*?)(\n|$)/g, '<blockquote class="border-l-4 border-primary pl-4 py-2 my-4 bg-muted/30 italic">$1</blockquote>')
            // Links
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
            // Quebras de linha
            .replace(/\n/g, '<br>')
            // Limpar agrupamentos duplicados
            .replace(/<ul class="my-4 space-y-2">(<ul class="my-4 space-y-2">.*?<\/ul>)<\/ul>/g, '$1')
            .replace(/<ol class="my-4 space-y-2">(<ol class="my-4 space-y-2">.*?<\/ol>)<\/ol>/g, '$1');

        return { __html: html };
    };

    // Compartilhar notícia
    const handleShare = () => {
        if (navigator.share && noticia) {
            navigator.share({
                title: noticia.titulo,
                text: noticia.conteudo.replace(/\*\*|\*|<u>|<\/u>|#|##|###|- |\d\. |> |\[.*?\]|\(.*?\)/g, '').substring(0, 100) + '...',
                url: window.location.href,
            });
        } else {
            // Fallback - copiar URL
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    // Formatar data
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Fechar modal ao pressionar ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedImage(null);
            }
        };

        if (selectedImage) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden'; // Previne scroll
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header navigationItems={navigationItems} />
                <main className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="animate-pulse">
                            <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
                            <div className="h-4 bg-muted rounded w-full mb-4"></div>
                            <div className="h-4 bg-muted rounded w-2/3 mb-12"></div>
                            <div className="h-64 bg-muted rounded mb-6"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-muted rounded"></div>
                                <div className="h-4 bg-muted rounded"></div>
                                <div className="h-4 bg-muted rounded w-3/4"></div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !noticia) {
        return (
            <div className="min-h-screen bg-background">
                <Header navigationItems={navigationItems} />
                <main className="container mx-auto px-4 py-16">
                    <div className="max-w-2xl mx-auto text-center">
                        <Card>
                            <CardContent className="p-8">
                                <h1 className="text-2xl font-bold text-foreground mb-4">
                                    {error || 'Notícia não encontrada'}
                                </h1>
                                <p className="text-muted-foreground mb-6">
                                    A notícia que você está procurando não existe ou foi removida.
                                </p>
                                <Button asChild>
                                    <Link to="/">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Voltar para a página inicial
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header navigationItems={navigationItems} />

            <main className="container mx-auto px-4 py-8">
                {/* Botão Voltar */}
                <div className="max-w-4xl mx-auto mb-6">
                    <Button variant="ghost" asChild className="mb-6">
                        <Link to="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Início
                        </Link>
                    </Button>
                </div>

                <article className="max-w-4xl mx-auto">
                    {/* Cabeçalho */}
                    <header className="mb-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <Badge variant="secondary">
                                {noticia.categoria}
                            </Badge>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(noticia.createdAt)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    <span>{noticia.visualizacoes} visualizações</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>Por: {noticia.autor}</span>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            {noticia.titulo}
                        </h1>

                        {/* Botão Compartilhar */}
                        <Button variant="outline" size="sm" onClick={handleShare}>
                            <Share2 className="w-4 h-4 mr-2" />
                            Compartilhar
                        </Button>
                    </header>

                    {/* Imagem Destaque - SUPER RESPONSIVA COM MODAL */}
                    {noticia.imagem_url && (
                        <div className="mb-8">
                            <div className="relative w-full max-w-3xl mx-auto">
                                {/* Container da imagem com aspect ratio */}
                                <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted/20 shadow-lg border">
                                    <img
                                        src={noticia.imagem_url}
                                        alt={noticia.titulo}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-zoom-in"
                                        loading="lazy"
                                        onClick={() => setSelectedImage(noticia.imagem_url!)}
                                    />
                                </div>
                                <p className="text-center text-sm text-muted-foreground mt-3 flex items-center justify-center gap-1">
                                    <span className="text-lg">📸</span>
                                    Clique na imagem para ampliar
                                </p>
                            </div>

                            {/* Modal para imagem ampliada */}
                            {selectedImage && (
                                <div
                                    className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
                                    onClick={() => setSelectedImage(null)}
                                >
                                    <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
                                        {/* Imagem ampliada */}
                                        <img
                                            src={selectedImage}
                                            alt={noticia.titulo}
                                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                                        />

                                        {/* Botão Fechar */}
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-4 right-4 bg-red-600/90 hover:bg-red-700 backdrop-blur-sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImage(null);
                                            }}
                                        >
                                            <X className="w-5 h-5" />
                                        </Button>

                                        {/* Contador (se tiver múltiplas imagens no futuro) */}
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                                            1 / 1
                                        </div>

                                        {/* Dica do teclado */}
                                        <div className="absolute bottom-4 right-4 bg-black/70 text-white/80 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                                            Pressione ESC para sair
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Conteúdo FORMATADO - MARKDOWN PARA HTML */}
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="ck-content"
                            dangerouslySetInnerHTML={renderMarkdown(noticia.conteudo)}
                            style={{
                                lineHeight: '1.6',
                                fontSize: '1.125rem',
                                color: 'hsl(var(--foreground))'
                            }}
                        />
                    </div>

                    {/* Rodapé do Artigo */}
                    <footer className="mt-12 pt-6 border-t">
                        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
                            <div>
                                <strong>Publicado em:</strong> {formatDate(noticia.createdAt)}
                            </div>
                            <div>
                                <strong>Atualizado em:</strong> {formatDate(noticia.updatedAt)}
                            </div>
                        </div>
                    </footer>
                </article>
            </main>

            <Footer />
        </div>
    );
}