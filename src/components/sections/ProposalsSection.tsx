import React, { FC } from 'react';
import '../../styles/components/ProposalsSection.css'; // Caminho corrigido

interface Proposal {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
}

interface ProposalsSectionProps {
    title?: string;
    subtitle?: string;
    proposals?: Proposal[];
}

const ProposalsSection: FC<ProposalsSectionProps> = ({
    title = "Principais Propostas",
    subtitle = "Conheça as propostas de Ítalo Caetano para Tibau do Sul",
    proposals = [
        {
            id: 1,
            title: "Educação de Qualidade",
            description: "Ampliação das escolas e melhoria na qualidade do ensino público, com formação continuada para professores.",
            imageUrl: "https://via.placeholder.com/300x200?text=Educação"
        },
        {
            id: 2,
            title: "Saúde para Todos",
            description: "Investimento em postos de saúde e contratação de mais profissionais para atendimento à população.",
            imageUrl: "https://via.placeholder.com/300x200?text=Saúde"
        },
        {
            id: 3,
            title: "Infraestrutura Urbana",
            description: "Pavimentação de ruas, construção de calçadas e melhorias no sistema de drenagem da cidade.",
            imageUrl: "https://via.placeholder.com/300x200?text=Infraestrutura"
        },
        {
            id: 4,
            title: "Meio Ambiente",
            description: "Preservação das praias e manguezais, além de projetos de educação ambiental nas escolas.",
            imageUrl: "https://via.placeholder.com/300x200?text=Meio Ambiente"
        },
        {
            id: 5,
            title: "Geração de Emprego",
            description: "Incentivo ao turismo local e apoio a pequenos empresários para criar mais oportunidades de trabalho.",
            imageUrl: "https://via.placeholder.com/300x200?text=Emprego"
        },
        {
            id: 6,
            title: "Segurança Pública",
            description: "Aumento do efetivo da guarda municipal e instalação de câmeras de segurança em pontos estratégicos.",
            imageUrl: "https://via.placeholder.com/300x200?text=Segurança"
        }
    ]
}) => {
    return (
        <section className="proposals-section" id="proposals">
            <div className="container">
                <div className="proposals-header">
                    <h2 className="proposals-title">{title}</h2>
                    <p className="proposals-subtitle">{subtitle}</p>
                </div>

                <div className="proposals-grid">
                    {proposals.map((proposal) => (
                        <div key={proposal.id} className="proposal-card">
                            <div className="proposal-image-container">
                                <img
                                    src={proposal.imageUrl}
                                    alt={proposal.title}
                                    className="proposal-image"
                                />
                            </div>
                            <div className="proposal-content">
                                <h3 className="proposal-title">{proposal.title}</h3>
                                <p className="proposal-description">{proposal.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProposalsSection;