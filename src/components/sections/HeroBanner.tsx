import React, { useState, useEffect, FC } from 'react';
import '../../styles/components/HeroBanner.css';

interface HeroBannerProps {
    backgroundImage?: string;
    profileImage?: string;
    title?: string;
    biography?: string;
    alternatingWords?: string[];
}

const HeroBanner: FC<HeroBannerProps> = ({
    backgroundImage,
    profileImage,
    title = "O vereador",
    biography = "Nascido e criado em Tibau do Sul, Ítalo Caetano é um vereador comprometido com o desenvolvimento social e econômico. Com mais de 10 anos de experiência em políticas públicas, ele tem lutado incansavelmente por melhorias em saúde, educação e infraestrutura para todos os cidadãos.",
    alternatingWords = ["do povo", "de Tibau do Sul", "de projetos", "de verdade"]
}) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % alternatingWords.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [alternatingWords.length]);

    const heroStyle = backgroundImage
        ? { backgroundImage: `url(${backgroundImage})` }
        : {};

    return (
        <section className="hero" style={heroStyle}>
            <div className="hero-overlay">
                <div className="hero-content">
                    {/* Imagem - Em mobile aparecerá primeiro */}
                    <div className="hero-image-container">
                        <img
                            src={profileImage}
                            alt="Vereador Ítalo Caetano"
                            className="hero-profile-image"
                        />
                    </div>

                    {/* Conteúdo Textual - Em mobile aparecerá depois */}
                    <div className="hero-text-content">
                        <div className="hero-title-container">
                            <h1 className="hero-title">
                                {title} <span className="hero-alternating-word">{alternatingWords[currentWordIndex]}</span>
                            </h1>
                        </div>

                        <p className="hero-biography">{biography}</p>

                        <div className="hero-buttons">
                            <a href="#proposals" className="hero-primary-button">Conheça Minhas Propostas</a>
                            <a href="#contact" className="hero-secondary-button">Entre em Contato</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;