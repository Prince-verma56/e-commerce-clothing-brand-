"use client";

import * as React from "react";
import { Dot, BarChart3 } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type RevenueChartPoint = {
  date: string;
  revenue: number;
};

type ChartAreaInteractiveProps = {
  data: RevenueChartPoint[];
};

const chartConfig: ChartConfig = {
  revenue: {
    label: "Total Revenue",
    color: "hsl(var(--primary))",
  },
};

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile();
  const [range, setRange] = React.useState("30d");

  React.useEffect(() => {
    if (isMobile) setRange("7d");
  }, [isMobile]);

  const filteredData = React.useMemo(() => {
    const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
    return data.slice(-days);
  }, [data, range]);

  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Revenue & Sales Trend
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-500">
            <Dot className="size-4 animate-pulse" />
            Live
          </span>
        </CardTitle>
        <CardDescription>
          Live store revenue data and historical sales performance.
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={range}
            onValueChange={(value) => value && setRange(value)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 90 days</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-36 @[767px]/card:hidden" size="sm" aria-label="Select time range">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 90 days
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {filteredData.length === 0 ? (
            <div className="h-[280px] w-full animate-in fade-in duration-500 flex flex-col items-center justify-center space-y-3 rounded-xl border border-dashed border-border bg-muted/30">
               <div className="flex size-12 items-center justify-center rounded-2xl bg-muted">
                  <BarChart3 className="size-6 animate-pulse text-muted-foreground" />
               </div>
               <div className="text-center">
                  <p className="text-sm font-black text-foreground">Loading store data...</p>
               </div>
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  minTickGap={32}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 700 }}
                />
                <ChartTooltip
                  cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
                  content={
                    <ChartTooltipContent 
                      indicator="dashed" 
                      className="rounded-2xl border-border bg-card text-card-foreground shadow-none"
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  fill="url(#fillRevenue)"
                  strokeWidth={2.5}
                  connectNulls={true}
                  dot={{ r: 4, fill: "var(--color-revenue)", strokeWidth: 2, stroke: "hsl(var(--card))" }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
