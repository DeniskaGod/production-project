import React, { memo } from "react";
import cls from "../AdminPanelPage.module.scss";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: string;
  trend?: "up" | "down" | "neutral";
}

const StatsCard = memo(({ label, value, trend = "neutral" }: StatsCardProps) => {
  return (
    <div className={cls.statCard}>
      <div className={cls.statValue}>{value}</div>
      <div className={cls.statLabel}>{label}</div>
      {trend && trend !== "neutral" && (
        <div className={cls.statTrend}>
          <span className={trend === "up" ? cls.up : cls.down}>
            {trend === "up" ? "↑" : "↓"}
          </span>
        </div>
      )}
    </div>
  );
});

StatsCard.displayName = "StatsCard";

export default StatsCard;
