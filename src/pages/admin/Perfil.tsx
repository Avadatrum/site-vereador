import { AdminLayout } from "../../components/AdminLayout";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Camera } from "lucide-react";

export default function Perfil() {
    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Perfil do Vereador
                    </h1>
                    <p className="text-muted-foreground">
                        Gerencie as informações públicas do perfil
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="md:col-span-1">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <Avatar className="w-32 h-32">
                                        <AvatarImage src="" alt="Foto do vereador" />
                                        <AvatarFallback className="text-2xl">IC</AvatarFallback>
                                    </Avatar>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="absolute bottom-0 right-0 rounded-full"
                                    >
                                        <Camera className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="text-center">
                                    <h3 className="font-semibold text-lg">Ítalo Caetano</h3>
                                    <p className="text-sm text-muted-foreground">Vereador</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Informações Pessoais</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="nome">Nome Completo</Label>
                                        <Input id="nome" defaultValue="Ítalo Caetano" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cargo">Cargo</Label>
                                        <Input id="cargo" defaultValue="Vereador" />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-mail</Label>
                                        <Input id="email" type="email" defaultValue="italocaetano@email.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="telefone">Telefone</Label>
                                        <Input id="telefone" defaultValue="(00) 00000-0000" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="biografia">Biografia</Label>
                                    <Textarea
                                        id="biografia"
                                        rows={4}
                                        defaultValue="Vereador comprometido com o desenvolvimento da cidade e o bem-estar da população."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="formacao">Formação Acadêmica</Label>
                                    <Input id="formacao" defaultValue="Bacharel em Direito" />
                                </div>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button variant="outline">Cancelar</Button>
                                    <Button>Salvar Alterações</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
