// src/components/sections/NewsSection.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import { noticiasService, type Noticia } from '../../services/noticiasService';

export default function NewsSection() {
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Buscar notícias públicas ao carregar o componente
    const fetchNoticias = async () => {
        try {
            setLoading(true);
            setError('');

            const noticiasData = await noticiasService.getNoticiasPublicas();
            setNoticias(noticiasData);
        } catch (err) {
            console.error('Erro ao carregar notícias:', err);
            setError('Erro ao carregar notícias. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNoticias();
    }, []);

    // Formatar data
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    // Limitar conteúdo para preview
    const limitarConteudo = (conteudo: string, maxLength: number = 150) => {
        if (conteudo.length <= maxLength) return conteudo;
        return conteudo.substring(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <section id="news" className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Últimas Notícias
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Fique por dentro das novidades
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="animate-pulse text-center">
                            <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-2"></div>
                            <p className="text-muted-foreground">Carregando notícias...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="news" className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Últimas Notícias
                        </h2>
                    </div>
                    <div className="text-center text-destructive">
                        <p>{error}</p>
                        <Button onClick={fetchNoticias} className="mt-4">
                            Tentar Novamente
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="news" className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Últimas Notícias
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Fique por dentro das novidades e ações do vereador
                    </p>
                </div>

                {!noticias || noticias.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg mb-4">
                            Nenhuma notícia publicada ainda.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            As notícias aparecerão aqui quando forem publicadas pelo administrador.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {noticias.map((noticia) => (
                            <Card
                                key={noticia.id}
                                className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                            >
                                <Link to={`/noticia/${noticia.id}`} className="block">
                                    <CardContent className="p-6">
                                        {/* Categoria */}
                                        <div className="mb-3">
                                            <Badge variant="secondary">
                                                {noticia.categoria}
                                            </Badge>
                                        </div>

                                        {/* Imagem (se existir) */}
                                        {noticia.imagem_url && (
                                            <div className="mb-4 rounded-md overflow-hidden">
                                                <img
                                                    src={noticia.imagem_url}
                                                    alt={noticia.titulo}
                                                    className="w-full h-48 object-cover"
                                                />
                                            </div>
                                        )}

                                        {/* Título */}
                                        <h3 className="font-bold text-xl mb-3 text-foreground line-clamp-2 hover:text-primary transition-colors">
                                            {noticia.titulo}
                                        </h3>

                                        {/* Conteúdo */}
                                        <p className="text-muted-foreground mb-4 line-clamp-3">
                                            {limitarConteudo(noticia.conteudo)}
                                        </p>

                                        {/* Metadados */}
                                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(noticia.createdAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                <span>{noticia.visualizacoes}</span>
                                            </div>
                                        </div>

                                        {/* Autor */}
                                        <div className="text-xs text-muted-foreground border-t pt-3">
                                            Por: {noticia.autor}
                                        </div>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Link para mais notícias (futuramente) */}
                {noticias && noticias.length > 0 && (
                    <div className="text-center mt-12">
                        <Button variant="outline" className="gap-2">
                            Ver Todas as Notícias
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}