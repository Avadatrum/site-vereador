import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './contexts/AuthContext';

// Seus componentes atuais
import Header from './components/layout/Header';
import HeroBanner from './components/sections/HeroBanner';
import AboutSection from './components/sections/AboutSection';
import ProposalsSection from './components/sections/ProposalsSection';
import NewsSection from './components/sections/NewsSection';
import Footer from './components/layout/Footer';
import profileImage from './assets/img-italo.png';
import './styles/global.css';

// Componentes do admin (do Lovable)
import { AdminLayout } from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import NoticiasAdmin from './pages/admin/Noticias';
import ProjetosAdmin from './pages/admin/Projetos';
import MensagensAdmin from './pages/admin/Mensagens';
import ConfiguracoesAdmin from './pages/admin/Configuracoes';
import PerfilAdmin from './pages/admin/Perfil';
import Login from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const navigationItems = [
    { label: 'Início', href: '#' },
    { label: 'Sobre', href: '#about' },
    { label: 'Propostas', href: '#proposals' },
    { label: 'Notícias', href: '#news' },
    { label: 'Contato', href: '#contact' },
  ];

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rota Pública - Seu site atual (MANTIDO INTACTO) */}
            <Route path="/" element={
              <>
                <Header
                  navigationItems={navigationItems}
                />
                <HeroBanner
                  profileImage={profileImage}
                  title="O vereador"
                  biography="Nascido e criado em Tibau do Sul, Ítalo Caetano é um vereador comprometido com o desenvolvimento social e econômico. Com mais de 10 anos de experiência em políticas públicas, ele tem lutado incansavelmente por melhorias em saúde, educação e infraestrutura para todos os cidadãos."
                  alternatingWords={["do povo", "de Tibau do Sul", "de projetos", "de verdade"]}
                />
                <AboutSection
                  title="Sobre Ítalo Caetano"
                  description="Nascido e criado em nossa cidade, Ítalo Caetano é um vereador comprometido com o desenvolvimento social e econômico. Com mais de 10 anos de experiência em políticas públicas, ele tem lutado incansavelmente por melhorias em saúde, educação e infraestrutura para todos os cidadãos."
                />
                <ProposalsSection />
                <NewsSection />
                <Footer />
              </>
            } />

            {/* Rota de Login */}
            <Route path="/admin/login" element={<Login />} />

            {/* Rotas Administrativas PROTEGIDAS */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Routes>
                      <Route index element={<Dashboard />} />
                      <Route path="noticias" element={<NoticiasAdmin />} />
                      <Route path="projetos" element={<ProjetosAdmin />} />
                      <Route path="mensagens" element={<MensagensAdmin />} />
                      <Route path="configuracoes" element={<ConfiguracoesAdmin />} />
                      <Route path="perfil" element={<PerfilAdmin />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;