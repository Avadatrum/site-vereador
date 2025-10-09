import type { LucideProps } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { cn } from "../lib/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType<LucideProps>;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    variant?: "default" | "primary" | "success";
}

export function StatCard({
    title,
    value,
    icon: Icon,
    trend,
    variant = "default"
}: StatCardProps) {
    const variantStyles = {
        default: "from-card to-card",
        primary: "from-primary/10 to-primary/5 border-primary/20",
        success: "from-success/10 to-success/5 border-success/20",
    };

    const iconStyles = {
        default: "text-muted-foreground",
        primary: "text-primary",
        success: "text-success",
    };

    return (
        <Card className={cn(
            "overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
            "bg-gradient-to-br",
            variantStyles[variant]
        )}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                            {title}
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                            {value}
                        </p>
                        {trend && (
                            <p className={cn(
                                "text-sm font-medium flex items-center gap-1",
                                trend.isPositive ? "text-success" : "text-destructive"
                            )}>
                                <span>{trend.isPositive ? "↑" : "↓"}</span>
                                <span>{Math.abs(trend.value)}%</span>
                                <span className="text-muted-foreground ml-1">vs mês anterior</span>
                            </p>
                        )}
                    </div>
                    <div className={cn(
                        "p-4 rounded-2xl bg-background/50 backdrop-blur-sm",
                        iconStyles[variant]
                    )}>
                        <Icon className="w-8 h-8" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}