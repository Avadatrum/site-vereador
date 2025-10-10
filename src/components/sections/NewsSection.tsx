import { useState, useEffect } from 'react';
import type { FC } from 'react';
import '../../styles/components/NewsSection.css';

interface NewsItem {
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
}

interface NewsSectionProps {
    title?: string;
    subtitle?: string;
}

const NewsSection: FC<NewsSectionProps> = ({
    title = "Notícias e Atualizações",
    subtitle = "Acompanhe as últimas notícias sobre o trabalho de Ítalo Caetano"
}) => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Buscar notícias publicadas da API
    const fetchNews = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch('http://localhost:3001/api/noticias-publicas');

            if (!response.ok) {
                throw new Error('Erro ao carregar notícias');
            }

            const data = await response.json();

            if (data.success) {
                // Filtrar apenas notícias publicadas e limitar a 6
                const noticiasPublicadas = data.data
                    .filter((item: NewsItem) => item.status === 'Publicado')
                    .slice(0, 6);

                setNews(noticiasPublicadas);
            }
        } catch (error) {
            console.error('Erro ao carregar notícias:', error);
            setError('Não foi possível carregar as notícias');
        } finally {
            setLoading(false);
        }
    };

    // Carregar notícias ao montar componente
    useEffect(() => {
        fetchNews();
    }, []);

    // Formatar data
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    // Limitar texto
    const limitText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    if (loading) {
        return (
            <section className="news-section" id="news">
                <div className="container">
                    <div className="news-header">
                        <h2 className="news-title">{title}</h2>
                        <p className="news-subtitle">{subtitle}</p>
                    </div>
                    <div className="loading-message">Carregando notícias...</div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="news-section" id="news">
                <div className="container">
                    <div className="news-header">
                        <h2 className="news-title">{title}</h2>
                        <p className="news-subtitle">{subtitle}</p>
                    </div>
                    <div className="error-message">{error}</div>
                </div>
            </section>
        );
    }

    return (
        <section className="news-section" id="news">
            <div className="container">
                <div className="news-header">
                    <h2 className="news-title">{title}</h2>
                    <p className="news-subtitle">{subtitle}</p>
                </div>

                {news.length === 0 ? (
                    <div className="no-news-message">
                        <p>Nenhuma notícia publicada ainda.</p>
                        <p>Em breve teremos novidades!</p>
                    </div>
                ) : (
                    <>
                        <div className="news-grid">
                            {news.map((item) => (
                                <div key={item.id} className="news-card">
                                    <div className="news-image-container">
                                        <img
                                            src={item.imagem_url || "https://via.placeholder.com/400x250?text=Notícia+Vereador"}
                                            alt={item.titulo}
                                            className="news-image"
                                        />
                                        <div className="news-date">{formatDate(item.createdAt)}</div>
                                    </div>

                                    <div className="news-content">
                                        <h3 className="news-title-card">{item.titulo}</h3>
                                        <p className="news-description">
                                            {limitText(item.conteudo, 150)}
                                        </p>

                                        <div className="news-tags">
                                            <span className="news-tag">{item.categoria}</span>
                                            <span className="news-tag">{item.visualizacoes} visualizações</span>
                                        </div>

                                        <button className="news-button">
                                            Ler notícia
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="news-footer">
                            <button className="news-load-more" onClick={fetchNews}>
                                Atualizar notícias
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default NewsSection;