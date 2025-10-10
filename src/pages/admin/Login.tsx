import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Lock, ArrowRight, Github } from 'lucide-react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const success = await login(username, password);

        if (success) {
            navigate('/admin');
        } else {
            setError('Usuário ou senha incorretos');
        }

        setIsLoading(false);
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-green-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>

            <div className="max-w-md w-full relative z-10">
                {/* Card Principal */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden transform transition-all duration-500 hover:shadow-3xl">
                    {/* Header com Gradiente */}
                    <div className="bg-gradient-to-r from-emerald-500 to-amber-500 p-6 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Painel Administrativo</h1>
                            <p className="text-white/80 text-sm">Vereador Ítalo Caetano</p>
                        </div>
                    </div>

                    {/* Formulário */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Campo Usuário */}
                            <div className="group">
                                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-emerald-600 transition-colors">
                                    Usuário
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                                        placeholder="Digite seu usuário"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Campo Senha */}
                            <div className="group">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-emerald-600 transition-colors">
                                    Senha
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white/50 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
                                        placeholder="Digite sua senha"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Mensagem de Erro */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-pulse">
                                    {error}
                                </div>
                            )}

                            {/* Botão de Login */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Entrando...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Acessar Painel</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Credenciais de Teste */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl border border-emerald-200">
                            <p className="text-sm text-gray-600 text-center">
                                <strong className="text-emerald-700">Credenciais de teste:</strong><br />
                                <span className="text-gray-500">Usuário: <code className="bg-white px-2 py-1 rounded border">admin</code></span><br />
                                <span className="text-gray-500">Senha: <code className="bg-white px-2 py-1 rounded border">vereador2024</code></span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer com Desenvolvedor */}
                <div className="mt-6 text-center">
                    <a
                        href="https://github.com/Avadatrum"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors group"
                    >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Desenvolvido por Avadatrum</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;