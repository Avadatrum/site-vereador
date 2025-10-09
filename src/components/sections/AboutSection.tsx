import { type FC } from 'react';
import { BarChart3, Gavel, Trophy } from "lucide-react";

interface AboutSectionProps {
    title: string;
    description?: string;
}

const AboutSection: FC<AboutSectionProps> = ({
    title = "Sobre Ítalo Caetano",
    description
}) => {
    const stats = [
        {
            value: "42+",
            label: "Projetos Apresentados",
            icon: <BarChart3 size={32} />
        },
        {
            value: "18",
            label: "Leis Aprovadas",
            icon: <Gavel size={32} />
        },
        {
            value: "10+",
            label: "Anos de Atuação",
            icon: <Trophy size={32} />
        }
    ];

    return (
        <section className="about-section">
            <div className="container">
                <div className="about-header">
                    <h2 className="about-title">{title}</h2>
                </div>

                {description && (
                    <div className="about-description-container">
                        <p className="about-description">{description}</p>
                    </div>
                )}

                <div className="stats-container">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-block">
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;