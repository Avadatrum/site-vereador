import React, { FC } from 'react';
import { Twitter, Instagram, WhatsApp, GitHub } from '@mui/icons-material';
import '../../styles/components/Footer.css';

interface FooterProps {
    githubUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    whatsappUrl?: string;
}

const Footer: FC<FooterProps> = ({
    githubUrl = "https://github.com/avadatrum",
    twitterUrl = "https://twitter.com/avadatrum",
    instagramUrl = "https://instagram.com/avadatrum",
    whatsappUrl = "https://wa.me/558499999999"
}) => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-social">
                    <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon twitter-icon"
                        aria-label="Twitter"
                    >
                        <Twitter />
                    </a>
                    <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon instagram-icon"
                        aria-label="Instagram"
                    >
                        <Instagram />
                    </a>
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon whatsapp-icon"
                        aria-label="WhatsApp"
                    >
                        <WhatsApp />
                    </a>
                </div>

                <div className="footer-copyright">
                    <p>
                        Desenvolvido por{" "}
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                        >
                            Avadatrum
                        </a>{" "}
                        todos os direitos reservados
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;