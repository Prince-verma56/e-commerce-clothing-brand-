"use client";

import { motion } from "framer-motion";
import { Dot } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatCard = {
  id: string;
  title: string;
  value: string;
  delta: string;
  subtitle: string;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  livePulse?: boolean;
  asOfLabel?: string;
};

type SectionCardsProps = {
  stats: StatCard[];
};

export function SectionCards({ stats }: SectionCardsProps) {
  return (
    <section className="@container">
      <div className="grid grid-cols-1 gap-4 @xl:grid-cols-2 @4xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isUp = stat.trend === "up";
          const isDown = stat.trend === "down";

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
            >
              <Card className="border-border bg-card text-card-foreground transition-colors hover:bg-muted/30">
                <CardHeader>
                  <CardDescription className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      {stat.title}
                      {stat.livePulse ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-500">
                          <Dot className="size-3 animate-pulse" />
                          Live
                        </span>
                      ) : null}
                    </span>
                    <Icon className="size-4 text-muted-foreground" />
                  </CardDescription>
                  <CardTitle className="text-2xl font-semibold">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center gap-1 text-sm">
                    {isUp ? <TrendingUp className="size-4 text-emerald-500" /> : null}
                    {isDown ? <TrendingDown className="size-4 text-destructive" /> : null}
                    <span
                      className={cn(
                        "font-medium",
                        isUp && "text-emerald-500",
                        isDown && "text-destructive",
                        stat.trend === "neutral" && "text-muted-foreground"
                      )}
                    >
                      {stat.delta}
                    </span>
                    <span className="text-muted-foreground">{stat.subtitle}</span>
                  </p>
                  {stat.asOfLabel ? <p className="mt-1 text-xs text-muted-foreground">{stat.asOfLabel}</p> : null}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
