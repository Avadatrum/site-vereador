import React, { FC } from 'react';
import '../../styles/components/NewsSection.css';

interface NewsItem {
    id: number;
    title: string;
    description: string;
    date: string;
    tags: string[];
    imageUrl?: string;
}

interface NewsSectionProps {
    title?: string;
    subtitle?: string;
    news?: NewsItem[];
}

const NewsSection: FC<NewsSectionProps> = ({
    title = "Notícias e Atualizações",
    subtitle = "Acompanhe as últimas notícias sobre o trabalho de Ítalo Caetano",
    news = [
        {
            id: 1,
            title: "Ítalo Caetano apresenta projeto de revitalização do centro histórico",
            description: "O vereador apresentou na última sessão da Câmara um projeto que visa recuperar e revitalizar o centro histórico de Tibau do Sul, preservando o patrimônio cultural e estimulando o turismo local.",
            date: "15/05/2023",
            tags: ["Urbanismo", "Cultura", "Turismo"],
            imageUrl: "https://via.placeholder.com/400x250?text=Notícia+1"
        },
        {
            id: 2,
            title: "Nova escola será construída no bairro Novo Horizonte",
            description: "Após anos de reivindicação da comunidade, foi aprovado o recurso para construção de uma nova unidade escolar que atenderá mais de 500 alunos da região.",
            date: "10/05/2023",
            tags: ["Educação", "Infraestrutura"],
            imageUrl: "https://via.placeholder.com/400x250?text=Notícia+2"
        },
        {
            id: 3,
            title: "Programa de saúde preventiva atinge mais de 2 mil pessoas",
            description: "A ação conjunta entre a Câmara Municipal e a Secretaria de Saúde já realizou exames e orientações para mais de 2 mil cidadãos em todo o município.",
            date: "05/05/2023",
            tags: ["Saúde", "Comunidade"],
            imageUrl: "https://via.placeholder.com/400x250?text=Notícia+3"
        },
        {
            id: 4,
            title: "Ítalo Caetano participa de audiência pública sobre meio ambiente",
            description: "O vereador esteve presente na audiência que discutiu medidas para preservar os manguezais da região e promover o desenvolvimento sustentável.",
            date: "01/05/2023",
            tags: ["Meio Ambiente", "Sustentabilidade"],
            imageUrl: "https://via.placeholder.com/400x250?text=Notícia+4"
        }
    ]
}) => {
    return (
        <section className="news-section" id="news">
            <div className="container">
                <div className="news-header">
                    <h2 className="news-title">{title}</h2>
                    <p className="news-subtitle">{subtitle}</p>
                </div>

                <div className="news-grid">
                    {news.map((item) => (
                        <div key={item.id} className="news-card">
                            <div className="news-image-container">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="news-image"
                                />
                                <div className="news-date">{item.date}</div>
                            </div>

                            <div className="news-content">
                                <h3 className="news-title-card">{item.title}</h3>
                                <p className="news-description">{item.description}</p>

                                <div className="news-tags">
                                    {item.tags.map((tag, index) => (
                                        <span key={index} className="news-tag">{tag}</span>
                                    ))}
                                </div>

                                <button className="news-button">
                                    Ler notícia
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="news-footer">
                    <button className="news-load-more">
                        Carregar mais notícias
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewsSection;