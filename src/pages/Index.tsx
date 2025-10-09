import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted">
            <div className="text-center space-y-6 px-4">
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Painel Administrativo
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-md mx-auto">
                        Sistema de gerenciamento do site do Vereador Ítalo Caetano
                    </p>
                </div>

                <Link to="/admin">
                    <Button size="lg" className="gap-2 mt-8">
                        Acessar Painel
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Index;
