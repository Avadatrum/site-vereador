import React, { FC } from 'react';
import logo from '../../assets/logo.png';

interface HeaderProps {
    navigationItems: {
        label: string;
        href: string;
    }[];
}

const Header: FC<HeaderProps> = ({ navigationItems }) => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-brand">
                    <img src={logo} alt="Logo" className="header-logo" />
                </div>

                <nav className="header-nav">
                    <ul className="header-nav-list">
                        {navigationItems.map((item, index) => (
                            <li key={index} className="header-nav-item">
                                <a href={item.href} className="header-nav-link font-medium">
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;