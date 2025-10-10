// src/services/noticiasService.ts
import api from './api';

export interface Noticia {
    id: number;
    titulo: string;
    conteudo: string;
    categoria: string;
    status: 'Rascunho' | 'Publicado';
    imagem_url?: string;
    visualizacoes: number;
    autor: string;
    createdAt: string;
    updatedAt: string;
}

export const noticiasService = {
    // Buscar notícias públicas (para a página inicial)
    async getNoticiasPublicas(): Promise<Noticia[]> {
        try {
            const response = await api.get('/noticias/publicas');

            // A API retorna { success: true, data: [...] }
            // Precisamos acessar response.data.data
            if (response.data && response.data.success) {
                return response.data.data || [];
            }

            return [];
        } catch (error) {
            console.error('Erro ao buscar notícias públicas:', error);
            return [];
        }
    },

    // Buscar notícia individual por ID
    async getNoticiaById(id: number): Promise<Noticia | null> {
        try {
            const response = await api.get(`/noticias/${id}`);

            if (response.data && response.data.success) {
                return response.data.data;
            }

            return null;
        } catch (error) {
            console.error('Erro ao buscar notícia:', error);
            return null;
        }
    },

    // Buscar notícias para admin (com autenticação)
    async getNoticiasAdmin() {
        try {
            const response = await api.get('/noticias');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
            throw error;
        }
    }
};